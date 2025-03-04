import React from 'react';

interface ArrowUpProps {
  className?: string;
  size?: number;
  color?: string;
}

const ArrowUp: React.FC<ArrowUpProps> = ({
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
      <polyline points="18 15 12 9 6 15"></polyline>
    </svg>
  );
};

export default ArrowUp;
