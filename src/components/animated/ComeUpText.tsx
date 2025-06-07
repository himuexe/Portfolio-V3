import React from "react";

interface IProps {
  text: string;
  className?: string;
  height?: string;
}

function ComeUpText({ text, className, height = "h-6" }: IProps) {
  return (
    <div
      className={`group flex flex-col overflow-hidden ${className} ${height}`}
    >
      <p className="transform transition duration-500 group-hover:-translate-y-6">
        {text}
      </p>
      <p className="-translate-y-1 transform transition duration-500 group-hover:-translate-y-6">
        {text}
      </p>
    </div>
  );
}

export default ComeUpText; 