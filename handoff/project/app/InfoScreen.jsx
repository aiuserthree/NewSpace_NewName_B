/* InfoScreen.jsx — P1 신청자 정보 입력.
   이름·연락처 입력 → 검증 → 번호 기준 신규/기존 판별.
   신규: current 저장 후 P2. 기존(데모 010-0000-0000 또는 기제출): 중복 안내 + P4. */

function InfoScreen() {
  const { Button, Input, Notice, StepIndicator } = window.HarvestDesignSystem_eb006c;
  const cfg = window.SNC_CONFIG;

  const prev = window.SNC.readCurrent() || {};
  const [name, setName] = React.useState(prev.name || "");
  const [phone, setPhone] = React.useState(prev.phone || "");
  const [errors, setErrors] = React.useState({});
  const [duplicate, setDuplicate] = React.useState(false);

  const phoneDigits = window.SNC.digits(phone);
  const canNext = name.trim().length > 0 && phoneDigits.length >= 10;

  const onName = (e) => {
    setName(e.target.value);
    setErrors((x) => ({ ...x, name: undefined }));
    if (duplicate) setDuplicate(false);
  };
  const onPhone = (e) => {
    setPhone(window.formatPhone(e.target.value));
    setErrors((x) => ({ ...x, phone: undefined }));
    if (duplicate) setDuplicate(false);
  };

  const onNext = () => {
    const next = {};
    if (name.trim().length === 0) next.name = "이름을 입력해 주세요.";
    if (!window.isValidPhone(phone)) next.phone = "올바른 핸드폰 번호를 입력해 주세요.";
    if (Object.keys(next).length) {
      setErrors(next);
      return;
    }
    if (window.SNC.exists(phone)) {
      setDuplicate(true);
      return;
    }
    window.SNC.saveCurrent({ name: name.trim(), phone });
    window.goPage("submit");
  };

  const openLookup = () => window.goPage("lookup", { phone: phoneDigits });

  return (
    <div style={{ padding: "24px 26px 34px", display: "flex", flexDirection: "column", gap: 22, flex: 1 }}>
      <StepIndicator steps={["신청자 정보", "이름 제출"]} current={0} />

      <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
        <h2 style={{ margin: 0, fontFamily: "var(--font-sans)", fontSize: "var(--text-heading-lg)", fontWeight: 600, letterSpacing: "0.015em", color: "var(--text-primary)" }}>
          신청자 정보를<br />입력해 주세요
        </h2>
        <p style={{ margin: 0, fontFamily: "var(--font-sans)", fontSize: "var(--text-caption)", lineHeight: 1.5, letterSpacing: "0.015em", color: "var(--text-secondary)" }}>
          핸드폰 번호는 중복 신청 확인용으로만 사용돼요.
        </p>
      </div>

      <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
        <Input label="이름" leftIcon="user" placeholder="홍길동" value={name} onChange={onName} required error={errors.name} autoComplete="name" />
        <Input
          label="연락처"
          leftIcon="phone"
          inputMode="numeric"
          placeholder="010-0000-0000"
          value={phone}
          onChange={onPhone}
          required
          error={duplicate ? "이미 신청하신 번호입니다." : errors.phone}
          autoComplete="tel"
        />
      </div>

      {duplicate ? (
        <Notice
          tone="accent"
          title="이미 신청하신 분입니다"
          action={<Button variant="secondary" size="sm" leftIcon="check-check" onClick={openLookup}>내용 확인하기</Button>}
        >
          같은 번호로 접수된 내역이 있어요. 제출하신 이름을 확인하실 수 있어요.
        </Notice>
      ) : null}

      {/* 개인정보 안내 (임시 문구 — 확정 후 교체) */}
      <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
        <Notice tone="info" icon="lock" title="개인정보 수집·이용 안내">
          {cfg.privacyNotice}
        </Notice>
        <span style={{ fontFamily: "var(--font-sans)", fontSize: 11, letterSpacing: "0.015em", color: "var(--text-tertiary)", paddingLeft: 2 }}>
          ※ 안내 문구는 확정 후 교체 예정입니다.
        </span>
      </div>

      <div style={{ marginTop: "auto", paddingTop: 8 }}>
        <Button variant="primary" size="lg" fullWidth rightIcon="arrow-right" disabled={!canNext} onClick={onNext}>
          다음
        </Button>
      </div>
    </div>
  );
}

window.InfoScreen = InfoScreen;
