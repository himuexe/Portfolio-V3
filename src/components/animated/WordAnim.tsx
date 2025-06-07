import React, { useEffect, useState } from "react";

interface IProps {
  isAnim: boolean;
  word: string;
  textSize?: string;
  marge?: string;
}

function WordAnim({
  isAnim,
  word,
  textSize = "md:text-[13rem] desktop:text-[20rem] lg:text-[18rem] xxl:text-[25rem]",
  marge = "pt-6 xxl:pt-8",
}: IProps) {
  const wordArray = word.split("");
  const [showText, setShowText] = useState(false);

  useEffect(() => {
    // Ensure text is visible after animation
    if (isAnim) {
      // Allow time for animation to complete
      const timer = setTimeout(() => {
        setShowText(true);
      }, 1000);
      return () => clearTimeout(timer);
    } else {
      setShowText(false);
    }
  }, [isAnim]);

  return (
    <div className="flex" translate="no">
      {wordArray.map((letter, index) => {
        return (
          <div key={index} className={`overflow-hidden ${marge}`}>
            <p
              className={`transiton w-full transform font-humane text-[12rem] leading-[0.7] duration-[3000ms] ${textSize} ${
                isAnim ? (showText ? "" : "rotationInitial") : "rotation"
              }`}
            >
              {letter === " " ? <span>&nbsp;</span> : letter}
            </p>
          </div>
        );
      })}
    </div>
  );
}

export default WordAnim; 