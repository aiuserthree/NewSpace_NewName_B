import * as React from "react";

export interface TrustLogoRowProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Small uppercase label, e.g. "TRUSTED BY 70,000+ COMPANIES". */
  label?: string;
  /** Partner marks — nodes, or strings rendered as ghosted wordmarks. */
  logos?: React.ReactNode[];
}

/**
 * TrustLogoRow — grayscale partner-logo strip for social proof.
 */
export declare function TrustLogoRow(props: TrustLogoRowProps): React.JSX.Element;
