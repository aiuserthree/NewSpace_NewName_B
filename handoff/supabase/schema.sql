-- 공간 이름 공모전 · Supabase 스키마
-- Supabase Dashboard → SQL Editor 에서 실행하세요.

-- ------------------------------------------------------------------
-- 1. 신청 테이블
-- ------------------------------------------------------------------
create table if not exists public.submissions (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  phone text not null,
  affiliation text not null default '',
  spaces jsonb not null default '{}'::jsonb,
  submitted_at timestamptz not null default now(),
  name_key text generated always as (trim(regexp_replace(name, '\s+', ' ', 'g'))) stored,
  phone_key text generated always as (regexp_replace(phone, '\D', '', 'g')) stored,
  constraint submissions_name_phone_unique unique (name_key, phone_key)
);

create index if not exists submissions_submitted_at_idx
  on public.submissions (submitted_at desc);

alter table public.submissions enable row level security;

-- 익명(사용자) INSERT만 허용 — SELECT는 RPC로 제한
-- ⚠️ 클라이언트 insert 후 .select()를 호출하면 RLS(42501)로 실패합니다.
--    saveSubmission은 insert만 하고 응답은 로컬에서 구성합니다.
drop policy if exists "anon insert submissions" on public.submissions;
create policy "anon insert submissions"
  on public.submissions for insert
  to anon, authenticated
  with check (true);

-- ------------------------------------------------------------------
-- 2. 관리자 프로필 (Supabase Auth 사용자 UUID 등록)
-- ------------------------------------------------------------------
create table if not exists public.admin_profiles (
  user_id uuid primary key references auth.users (id) on delete cascade,
  created_at timestamptz not null default now()
);

alter table public.admin_profiles enable row level security;

drop policy if exists "admin read own profile" on public.admin_profiles;
create policy "admin read own profile"
  on public.admin_profiles for select
  to authenticated
  using (auth.uid() = user_id);

drop policy if exists "admin select submissions" on public.submissions;
create policy "admin select submissions"
  on public.submissions for select
  to authenticated
  using (
    exists (
      select 1 from public.admin_profiles ap
      where ap.user_id = auth.uid()
    )
  );

-- ------------------------------------------------------------------
-- 3. 사용자 조회/중복확인 RPC (이름+연락처 일치 시에만)
-- ------------------------------------------------------------------
create or replace function public.lookup_submission(p_name text, p_phone text)
returns json
language plpgsql
security definer
set search_path = public
as $$
declare
  result json;
begin
  select json_build_object(
    'id', s.id,
    'name', s.name,
    'phone', s.phone,
    'affiliation', s.affiliation,
    'spaces', s.spaces,
    'submitted_at', s.submitted_at
  )
  into result
  from public.submissions s
  where s.name_key = trim(regexp_replace(p_name, '\s+', ' ', 'g'))
    and s.phone_key = regexp_replace(p_phone, '\D', '', 'g')
  limit 1;

  return result;
end;
$$;

create or replace function public.submission_exists(p_name text, p_phone text)
returns boolean
language sql
security definer
set search_path = public
as $$
  select exists (
    select 1
    from public.submissions s
    where s.name_key = trim(regexp_replace(p_name, '\s+', ' ', 'g'))
      and s.phone_key = regexp_replace(p_phone, '\D', '', 'g')
  );
$$;

grant execute on function public.lookup_submission(text, text) to anon, authenticated;
grant execute on function public.submission_exists(text, text) to anon, authenticated;

-- ------------------------------------------------------------------
-- 3b. 사용자 수정 RPC (이름+연락처 일치 · 마감 전에만)
--     ⚠️ 기존 DB에 적용 시 아래 함수만 SQL Editor에서 실행하세요.
-- ------------------------------------------------------------------
create or replace function public.update_submission(
  p_name text,
  p_phone text,
  p_name_new text,
  p_phone_new text,
  p_affiliation text,
  p_spaces jsonb
)
returns json
language plpgsql
security definer
set search_path = public
as $$
declare
  result json;
  deadline timestamptz := '2026-07-25 23:59:59+09';
  target_id uuid;
  updated_id uuid;
  old_name_key text;
  old_phone_key text;
  new_name text;
  new_phone text;
  new_name_key text;
  new_phone_key text;
begin
  if now() > deadline then
    raise exception 'DEADLINE_PASSED';
  end if;

  old_name_key := trim(regexp_replace(p_name, '\s+', ' ', 'g'));
  old_phone_key := regexp_replace(p_phone, '\D', '', 'g');
  new_name := trim(regexp_replace(coalesce(nullif(trim(p_name_new), ''), p_name), '\s+', ' ', 'g'));
  new_phone := regexp_replace(coalesce(nullif(trim(p_phone_new), ''), p_phone), '\D', '', 'g');
  new_name_key := trim(regexp_replace(new_name, '\s+', ' ', 'g'));
  new_phone_key := regexp_replace(new_phone, '\D', '', 'g');

  if new_name = '' then
    raise exception 'INVALID_NAME';
  end if;

  if new_phone_key = '' or length(new_phone_key) < 10 or length(new_phone_key) > 11 then
    raise exception 'INVALID_PHONE';
  end if;

  select s.id into target_id
  from public.submissions s
  where s.name_key = old_name_key
    and s.phone_key = old_phone_key;

  if target_id is null then
    return null;
  end if;

  if exists (
    select 1
    from public.submissions s
    where s.name_key = new_name_key
      and s.phone_key = new_phone_key
      and s.id <> target_id
  ) then
    raise exception 'PHONE_DUPLICATE';
  end if;

  update public.submissions s
  set
    name = new_name,
    phone = new_phone,
    affiliation = coalesce(trim(p_affiliation), ''),
    spaces = coalesce(p_spaces, '{}'::jsonb)
  where s.id = target_id
  returning s.id into updated_id;

  select json_build_object(
    'id', s.id,
    'name', s.name,
    'phone', s.phone,
    'affiliation', s.affiliation,
    'spaces', s.spaces,
    'submitted_at', s.submitted_at
  )
  into result
  from public.submissions s
  where s.id = updated_id;

  return result;
end;
$$;

grant execute on function public.update_submission(text, text, text, text, text, jsonb) to anon, authenticated;

-- ------------------------------------------------------------------
-- 4. Realtime (관리자 실시간 목록 · INSERT/UPDATE/DELETE)
--    Dashboard → Database → Replication 에서 submissions 가 켜져 있는지 확인하세요.
--    기존 DB에만 적용할 때는 handoff/supabase/update-submission.sql 을 실행하세요.
-- ------------------------------------------------------------------
alter table public.submissions replica identity full;

do $$
begin
  if not exists (
    select 1
    from pg_publication_tables
    where pubname = 'supabase_realtime'
      and schemaname = 'public'
      and tablename = 'submissions'
  ) then
    alter publication supabase_realtime add table public.submissions;
  end if;
end $$;

-- ------------------------------------------------------------------
-- 5. 관리자 계정 등록 (Auth에서 사용자 생성 후 실행)
--    insert into public.admin_profiles (user_id)
--    values ('YOUR-AUTH-USER-UUID');
-- ------------------------------------------------------------------
