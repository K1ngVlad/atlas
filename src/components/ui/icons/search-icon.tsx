import type { FC } from 'react';

export type SearchIconProps = {
  width?: number | string;
  height?: number | string;
  color?: string;
  className?: string;
};

export const SearchIcon: FC<SearchIconProps> = ({
  width = 24,
  height = 24,
  color = 'currentColor',
  className,
}) => {
  return (
    <svg
      width={width}
      height={height}
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M15.7955 15.8111L21 21M18 10.5C18 14.6421 14.6421 18 10.5 18C6.35786 18 3 14.6421 3 10.5C3 6.35786 6.35786 3 10.5 3C14.6421 3 18 6.35786 18 10.5Z"
        stroke={color}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};
