import React from 'react';

interface BadgeProps {
  children: React.ReactNode;
  type?: 'default' | 'primary' | 'success' | 'warning' | 'error';
  className?: string;
}

const Badge: React.FC<BadgeProps> = ({
  children,
  type = 'default',
  className = '',
}) => {
  return <span className={`badge badge-${type} ${className}`}>{children}</span>;
};

export default Badge;
