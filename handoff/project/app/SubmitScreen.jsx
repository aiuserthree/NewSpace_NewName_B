/* SubmitScreen.jsx — P2 이름 아이디어 제출 (스크롤형 단일 페이지).
   세 공간의 이름을 한 화면에서 입력·제출. layout(Tweaks): "카드" | "컴팩트" | "썸네일". */

function SubmitScreen({ layout = "카드" }) {
  const { Button, StepIndicator, Icon } = window.HarvestDesignSystem_eb006c;
  const spaces = window.CONTEST_SPACES;
  const current = window.SNC.readCurrent() || {};
  const applicantName = current.name || "";

  const cardLayout = layout === "컴팩트" ? "compact" : layout === "썸네일" ? "thumb" : "image-top";

  const [names, setNames] = React.useState(() => {
    const init = {};
    spaces.forEach((s) => { init[s.id] = { required: "", optional: "" }; });
    return init;
  });
  const [errors, setErrors] = React.useState({});

  const filledRequired = spaces.filter((s) => names[s.id].required.trim().length > 0).length;
  const canSubmit = filledRequired === spaces.length;

  const onSubmit = () => {
    const errs = {};
    spaces.forEach((s) => {
      if (names[s.id].required.trim().length === 0) errs[s.id] = { required: "필수 이름을 입력해 주세요." };
    });
    if (Object.keys(errs).length) {
      setErrors(errs);
      return;
    }
    // 제출 직전 중복 재확인 (동시 제출 방지 — 시나리오 P2-S3)
    if (current.name && current.phone && window.SNC.exists(current.name, current.phone)) {
      window.goPage("lookup", window.SNC.lookupParams(current.name, current.phone));
      return;
    }
    const record = { name: applicantName, affiliation: current.affiliation || "", phone: window.SNC.digits(current.phone || ""), spaces: names };
    if (current.phone) window.SNC.saveSubmission(record);
    window.goPage("complete");
  };

  return (
    <div style={{ display: "flex", flexDirection: "column", flex: 1 }}>
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
            layout={cardLayout}
            values={names[sp.id]}
            errors={errors[sp.id]}
            onChange={(val) => {
              setNames((prev) => ({ ...prev, [sp.id]: val }));
              if (errors[sp.id] && val.required.trim().length > 0) {
                setErrors((prev) => ({ ...prev, [sp.id]: undefined }));
              }
            }}
          />
        ))}
      </div>

      <div style={{ padding: "10px 26px 34px", position: "sticky", bottom: 0, background: "linear-gradient(to top, var(--surface-page) 74%, rgba(255,248,241,0))" }}>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 6, marginBottom: 12, fontFamily: "var(--font-sans)", fontSize: 12, letterSpacing: "0.015em", color: canSubmit ? "var(--accent)" : "var(--text-tertiary)" }}>
          <Icon name={canSubmit ? "circle-check" : "info"} size={14} />
          필수 {filledRequired} / {spaces.length} 공간 작성됨
        </div>
        <Button variant="primary" size="lg" fullWidth disabled={!canSubmit} onClick={onSubmit}>
          제출하기
        </Button>
      </div>
    </div>
  );
}

window.SubmitScreen = SubmitScreen;
