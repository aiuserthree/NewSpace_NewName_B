# Supabase 연동 가이드

## 1. Supabase 프로젝트 생성
1. [Supabase](https://supabase.com) 에서 새 프로젝트 생성
2. **Project Settings → API** 에서 아래 값 복사
   - Project URL
   - anon public key

## 2. 설정 파일
`handoff/project/app/supabase-config.js` 에 값 입력:

```javascript
window.SUPABASE_CONFIG = {
  url: "https://xxxxx.supabase.co",
  anonKey: "eyJhbG...",
};
```

설정이 비어 있으면 **localStorage 폴백**으로 동작합니다.

## 3. DB 스키마 적용
Supabase Dashboard → **SQL Editor** → `handoff/supabase/schema.sql` 내용 실행

## 4. 관리자 계정
1. Supabase Dashboard → **Authentication → Users** → 사용자 생성
2. SQL Editor에서 관리자 등록:

```sql
insert into public.admin_profiles (user_id)
values ('생성된-USER-UUID');
```

## 5. 페이지 URL
| 역할 | URL |
|------|-----|
| 사용자 신청 | `/P1-apply.html` |
| 신청 확인 | `/P5-check.html` |
| **관리자** | `/P6-admin.html` |

관리자 페이지는 실시간으로 신청 목록이 갱신됩니다.
