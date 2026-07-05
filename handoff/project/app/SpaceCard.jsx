/* SpaceCard.jsx — 공간 1곳의 제출 블록.
   layout: "image-top" | "compact" | "thumb"  (P2 이름 제출 화면의 3가지 변형)
   readOnly=true 이면 조회(P4) 읽기 전용으로 렌더링. */

function SpaceImage({ space, height, radius }) {
  return (
    <div style={{ position: "relative" }}>
      <img
        src={space.image}
        alt={space.name}
        style={{ display: "block", width: "100%", height, objectFit: "cover", borderRadius: radius || 0 }}
      />
      <span
        style={{
          position: "absolute",
          top: 10,
          left: 10,
          display: "inline-flex",
          alignItems: "center",
          gap: 4,
          padding: "3px 9px",
          borderRadius: "var(--radius-full)",
          background: "rgba(29, 30, 28, 0.55)",
          color: "#fff",
          fontFamily: "var(--font-sans)",
          fontSize: 11,
          fontWeight: 600,
          letterSpacing: "0.02em",
          backdropFilter: "blur(2px)",
        }}
      >
        예시 이미지
      </span>
    </div>
  );
}

function SpaceHeader({ space, badge }) {
  const { Tag, Icon } = window.HarvestDesignSystem_eb006c;
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
      <div style={{ display: "flex", alignItems: "center", gap: 8, flexWrap: "wrap" }}>
        {badge ? (
          <span style={{ width: 30, height: 30, flex: "0 0 auto", borderRadius: "var(--radius-full)", background: "var(--surface-wash)", color: "var(--accent)", display: "inline-flex", alignItems: "center", justifyContent: "center" }}>
            <Icon name={space.icon} size={17} strokeWidth={1.9} />
          </span>
        ) : (
          <span style={{ color: "var(--accent)", fontFamily: "var(--font-sans)", fontWeight: 700, fontSize: 15 }}>{space.order}</span>
        )}
        <h3 style={{ margin: 0, fontFamily: "var(--font-sans)", fontSize: "var(--text-heading-sm)", fontWeight: 600, letterSpacing: "0.015em", color: "var(--text-primary)" }}>
          {space.name}
        </h3>
        <Tag tone="neutral" size="sm">{space.tagline}</Tag>
      </div>
      <p style={{ margin: 0, fontFamily: "var(--font-sans)", fontSize: "var(--text-caption)", lineHeight: 1.5, letterSpacing: "0.015em", color: "var(--text-secondary)" }}>
        {space.description}
      </p>
    </div>
  );
}

function LabelWithTag({ text, tag, tone }) {
  const { Tag } = window.HarvestDesignSystem_eb006c;
  return (
    <span style={{ display: "inline-flex", alignItems: "center", gap: 8 }}>
      {text}
      <Tag tone={tone} size="sm">{tag}</Tag>
    </span>
  );
}

function ReadRow({ tag, value, tone }) {
  const { Tag } = window.HarvestDesignSystem_eb006c;
  const has = value && value.trim().length > 0;
  return (
    <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
      <Tag tone={tone} size="sm">{tag}</Tag>
      <span style={{ fontFamily: "var(--font-sans)", fontSize: "var(--text-body)", letterSpacing: "0.015em", color: has ? "var(--text-primary)" : "var(--text-disabled)" }}>
        {has ? value : "제안 없음"}
      </span>
    </div>
  );
}

function SpaceCard({ space, values, onChange, layout = "image-top", readOnly = false, errors }) {
  const { Input } = window.HarvestDesignSystem_eb006c;
  const IN = window.SNC_INPUT;
  const v = values || { required: "", optional: "" };
  const err = errors || {};

  const cardStyle = {
    background: "var(--surface-card)",
    borderRadius: "var(--radius-cards)",
    boxShadow: "var(--shadow-lg)",
    overflow: "hidden",
  };

  const inputs = (
    <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
      <Input
        label={<LabelWithTag text="제안하는 이름" tag="필수" tone="accent" />}
        placeholder={IN.requiredPlaceholder}
        value={v.required}
        onChange={(e) => onChange({ ...v, required: e.target.value })}
        error={err.required}
        maxLength={30}
      />
      <Input
        label={<LabelWithTag text="하나 더 제안" tag="선택" tone="neutral" />}
        placeholder={IN.optionalPlaceholder}
        value={v.optional}
        onChange={(e) => onChange({ ...v, optional: e.target.value })}
        maxLength={30}
      />
    </div>
  );

  /* ---- 읽기 전용 (조회) ---- */
  if (readOnly) {
    return (
      <div style={cardStyle}>
        <div style={{ display: "flex", gap: 14, padding: "16px 18px 14px", alignItems: "center" }}>
          <img src={space.image} alt={space.name} style={{ width: 64, height: 64, flex: "0 0 auto", borderRadius: "var(--radius-images)", objectFit: "cover" }} />
          <SpaceHeader space={space} />
        </div>
        <div style={{ padding: "0 18px 18px", display: "flex", flexDirection: "column", gap: 10 }}>
          <div style={{ height: 1, background: "var(--border-divider)" }}></div>
          <ReadRow tag="필수" value={v.required} tone="accent" />
          <ReadRow tag="선택" value={v.optional} tone="neutral" />
        </div>
      </div>
    );
  }

  /* ---- 컴팩트 (이미지 없음) ---- */
  if (layout === "compact") {
    return (
      <div style={cardStyle}>
        <div style={{ padding: "20px 22px 22px", display: "flex", flexDirection: "column", gap: 16 }}>
          <SpaceHeader space={space} badge />
          {inputs}
        </div>
      </div>
    );
  }

  /* ---- 썸네일 (이미지 좌측 소형) ---- */
  if (layout === "thumb") {
    return (
      <div style={cardStyle}>
        <div style={{ padding: "18px 20px 20px", display: "flex", flexDirection: "column", gap: 16 }}>
          <div style={{ display: "flex", gap: 14, alignItems: "center" }}>
            <img src={space.image} alt={space.name} style={{ width: 84, height: 84, flex: "0 0 auto", borderRadius: "var(--radius-images)", objectFit: "cover" }} />
            <SpaceHeader space={space} />
          </div>
          {inputs}
        </div>
      </div>
    );
  }

  /* ---- 기본: 이미지 상단 ---- */
  return (
    <div style={cardStyle}>
      <SpaceImage space={space} height={168} />
      <div style={{ padding: "20px 22px 22px", display: "flex", flexDirection: "column", gap: 14 }}>
        <SpaceHeader space={space} />
        {inputs}
      </div>
    </div>
  );
}

window.SpaceCard = SpaceCard;
