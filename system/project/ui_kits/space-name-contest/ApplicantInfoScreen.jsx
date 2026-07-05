/* ApplicantInfoScreen — STEP 1: name + phone, with duplicate detection. */

function ApplicantInfoScreen({ name, phone, onNameChange, onPhoneChange, duplicate, onNext, onLookup }) {
  const { Button, Input, Notice, StepIndicator } = window.HarvestDesignSystem_eb006c;
  const canNext = name.trim().length > 0 && phone.trim().length >= 9;

  return (
    <div style={{ padding: "24px 26px 34px", display: "flex", flexDirection: "column", gap: 22 }}>
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
        <Input
          label="이름"
          leftIcon="user"
          placeholder="홍길동"
          value={name}
          onChange={(e) => onNameChange(e.target.value)}
          required
        />
        <Input
          label="연락처"
          leftIcon="phone"
          inputMode="numeric"
          placeholder="010-0000-0000"
          value={phone}
          onChange={(e) => onPhoneChange(e.target.value)}
          required
          error={duplicate ? "이미 신청하신 번호입니다." : undefined}
        />
      </div>

      {duplicate ? (
        <Notice
          tone="accent"
          title="이미 신청하신 분입니다"
          action={<Button variant="secondary" size="sm" leftIcon="check-check" onClick={onLookup}>내용 확인하기</Button>}
        >
          같은 번호로 접수된 내역이 있어요. 제출하신 이름을 확인하실 수 있어요.
        </Notice>
      ) : null}

      <div style={{ marginTop: "auto", paddingTop: 8 }}>
        <Button variant="primary" size="lg" fullWidth rightIcon="arrow-right" disabled={!canNext} onClick={onNext}>
          다음
        </Button>
      </div>
    </div>
  );
}

window.ApplicantInfoScreen = ApplicantInfoScreen;
