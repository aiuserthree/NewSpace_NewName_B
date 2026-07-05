import React from "react";
import { Icon } from "../media/Icon.jsx";

let _uid = 0;

/**
 * Input — labelled text field. White fill, bone border, 16px radius, warm focus
 * ring. Supports label, helper/error text, a leading icon, required marker and
 * disabled state. (The system keeps a single-orange discipline, so validation
 * emphasis is orange + text rather than a separate red.)
 */
export function Input({
  label,
  value,
  onChange,
  placeholder,
  type = "text",
  leftIcon,
  helper,
  error,
  required = false,
  disabled = false,
  id,
  name,
  inputMode,
  maxLength,
  autoComplete,
  style,
  inputStyle,
  ...rest
}) {
  const [focus, setFocus] = React.useState(false);
  const rid = React.useMemo(() => id || `hd-input-${++_uid}`, [id]);
  const invalid = Boolean(error);
  const borderColor = invalid
    ? "var(--accent)"
    : focus
      ? "var(--accent)"
      : "var(--border-input)";

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 8, ...style }}>
      {label ? (
        <label
          htmlFor={rid}
          style={{
            fontFamily: "var(--font-sans)",
            fontSize: "var(--text-caption)",
            fontWeight: 600,
            letterSpacing: "0.015em",
            color: "var(--text-secondary)",
          }}
        >
          {label}
          {required ? <span style={{ color: "var(--accent)" }}> *</span> : null}
        </label>
      ) : null}

      <div style={{ position: "relative", display: "flex", alignItems: "center" }}>
        {leftIcon ? (
          <span
            style={{
              position: "absolute",
              left: 18,
              display: "inline-flex",
              color: "var(--text-tertiary)",
              pointerEvents: "none",
            }}
          >
            <Icon name={leftIcon} size={20} />
          </span>
        ) : null}
        <input
          id={rid}
          name={name}
          type={type}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          disabled={disabled}
          required={required}
          inputMode={inputMode}
          maxLength={maxLength}
          autoComplete={autoComplete}
          onFocus={() => setFocus(true)}
          onBlur={() => setFocus(false)}
          aria-invalid={invalid || undefined}
          style={{
            width: "100%",
            fontFamily: "var(--font-sans)",
            fontSize: "var(--text-body)",
            letterSpacing: "0.015em",
            color: "var(--text-primary)",
            background: disabled ? "var(--surface-page)" : "var(--surface-card)",
            border: `1px solid ${borderColor}`,
            borderRadius: "var(--radius-inputs)",
            padding: leftIcon ? "14px 20px 14px 48px" : "14px 20px",
            outline: "none",
            boxShadow: focus ? "0 0 0 3px rgba(250, 93, 0, 0.15)" : "none",
            opacity: disabled ? 0.6 : 1,
            cursor: disabled ? "not-allowed" : "text",
            transition: "border-color 140ms ease, box-shadow 140ms ease",
            ...inputStyle,
          }}
          {...rest}
        />
      </div>

      {invalid || helper ? (
        <span
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: 6,
            fontFamily: "var(--font-sans)",
            fontSize: "var(--text-caption)",
            letterSpacing: "0.015em",
            color: invalid ? "var(--accent)" : "var(--text-tertiary)",
          }}
        >
          {invalid ? <Icon name="info" size={14} /> : null}
          {invalid ? error : helper}
        </span>
      ) : null}
    </div>
  );
}
