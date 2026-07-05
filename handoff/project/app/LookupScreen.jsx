/* LookupScreen.jsx — P4 내 제출 내용 조회 (읽기 전용).
   ?phone= 파라미터 → 저장 데이터 조회. 없으면 최근 제출/데모로 폴백.
   파라미터는 있으나 데이터 없음 → "조회할 내용이 없습니다" (시나리오 P4-S2). */

function LookupScreen() {
  const { Button, Icon, Notice } = window.HarvestDesignSystem_eb006c;
  const spaces = window.CONTEST_SPACES;

  const params = new URLSearchParams(window.location.search);
  const phoneParam = params.get("phone");
  let rec = null;
  let notFound = false;
  if (phoneParam) {
    rec = window.SNC.find(phoneParam);
    if (!rec) notFound = true;
  } else {
    rec = window.SNC.lastRecord() || window.SNC.DEMO_RECORD;
  }

  /* 조회 데이터 없음 */
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
            아직 접수된 신청 내역이 없어요.<br />공모에 참여해 이름을 제안해 주세요.
          </p>
        </div>
        <div style={{ width: "100%", maxWidth: 320, display: "flex", flexDirection: "column", gap: 10 }}>
          <Button variant="primary" size="md" fullWidth rightIcon="arrow-right" onClick={() => window.goPage("apply")}>참여 시작하기</Button>
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

        {/* 신청자 요약 */}
        <div style={{ background: "var(--surface-card)", borderRadius: "var(--radius-2xl)", padding: "14px 18px", boxShadow: "var(--shadow-sm)", display: "flex", flexDirection: "column", gap: 12 }}>
          <div style={{ display: "flex", gap: 18 }}>
            <SummaryItem icon="user" label="이름" value={rec.name} />
            <div style={{ width: 1, background: "var(--border-divider)" }}></div>
            <SummaryItem icon="phone" label="연락처" value={rec.phone} />
          </div>
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
        <Notice tone="info" icon="lock">제출 내용은 수정할 수 없습니다.</Notice>
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
