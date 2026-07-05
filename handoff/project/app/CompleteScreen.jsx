/* CompleteScreen.jsx — P3 제출 완료.
   완료 안내 + 후속(2차 현장 스티커 투표) 안내. 재제출 경로 미노출. */

function CompleteScreen() {
  const { Button, Icon, Tag } = window.HarvestDesignSystem_eb006c;
  const cfg = window.SNC_CONFIG;
  const rec = window.SNC.lastRecord();
  const name = rec && rec.name ? rec.name : "";
  const phoneDigits = rec ? window.SNC.digits(rec.phone) : "";

  return (
    <div style={{ flex: 1, display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center", textAlign: "center", padding: "40px 30px", gap: 22 }}>
      <span style={{ width: 88, height: 88, borderRadius: "var(--radius-full)", background: "var(--surface-wash)", color: "var(--accent)", display: "inline-flex", alignItems: "center", justifyContent: "center" }}>
        <Icon name="circle-check" size={46} strokeWidth={1.75} />
      </span>

      <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
        <h1 style={{ margin: 0, fontFamily: "var(--font-serif-display)", fontWeight: 400, fontSize: 34, lineHeight: 1.25, color: "var(--text-primary)" }}>
          제출이 완료되었습니다
        </h1>
        <p style={{ margin: 0, fontFamily: "var(--font-sans)", fontSize: "var(--text-body)", lineHeight: 1.6, letterSpacing: "0.015em", color: "var(--text-secondary)" }}>
          {name ? `${name}님, 참여해 주셔서 감사합니다!` : "참여해 주셔서 감사합니다!"}
        </p>
      </div>

      <div style={{ width: "100%", maxWidth: 340, background: "var(--surface-card)", borderRadius: "var(--radius-cards)", boxShadow: "var(--shadow-lg)", padding: "20px 22px", display: "flex", flexDirection: "column", gap: 12, alignItems: "center" }}>
        <Tag tone="wash" icon="calendar">다음 일정</Tag>
        <p style={{ margin: 0, fontFamily: "var(--font-sans)", fontSize: "var(--text-caption)", lineHeight: 1.6, letterSpacing: "0.015em", color: "var(--text-secondary)" }}>
          {cfg.voteNotice.split("현장 스티커 투표")[0]}
          <b style={{ color: "var(--text-primary)" }}>현장 스티커 투표</b>
          {cfg.voteNotice.split("현장 스티커 투표")[1]}
        </p>
      </div>

      <div style={{ width: "100%", maxWidth: 340, display: "flex", flexDirection: "column", gap: 10, marginTop: 6 }}>
        <Button variant="secondary" size="md" fullWidth leftIcon="check-check" onClick={() => window.goPage("lookup", phoneDigits ? { phone: phoneDigits } : undefined)}>
          내 제출 내용 보기
        </Button>
        <Button variant="ghost" size="md" fullWidth onClick={() => window.goPage("intro")}>
          처음으로
        </Button>
      </div>
    </div>
  );
}

window.CompleteScreen = CompleteScreen;
