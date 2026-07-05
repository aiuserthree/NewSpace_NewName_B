/* AdminScreen.jsx — P6 관리자 · Supabase 실시간 신청 목록 */

function AdminShell({ children }) {
  const { Icon } = window.HarvestDesignSystem_eb006c;
  return (
    <div style={{ minHeight: "100vh", background: "var(--surface-page)" }}>
      <header style={{ height: 54, display: "flex", alignItems: "center", justifyContent: "center", gap: 8, borderBottom: "1px solid var(--border-divider)", background: "var(--surface-page)", position: "sticky", top: 0, zIndex: 20 }}>
        <span style={{ color: "var(--accent)", display: "inline-flex" }}>
          <Icon name="lock" size={19} />
        </span>
        <span style={{ fontFamily: "var(--font-sans)", fontSize: 15, fontWeight: 600, letterSpacing: "0.015em", color: "var(--text-primary)" }}>
          {window.SNC_CONFIG.title} · 관리자
        </span>
      </header>
      <main style={{ maxWidth: 1280, margin: "0 auto", padding: "24px 20px 40px" }}>{children}</main>
    </div>
  );
}

const ADMIN_PAGE_SIZE = 10;

function downloadSubmissionsExcel(rows, spaces) {
  const headers = [
    "제출일시",
    "이름",
    "연락처",
    "소속",
    ...spaces.flatMap((sp) => [`${sp.name}(필수)`, `${sp.name}(선택)`]),
  ];

  const data = rows.map((row) => {
    const v = row.spaces || {};
    return [
      window.formatSubmittedAt(row.submittedAt),
      row.name,
      window.formatPhone(row.phone),
      row.affiliation || "",
      ...spaces.flatMap((sp) => {
        const sv = v[sp.id] || {};
        return [(sv.required || "").trim(), (sv.optional || "").trim()];
      }),
    ];
  });

  const stamp = new Date().toISOString().slice(0, 10).replace(/-/g, "");
  const filename = `신청자목록_${stamp}.xlsx`;

  if (window.XLSX) {
    const ws = window.XLSX.utils.aoa_to_sheet([headers, ...data]);
    const wb = window.XLSX.utils.book_new();
    window.XLSX.utils.book_append_sheet(wb, ws, "신청자목록");
    window.XLSX.writeFile(wb, filename);
    return;
  }

  const escape = (val) => {
    const s = String(val ?? "");
    return /[",\n\r]/.test(s) ? `"${s.replace(/"/g, '""')}"` : s;
  };
  const lines = [headers.join(","), ...data.map((line) => line.map(escape).join(","))];
  const blob = new Blob(["\uFEFF" + lines.join("\r\n")], { type: "text/csv;charset=utf-8;" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = filename.replace(".xlsx", ".csv");
  a.click();
  URL.revokeObjectURL(url);
}

function AdminPagination({ page, totalPages, totalCount, onPageChange }) {
  const { Button } = window.HarvestDesignSystem_eb006c;
  const start = totalCount === 0 ? 0 : (page - 1) * ADMIN_PAGE_SIZE + 1;
  const end = Math.min(page * ADMIN_PAGE_SIZE, totalCount);

  return (
    <div style={{ display: "flex", flexWrap: "wrap", alignItems: "center", justifyContent: "space-between", gap: 12, padding: "14px 16px", borderTop: "1px solid var(--border-divider)", fontFamily: "var(--font-sans)", fontSize: 14 }}>
      <span style={{ color: "var(--text-secondary)" }}>
        총 {totalCount}건 · {start}–{end}건 표시
      </span>
      <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
        <Button variant="secondary" size="sm" disabled={page <= 1} onClick={() => onPageChange(page - 1)}>
          이전
        </Button>
        <span style={{ color: "var(--text-secondary)", minWidth: 64, textAlign: "center" }}>
          {page} / {totalPages}
        </span>
        <Button variant="secondary" size="sm" disabled={page >= totalPages} onClick={() => onPageChange(page + 1)}>
          다음
        </Button>
      </div>
    </div>
  );
}

function SpaceNamesCell({ values }) {
  const v = values || {};
  const required = (v.required || "").trim();
  const optional = (v.optional || "").trim();

  return (
    <td style={{ padding: "12px 14px", verticalAlign: "top", minWidth: 130 }}>
      <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
        <div style={{ display: "flex", flexDirection: "column", gap: 2 }}>
          <span style={{ fontSize: 10, fontWeight: 600, letterSpacing: "0.06em", textTransform: "uppercase", color: "var(--text-tertiary)" }}>필수</span>
          <span style={{ color: "var(--text-primary)", lineHeight: 1.45, wordBreak: "break-word" }}>{required || "-"}</span>
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: 2 }}>
          <span style={{ fontSize: 10, fontWeight: 600, letterSpacing: "0.06em", textTransform: "uppercase", color: "var(--text-tertiary)" }}>선택</span>
          <span style={{ color: optional ? "var(--text-secondary)" : "var(--text-tertiary)", lineHeight: 1.45, wordBreak: "break-word" }}>{optional || "-"}</span>
        </div>
      </div>
    </td>
  );
}

function AdminScreen() {
  const { Button, Input, Notice, Tag } = window.HarvestDesignSystem_eb006c;
  const spaces = window.CONTEST_SPACES;

  const [booting, setBooting] = React.useState(true);
  const [authed, setAuthed] = React.useState(false);
  const [isAdmin, setIsAdmin] = React.useState(false);
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [loginError, setLoginError] = React.useState("");
  const [loginBusy, setLoginBusy] = React.useState(false);
  const [rows, setRows] = React.useState([]);
  const [listError, setListError] = React.useState("");
  const [page, setPage] = React.useState(1);
  const [resetBusy, setResetBusy] = React.useState(false);

  const totalPages = Math.max(1, Math.ceil(rows.length / ADMIN_PAGE_SIZE));
  const pagedRows = rows.slice((page - 1) * ADMIN_PAGE_SIZE, page * ADMIN_PAGE_SIZE);

  const loadRows = React.useCallback(async () => {
    setListError("");
    try {
      const data = await window.SNC_DB.listAll();
      setRows(data);
    } catch (e) {
      setListError("목록을 불러오지 못했습니다.");
    }
  }, []);

  React.useEffect(() => {
    if (page > totalPages) setPage(totalPages);
  }, [page, totalPages]);

  React.useEffect(() => {
    if (!window.SNC_DB.isConfigured()) {
      setBooting(false);
      return undefined;
    }
    let channel = null;
    (async () => {
      const session = await window.SNC_DB.getSession();
      if (session) {
        setAuthed(true);
        const admin = await window.SNC_DB.isAdmin();
        setIsAdmin(admin);
        if (admin) {
          await loadRows();
          channel = window.SNC_DB.subscribe(() => { loadRows(); });
        }
      }
      setBooting(false);
    })();
    return () => {
      if (channel && window.SNC_DB.getClient()) {
        window.SNC_DB.getClient().removeChannel(channel);
      }
    };
  }, [loadRows]);

  const onLogin = async (e) => {
    e.preventDefault();
    setLoginError("");
    setLoginBusy(true);
    try {
      await window.SNC_DB.signIn(email.trim(), password);
      setAuthed(true);
      const admin = await window.SNC_DB.isAdmin();
      setIsAdmin(admin);
      if (!admin) {
        setLoginError("관리자 권한이 없는 계정입니다.");
        await window.SNC_DB.signOut();
        setAuthed(false);
        return;
      }
      await loadRows();
      window.SNC_DB.subscribe(() => { loadRows(); });
    } catch (err) {
      setLoginError("로그인에 실패했습니다. 이메일과 비밀번호를 확인해 주세요.");
    } finally {
      setLoginBusy(false);
    }
  };

  const onLogout = async () => {
    await window.SNC_DB.signOut();
    setAuthed(false);
    setIsAdmin(false);
    setRows([]);
    setPage(1);
  };

  const onClearAll = async () => {
    if (rows.length === 0) return;
    if (!window.confirm(`총 ${rows.length}건의 신청 데이터를 모두 삭제합니다. 계속하시겠습니까?`)) return;
    if (!window.confirm("삭제된 데이터는 복구할 수 없습니다. 정말 초기화하시겠습니까?")) return;
    setResetBusy(true);
    setListError("");
    try {
      const deleted = await window.SNC_DB.clearAllSubmissions();
      setPage(1);
      await loadRows();
      window.alert(`신청 데이터 ${deleted}건을 초기화했습니다.`);
    } catch (e) {
      setListError("신청 데이터 초기화에 실패했습니다. Supabase SQL Editor에서 reset-submissions.sql 또는 schema.sql의 clear_all_submissions 함수를 실행했는지 확인해 주세요.");
    } finally {
      setResetBusy(false);
    }
  };

  if (booting) {
    return (
      <AdminShell>
        <p style={{ fontFamily: "var(--font-sans)", color: "var(--text-secondary)" }}>로딩 중…</p>
      </AdminShell>
    );
  }

  if (!window.SNC_DB.isConfigured()) {
    return (
      <AdminShell>
        <Notice tone="accent" icon="info" title="Supabase 미설정">
          `app/supabase-config.js` 에 URL과 anon key를 입력한 뒤, `handoff/supabase/schema.sql` 을 Supabase SQL Editor에서 실행해 주세요.
        </Notice>
      </AdminShell>
    );
  }

  if (!authed || !isAdmin) {
    return (
      <AdminShell>
        <div style={{ maxWidth: 400, margin: "40px auto", display: "flex", flexDirection: "column", gap: 20 }}>
          <div>
            <h1 style={{ margin: 0, fontFamily: "var(--font-sans)", fontSize: 24, fontWeight: 600, color: "var(--text-primary)" }}>관리자 로그인</h1>
          </div>
          <form onSubmit={onLogin} style={{ display: "flex", flexDirection: "column", gap: 14 }}>
            <Input label="이메일" type="email" value={email} onChange={(e) => setEmail(e.target.value)} required autoComplete="username" />
            <Input label="비밀번호" type="password" value={password} onChange={(e) => setPassword(e.target.value)} required autoComplete="current-password" />
            {loginError ? <Notice tone="accent" icon="info">{loginError}</Notice> : null}
            <Button variant="primary" size="lg" fullWidth disabled={loginBusy} onClick={onLogin}>
              {loginBusy ? "로그인 중…" : "로그인"}
            </Button>
          </form>
        </div>
      </AdminShell>
    );
  }

  return (
    <AdminShell>
      <div style={{ display: "flex", flexWrap: "wrap", alignItems: "center", justifyContent: "space-between", gap: 12, marginBottom: 20 }}>
        <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
          <h1 style={{ margin: 0, fontFamily: "var(--font-sans)", fontSize: 22, fontWeight: 600, color: "var(--text-primary)" }}>신청자 목록</h1>
          <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
            <Tag tone="wash" icon="users">총 {rows.length}건</Tag>
            <Tag tone="wash" icon="sparkles">실시간 연동</Tag>
          </div>
        </div>
        <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
          <Button variant="secondary" size="sm" disabled={rows.length === 0} onClick={() => downloadSubmissionsExcel(rows, spaces)}>
            엑셀 다운로드
          </Button>
          <Button variant="secondary" size="sm" disabled={rows.length === 0 || resetBusy} onClick={onClearAll}>
            {resetBusy ? "초기화 중…" : "데이터 초기화"}
          </Button>
          <Button variant="secondary" size="sm" onClick={loadRows}>새로고침</Button>
          <Button variant="ghost" size="sm" onClick={onLogout}>로그아웃</Button>
        </div>
      </div>

      {listError ? <Notice tone="accent" icon="info">{listError}</Notice> : null}

      <div style={{ overflowX: "auto", background: "var(--surface-card)", borderRadius: "var(--radius-2xl)", boxShadow: "var(--shadow-sm)" }}>
        <table style={{ width: "100%", borderCollapse: "collapse", fontFamily: "var(--font-sans)", fontSize: 14 }}>
          <thead>
            <tr style={{ borderBottom: "1px solid var(--border-divider)", textAlign: "left" }}>
              <th style={{ padding: "12px 14px", color: "var(--text-tertiary)", fontWeight: 600, whiteSpace: "nowrap" }}>제출일시</th>
              <th style={{ padding: "12px 14px", color: "var(--text-tertiary)", fontWeight: 600, whiteSpace: "nowrap" }}>이름</th>
              <th style={{ padding: "12px 14px", color: "var(--text-tertiary)", fontWeight: 600, whiteSpace: "nowrap" }}>연락처</th>
              <th style={{ padding: "12px 14px", color: "var(--text-tertiary)", fontWeight: 600, whiteSpace: "nowrap" }}>소속</th>
              {spaces.map((sp) => (
                <th key={sp.id} style={{ padding: "12px 14px", color: "var(--text-tertiary)", fontWeight: 600, minWidth: 130 }}>
                  {sp.name}
                  <span style={{ display: "block", fontSize: 10, fontWeight: 500, color: "var(--text-tertiary)", marginTop: 2 }}>필수 · 선택</span>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {rows.length === 0 ? (
              <tr>
                <td colSpan={4 + spaces.length} style={{ padding: 24, textAlign: "center", color: "var(--text-secondary)" }}>아직 신청 내역이 없습니다.</td>
              </tr>
            ) : pagedRows.map((row) => (
              <tr key={row.id || `${row.name}-${row.phone}`} style={{ borderBottom: "1px solid var(--border-divider)" }}>
                <td style={{ padding: "12px 14px", whiteSpace: "nowrap", verticalAlign: "top" }}>{window.formatSubmittedAt(row.submittedAt)}</td>
                <td style={{ padding: "12px 14px", verticalAlign: "top" }}>{row.name}</td>
                <td style={{ padding: "12px 14px", whiteSpace: "nowrap", verticalAlign: "top" }}>{window.formatPhone(row.phone)}</td>
                <td style={{ padding: "12px 14px", verticalAlign: "top" }}>{row.affiliation || "-"}</td>
                {spaces.map((sp) => (
                  <SpaceNamesCell key={sp.id} values={row.spaces && row.spaces[sp.id]} />
                ))}
              </tr>
            ))}
          </tbody>
        </table>
        {rows.length > 0 ? (
          <AdminPagination page={page} totalPages={totalPages} totalCount={rows.length} onPageChange={setPage} />
        ) : null}
      </div>
    </AdminShell>
  );
}

window.AdminShell = AdminShell;
window.AdminScreen = AdminScreen;
