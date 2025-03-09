// LinkComponent.tsx
import React from 'react';
import NextLink, { LinkProps } from 'next/link';

interface LinkComponentProps extends LinkProps {
  children: React.ReactNode;
  // Add any additional props you need to pass to the anchor element
}

/**
 * A custom Link component that forwards its ref to the inner <a> element.
 */
const LinkComponent = React.forwardRef<HTMLAnchorElement, LinkComponentProps>(
  ({ children, ...props }, ref) => {
    return (
      <NextLink {...props} passHref legacyBehavior>
        <a ref={ref}>{children}</a>
      </NextLink>
    );
  }
);

LinkComponent.displayName = 'LinkComponent';
export default LinkComponent;
