/* LookupScreen.jsx — P4 내 제출 내용 조회 (읽기 전용).
   ?name=&phone= 파라미터 → Supabase/local 저장 데이터 조회. */

function LookupScreen() {
  const { Button, Icon, Notice } = window.HarvestDesignSystem_eb006c;
  const spaces = window.CONTEST_SPACES;

  const params = new URLSearchParams(window.location.search);
  const nameParam = params.get("name");
  const phoneParam = params.get("phone");
  const hasParams = Boolean(nameParam && phoneParam);

  const [loading, setLoading] = React.useState(hasParams);
  const [rec, setRec] = React.useState(null);
  const [notFound, setNotFound] = React.useState(false);
  const [loadError, setLoadError] = React.useState("");

  React.useEffect(() => {
    if (!hasParams) return undefined;
    let cancelled = false;
    (async () => {
      setLoading(true);
      setLoadError("");
      try {
        const data = await window.SNC.find(nameParam, phoneParam);
        if (cancelled) return;
        if (!data) {
          setNotFound(true);
          setRec(null);
        } else {
          setRec(data);
          setNotFound(false);
        }
      } catch (e) {
        if (!cancelled) setLoadError("조회 중 오류가 발생했습니다. 잠시 후 다시 시도해 주세요.");
      } finally {
        if (!cancelled) setLoading(false);
      }
    })();
    return () => { cancelled = true; };
  }, [hasParams, nameParam, phoneParam]);

  if (!hasParams) {
    return (
      <div style={{ flex: 1, display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center", textAlign: "center", padding: "40px 30px", gap: 20 }}>
        <span style={{ width: 76, height: 76, borderRadius: "var(--radius-full)", background: "var(--surface-wash)", color: "var(--accent)", display: "inline-flex", alignItems: "center", justifyContent: "center" }}>
          <Icon name="user" size={34} strokeWidth={1.75} />
        </span>
        <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
          <h2 style={{ margin: 0, fontFamily: "var(--font-sans)", fontSize: "var(--text-heading)", fontWeight: 600, letterSpacing: "0.015em", color: "var(--text-primary)" }}>
            이름과 연락처를 입력해 주세요
          </h2>
          <p style={{ margin: 0, fontFamily: "var(--font-sans)", fontSize: "var(--text-caption)", lineHeight: 1.6, letterSpacing: "0.015em", color: "var(--text-secondary)" }}>
            신청 내용 확인 페이지에서<br />참여 시 입력한 이름과 연락처로 조회할 수 있어요.
          </p>
        </div>
        <div style={{ width: "100%", maxWidth: 320, display: "flex", flexDirection: "column", gap: 10 }}>
          <Button variant="primary" size="md" fullWidth leftIcon="check-check" onClick={() => window.goPage("check")}>신청 내용 확인하기</Button>
          <Button variant="ghost" size="md" fullWidth onClick={() => window.goPage("intro")}>처음으로</Button>
        </div>
      </div>
    );
  }

  if (loading) {
    return (
      <div style={{ flex: 1, display: "flex", alignItems: "center", justifyContent: "center", padding: 40, fontFamily: "var(--font-sans)", color: "var(--text-secondary)" }}>
        조회 중…
      </div>
    );
  }

  if (loadError) {
    return (
      <div style={{ flex: 1, display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center", textAlign: "center", padding: "40px 30px", gap: 20 }}>
        <Notice tone="accent" icon="info">{loadError}</Notice>
        <Button variant="secondary" size="md" fullWidth leftIcon="check-check" onClick={() => window.goPage("check")}>다시 조회하기</Button>
      </div>
    );
  }

  if (notFound || !rec) {
    return (
      <div style={{ flex: 1, display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center", textAlign: "center", padding: "40px 30px", gap: 20 }}>
        <span style={{ width: 76, height: 76, borderRadius: "var(--radius-full)", background: "var(--surface-wash)", color: "var(--accent)", display: "inline-flex", alignItems: "center", justifyContent: "center" }}>
          <Icon name="info" size={38} strokeWidth={1.75} />
        </span>
        <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
          <h2 style={{ margin: 0, fontFamily: "var(--font-sans)", fontSize: "var(--text-heading)", fontWeight: 600, letterSpacing: "0.015em", color: "var(--text-primary)" }}>
            조회할 내용이 없습니다
          </h2>
          <p style={{ margin: 0, fontFamily: "var(--font-sans)", fontSize: "var(--text-caption)", lineHeight: 1.6, letterSpacing: "0.015em", color: "var(--text-secondary)" }}>
            입력하신 이름과 연락처가 모두 일치하는<br />신청 내역이 없어요. 다시 확인해 주세요.
          </p>
        </div>
        <div style={{ width: "100%", maxWidth: 320, display: "flex", flexDirection: "column", gap: 10 }}>
          <Button variant="primary" size="md" fullWidth rightIcon="arrow-right" onClick={() => window.goPage("apply")}>참여 시작하기</Button>
          <Button variant="secondary" size="md" fullWidth leftIcon="check-check" onClick={() => window.goPage("check")}>다시 조회하기</Button>
          <Button variant="ghost" size="md" fullWidth onClick={() => window.goPage("intro")}>처음으로</Button>
        </div>
      </div>
    );
  }

  const submittedAt = window.formatSubmittedAt(rec.submittedAt);

  return (
    <div style={{ display: "flex", flexDirection: "column", flex: 1 }}>
      <div style={{ padding: "24px 26px 4px", display: "flex", flexDirection: "column", gap: 16 }}>
        <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
          <h2 style={{ margin: 0, fontFamily: "var(--font-sans)", fontSize: "var(--text-heading-lg)", fontWeight: 600, letterSpacing: "0.015em", color: "var(--text-primary)" }}>
            제출하신 내용
          </h2>
          <p style={{ margin: 0, fontFamily: "var(--font-sans)", fontSize: "var(--text-caption)", letterSpacing: "0.015em", color: "var(--text-secondary)" }}>
            읽기 전용 · 제출은 최종 완료되었습니다.
          </p>
        </div>

        <div style={{ background: "var(--surface-card)", borderRadius: "var(--radius-2xl)", padding: "14px 18px", boxShadow: "var(--shadow-sm)", display: "flex", flexDirection: "column", gap: 12 }}>
          <div style={{ display: "flex", gap: 18 }}>
            <SummaryItem icon="user" label="이름" value={rec.name} />
            <div style={{ width: 1, background: "var(--border-divider)" }}></div>
            <SummaryItem icon="phone" label="연락처" value={window.formatPhone(rec.phone)} />
          </div>
          {rec.affiliation ? (
            <div style={{ paddingTop: 10, borderTop: "1px solid var(--border-divider)" }}>
              <SummaryItem icon="users" label="소속" value={rec.affiliation} />
            </div>
          ) : null}
          {submittedAt ? (
            <div style={{ display: "flex", alignItems: "center", gap: 6, paddingTop: 10, borderTop: "1px solid var(--border-divider)", fontFamily: "var(--font-sans)", fontSize: 12, letterSpacing: "0.015em", color: "var(--text-tertiary)" }}>
              <Icon name="clock" size={13} /> 제출 일시 · {submittedAt}
            </div>
          ) : null}
        </div>
      </div>

      <div style={{ padding: "16px 26px 8px", display: "flex", flexDirection: "column", gap: 16 }}>
        {spaces.map((sp) => (
          <SpaceCard key={sp.id} space={sp} values={rec.spaces[sp.id]} readOnly />
        ))}
      </div>

      <div style={{ padding: "8px 26px 34px", display: "flex", flexDirection: "column", gap: 14 }}>
        <Notice tone="info" icon="lock">제출 내용은 읽기 전용이며, 웹에서 직접 수정할 수 없습니다.</Notice>
        <Button variant="secondary" size="md" fullWidth leftIcon="check-check" onClick={() => window.goPage("check")}>
          다시 조회하기
        </Button>
        <Button variant="ghost" size="md" fullWidth leftIcon="arrow-left" onClick={() => window.goPage("intro")}>
          처음으로
        </Button>
      </div>
    </div>
  );
}

function SummaryItem({ icon, label, value }) {
  const { Icon } = window.HarvestDesignSystem_eb006c;
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 3, flex: 1, minWidth: 0 }}>
      <span style={{ display: "inline-flex", alignItems: "center", gap: 6, fontFamily: "var(--font-sans)", fontSize: 11, fontWeight: 600, letterSpacing: "0.06em", textTransform: "uppercase", color: "var(--text-tertiary)" }}>
        <Icon name={icon} size={13} /> {label}
      </span>
      <span style={{ fontFamily: "var(--font-sans)", fontSize: "var(--text-body)", fontWeight: 500, letterSpacing: "0.015em", color: "var(--text-primary)", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{value}</span>
    </div>
  );
}

window.LookupScreen = LookupScreen;
