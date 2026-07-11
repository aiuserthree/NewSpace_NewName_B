-- 공간 이름 공모전 · 수정 RPC + 관리자 실시간(UPDATE) 마이그레이션
-- Supabase Dashboard → SQL Editor 에서 이 파일 전체를 실행하세요.
--
-- 적용 내용:
--   1. update_submission RPC (P4 수정 저장 · 이름·연락처 변경 포함)
--   2. submissions 테이블 Realtime UPDATE 이벤트용 REPLICA IDENTITY
--   3. supabase_realtime publication 등록 (관리자 P6 실시간 갱신)

-- ------------------------------------------------------------------
-- 1. 사용자 수정 RPC (기존 이름+연락처로 인증 · 마감 전에만)
-- ------------------------------------------------------------------
drop function if exists public.update_submission(text, text, text, jsonb);

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
  deadline timestamptz := '2026-07-18 23:59:59+09';
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
-- 2. Realtime — UPDATE 이벤트가 관리자 화면에 반영되도록 설정
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
-- 확인 (선택): 아래 쿼리로 RPC·Realtime 설정을 점검할 수 있습니다.
-- select proname, pg_get_function_arguments(oid) from pg_proc where proname = 'update_submission';
-- select * from pg_publication_tables where tablename = 'submissions';
