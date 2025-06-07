import React from "react";

interface IProps {
  children: React.ReactNode;
  className?: string;
  ref?: (node?: Element | null | undefined) => void;
}

function LayoutSection({ children, className, ref }: IProps) {
  return (
    <div
      ref={ref}
      className="relative z-20 flex items-center justify-center bg-background"
    >
      <div
        className={`${className} min-h-screen w-full max-w-[150rem] px-5 lg:px-10`}
      >
        {children}
      </div>
    </div>
  );
}

export default LayoutSection; 