/* Shell — mobile web frame for the 공간 이름 공모전 flow.
   The contest link is sent via a KakaoTalk channel, so every screen is a
   single mobile column on the cream canvas. Also defines shared contest data. */

window.CONTEST_SPACES = [
  {
    id: "bondang",
    order: "①",
    name: "본당",
    tagline: "신축 · 조감도 제공",
    description: "새로 짓는 본당의 이름을 조감도를 보며 함께 상상해 주세요.",
    placeholder: "본당 조감도를 올려주세요",
    icon: "church",
  },
  {
    id: "soyebae",
    order: "②",
    name: "소예배실",
    tagline: "사진 제공",
    description: "청년과 청소년을 위한 액티브한 공간입니다.",
    placeholder: "소예배실 사진을 올려주세요",
    icon: "heart",
  },
  {
    id: "saega",
    order: "③",
    name: "새가족부실",
    tagline: "사진 제공",
    description: "새가족을 처음 맞이하는 따뜻한 공간입니다.",
    placeholder: "새가족부실 사진을 올려주세요",
    icon: "users",
  },
];

function Shell({ children, onHome }) {
  const { Icon } = window.HarvestDesignSystem_eb006c;
  return (
    <div style={{ minHeight: "100vh", background: "var(--surface-page)", display: "flex", justifyContent: "center" }}>
      <div
        style={{
          width: "100%",
          maxWidth: 430,
          minHeight: "100vh",
          background: "var(--surface-page)",
          display: "flex",
          flexDirection: "column",
          position: "relative",
          boxShadow: "0 0 80px rgba(227, 214, 197, 0.45)",
        }}
      >
        <header
          style={{
            height: 54,
            flex: "0 0 auto",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: 8,
            borderBottom: "1px solid var(--border-divider)",
            background: "var(--surface-page)",
            position: "sticky",
            top: 0,
            zIndex: 10,
            cursor: onHome ? "pointer" : "default",
          }}
          onClick={onHome}
        >
          <span style={{ color: "var(--accent)", display: "inline-flex" }}>
            <Icon name="church" size={19} />
          </span>
          <span style={{ fontFamily: "var(--font-sans)", fontSize: 15, fontWeight: 600, letterSpacing: "0.015em", color: "var(--text-primary)" }}>
            공간 이름 공모전
          </span>
        </header>
        <main style={{ flex: "1 1 auto", display: "flex", flexDirection: "column" }}>{children}</main>
      </div>
    </div>
  );
}

window.Shell = Shell;
