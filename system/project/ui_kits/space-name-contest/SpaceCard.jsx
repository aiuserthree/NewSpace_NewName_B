/* SpaceCard — one submission block per space: image (drop slot), title + description,
   and a 필수 / 선택 name pair. Read-only mode renders submitted values. */

function SpaceCard({ space, values, onChange, readOnly = false }) {
  const { Input, Tag, Icon } = window.HarvestDesignSystem_eb006c;
  const v = values || { required: "", optional: "" };

  return (
    <div
      style={{
        background: "var(--surface-card)",
        borderRadius: "var(--radius-cards)",
        boxShadow: "var(--shadow-lg)",
        overflow: "hidden",
      }}
    >
      {/* Image */}
      {readOnly ? null : (
        <image-slot
          id={space.id}
          shape="rect"
          placeholder={space.placeholder}
          style={{ display: "block", width: "100%", height: 168 }}
        ></image-slot>
      )}

      <div style={{ padding: "20px 22px 22px", display: "flex", flexDirection: "column", gap: 14 }}>
        <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
            <span style={{ color: "var(--accent)", fontFamily: "var(--font-sans)", fontWeight: 700, fontSize: 15 }}>{space.order}</span>
            <h3 style={{ margin: 0, fontFamily: "var(--font-sans)", fontSize: "var(--text-heading-sm)", fontWeight: 600, letterSpacing: "0.015em", color: "var(--text-primary)" }}>
              {space.name}
            </h3>
            <Tag tone="neutral" size="sm">{space.tagline}</Tag>
          </div>
          <p style={{ margin: 0, fontFamily: "var(--font-sans)", fontSize: "var(--text-caption)", lineHeight: 1.5, letterSpacing: "0.015em", color: "var(--text-secondary)" }}>
            {space.description}
          </p>
        </div>

        {readOnly ? (
          <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
            <ReadRow label="필수" value={v.required} tone="accent" />
            <ReadRow label="선택" value={v.optional} tone="neutral" />
          </div>
        ) : (
          <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
            <Input
              label={<LabelWithTag text="제안하는 이름" tone="accent" tag="필수" />}
              placeholder="예) 빛나는 성전"
              value={v.required}
              onChange={(e) => onChange({ ...v, required: e.target.value })}
            />
            <Input
              label={<LabelWithTag text="하나 더 제안 (선택)" tone="neutral" tag="선택" />}
              placeholder="한 개 더 제안할 수 있어요"
              value={v.optional}
              onChange={(e) => onChange({ ...v, optional: e.target.value })}
            />
          </div>
        )}
      </div>
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

function ReadRow({ label, value, tone }) {
  const { Tag } = window.HarvestDesignSystem_eb006c;
  return (
    <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
      <Tag tone={tone} size="sm">{label}</Tag>
      <span style={{ fontFamily: "var(--font-sans)", fontSize: "var(--text-body)", letterSpacing: "0.015em", color: value ? "var(--text-primary)" : "var(--text-disabled)" }}>
        {value || "제안 없음"}
      </span>
    </div>
  );
}

window.SpaceCard = SpaceCard;
