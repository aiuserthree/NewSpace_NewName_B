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
      <main style={{ maxWidth: 1100, margin: "0 auto", padding: "24px 20px 40px" }}>{children}</main>
    </div>
  );
}

function spaceSummary(spaces) {
  if (!spaces) return "-";
  return window.CONTEST_SPACES.map((sp) => {
    const v = spaces[sp.id];
    if (!v) return null;
    const parts = [v.required, v.optional].filter(Boolean).join(" / ");
    return `${sp.name}: ${parts}`;
  }).filter(Boolean).join(" · ");
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
  const [expanded, setExpanded] = React.useState(null);

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
            <h1 style={{ margin: "0 0 8px", fontFamily: "var(--font-sans)", fontSize: 24, fontWeight: 600, color: "var(--text-primary)" }}>관리자 로그인</h1>
            <p style={{ margin: 0, fontFamily: "var(--font-sans)", fontSize: "var(--text-caption)", color: "var(--text-secondary)", lineHeight: 1.6 }}>
              Supabase Auth 계정으로 로그인하세요. `admin_profiles`에 등록된 계정만 접근할 수 있습니다.
            </p>
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
        <div style={{ display: "flex", gap: 8 }}>
          <Button variant="secondary" size="sm" onClick={loadRows}>새로고침</Button>
          <Button variant="ghost" size="sm" onClick={onLogout}>로그아웃</Button>
        </div>
      </div>

      {listError ? <Notice tone="accent" icon="info">{listError}</Notice> : null}

      <div style={{ overflowX: "auto", background: "var(--surface-card)", borderRadius: "var(--radius-2xl)", boxShadow: "var(--shadow-sm)" }}>
        <table style={{ width: "100%", borderCollapse: "collapse", fontFamily: "var(--font-sans)", fontSize: 14 }}>
          <thead>
            <tr style={{ borderBottom: "1px solid var(--border-divider)", textAlign: "left" }}>
              <th style={{ padding: "12px 14px", color: "var(--text-tertiary)", fontWeight: 600 }}>제출일시</th>
              <th style={{ padding: "12px 14px", color: "var(--text-tertiary)", fontWeight: 600 }}>이름</th>
              <th style={{ padding: "12px 14px", color: "var(--text-tertiary)", fontWeight: 600 }}>연락처</th>
              <th style={{ padding: "12px 14px", color: "var(--text-tertiary)", fontWeight: 600 }}>소속</th>
              <th style={{ padding: "12px 14px", color: "var(--text-tertiary)", fontWeight: 600 }}>제안 요약</th>
            </tr>
          </thead>
          <tbody>
            {rows.length === 0 ? (
              <tr>
                <td colSpan={5} style={{ padding: 24, textAlign: "center", color: "var(--text-secondary)" }}>아직 신청 내역이 없습니다.</td>
              </tr>
            ) : rows.map((row) => (
              <React.Fragment key={row.id || `${row.name}-${row.phone}`}>
                <tr
                  style={{ borderBottom: "1px solid var(--border-divider)", cursor: "pointer", background: expanded === row.id ? "var(--surface-wash)" : "transparent" }}
                  onClick={() => setExpanded(expanded === row.id ? null : row.id)}
                >
                  <td style={{ padding: "12px 14px", whiteSpace: "nowrap" }}>{window.formatSubmittedAt(row.submittedAt)}</td>
                  <td style={{ padding: "12px 14px" }}>{row.name}</td>
                  <td style={{ padding: "12px 14px", whiteSpace: "nowrap" }}>{window.formatPhone(row.phone)}</td>
                  <td style={{ padding: "12px 14px" }}>{row.affiliation || "-"}</td>
                  <td style={{ padding: "12px 14px", color: "var(--text-secondary)", maxWidth: 280, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{spaceSummary(row.spaces)}</td>
                </tr>
                {expanded === row.id ? (
                  <tr>
                    <td colSpan={5} style={{ padding: "12px 14px 18px", background: "var(--surface-wash)" }}>
                      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", gap: 12 }}>
                        {spaces.map((sp) => {
                          const v = row.spaces && row.spaces[sp.id];
                          return (
                            <div key={sp.id} style={{ background: "var(--surface-card)", borderRadius: "var(--radius-xl)", padding: "12px 14px" }}>
                              <div style={{ fontWeight: 600, marginBottom: 6, color: "var(--text-primary)" }}>{sp.order} {sp.name}</div>
                              <div style={{ fontSize: 13, color: "var(--text-secondary)" }}>필수: {v && v.required ? v.required : "-"}</div>
                              <div style={{ fontSize: 13, color: "var(--text-secondary)" }}>선택: {v && v.optional ? v.optional : "-"}</div>
                            </div>
                          );
                        })}
                      </div>
                    </td>
                  </tr>
                ) : null}
              </React.Fragment>
            ))}
          </tbody>
        </table>
      </div>
    </AdminShell>
  );
}

window.AdminShell = AdminShell;
window.AdminScreen = AdminScreen;
