import * as React from "react";
import type { IconName } from "../media/Icon";

export interface ButtonProps extends Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, "type"> {
  /** primary = the orange CTA · secondary = bordered white · ghost = text-weight action. */
  variant?: "primary" | "secondary" | "ghost";
  /** sm 36px · md 44px · lg 52px min-height. Default md. */
  size?: "sm" | "md" | "lg";
  /** Icon name rendered before the label. */
  leftIcon?: IconName;
  /** Icon name rendered after the label. */
  rightIcon?: IconName;
  /** Stretch to the container width. */
  fullWidth?: boolean;
  disabled?: boolean;
  type?: "button" | "submit" | "reset";
  children?: React.ReactNode;
}

/**
 * Button — the system's most important interactive element.
 * `primary` carries the single orange fill; reserve it for the main action per screen.
 */
export declare function Button(props: ButtonProps): React.JSX.Element;
