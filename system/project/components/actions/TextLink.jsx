import React from "react";
import { Icon } from "../media/Icon.jsx";

/**
 * TextLink — the secondary "더 알아보기 →" action. Orange, weight 500, no chrome;
 * underline appears on hover. Optional trailing arrow.
 */
export function TextLink({
  children,
  href = "#",
  withArrow = true,
  size = "md",
  onClick,
  style,
  ...rest
}) {
  const [hover, setHover] = React.useState(false);
  const fontSize = size === "sm" ? "var(--text-caption)" : "var(--text-body)";

  return (
    <a
      href={href}
      onClick={onClick}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      style={{
        display: "inline-flex",
        alignItems: "center",
        gap: 6,
        color: hover ? "var(--accent-hover)" : "var(--text-link)",
        fontFamily: "var(--font-sans)",
        fontSize,
        fontWeight: 500,
        letterSpacing: "0.015em",
        textDecoration: hover ? "underline" : "none",
        textUnderlineOffset: 3,
        cursor: "pointer",
        transition: "color 140ms ease",
        ...style,
      }}
      {...rest}
    >
      <span>{children}</span>
      {withArrow ? (
        <Icon
          name="arrow-right"
          size={size === "sm" ? 15 : 17}
          style={{ transform: hover ? "translateX(2px)" : "none", transition: "transform 140ms ease" }}
        />
      ) : null}
    </a>
  );
}
