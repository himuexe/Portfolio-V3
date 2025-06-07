import React from "react";

interface IProps {
  position: "bottom-left" | "bottom-right";
  bottom?: "bottom-32" | "bottom-0";
}

function Line({ position, bottom = "bottom-32" }: IProps) {
  return (
    <div
      className={`absolute ${bottom} hidden h-[1px] w-1/2 bg-white md:w-[40%] lg:flex ${
        position === "bottom-right" ? "right-20" : "left-20"
      }`}
    />
  );
}

export default Line; 