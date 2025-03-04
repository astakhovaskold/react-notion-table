import React from 'react';

interface TextProps {
  className?: string;
  size?: number;
  color?: string;
}

const Text: React.FC<TextProps> = ({
  className = '',
  size = 24,
  color = 'currentColor',
}) => {
  return (
    <svg
      className={className}
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke={color}
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <polyline points="4 7 4 4 20 4 20 7"></polyline>
      <line x1="9" y1="20" x2="15" y2="20"></line>
      <line x1="12" y1="4" x2="12" y2="20"></line>
    </svg>
  );
};

export default Text;
