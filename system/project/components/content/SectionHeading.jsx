import React from "react";

const TITLE_SIZES = {
  "heading-lg": { fontSize: "var(--text-heading-lg)", lineHeight: "var(--leading-heading-lg)" },
  title: { fontSize: "var(--text-title)", lineHeight: "var(--leading-title)" },
  display: { fontSize: "var(--text-display)", lineHeight: "var(--leading-display)" },
};

/**
 * SectionHeading — the reusable section header: small uppercase orange eyebrow,
 * large ink title (max-width ~700px), optional secondary subtitle.
 */
export function SectionHeading({
  eyebrow,
  title,
  subtitle,
  align = "center",
  titleSize = "title",
  as: As = "h2",
  style,
  ...rest
}) {
  const ts = TITLE_SIZES[titleSize] || TITLE_SIZES.title;
  const centered = align === "center";
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        gap: 14,
        alignItems: centered ? "center" : "flex-start",
        textAlign: centered ? "center" : "left",
        maxWidth: 720,
        marginLeft: centered ? "auto" : 0,
        marginRight: centered ? "auto" : 0,
        ...style,
      }}
      {...rest}
    >
      {eyebrow ? (
        <span
          style={{
            fontFamily: "var(--font-sans)",
            fontSize: "var(--text-sm, 14px)",
            fontWeight: 600,
            textTransform: "uppercase",
            letterSpacing: "0.08em",
            color: "var(--accent)",
          }}
        >
          {eyebrow}
        </span>
      ) : null}
      <As
        style={{
          margin: 0,
          fontFamily: "var(--font-sans)",
          fontWeight: 500,
          color: "var(--text-primary)",
          letterSpacing: "0.36px",
          ...ts,
        }}
      >
        {title}
      </As>
      {subtitle ? (
        <p
          style={{
            margin: 0,
            maxWidth: 620,
            fontFamily: "var(--font-sans)",
            fontSize: "17px",
            lineHeight: 1.5,
            letterSpacing: "0.015em",
            color: "var(--text-secondary)",
          }}
        >
          {subtitle}
        </p>
      ) : null}
    </div>
  );
}
