/* LookupScreen.jsx — P4 내 제출 내용 조회.
   ?name=&phone= 파라미터 → Supabase/local 저장 데이터 조회.
   마감 전: 수정 모드 지원. 마감 후: 읽기 전용. */

function EditConfirmModal({ open, onClose, onConfirm, names, spaces, applicant, busy }) {
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
      aria-labelledby="edit-confirm-title"
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
          <h3 id="edit-confirm-title" style={{ margin: 0, fontFamily: "var(--font-sans)", fontSize: "var(--text-heading)", fontWeight: 600, letterSpacing: "0.015em", color: "var(--text-primary)" }}>
            수정 내용 확인
          </h3>
          <p style={{ margin: "8px 0 0", fontFamily: "var(--font-sans)", fontSize: "var(--text-caption)", lineHeight: 1.6, letterSpacing: "0.015em", color: "var(--text-secondary)" }}>
            변경하신 내용이 맞는지 확인해 주세요.
          </p>
        </div>

        <div style={{ padding: "16px 22px", display: "flex", flexDirection: "column", gap: 14, maxHeight: "min(52vh, 420px)", overflowY: "auto" }}>
          <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
            <span style={{ fontFamily: "var(--font-sans)", fontSize: 11, fontWeight: 600, letterSpacing: "0.08em", textTransform: "uppercase", color: "var(--text-tertiary)" }}>
              신청자 정보
            </span>
            <div style={{ background: "var(--surface-card)", borderRadius: "var(--radius-xl)", padding: "12px 14px", boxShadow: "var(--shadow-sm)", display: "flex", flexDirection: "column", gap: 8 }}>
              <EditConfirmRow label="이름" value={applicantName} />
              <EditConfirmRow label="연락처" value={applicantPhone} />
              <EditConfirmRow label="소속" value={applicantAffiliation || "-"} />
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
            {window.SNC_CONFIG.deadlineShort}까지 다시 수정할 수 있어요.
          </p>
          <div style={{ display: "flex", gap: 10 }}>
            <Button variant="secondary" size="lg" fullWidth disabled={busy} onClick={onClose}>
              취소
            </Button>
            <Button variant="primary" size="lg" fullWidth disabled={busy} onClick={onConfirm}>
              {busy ? "저장 중…" : "저장하기"}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}

function EditConfirmRow({ label, value }) {
  return (
    <div style={{ display: "flex", gap: 10, fontFamily: "var(--font-sans)", fontSize: 13 }}>
      <span style={{ flex: "0 0 52px", color: "var(--text-tertiary)", fontWeight: 600 }}>{label}</span>
      <span style={{ color: "var(--text-primary)", wordBreak: "break-word" }}>{value || "-"}</span>
    </div>
  );
}

function cloneSpaces(spaces, source) {
  const next = {};
  spaces.forEach((sp) => {
    const v = (source && source[sp.id]) || {};
    next[sp.id] = {
      required: v.required || "",
      optional: v.optional || "",
    };
  });
  return next;
}

