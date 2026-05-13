import React from 'react';

interface PerchTerminalLogoProps {
  theme?: 'light' | 'dark';
  size?: number;
  variant?: 'default' | 'monochrome';
  className?: string;
}

export const PerchTerminalLogo: React.FC<PerchTerminalLogoProps> = ({
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
      aria-label="Perch Terminal"
    >
      {/* Perch pole (descender) */}
      <rect x="20" y="70" width="8" height="28" rx="4" fill={secondary} />
      
      {/* P letterform body */}
      <path
        d="M20 20 L20 70 L28 70 L28 55 L50 55 C63 55 70 48 70 37.5 C70 27 63 20 50 20 L20 20 Z M28 28 L50 28 C58 28 62 31 62 37.5 C62 44 58 47 50 47 L28 47 L28 28 Z"
        fill={primary}
      />
      
      {/* Square pixel eye (cursor cue) */}
      <rect x="47" y="34.5" width="6" height="6" fill={secondary} />
      
      {/* Straight beak (terminal cursor) */}
      <rect x="70" y="36" width="8" height="3" fill={primary} />
    </svg>
  );
};

export default PerchTerminalLogo;
