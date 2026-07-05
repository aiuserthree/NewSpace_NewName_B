import * as React from "react";

export interface LogoCircleProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Diameter in px. Default 48. */
  size?: number;
  /** Accessible label for the badge. */
  label?: string;
  children?: React.ReactNode;
}

/**
 * LogoCircle — round white badge holding a third-party logo (integration row).
 */
export declare function LogoCircle(props: LogoCircleProps): React.JSX.Element;
