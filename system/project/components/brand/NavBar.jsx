import React from "react";
import { Icon } from "../media/Icon.jsx";
import { Button } from "../actions/Button.jsx";

/**
 * NavBar — slim sticky top navigation: brand left, centre links, sign-in ghost +
 * primary CTA right. Background is cream (never white) with a hairline underline.
 *
 * No Harvest logo asset ships with this system, so `brand` defaults to a plain
 * type wordmark. Pass a node to `brand` to supply a real mark.
 */
export function NavBar({
  brand = "harvest",
  links = [],
  signInLabel = "Sign in",
  onSignIn,
  ctaLabel = "Try Harvest free",
  onCta,
  sticky = true,
  style,
  ...rest
}) {
  return (
    <header
      style={{
        position: sticky ? "sticky" : "static",
        top: 0,
        zIndex: 20,
        background: "var(--surface-page)",
        borderBottom: "1px solid var(--border-divider)",
        ...style,
      }}
      {...rest}
    >
      <nav
        style={{
          maxWidth: "var(--page-max-width)",
          margin: "0 auto",
          height: 68,
          padding: "0 24px",
          display: "flex",
          alignItems: "center",
          gap: 32,
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 8, flex: "0 0 auto" }}>
          {typeof brand === "string" ? (
            <span style={{ fontFamily: "var(--font-sans)", fontSize: 22, fontWeight: 700, letterSpacing: "-0.01em", color: "var(--accent)" }}>
              {brand}
            </span>
          ) : brand}
        </div>

        <ul style={{ display: "flex", alignItems: "center", gap: 24, listStyle: "none", margin: 0, padding: 0, flex: "1 1 auto" }}>
          {links.map((l, i) => (
            <li key={i}>
              <a
                href={l.href || "#"}
                style={{ display: "inline-flex", alignItems: "center", gap: 4, fontFamily: "var(--font-sans)", fontSize: "var(--text-body)", fontWeight: 500, letterSpacing: "0.015em", color: "var(--text-primary)", textDecoration: "none" }}
              >
                {l.label}
                {l.hasMenu ? <Icon name="chevron-down" size={16} /> : null}
              </a>
            </li>
          ))}
        </ul>

        <div style={{ display: "flex", alignItems: "center", gap: 8, flex: "0 0 auto" }}>
          {signInLabel ? <Button variant="ghost" size="sm" onClick={onSignIn}>{signInLabel}</Button> : null}
          {ctaLabel ? <Button variant="primary" size="sm" onClick={onCta}>{ctaLabel}</Button> : null}
        </div>
      </nav>
    </header>
  );
}
