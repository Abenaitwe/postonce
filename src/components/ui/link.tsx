
import * as React from "react";
import { Link as RouterLink, LinkProps as RouterLinkProps } from "react-router-dom";
import { cn } from "@/lib/utils";

export interface LinkProps extends React.AnchorHTMLAttributes<HTMLAnchorElement> {
  href?: string;
  to?: string;
  external?: boolean;
  children?: React.ReactNode;
}

const Link = React.forwardRef<HTMLAnchorElement, LinkProps>(
  ({ className, children, href, to, external, ...props }, ref) => {
    // If external or href includes http/https, render standard anchor
    if (external || (href && (href.startsWith("http") || href.startsWith("mailto:")))) {
      return (
        <a
          href={href}
          className={cn("underline-offset-4 hover:underline", className)}
          target="_blank"
          rel="noopener noreferrer"
          ref={ref}
          {...props}
        >
          {children}
        </a>
      );
    }

    // For internal links use RouterLink
    return (
      <RouterLink
        to={to || href || "#"}
        className={cn("underline-offset-4 hover:underline", className)}
        ref={ref as React.Ref<HTMLAnchorElement>}
        {...(props as RouterLinkProps)}
      >
        {children}
      </RouterLink>
    );
  }
);

Link.displayName = "Link";

export { Link };
