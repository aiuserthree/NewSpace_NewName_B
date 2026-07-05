/* IntroScreen — landing: hero, how-to-participate, the three spaces, start CTA. */

function IntroScreen({ onStart }) {
  const { Button, HeroWash, Icon } = window.HarvestDesignSystem_eb006c;
  const spaces = window.CONTEST_SPACES;

  const steps = [
    { icon: "user", text: "이름과 연락처를 입력해요" },
    { icon: "pencil", text: "세 공간의 이름을 제안해요" },
    { icon: "vote", text: "상위 후보는 현장 투표로 결정돼요" },
  ];

  return (
    <div style={{ display: "flex", flexDirection: "column" }}>
      {/* Hero */}
      <section style={{ position: "relative", overflow: "hidden", padding: "44px 26px 40px", textAlign: "center" }}>
        <HeroWash intensity={1} />
        <div style={{ position: "relative", zIndex: 1, display: "flex", flexDirection: "column", alignItems: "center", gap: 16 }}>
          <span style={{ fontFamily: "var(--font-sans)", fontSize: 13, fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.12em", color: "var(--accent)" }}>
            우리 교회 공간 이름 공모
          </span>
          <h1 style={{ margin: 0, fontFamily: "var(--font-serif-display)", fontWeight: 400, fontSize: 40, lineHeight: 1.2, color: "var(--text-primary)" }}>
            우리 공간의 이름을<br />함께 지어주세요
          </h1>
          <p style={{ margin: 0, maxWidth: 320, fontFamily: "var(--font-sans)", fontSize: "var(--text-body)", lineHeight: 1.6, letterSpacing: "0.015em", color: "var(--text-secondary)" }}>
            새로 짓고 단장하는 세 공간의 이름을 교인 여러분의 마음으로 제안해 주세요.
          </p>
        </div>
      </section>

      {/* How to participate */}
      <section style={{ padding: "8px 26px 28px", display: "flex", flexDirection: "column", gap: 14 }}>
        {steps.map((s, i) => (
          <div key={i} style={{ display: "flex", alignItems: "center", gap: 14 }}>
            <span style={{ width: 40, height: 40, flex: "0 0 auto", borderRadius: "var(--radius-full)", background: "var(--surface-wash)", color: "var(--accent)", display: "inline-flex", alignItems: "center", justifyContent: "center" }}>
              <Icon name={s.icon} size={20} />
            </span>
            <span style={{ fontFamily: "var(--font-sans)", fontSize: "var(--text-body)", letterSpacing: "0.015em", color: "var(--text-primary)" }}>
              <b style={{ color: "var(--accent)", fontWeight: 700, marginRight: 6 }}>{i + 1}</b>{s.text}
            </span>
          </div>
        ))}
      </section>

      {/* Spaces */}
      <section style={{ padding: "4px 26px 20px", display: "flex", flexDirection: "column", gap: 12 }}>
        <span style={{ fontFamily: "var(--font-sans)", fontSize: "var(--text-caption)", fontWeight: 600, letterSpacing: "0.015em", color: "var(--text-tertiary)" }}>
          공모 대상 공간 3곳
        </span>
        <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
          {spaces.map((sp) => (
            <div key={sp.id} style={{ display: "flex", alignItems: "center", gap: 12, background: "var(--surface-card)", borderRadius: "var(--radius-2xl)", padding: "12px 16px", boxShadow: "var(--shadow-sm)" }}>
              <span style={{ color: "var(--text-primary)", display: "inline-flex" }}><Icon name={sp.icon} size={22} strokeWidth={1.75} /></span>
              <div style={{ display: "flex", flexDirection: "column" }}>
                <span style={{ fontFamily: "var(--font-sans)", fontSize: "var(--text-body)", fontWeight: 600, letterSpacing: "0.015em", color: "var(--text-primary)" }}>{sp.order} {sp.name}</span>
                <span style={{ fontFamily: "var(--font-sans)", fontSize: 12, color: "var(--text-tertiary)" }}>{sp.tagline}</span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section style={{ padding: "12px 26px 34px", position: "sticky", bottom: 0, background: "linear-gradient(to top, var(--surface-page) 72%, rgba(255,248,241,0))" }}>
        <Button variant="primary" size="lg" fullWidth rightIcon="arrow-right" onClick={onStart}>
          참여 시작하기
        </Button>
      </section>
    </div>
  );
}

window.IntroScreen = IntroScreen;
