/* NameSubmissionScreen — STEP 2: scroll of three SpaceCards, submit. */

function NameSubmissionScreen({ applicantName, onSubmit }) {
  const { Button, StepIndicator, Notice, Icon } = window.HarvestDesignSystem_eb006c;
  const spaces = window.CONTEST_SPACES;
  const [names, setNames] = React.useState(() => {
    const init = {};
    spaces.forEach((s) => { init[s.id] = { required: "", optional: "" }; });
    return init;
  });

  const filledRequired = spaces.filter((s) => names[s.id].required.trim().length > 0).length;
  const canSubmit = filledRequired === spaces.length;

  return (
    <div style={{ display: "flex", flexDirection: "column" }}>
      <div style={{ padding: "24px 26px 4px", display: "flex", flexDirection: "column", gap: 20 }}>
        <StepIndicator steps={["신청자 정보", "이름 제출"]} current={1} />
        <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
          <h2 style={{ margin: 0, fontFamily: "var(--font-sans)", fontSize: "var(--text-heading-lg)", fontWeight: 600, letterSpacing: "0.015em", color: "var(--text-primary)" }}>
            {applicantName ? `${applicantName}님, ` : ""}이름을<br />제안해 주세요
          </h2>
          <p style={{ margin: 0, fontFamily: "var(--font-sans)", fontSize: "var(--text-caption)", lineHeight: 1.5, letterSpacing: "0.015em", color: "var(--text-secondary)" }}>
            각 공간별 1개는 필수, 1개는 선택으로 제안할 수 있어요.
          </p>
        </div>
      </div>

      <div style={{ padding: "16px 26px 8px", display: "flex", flexDirection: "column", gap: 18 }}>
        {spaces.map((sp) => (
          <SpaceCard
            key={sp.id}
            space={sp}
            values={names[sp.id]}
            onChange={(val) => setNames((prev) => ({ ...prev, [sp.id]: val }))}
          />
        ))}
      </div>

      <div style={{ padding: "10px 26px 34px", position: "sticky", bottom: 0, background: "linear-gradient(to top, var(--surface-page) 74%, rgba(255,248,241,0))" }}>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 6, marginBottom: 12, fontFamily: "var(--font-sans)", fontSize: 12, color: canSubmit ? "var(--accent)" : "var(--text-tertiary)" }}>
          <Icon name={canSubmit ? "circle-check" : "info"} size={14} />
          필수 {filledRequired} / {spaces.length} 공간 작성됨
        </div>
        <Button variant="primary" size="lg" fullWidth disabled={!canSubmit} onClick={() => onSubmit(names)}>
          제출하기
        </Button>
      </div>
    </div>
  );
}

window.NameSubmissionScreen = NameSubmissionScreen;
