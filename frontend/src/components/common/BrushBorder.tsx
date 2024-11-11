import React, { ReactNode, useEffect, useRef, useState } from "react";

interface BrushBorderProps {
  children: ReactNode;
  className?: string;
  borderColor?: string;
  strokeWidth?: number;
}

const BrushBorder = ({ children, className = "", borderColor = "#333333", strokeWidth = 3 }: BrushBorderProps) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [height, setHeight] = useState<number>(0);

  useEffect(() => {
    if (containerRef.current) {
      const updateHeight = () => {
        setHeight(containerRef.current?.offsetHeight || 0);
      };

      updateHeight();
      const resizeObserver = new ResizeObserver(updateHeight);
      resizeObserver.observe(containerRef.current);

      return () => {
        if (containerRef.current) {
          resizeObserver.unobserve(containerRef.current);
        }
      };
    }
  }, []);

  const generatePath = (height: number) => {
    const segments = Math.ceil(height / 100);
    const points = [];
    const segmentHeight = height / segments;

    for (let i = 0; i <= segments; i++) {
      const y = i * segmentHeight;
      const controlPoint1X = i % 2 ? strokeWidth + 2 : strokeWidth - 2;
      points.push(`${i === 0 ? "M" : "S"} ${controlPoint1X},${y} ${strokeWidth},${y}`);
    }

    return points.join(" ");
  };

  return (
    <div ref={containerRef} className={`relative ${className}`}>
      {height > 0 && (
        <svg
          className="absolute h-full"
          style={{
            right: "-2px",
            width: `${strokeWidth + 4}px`,
            height: `${height}px`,
          }}
          preserveAspectRatio="none"
        >
          <path
            d={generatePath(height)}
            className="stroke-current fill-none"
            style={{
              stroke: borderColor,
              strokeWidth: `${strokeWidth}px`,
              strokeLinecap: "round",
              strokeLinejoin: "round",
              filter: "url(#brushTexture)",
            }}
          />

          <defs>
            <filter id="brushTexture">
              <feTurbulence type="fractalNoise" baseFrequency="0.05" numOctaves="3" seed="1" result="noise" />
              <feDisplacementMap in="SourceGraphic" in2="noise" scale="1.5" xChannelSelector="R" yChannelSelector="G" />
            </filter>
          </defs>
        </svg>
      )}
      <div className="relative z-10">{children}</div>
    </div>
  );
};

export default BrushBorder;
