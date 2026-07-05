/* InfoScreen.jsx — P1 신청자 정보 입력.
   이름·소속·연락처 입력 → 검증 → 번호 기준 신규/기존 판별.
   신규: current 저장 후 P2. 기존(데모 010-0000-0000 또는 기제출): 중복 안내 + P4. */

function PrivacyTermsModal({ open, onClose }) {
  const { Button, Icon } = window.HarvestDesignSystem_eb006c;
  const terms = window.SNC_CONFIG.privacyTerms;

  React.useEffect(() => {
    if (!open) return undefined;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const onKey = (e) => { if (e.key === "Escape") onClose(); };
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = prev;
      window.removeEventListener("keydown", onKey);
    };
  }, [open, onClose]);

  if (!open) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="privacy-terms-title"
      onClick={onClose}
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 100,
        background: "rgba(44, 36, 28, 0.42)",
        display: "flex",
        alignItems: "flex-end",
        justifyContent: "center",
        padding: "0 0 max(0px, env(safe-area-inset-bottom))",
      }}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        style={{
          width: "100%",
          maxWidth: 430,
          maxHeight: "min(82vh, 640px)",
          background: "var(--surface-page)",
          borderRadius: "var(--radius-2xl) var(--radius-2xl) 0 0",
          boxShadow: "var(--shadow-lg)",
          display: "flex",
          flexDirection: "column",
          overflow: "hidden",
        }}
      >
        <div style={{ padding: "18px 22px 14px", borderBottom: "1px solid var(--border-divider)", display: "flex", alignItems: "center", justifyContent: "space-between", gap: 12 }}>
          <div style={{ display: "flex", flexDirection: "column", gap: 4, minWidth: 0 }}>
            <h3 id="privacy-terms-title" style={{ margin: 0, fontFamily: "var(--font-sans)", fontSize: "var(--text-heading)", fontWeight: 600, letterSpacing: "0.015em", color: "var(--text-primary)" }}>
              {terms.title}
            </h3>
            <span style={{ fontFamily: "var(--font-sans)", fontSize: 11, letterSpacing: "0.015em", color: "var(--text-tertiary)" }}>
              시행일 · {terms.updatedAt}
            </span>
          </div>
          <button
            type="button"
            aria-label="닫기"
            onClick={onClose}
            style={{
              width: 36,
              height: 36,
              border: "none",
              borderRadius: "var(--radius-full)",
              background: "var(--surface-wash)",
              color: "var(--text-secondary)",
              display: "inline-flex",
              alignItems: "center",
              justifyContent: "center",
              cursor: "pointer",
              flex: "0 0 auto",
            }}
          >
            <Icon name="x" size={18} />
          </button>
        </div>

        <div style={{ padding: "18px 22px 8px", overflowY: "auto", display: "flex", flexDirection: "column", gap: 18 }}>
          {terms.sections.map((section) => (
            <div key={section.heading} style={{ display: "flex", flexDirection: "column", gap: 6 }}>
              <h4 style={{ margin: 0, fontFamily: "var(--font-sans)", fontSize: "var(--text-caption)", fontWeight: 600, letterSpacing: "0.015em", color: "var(--text-primary)" }}>
                {section.heading}
              </h4>
              <p style={{ margin: 0, fontFamily: "var(--font-sans)", fontSize: "var(--text-caption)", lineHeight: 1.65, letterSpacing: "0.015em", color: "var(--text-secondary)" }}>
                {section.body}
              </p>
            </div>
          ))}
          {window.SNC_CONFIG.isTempPrivacy ? (
            <p style={{ margin: 0, fontFamily: "var(--font-sans)", fontSize: 11, lineHeight: 1.5, letterSpacing: "0.015em", color: "var(--text-tertiary)" }}>
              ※ 본 약관은 임시 문구이며, 확정 후 교체 예정입니다.
            </p>
          ) : null}
        </div>

        <div style={{ padding: "12px 22px 22px", borderTop: "1px solid var(--border-divider)" }}>
          <Button variant="primary" size="md" fullWidth onClick={onClose}>
            확인
          </Button>
        </div>
      </div>
    </div>
  );
}

