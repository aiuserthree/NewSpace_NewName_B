import * as React from "react";

export interface NavLink {
  label: string;
  href?: string;
  /** Show a dropdown chevron. */
  hasMenu?: boolean;
}

export interface NavBarProps extends React.HTMLAttributes<HTMLElement> {
  /** Brand wordmark: string (orange type) or a custom node. */
  brand?: React.ReactNode;
  links?: NavLink[];
  signInLabel?: string;
  onSignIn?: () => void;
  ctaLabel?: string;
  onCta?: () => void;
  sticky?: boolean;
}

/**
 * NavBar — slim sticky top nav (brand · centre links · sign-in + orange CTA) on a cream bar.
 */
export declare function NavBar(props: NavBarProps): React.JSX.Element;
