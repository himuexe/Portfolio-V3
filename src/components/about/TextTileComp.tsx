import React from "react";
import AnimUp from "../animated/AnimUp";

interface IProps {
  inView: boolean;
  title: string;
  text: string;
}

function TextTileComp({ inView, title, text }: IProps) {
  return (
    <div>
      <AnimUp inView={inView} duration={2} className="text-xs opacity-50">
        {title}
      </AnimUp>
      <AnimUp inView={inView} duration={2.5}>
        {text}
      </AnimUp>
    </div>
  );
}

export default TextTileComp; 