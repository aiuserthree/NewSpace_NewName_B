/* SpaceCard.jsx — 공간 1곳의 제출 블록.
   layout: "image-top" | "compact" | "thumb"  (P2 이름 제출 화면의 3가지 변형)
   readOnly=true 이면 조회(P4) 읽기 전용으로 렌더링. */

function ImageLightbox({ images, spaceName, initialIndex, onClose }) {
  const { Icon } = window.HarvestDesignSystem_eb006c;
  const count = images.length;
  const hasMultiple = count > 1;
  const [index, setIndex] = React.useState(initialIndex || 0);
  const touchRef = React.useRef({ x: 0, y: 0, active: false });

  const go = React.useCallback((delta) => {
    setIndex((i) => (i + delta + count) % count);
  }, [count]);

  React.useEffect(() => {
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const onKey = (e) => {
      if (e.key === "Escape") onClose();
      if (hasMultiple && e.key === "ArrowLeft") go(-1);
      if (hasMultiple && e.key === "ArrowRight") go(1);
    };

    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = prevOverflow;
      window.removeEventListener("keydown", onKey);
    };
  }, [onClose, go, hasMultiple]);

  const onTouchStart = (e) => {
    touchRef.current = {
      x: e.touches[0].clientX,
      y: e.touches[0].clientY,
      active: true,
    };
  };

  const onTouchEnd = (e) => {
    if (!touchRef.current.active || !hasMultiple) return;
    const dx = e.changedTouches[0].clientX - touchRef.current.x;
    const dy = e.changedTouches[0].clientY - touchRef.current.y;
    if (Math.abs(dx) > Math.abs(dy) && Math.abs(dx) > 44) {
      go(dx > 0 ? -1 : 1);
    }
    touchRef.current.active = false;
  };

  const navBtnStyle = {
    position: "absolute",
    top: "50%",
    transform: "translateY(-50%)",
    width: 44,
    height: 44,
    border: "none",
    borderRadius: "var(--radius-full)",
    background: "rgba(255, 255, 255, 0.14)",
    color: "#fff",
    display: "inline-flex",
    alignItems: "center",
    justifyContent: "center",
    cursor: "pointer",
    backdropFilter: "blur(6px)",
    WebkitTapHighlightColor: "transparent",
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label={`${spaceName} 사진 보기`}
      onClick={onClose}
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 1000,
        background: "rgba(17, 17, 17, 0.92)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "20px 56px",
        boxSizing: "border-box",
        userSelect: "none",
      }}
    >
      <button
        type="button"
        aria-label="닫기"
        onClick={onClose}
        style={{
          position: "absolute",
          top: 16,
          right: 16,
          width: 40,
          height: 40,
          border: "none",
          borderRadius: "var(--radius-full)",
          background: "rgba(255, 255, 255, 0.12)",
          color: "#fff",
          display: "inline-flex",
          alignItems: "center",
          justifyContent: "center",
          cursor: "pointer",
        }}
      >
        <Icon name="x" size={20} />
      </button>

      {hasMultiple ? (
        <span
          style={{
            position: "absolute",
            top: 22,
            left: "50%",
            transform: "translateX(-50%)",
            fontFamily: "var(--font-sans)",
            fontSize: 13,
            fontWeight: 600,
            color: "rgba(255,255,255,0.85)",
            letterSpacing: "0.04em",
          }}
        >
          {index + 1} / {count}
        </span>
      ) : null}

      {hasMultiple ? (
        <button type="button" aria-label="이전 사진" onClick={(e) => { e.stopPropagation(); go(-1); }} style={{ ...navBtnStyle, position: "fixed", left: 12, zIndex: 1001 }}>
          <Icon name="arrow-left" size={22} />
        </button>
      ) : null}

      <div
        onClick={(e) => e.stopPropagation()}
        onTouchStart={onTouchStart}
        onTouchEnd={onTouchEnd}
        style={{
          position: "relative",
          width: "100%",
          maxWidth: 720,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <img
          src={images[index]}
          alt={`${spaceName} ${index + 1}`}
          draggable={false}
          style={{
            display: "block",
            maxWidth: "100%",
            maxHeight: "min(78vh, 720px)",
            width: "auto",
            height: "auto",
            objectFit: "contain",
            borderRadius: "var(--radius-xl)",
            boxShadow: "0 24px 64px rgba(0,0,0,0.35)",
          }}
        />
      </div>

      {hasMultiple ? (
        <button type="button" aria-label="다음 사진" onClick={(e) => { e.stopPropagation(); go(1); }} style={{ ...navBtnStyle, position: "fixed", right: 12, zIndex: 1001 }}>
          <Icon name="arrow-right" size={22} />
        </button>
      ) : null}

      <span
        style={{
          position: "absolute",
          bottom: 22,
          left: "50%",
          transform: "translateX(-50%)",
          fontFamily: "var(--font-sans)",
          fontSize: 13,
          color: "rgba(255,255,255,0.72)",
        }}
      >
        {spaceName}
        {hasMultiple ? " · 좌우로 밀어 다른 사진 보기" : ""}
      </span>
    </div>
  );
}