function LookupScreen() {
  const { Button, Icon, Notice, Input } = window.HarvestDesignSystem_eb006c;
  const spaces = window.CONTEST_SPACES;
  const cfg = window.SNC_CONFIG;

  const params = new URLSearchParams(window.location.search);
  const nameParam = params.get("name");
  const phoneParam = params.get("phone");
  const autoEdit = params.get("edit") === "1";
  const hasParams = Boolean(nameParam && phoneParam);

  const [loading, setLoading] = React.useState(hasParams);
  const [rec, setRec] = React.useState(null);
  const [notFound, setNotFound] = React.useState(false);
  const [loadError, setLoadError] = React.useState("");
  const [editing, setEditing] = React.useState(false);
  const [editName, setEditName] = React.useState("");
  const [editPhone, setEditPhone] = React.useState("");
  const [editSpaces, setEditSpaces] = React.useState({});
  const [editAffiliation, setEditAffiliation] = React.useState("");
  const [editErrors, setEditErrors] = React.useState({});
  const [busy, setBusy] = React.useState(false);
  const [saveError, setSaveError] = React.useState("");
  const [saveSuccess, setSaveSuccess] = React.useState(false);
  const [showConfirm, setShowConfirm] = React.useState(false);
  const autoEditApplied = React.useRef(false);

  const canEdit = window.SNC.isBeforeDeadline();

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

  React.useEffect(() => {
    if (!rec || !canEdit || !autoEdit || autoEditApplied.current) return;
    autoEditApplied.current = true;
    setEditing(true);
    setEditName(rec.name || "");
    setEditPhone(rec.phone || "");
    setEditSpaces(cloneSpaces(spaces, rec.spaces));
    setEditAffiliation(rec.affiliation || "");
    setEditErrors({});
    setSaveError("");
    setSaveSuccess(false);
  }, [rec, canEdit, autoEdit]);

  const startEdit = () => {
    if (!rec || !canEdit) return;
    setEditing(true);
    setEditName(rec.name || "");
    setEditPhone(rec.phone || "");
    setEditSpaces(cloneSpaces(spaces, rec.spaces));
    setEditAffiliation(rec.affiliation || "");
    setEditErrors({});
    setSaveError("");
    setSaveSuccess(false);
  };

  const cancelEdit = () => {
    setEditing(false);
    setEditErrors({});
    setSaveError("");
    setShowConfirm(false);
  };

  const openConfirm = () => {
    setSaveError("");
    const errs = {};
    if (!editName.trim()) errs.name = "이름을 입력해 주세요.";
    const phoneValidation = window.validatePhone(editPhone);
    if (!phoneValidation.valid) errs.phone = phoneValidation.error;
    spaces.forEach((sp) => {
      if ((editSpaces[sp.id]?.required || "").trim().length === 0) {
        errs[sp.id] = { required: "필수 이름을 입력해 주세요." };
      }
    });
    if (Object.keys(errs).length) {
      setEditErrors(errs);
      return;
    }
    setShowConfirm(true);
  };

  const executeSave = async () => {
    if (!rec) return;
    setBusy(true);
    try {
      const updated = await window.SNC.updateSubmission({
        name: nameParam,
        phone: phoneParam,
        nameNew: editName.trim(),
        phoneNew: window.SNC.digits(editPhone),
        affiliation: editAffiliation,
        spaces: editSpaces,
      });
      setRec(updated);
      setEditing(false);
      setShowConfirm(false);
      setSaveSuccess(true);
      const nextParams = window.SNC.lookupParams(updated.name, updated.phone);
      const nextSearch = new URLSearchParams(nextParams).toString();
      const nextUrl = `${window.location.pathname}?${nextSearch}`;
      window.history.replaceState(null, "", nextUrl);
    } catch (e) {
      if (e && e.code === "DEADLINE_PASSED") {
        setSaveError(`공모 마감(${cfg.deadlineShort})이 지나 수정할 수 없습니다.`);
      } else if (e && e.code === "NOT_FOUND") {
        setSaveError("수정할 신청 내역을 찾을 수 없습니다. 다시 조회해 주세요.");
      } else if (e && e.code === "PHONE_DUPLICATE") {
        setSaveError("이미 다른 신청에 사용 중인 연락처입니다. 번호를 확인해 주세요.");
      } else if (e && e.code === "RPC_NOT_DEPLOYED") {
        setSaveError("서버에 수정 기능이 아직 설정되지 않았습니다. 담당자에게 문의해 주세요.");
        console.error("[LookupScreen] update_submission RPC not deployed — run handoff/supabase/update-submission.sql in Supabase SQL Editor", e.detail || e);
      } else {
        console.error("[LookupScreen] update failed", e);
        const detail = e && (e.message || e.detail) ? String(e.message || e.detail) : "";
        setSaveError(detail
          ? `저장 중 오류가 발생했습니다. (${detail})`
          : "저장 중 오류가 발생했습니다. 잠시 후 다시 시도해 주세요.");
      }
      setShowConfirm(false);
    } finally {
      setBusy(false);
    }
  };

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
  const filledRequired = spaces.filter((sp) => (editSpaces[sp.id]?.required || "").trim().length > 0).length;
  const canSave = filledRequired === spaces.length;

  return (
    <div style={{ display: "flex", flexDirection: "column", flex: 1 }}>
      <div style={{ padding: "24px 26px 4px", display: "flex", flexDirection: "column", gap: 16 }}>
        <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
          <h2 style={{ margin: 0, fontFamily: "var(--font-sans)", fontSize: "var(--text-heading-lg)", fontWeight: 600, letterSpacing: "0.015em", color: "var(--text-primary)" }}>
            {editing ? "제출 내용 수정" : "제출하신 내용"}
          </h2>
          <p style={{ margin: 0, fontFamily: "var(--font-sans)", fontSize: "var(--text-caption)", letterSpacing: "0.015em", color: "var(--text-secondary)" }}>
            {editing
              ? `공모 마감(${cfg.deadlineShort}) 전까지 수정할 수 있어요.`
              : canEdit
                ? `제출이 완료되었습니다. ${cfg.deadlineShort}까지 수정할 수 있어요.`
                : "읽기 전용 · 공모가 마감되어 수정할 수 없습니다."}
          </p>
        </div>

        {saveSuccess ? (
          <Notice tone="wash" icon="circle-check">수정 내용이 저장되었습니다.</Notice>
        ) : null}

        <div style={{ background: "var(--surface-card)", borderRadius: "var(--radius-2xl)", padding: "14px 18px", boxShadow: "var(--shadow-sm)", display: "flex", flexDirection: "column", gap: 12 }}>
          {editing ? (
            <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
              <Input
                label="이름"
                leftIcon="user"
                placeholder="홍길동"
                value={editName}
                onChange={(e) => {
                  setEditName(e.target.value);
                  setEditErrors((prev) => ({ ...prev, name: undefined }));
                }}
                required
                error={editErrors.name}
                autoComplete="name"
              />
              <Input
                label="연락처"
                leftIcon="phone"
                inputMode="numeric"
                placeholder="숫자만 입력해 주세요 (하이픈 - 제외)"
                value={editPhone}
                onChange={(e) => {
                  setEditPhone(window.normalizePhoneInput(e.target.value));
                  setEditErrors((prev) => ({ ...prev, phone: undefined }));
                }}
                required
                error={editErrors.phone}
                autoComplete="tel"
              />
              <Input
                label="소속"
                leftIcon="users"
                placeholder="예) 청년부, 주일학교"
                value={editAffiliation}
                onChange={(e) => setEditAffiliation(e.target.value)}
                helper="선택 입력"
              />
            </div>
          ) : (
            <>
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
            </>
          )}
          {submittedAt ? (
            <div style={{ display: "flex", alignItems: "center", gap: 6, paddingTop: 10, borderTop: "1px solid var(--border-divider)", fontFamily: "var(--font-sans)", fontSize: 12, letterSpacing: "0.015em", color: "var(--text-tertiary)" }}>
              <Icon name="clock" size={13} /> 제출 일시 · {submittedAt}
            </div>
          ) : null}
        </div>
      </div>

      <div style={{ padding: "16px 26px 8px", display: "flex", flexDirection: "column", gap: 16 }}>
        {spaces.map((sp) => (
          editing ? (
            <SpaceCard
              key={sp.id}
              space={sp}
              values={editSpaces[sp.id]}
              errors={editErrors[sp.id]}
              onChange={(val) => {
                setEditSpaces((prev) => ({ ...prev, [sp.id]: val }));
                if (editErrors[sp.id] && val.required.trim().length > 0) {
                  setEditErrors((prev) => ({ ...prev, [sp.id]: undefined }));
                }
              }}
            />
          ) : (
            <SpaceCard key={sp.id} space={sp} values={rec.spaces[sp.id]} readOnly />
          )
        ))}
      </div>

      <div style={{ padding: "8px 26px 34px", display: "flex", flexDirection: "column", gap: 14 }}>
        {editing ? (
          <>
            {saveError ? (
              <p style={{ margin: 0, fontFamily: "var(--font-sans)", fontSize: 12, color: "var(--accent)", textAlign: "center" }}>{saveError}</p>
            ) : null}
            <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 6, fontFamily: "var(--font-sans)", fontSize: 12, letterSpacing: "0.015em", color: canSave ? "var(--accent)" : "var(--text-tertiary)" }}>
              <Icon name={canSave ? "circle-check" : "info"} size={14} />
              필수 {filledRequired} / {spaces.length} 공간 작성됨
            </div>
            <Button variant="primary" size="lg" fullWidth disabled={!canSave || busy} onClick={openConfirm}>
              {busy ? "저장 중…" : "수정 저장하기"}
            </Button>
            <Button variant="secondary" size="md" fullWidth disabled={busy} onClick={cancelEdit}>
              취소
            </Button>
          </>
        ) : (
          <>
            {canEdit ? (
              <Notice tone="info" icon="info">
                공모 마감({cfg.deadlineShort}) 전까지 이름·연락처·소속·제안 이름을 수정할 수 있습니다.
              </Notice>
            ) : (
              <Notice tone="info" icon="lock">공모가 마감되어 제출 내용을 수정할 수 없습니다.</Notice>
            )}
            {canEdit ? (
              <Button variant="primary" size="md" fullWidth leftIcon="pencil" onClick={startEdit}>
                수정하기
              </Button>
            ) : null}
            <Button variant="secondary" size="md" fullWidth leftIcon="check-check" onClick={() => window.goPage("check")}>
              다시 조회하기
            </Button>
            <Button variant="ghost" size="md" fullWidth leftIcon="arrow-left" onClick={() => window.goPage("intro")}>
              처음으로
            </Button>
          </>
        )}
      </div>

      <EditConfirmModal
        open={showConfirm}
        onClose={() => setShowConfirm(false)}
        onConfirm={executeSave}
        names={editSpaces}
        spaces={spaces}
        applicant={{
          name: editName.trim(),
          phone: window.SNC.digits(editPhone),
          affiliation: editAffiliation,
        }}
        busy={busy}
      />
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
