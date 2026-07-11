/* SubmitScreen.jsx — P2 이름 아이디어 제출 (스크롤형 단일 페이지).
   세 공간의 이름을 한 화면에서 입력·제출. layout(Tweaks): "카드" | "컴팩트" | "썸네일". */

function ConfirmInfoRow({ label, value }) {
  return (
    <div style={{ display: "flex", gap: 10, fontFamily: "var(--font-sans)", fontSize: 13 }}>
      <span style={{ flex: "0 0 52px", color: "var(--text-tertiary)", fontWeight: 600 }}>{label}</span>
      <span style={{ color: "var(--text-primary)", wordBreak: "break-word" }}>{value || "-"}</span>
    </div>
  );
}

function SubmitConfirmModal({ open, onClose, onConfirm, names, spaces, applicant, busy }) {
  const { Button, Icon } = window.HarvestDesignSystem_eb006c;
  const applicantName = applicant.name || "";
  const applicantPhone = applicant.phone ? window.formatPhone(applicant.phone) : "-";
  const applicantAffiliation = (applicant.affiliation || "").trim();

  React.useEffect(() => {
    if (!open) return undefined;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const onKey = (e) => { if (e.key === "Escape" && !busy) onClose(); };
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = prev;
      window.removeEventListener("keydown", onKey);
    };
  }, [open, onClose, busy]);

  if (!open) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="submit-confirm-title"
      onClick={busy ? undefined : onClose}
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 100,
        background: "rgba(44, 36, 28, 0.42)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "20px",
      }}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        style={{
          width: "100%",
          maxWidth: 360,
          background: "var(--surface-page)",
          borderRadius: "var(--radius-2xl)",
          boxShadow: "var(--shadow-lg)",
          overflow: "hidden",
        }}
      >
        <div style={{ padding: "20px 22px 16px", borderBottom: "1px solid var(--border-divider)" }}>
          <h3 id="submit-confirm-title" style={{ margin: 0, fontFamily: "var(--font-sans)", fontSize: "var(--text-heading)", fontWeight: 600, letterSpacing: "0.015em", color: "var(--text-primary)" }}>
            제출 전 확인
          </h3>
          <p style={{ margin: "8px 0 0", fontFamily: "var(--font-sans)", fontSize: "var(--text-caption)", lineHeight: 1.6, letterSpacing: "0.015em", color: "var(--text-secondary)" }}>
            신청자 정보와 제안하신 이름이 맞는지 확인해 주세요.
          </p>
        </div>

        <div style={{ padding: "16px 22px", display: "flex", flexDirection: "column", gap: 14, maxHeight: "min(52vh, 420px)", overflowY: "auto" }}>
          <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
            <span style={{ fontFamily: "var(--font-sans)", fontSize: 11, fontWeight: 600, letterSpacing: "0.08em", textTransform: "uppercase", color: "var(--text-tertiary)" }}>
              신청자 정보
            </span>
            <div style={{ background: "var(--surface-card)", borderRadius: "var(--radius-xl)", padding: "12px 14px", boxShadow: "var(--shadow-sm)", display: "flex", flexDirection: "column", gap: 8 }}>
              <ConfirmInfoRow label="이름" value={applicantName} />
              <ConfirmInfoRow label="연락처" value={applicantPhone} />
              <ConfirmInfoRow label="소속" value={applicantAffiliation || "-"} />
            </div>
          </div>

          <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
            <span style={{ fontFamily: "var(--font-sans)", fontSize: 11, fontWeight: 600, letterSpacing: "0.08em", textTransform: "uppercase", color: "var(--text-tertiary)" }}>
              제안 이름
            </span>
            <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
          {spaces.map((sp) => {
            const v = names[sp.id] || {};
            const required = (v.required || "").trim();
            const optional = (v.optional || "").trim();
            return (
              <div key={sp.id} style={{ background: "var(--surface-card)", borderRadius: "var(--radius-xl)", padding: "12px 14px", boxShadow: "var(--shadow-sm)" }}>
                <div style={{ fontFamily: "var(--font-sans)", fontSize: "var(--text-caption)", fontWeight: 600, color: "var(--text-primary)", marginBottom: 8 }}>
                  {sp.order} {sp.name}
                </div>
                <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
                  <div style={{ display: "flex", gap: 8, fontFamily: "var(--font-sans)", fontSize: 13 }}>
                    <span style={{ flex: "0 0 auto", color: "var(--accent)", fontWeight: 600 }}>필수</span>
                    <span style={{ color: "var(--text-primary)", wordBreak: "break-word" }}>{required}</span>
                  </div>
                  {optional ? (
                    <div style={{ display: "flex", gap: 8, fontFamily: "var(--font-sans)", fontSize: 13 }}>
                      <span style={{ flex: "0 0 auto", color: "var(--text-tertiary)", fontWeight: 600 }}>선택</span>
                      <span style={{ color: "var(--text-secondary)", wordBreak: "break-word" }}>{optional}</span>
                    </div>
                  ) : null}
                </div>
              </div>
            );
          })}
            </div>
          </div>
        </div>

        <div style={{ padding: "12px 22px 20px", display: "flex", flexDirection: "column", gap: 12 }}>
          <p style={{ margin: 0, display: "flex", alignItems: "flex-start", gap: 6, fontFamily: "var(--font-sans)", fontSize: 12, lineHeight: 1.5, color: "var(--text-tertiary)" }}>
            <span style={{ color: "var(--accent)", display: "inline-flex", marginTop: 1 }}><Icon name="info" size={14} /></span>
            제출 후에는 웹에서 직접 수정할 수 없어요.
          </p>
          <div style={{ display: "flex", gap: 10 }}>
            <Button variant="secondary" size="lg" fullWidth disabled={busy} onClick={onClose}>
              취소
            </Button>
            <Button variant="primary" size="lg" fullWidth disabled={busy} onClick={onConfirm}>
              {busy ? "제출 중…" : "제출하기"}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}

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
  const [busy, setBusy] = React.useState(false);
  const [submitError, setSubmitError] = React.useState("");
  const [showConfirm, setShowConfirm] = React.useState(false);

  const filledRequired = spaces.filter((s) => names[s.id].required.trim().length > 0).length;
  const canSubmit = filledRequired === spaces.length;

  const openConfirm = () => {
    setSubmitError("");
    const errs = {};
    spaces.forEach((s) => {
      if (names[s.id].required.trim().length === 0) errs[s.id] = { required: "필수 이름을 입력해 주세요." };
    });
    if (Object.keys(errs).length) {
      setErrors(errs);
      return;
    }
    setShowConfirm(true);
  };

  const executeSubmit = async () => {
    setBusy(true);
    try {
      if (current.name && current.phone && await window.SNC.exists(current.name, current.phone)) {
        window.goPage("lookup", window.SNC.lookupParams(current.name, current.phone));
        return;
      }
      const record = {
        name: applicantName,
        affiliation: current.affiliation || "",
        phone: window.SNC.digits(current.phone || ""),
        spaces: names,
      };
      if (current.phone) await window.SNC.saveSubmission(record);
      window.goPage("complete");
    } catch (e) {
      if (e && e.code === "DUPLICATE") {
        window.goPage("lookup", window.SNC.lookupParams(current.name, current.phone));
        return;
      }
      console.error("[SubmitScreen] submit failed", e);
      setShowConfirm(false);
      setSubmitError("제출 중 오류가 발생했습니다. 잠시 후 다시 시도해 주세요.");
    } finally {
      setBusy(false);
    }
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
        {submitError ? (
          <p style={{ margin: "0 0 12px", fontFamily: "var(--font-sans)", fontSize: 12, color: "var(--accent)", textAlign: "center" }}>{submitError}</p>
        ) : null}
        <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 6, marginBottom: 12, fontFamily: "var(--font-sans)", fontSize: 12, letterSpacing: "0.015em", color: canSubmit ? "var(--accent)" : "var(--text-tertiary)" }}>
          <Icon name={canSubmit ? "circle-check" : "info"} size={14} />
          필수 {filledRequired} / {spaces.length} 공간 작성됨
        </div>
        <Button variant="primary" size="lg" fullWidth disabled={!canSubmit || busy} onClick={openConfirm}>
          {busy ? "제출 중…" : "제출하기"}
        </Button>
      </div>

      <SubmitConfirmModal
        open={showConfirm}
        onClose={() => setShowConfirm(false)}
        onConfirm={executeSubmit}
        names={names}
        spaces={spaces}
        applicant={{
          name: applicantName,
          phone: current.phone || "",
          affiliation: current.affiliation || "",
        }}
        busy={busy}
      />
    </div>
  );
}

window.SubmitScreen = SubmitScreen;
