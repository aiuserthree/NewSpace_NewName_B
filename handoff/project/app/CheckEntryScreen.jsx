/* CheckEntryScreen.jsx — P5 신청 내용 확인하기 (조회 진입).
   이름 + 연락처 입력 → P4 조회. 안내·수정 문의는 이 페이지에 모음. */

function CheckEntryScreen() {
  const { Button, Input, Notice, Icon } = window.HarvestDesignSystem_eb006c;
  const cfg = window.SNC_CONFIG;

  const [name, setName] = React.useState("");
  const [phone, setPhone] = React.useState("");
  const [errors, setErrors] = React.useState({});

  const onName = (e) => {
    setName(e.target.value);
    setErrors((x) => ({ ...x, name: undefined }));
  };
  const onPhone = (e) => {
    setPhone(window.normalizePhoneInput(e.target.value));
    setErrors((x) => ({ ...x, phone: undefined }));
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

  const onLookup = () => {
    const next = {};
    if (!name.trim()) next.name = "이름을 입력해 주세요.";
    const phoneValidation = window.validatePhone(phone);
    if (!phoneValidation.valid) next.phone = phoneValidation.error;
    if (Object.keys(next).length) {
      setErrors(next);
      return;
    }
    window.goPage("lookup", window.SNC.lookupParams(name, phone));
  };

  return (
    <div style={{ padding: "24px 26px 34px", display: "flex", flexDirection: "column", gap: 22, flex: 1 }}>
      <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
        <span style={{ width: 56, height: 56, borderRadius: "var(--radius-full)", background: "var(--surface-wash)", color: "var(--accent)", display: "inline-flex", alignItems: "center", justifyContent: "center" }}>
          <Icon name="check-check" size={28} strokeWidth={1.75} />
        </span>
        <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
          <h2 style={{ margin: 0, fontFamily: "var(--font-sans)", fontSize: "var(--text-heading-lg)", fontWeight: 600, letterSpacing: "0.015em", color: "var(--text-primary)" }}>
            신청 내용 확인하기
          </h2>
          <p style={{ margin: 0, fontFamily: "var(--font-sans)", fontSize: "var(--text-caption)", lineHeight: 1.6, letterSpacing: "0.015em", color: "var(--text-secondary)" }}>
            {cfg.checkEntryGuide}
          </p>
        </div>
      </div>

      <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
        <Input label="이름" leftIcon="user" placeholder="홍길동" value={name} onChange={onName} onBlur={onNameBlur} required error={errors.name} autoComplete="name" />
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
        />
      </div>

      <Notice tone="info" icon="info" title="조회 안내">
        신청 시 입력한 이름과 연락처가 모두 일치해야 조회할 수 있어요. 제출 내용은 읽기 전용이며, 웹에서 직접 수정할 수 없습니다.
      </Notice>

      <PhoneCorrectionNotice />

      <div style={{ marginTop: "auto", paddingTop: 8, display: "flex", flexDirection: "column", gap: 10 }}>
        <Button variant="primary" size="lg" fullWidth leftIcon="check-check" onClick={onLookup}>
          내용 확인하기
        </Button>
        <Button variant="ghost" size="md" fullWidth leftIcon="arrow-left" onClick={() => window.goPage("intro")}>
          처음으로
        </Button>
      </div>
    </div>
  );
}

window.CheckEntryScreen = CheckEntryScreen;
