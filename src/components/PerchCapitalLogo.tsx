import React from 'react';

interface PerchCapitalLogoProps {
  theme?: 'light' | 'dark';
  size?: number;
  variant?: 'default' | 'monochrome';
  className?: string;
}

export const PerchCapitalLogo: React.FC<PerchCapitalLogoProps> = ({
  theme = 'light',
  size = 32,
  variant = 'default',
  className = '',
}) => {
  const colors = {
    default: {
      light: { primary: '#C45000', secondary: '#1A1410' },
      dark: { primary: '#C45000', secondary: '#FFF8F0' },
    },
    monochrome: {
      light: { primary: '#1A1410', secondary: '#1A1410' },
      dark: { primary: '#FFF8F0', secondary: '#FFF8F0' },
    },
  };

  const { primary, secondary } = colors[variant][theme];

  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 100 100"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-label="Perch Capital"
    >
      {/* Perch pole (descender) */}
      <rect x="20" y="70" width="8" height="28" rx="4" fill={secondary} />
      
      {/* P letterform body */}
      <path
        d="M20 20 L20 70 L28 70 L28 55 L50 55 C63 55 70 48 70 37.5 C70 27 63 20 50 20 L20 20 Z M28 28 L50 28 C58 28 62 31 62 37.5 C62 44 58 47 50 47 L28 47 L28 28 Z"
        fill={primary}
      />
      
      {/* Bird head detail (bowl of P) */}
      <circle cx="50" cy="37.5" r="4" fill={secondary} />
      
      {/* Upward beak spike (market tick) */}
      <path
        d="M70 37.5 L78 32 L76 38 Z"
        fill={primary}
      />
    </svg>
  );
};

export default PerchCapitalLogo;
