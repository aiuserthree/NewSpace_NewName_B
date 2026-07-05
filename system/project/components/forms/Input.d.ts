import * as React from "react";
import type { IconName } from "../media/Icon";

export interface InputProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "style"> {
  /** Field label rendered above the control. */
  label?: string;
  /** Leading icon name (e.g. "phone", "user"). */
  leftIcon?: IconName;
  /** Helper text below the field (hidden when `error` is set). */
  helper?: string;
  /** Error message; when set the field shows orange emphasis + info icon. */
  error?: string;
  required?: boolean;
  disabled?: boolean;
  /** Wrapper style. Use `inputStyle` to reach the <input>. */
  style?: React.CSSProperties;
  inputStyle?: React.CSSProperties;
}

/**
 * Input — labelled text field with warm focus ring and error/helper affordances.
 */
export declare function Input(props: InputProps): React.JSX.Element;
