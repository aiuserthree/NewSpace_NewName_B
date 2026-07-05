import * as React from "react";

export interface TextLinkProps extends Omit<React.AnchorHTMLAttributes<HTMLAnchorElement>, "href"> {
  href?: string;
  /** Show the trailing → arrow (nudges on hover). Default true. */
  withArrow?: boolean;
  size?: "sm" | "md";
  children?: React.ReactNode;
}

/**
 * TextLink — low-chrome orange link ("더 알아보기 →"); underline on hover, optional arrow.
 */
export declare function TextLink(props: TextLinkProps): React.JSX.Element;
