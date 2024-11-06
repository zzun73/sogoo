import type { ReactNode } from "react";

interface BoxProps {
  children: ReactNode;
  className?: string;
}

const Box: React.FC<BoxProps> = ({ children = null, className = "" }) => {
  const BASE_CLASS = "bg-white rounded-3xl px-5 py-4 w-full";
  const combinedClassName = `${BASE_CLASS} ${className}`.trim();

  return <div className={combinedClassName}>{children}</div>;
};

export default Box;