function SpaceImage({ space, height, radius, onOpen, showCount }) {
  const images = window.getSpaceImages(space);
  const src = images[0] || space.image;

  return (
    <div
      style={{ position: "relative", cursor: onOpen ? "pointer" : undefined }}
      onClick={onOpen}
      onKeyDown={onOpen ? (e) => { if (e.key === "Enter" || e.key === " ") { e.preventDefault(); onOpen(); } } : undefined}
      role={onOpen ? "button" : undefined}
      tabIndex={onOpen ? 0 : undefined}
      aria-label={onOpen ? `${space.name} 사진 크게 보기` : undefined}
    >
      <img
        src={src}
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
      {showCount && images.length > 1 ? (
        <span
          style={{
            position: "absolute",
            bottom: 10,
            right: 10,
            padding: "3px 9px",
            borderRadius: "var(--radius-full)",
            background: "rgba(29, 30, 28, 0.55)",
            color: "#fff",
            fontFamily: "var(--font-sans)",
            fontSize: 11,
            fontWeight: 600,
            backdropFilter: "blur(2px)",
          }}
        >
          {images.length}장
        </span>
      ) : null}
    </div>
  );
}

function ClickableThumb({ space, onOpen }) {
  const images = window.getSpaceImages(space);
  const src = images[0] || space.image;

  return (
    <div
      style={{ position: "relative", flex: "0 0 auto", cursor: onOpen ? "pointer" : undefined }}
      onClick={onOpen}
      onKeyDown={onOpen ? (e) => { if (e.key === "Enter" || e.key === " ") { e.preventDefault(); onOpen(); } } : undefined}
      role={onOpen ? "button" : undefined}
      tabIndex={onOpen ? 0 : undefined}
      aria-label={onOpen ? `${space.name} 사진 크게 보기` : undefined}
    >
      <img src={src} alt={space.name} style={{ width: 84, height: 84, borderRadius: "var(--radius-images)", objectFit: "cover", display: "block" }} />
      {images.length > 1 ? (
        <span
          style={{
            position: "absolute",
            right: 4,
            bottom: 4,
            minWidth: 18,
            height: 18,
            padding: "0 5px",
            borderRadius: "var(--radius-full)",
            background: "rgba(29, 30, 28, 0.72)",
            color: "#fff",
            fontFamily: "var(--font-sans)",
            fontSize: 10,
            fontWeight: 700,
            display: "inline-flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          {images.length}
        </span>
      ) : null}
    </div>
  );
}

function SpaceHeader({ space, badge }) {
  const { Icon } = window.HarvestDesignSystem_eb006c;
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
  const images = window.getSpaceImages(space);
  const [viewerOpen, setViewerOpen] = React.useState(false);
  const canViewImages = !readOnly && images.length > 0;
  const openViewer = canViewImages ? () => setViewerOpen(true) : undefined;

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

  const lightbox = viewerOpen ? (
    <ImageLightbox
      images={images}
      spaceName={space.name}
      initialIndex={0}
      onClose={() => setViewerOpen(false)}
    />
  ) : null;

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
      <>
        <div style={cardStyle}>
          <div style={{ padding: "18px 20px 20px", display: "flex", flexDirection: "column", gap: 16 }}>
            <div style={{ display: "flex", gap: 14, alignItems: "center" }}>
              <ClickableThumb space={space} onOpen={openViewer} />
              <SpaceHeader space={space} />
            </div>
            {inputs}
          </div>
        </div>
        {lightbox}
      </>
    );
  }

  /* ---- 기본: 이미지 상단 ---- */
  return (
    <>
      <div style={cardStyle}>
        <SpaceImage space={space} height={168} onOpen={openViewer} showCount />
        <div style={{ padding: "20px 22px 22px", display: "flex", flexDirection: "column", gap: 14 }}>
          <SpaceHeader space={space} />
          {inputs}
        </div>
      </div>
      {lightbox}
    </>
  );
}

window.SpaceCard = SpaceCard;
window.ImageLightbox = ImageLightbox;
