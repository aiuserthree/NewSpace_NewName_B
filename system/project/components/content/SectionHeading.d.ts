import * as React from "react";

export interface SectionHeadingProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Small uppercase orange label above the title. */
  eyebrow?: string;
  title: React.ReactNode;
  /** Optional secondary line under the title. */
  subtitle?: string;
  align?: "center" | "left";
  /** Title size step. Default "title" (34px). */
  titleSize?: "heading-lg" | "title" | "display";
  /** Heading element to render. Default "h2". */
  as?: keyof React.JSX.IntrinsicElements;
}

/**
 * SectionHeading — eyebrow + large title (+ subtitle) section header pattern.
 */
export declare function SectionHeading(props: SectionHeadingProps): React.JSX.Element;
