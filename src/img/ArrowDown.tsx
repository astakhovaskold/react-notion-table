import React from 'react';

interface ArrowDownProps {
  className?: string;
  size?: number;
  color?: string;
}

const ArrowDown: React.FC<ArrowDownProps> = ({
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
      <polyline points="6 9 12 15 18 9"></polyline>
    </svg>
  );
};

export default ArrowDown;
