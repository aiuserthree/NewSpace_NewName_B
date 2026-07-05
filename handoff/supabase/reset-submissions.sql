-- 신청 데이터 전체 초기화
-- Supabase Dashboard → SQL Editor 에서 이 파일 전체를 실행하세요.

delete from public.submissions;

create or replace function public.clear_all_submissions()
returns bigint
language plpgsql
security definer
set search_path = public
as $$
declare
  deleted_count bigint;
begin
  if auth.uid() is null then
    raise exception 'not authenticated';
  end if;

  if not exists (
    select 1 from public.admin_profiles ap
    where ap.user_id = auth.uid()
  ) then
    raise exception 'not authorized';
  end if;

  delete from public.submissions;
  get diagnostics deleted_count = row_count;
  return deleted_count;
end;
$$;

grant execute on function public.clear_all_submissions() to authenticated;
