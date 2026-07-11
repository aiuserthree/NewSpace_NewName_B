/* IntroScreen.jsx — P0 인트로/랜딩.
   layout: "워시" | "이미지" | "오버레이"  (히어로 3가지 변형, Tweaks로 전환) */

function IntroScreen({ onStart, onCheck, layout = "워시" }) {
  const { Button, HeroWash, Icon, Tag } = window.HarvestDesignSystem_eb006c;
  const spaces = window.CONTEST_SPACES;
  const cfg = window.SNC_CONFIG;
  const heroImg = spaces[0].image;
  const [viewer, setViewer] = React.useState(null);

  const eyebrow = "영암교회 새 공간 이름 공모전";
  const headline = (
    <>
      {"새로운\u00A0공간의\u00A0이름을"}
      <br />
      {"함께\u00A0지어주세요"}
    </>
  );
  const heroTitleBase = {
    margin: 0,
    fontFamily: "var(--font-serif-display)",
    fontWeight: 400,
    lineHeight: 1.2,
    wordBreak: "keep-all",
  };
  const subtitle = (
    <>새로 짓고 단장하는 세 공간의 이름을<br />교인 여러분의 마음으로 제안해 주세요.</>
  );

  const steps = [
    { icon: "user", text: "이름·소속·연락처 입력" },
    { icon: "pencil", text: "세 공간의 이름 제안" },
    { icon: "vote", text: "상위 후보는 현장투표(7/19)로 최종 결정" },
  ];

  /* ---------- 히어로 변형 ---------- */
  let hero;
  if (layout === "이미지") {
    hero = (
      <section style={{ display: "flex", flexDirection: "column" }}>
        <div style={{ position: "relative" }}>
          <img src={heroImg} alt="본당 조감도" style={{ display: "block", width: "100%", height: 210, objectFit: "cover" }} />
          <span style={{ position: "absolute", top: 12, left: 12, padding: "3px 9px", borderRadius: "var(--radius-full)", background: "rgba(29,30,28,0.55)", color: "#fff", fontFamily: "var(--font-sans)", fontSize: 11, fontWeight: 600, backdropFilter: "blur(2px)" }}>예시 이미지</span>
          <div style={{ position: "absolute", left: 0, right: 0, bottom: 0, height: 60, background: "linear-gradient(to top, var(--surface-page), rgba(255,248,241,0))" }}></div>
        </div>
        <div style={{ padding: "6px 26px 22px", textAlign: "center", display: "flex", flexDirection: "column", alignItems: "center", gap: 14 }}>
          <span style={{ fontFamily: "var(--font-sans)", fontSize: 13, fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.12em", color: "var(--accent)" }}>{eyebrow}</span>
          <h1 style={{ ...heroTitleBase, fontSize: "clamp(22px, 6.7vw, 38px)", color: "var(--text-primary)" }}>{headline}</h1>
          <p style={{ margin: 0, maxWidth: 320, fontFamily: "var(--font-sans)", fontSize: "var(--text-body)", lineHeight: 1.6, letterSpacing: "0.015em", color: "var(--text-secondary)" }}>{subtitle}</p>
        </div>
      </section>
    );
  } else if (layout === "오버레이") {
    hero = (
      <section style={{ position: "relative" }}>
        <img src={heroImg} alt="본당 조감도" style={{ display: "block", width: "100%", height: 320, objectFit: "cover" }} />
        <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to top, rgba(29,30,28,0.72) 0%, rgba(29,30,28,0.28) 45%, rgba(29,30,28,0.05) 100%)" }}></div>
        <span style={{ position: "absolute", top: 14, left: 14, padding: "3px 9px", borderRadius: "var(--radius-full)", background: "rgba(29,30,28,0.5)", color: "#fff", fontFamily: "var(--font-sans)", fontSize: 11, fontWeight: 600, backdropFilter: "blur(2px)" }}>예시 이미지</span>
        <div style={{ position: "absolute", left: 0, right: 0, bottom: 0, padding: "0 26px 26px", display: "flex", flexDirection: "column", gap: 12 }}>
          <span style={{ fontFamily: "var(--font-sans)", fontSize: 12, fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.12em", color: "#ffd9be" }}>{eyebrow}</span>
          <h1 style={{ ...heroTitleBase, fontSize: "clamp(20px, 6.4vw, 36px)", color: "#fff" }}>{headline}</h1>
          <p style={{ margin: 0, maxWidth: 330, fontFamily: "var(--font-sans)", fontSize: "var(--text-caption)", lineHeight: 1.6, letterSpacing: "0.015em", color: "rgba(255,255,255,0.9)" }}>{subtitle}</p>
        </div>
      </section>
    );
  } else {
    hero = (
      <section style={{ position: "relative", overflow: "hidden", padding: "44px 26px 30px", textAlign: "center" }}>
        <HeroWash intensity={1} />
        <div style={{ position: "relative", zIndex: 1, display: "flex", flexDirection: "column", alignItems: "center", gap: 16 }}>
          <span style={{ fontFamily: "var(--font-sans)", fontSize: 13, fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.12em", color: "var(--accent)" }}>{eyebrow}</span>
          <h1 style={{ ...heroTitleBase, fontSize: "clamp(22px, 7vw, 40px)", color: "var(--text-primary)" }}>{headline}</h1>
          <p style={{ margin: 0, maxWidth: 320, fontFamily: "var(--font-sans)", fontSize: "var(--text-body)", lineHeight: 1.6, letterSpacing: "0.015em", color: "var(--text-secondary)" }}>{subtitle}</p>
        </div>
      </section>
    );
  }

  return (
    <div style={{ display: "flex", flexDirection: "column" }}>
      {hero}

      {/* 마감 안내 */}
      <div style={{ padding: "14px 26px 4px", display: "flex", justifyContent: "center" }}>
        <Tag tone="wash" icon="calendar">공모 마감 {cfg.deadlineShort}</Tag>
      </div>

      {/* 참여 방법 */}
      <section style={{ padding: "18px 26px 26px", display: "flex", flexDirection: "column", gap: 14 }}>
        <span style={{ fontFamily: "var(--font-sans)", fontSize: "var(--text-caption)", fontWeight: 600, letterSpacing: "0.015em", color: "var(--text-tertiary)" }}>참여 방법</span>
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

      {/* 대상 공간 */}
      <section style={{ padding: "4px 26px 20px", display: "flex", flexDirection: "column", gap: 12 }}>
        <span style={{ fontFamily: "var(--font-sans)", fontSize: "var(--text-caption)", fontWeight: 600, letterSpacing: "0.015em", color: "var(--text-tertiary)" }}>공모 대상 공간 3곳</span>
        <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
          {spaces.map((sp) => (
            <div key={sp.id} style={{ display: "flex", alignItems: "center", gap: 14, background: "var(--surface-card)", borderRadius: "var(--radius-2xl)", padding: "10px 14px", boxShadow: "var(--shadow-sm)" }}>
              <img src={sp.image} alt={sp.name} loading="lazy" decoding="async" style={{ width: 52, height: 52, flex: "0 0 auto", borderRadius: "var(--radius-2xl)", objectFit: "cover" }} />
              <span style={{ flex: 1, minWidth: 0, fontFamily: "var(--font-sans)", fontSize: "var(--text-body)", fontWeight: 600, letterSpacing: "0.015em", color: "var(--text-primary)" }}>{sp.order} {sp.name}</span>
              <button
                type="button"
                onClick={() => setViewer({ space: sp, index: 0 })}
                onMouseEnter={() => window.prefetchSpaceImage(sp)}
                onFocus={() => window.prefetchSpaceImage(sp)}
                onTouchStart={() => window.prefetchSpaceImage(sp)}
                style={{
                  flex: "0 0 auto",
                  padding: "5px 11px",
                  border: "1px solid rgba(250, 93, 0, 0.22)",
                  borderRadius: "var(--radius-full)",
                  background: "var(--surface-wash)",
                  fontFamily: "var(--font-sans)",
                  fontSize: 12,
                  fontWeight: 600,
                  letterSpacing: "0.02em",
                  color: "var(--accent)",
                  cursor: "pointer",
                  display: "inline-flex",
                  alignItems: "center",
                  gap: 5,
                }}
              >
                <Icon name={sp.icon} size={14} strokeWidth={2.2} />
                사진 보기
              </button>
            </div>
          ))}
        </div>
      </section>

      {viewer ? (
        <ImageLightbox
          images={window.getSpaceImages(viewer.space)}
          spaceName={viewer.space.name}
          initialIndex={viewer.index}
          onClose={() => setViewer(null)}
        />
      ) : null}

      {/* CTA */}
      <section style={{ padding: "12px 26px 34px", position: "sticky", bottom: 0, background: "linear-gradient(to top, var(--surface-page) 72%, rgba(255,248,241,0))" }}>
        <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
          <Button variant="primary" size="lg" fullWidth rightIcon="arrow-right" onClick={onStart}>
            참여 시작하기
          </Button>
          <Button variant="secondary" size="lg" fullWidth leftIcon="check-check" onClick={onCheck}>
            신청 내용 확인하기
          </Button>
        </div>
      </section>
    </div>
  );
}

window.IntroScreen = IntroScreen;
