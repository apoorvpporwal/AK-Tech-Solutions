import React from 'react';

interface LogoProps {
  className?: string;
  showText?: boolean;
  size?: 'sm' | 'md' | 'lg' | 'xl';
  variant?: 'full' | 'mark-only';
  textColor?: string;
}

export const Logo: React.FC<LogoProps> = ({
  className = '',
  showText = true,
  size = 'md',
  variant = 'full',
  textColor = 'text-white'
}) => {
  // Height presets
  const sizeClasses = {
    sm: 'h-6',
    md: 'h-8 sm:h-9',
    lg: 'h-10 sm:h-11',
    xl: 'h-12 sm:h-14'
  };

  return (
    <div className={`inline-flex items-center select-none ${className}`}>
      {variant === 'mark-only' || !showText ? (
        // Mark only
        <svg
          viewBox="0 0 90 66"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className={`${sizeClasses[size]} w-auto aspect-[90/66] ${textColor}`}
          aria-label="AK Tech Solution Logo Mark"
        >
          {/* 'A' Glyph with dynamic arched crossbar */}
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M 31 8 L 54 58 L 42 58 L 39 46 C 35 38 27 38 23 46 L 20 58 L 8 58 L 31 8 Z 
               M 31 20 L 36.5 36 C 33 33 29 33 25.5 36 L 31 20 Z"
            fill="currentColor"
          />

          {/* 'K' Chevron arms: flat top & bottom with crisp inner vertex */}
          <path
            d="M 66 8 L 84 8 L 68 33 L 84 58 L 66 58 L 50 33 Z"
            fill="currentColor"
          />
        </svg>
      ) : (
        // Full Logo: Mark + Divider + "Tech Solution"
        <svg
          viewBox="0 0 316 66"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className={`${sizeClasses[size]} w-auto aspect-[316/66] ${textColor}`}
          aria-label="AK Tech Solution"
        >
          {/* Left: Stylized 'AK' Monogram */}
          <g fill="currentColor">
            {/* 'A' Glyph */}
            <path
              fillRule="evenodd"
              clipRule="evenodd"
              d="M 31 8 L 54 58 L 42 58 L 39 46 C 35 38 27 38 23 46 L 20 58 L 8 58 L 31 8 Z 
                 M 31 20 L 36.5 36 C 33 33 29 33 25.5 36 L 31 20 Z"
            />

            {/* 'K' Chevron Arms */}
            <path
              d="M 66 8 L 84 8 L 68 33 L 84 58 L 66 58 L 50 33 Z"
            />
          </g>

          {/* Center Divider: Thin vertical rule */}
          <line
            x1="102"
            y1="17"
            x2="102"
            y2="49"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            className="opacity-80"
          />

          {/* Right: "Tech Solution" Typography */}
          <text
            x="116"
            y="41"
            fill="currentColor"
            fontFamily="'Inter', 'Plus Jakarta Sans', system-ui, -apple-system, sans-serif"
            fontSize="28"
            fontWeight="450"
            letterSpacing="-0.015em"
          >
            Tech Solution
          </text>
        </svg>
      )}
    </div>
  );
};