function ConsentField({ checked, onChange, error, onViewTerms }) {
  const { Icon, TextLink } = window.HarvestDesignSystem_eb006c;
  const invalid = Boolean(error);

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
      <div
        style={{
          display: "flex",
          alignItems: "flex-start",
          gap: 12,
          padding: "14px 16px",
          borderRadius: "var(--radius-xl)",
          border: `1px solid ${invalid ? "var(--accent)" : "var(--border-input)"}`,
          background: checked ? "var(--surface-wash)" : "var(--surface-card)",
        }}
      >
        <button
          type="button"
          aria-pressed={checked}
          onClick={() => onChange(!checked)}
          style={{
            width: 22,
            height: 22,
            marginTop: 1,
            borderRadius: 6,
            border: checked ? "none" : "1.5px solid var(--border-input)",
            background: checked ? "var(--accent)" : "var(--surface-page)",
            color: "var(--surface-page)",
            display: "inline-flex",
            alignItems: "center",
            justifyContent: "center",
            cursor: "pointer",
            flex: "0 0 auto",
          }}
        >
          {checked ? <Icon name="check" size={14} strokeWidth={2.5} /> : null}
        </button>
        <div style={{ display: "flex", flexDirection: "column", gap: 8, minWidth: 0, flex: 1 }}>
          <button
            type="button"
            onClick={() => onChange(!checked)}
            style={{
              margin: 0,
              padding: 0,
              border: "none",
              background: "transparent",
              textAlign: "left",
              cursor: "pointer",
              fontFamily: "var(--font-sans)",
              fontSize: "var(--text-caption)",
              lineHeight: 1.55,
              letterSpacing: "0.015em",
              color: "var(--text-primary)",
            }}
          >
            개인정보 수집·이용에 동의합니다
            <span style={{ color: "var(--accent)" }}> (필수)</span>
          </button>
          <TextLink
            href="#"
            size="sm"
            withArrow={false}
            onClick={(e) => {
              e.preventDefault();
              onViewTerms();
            }}
            style={{ alignSelf: "flex-start", textDecoration: "underline", textUnderlineOffset: 3 }}
          >
            약관 보기
          </TextLink>
        </div>
      </div>
      {error ? (
        <span style={{ fontFamily: "var(--font-sans)", fontSize: 12, letterSpacing: "0.015em", color: "var(--accent)", paddingLeft: 2 }}>
          {error}
        </span>
      ) : null}
    </div>
  );
}

