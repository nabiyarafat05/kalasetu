import React from 'react';

export const BrandLogo = ({ className = '', alt = 'KalaSetu logo', ...props }) => (
  <img
    src="/kalasetu-logo.jpeg"
    alt={alt}
    className={className}
    loading="eager"
    {...props}
  />
);
