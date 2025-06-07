import React from "react";

interface IProps {
  title: string;
  className?: string;
}

function H1({ title, className }: IProps) {
  return (
    <h1
      className={`${className} font-humane text-[4rem] leading-[0.75] tracking-wide sm:text-[5rem] md:text-[7rem] lg:text-[8rem] xl:text-[10rem] md:tracking-normal`}
    >
      {title}
    </h1>
  );
}

export default H1; 