function InfoScreen() {
  const { Button, Input, Notice, StepIndicator } = window.HarvestDesignSystem_eb006c;

  const prev = window.SNC.readCurrent() || {};
  const [name, setName] = React.useState(prev.name || "");
  const [affiliation, setAffiliation] = React.useState(prev.affiliation || "");
  const [phone, setPhone] = React.useState(window.normalizePhoneInput(prev.phone || ""));
  const [consent, setConsent] = React.useState(false);
  const [showTerms, setShowTerms] = React.useState(false);
  const [errors, setErrors] = React.useState({});
  const [duplicate, setDuplicate] = React.useState(false);

  const phoneDigits = window.SNC.digits(phone);

  const buildErrors = React.useCallback(() => {
    const next = {};
    if (name.trim().length === 0) next.name = "이름을 입력해 주세요.";
    const phoneValidation = window.validatePhone(phone);
    if (!phoneValidation.valid) next.phone = phoneValidation.error;
    if (!consent) next.consent = "개인정보 수집·이용에 동의해 주세요.";
    return next;
  }, [name, phone, consent]);

  const onName = (e) => {
    setName(e.target.value);
    setErrors((x) => ({ ...x, name: undefined }));
    if (duplicate) setDuplicate(false);
  };
  const onAffiliation = (e) => {
    setAffiliation(e.target.value);
    setErrors((x) => ({ ...x, affiliation: undefined }));
    if (duplicate) setDuplicate(false);
  };
  const onPhone = (e) => {
    setPhone(window.normalizePhoneInput(e.target.value));
    setErrors((x) => ({ ...x, phone: undefined }));
    if (duplicate) setDuplicate(false);
  };
  const onConsent = (next) => {
    setConsent(next);
    setErrors((x) => ({ ...x, consent: undefined }));
  };

  const onNameBlur = () => {
    if (!name.trim()) {
      setErrors((x) => ({ ...x, name: "이름을 입력해 주세요." }));
    }
  };
  const onPhoneBlur = () => {
    const phoneValidation = window.validatePhone(phone);
    if (!phoneValidation.valid) {
      setErrors((x) => ({ ...x, phone: phoneValidation.error }));
    }
  };

  const onNext = () => {
    const next = buildErrors();
    if (Object.keys(next).length) {
      setErrors(next);
      return;
    }
    if (window.SNC.exists(name.trim(), phone)) {
      setDuplicate(true);
      return;
    }
    window.SNC.saveCurrent({ name: name.trim(), affiliation: affiliation.trim(), phone: phoneDigits });
    window.goPage("submit");
  };

  const openLookup = () => window.goPage("lookup", window.SNC.lookupParams(name, phone));

  return (
    <>
      <div style={{ padding: "24px 26px 34px", display: "flex", flexDirection: "column", gap: 22, flex: 1 }}>
        <StepIndicator steps={["신청자 정보", "이름 제출"]} current={0} />

        <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
          <h2 style={{ margin: 0, fontFamily: "var(--font-sans)", fontSize: "var(--text-heading-lg)", fontWeight: 600, letterSpacing: "0.015em", color: "var(--text-primary)" }}>
            신청자 정보를<br />입력해 주세요
          </h2>
          <p style={{ margin: 0, fontFamily: "var(--font-sans)", fontSize: "var(--text-caption)", lineHeight: 1.5, letterSpacing: "0.015em", color: "var(--text-secondary)" }}>
            이름과 연락처 조합으로 중복 신청을 확인해요.
          </p>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
          <Input label="이름" leftIcon="user" placeholder="홍길동" value={name} onChange={onName} onBlur={onNameBlur} required error={errors.name} autoComplete="name" />
          <Input label="소속" leftIcon="users" placeholder="예) 청년부, 주일학교" value={affiliation} onChange={onAffiliation} helper="선택 입력" autoComplete="organization" />
          <Input
            label="연락처"
            leftIcon="phone"
            inputMode="numeric"
            placeholder="숫자만 입력해 주세요 (하이픈 - 제외)"
            value={phone}
            onChange={onPhone}
            onBlur={onPhoneBlur}
            required
            error={errors.phone}
            autoComplete="tel"
            helper={!errors.phone && !duplicate ? "제출 후 이름과 이 번호로 신청 내용을 확인할 수 있어요." : undefined}
          />
        </div>

        {duplicate ? (
          <Notice
            tone="accent"
            title="이미 신청하신 분입니다"
            action={<Button variant="secondary" size="sm" leftIcon="check-check" onClick={openLookup}>내용 확인하기</Button>}
          >
            입력하신 이름과 연락처가 모두 일치하는 신청 내역이 있어요.
          </Notice>
        ) : null}

        <ConsentField
          checked={consent}
          onChange={onConsent}
          error={errors.consent}
          onViewTerms={() => setShowTerms(true)}
        />

        <div style={{ marginTop: "auto", paddingTop: 8 }}>
          <Button variant="primary" size="lg" fullWidth rightIcon="arrow-right" onClick={onNext}>
            다음
          </Button>
        </div>
      </div>

      <PrivacyTermsModal open={showTerms} onClose={() => setShowTerms(false)} />
    </>
  );
}

window.InfoScreen = InfoScreen;
