import React from "react";
import { motion } from "framer-motion";

interface IProps {
  isAnim: boolean;
  word: string;
  textSize?: string;
  marge?: string;
  variant?: 'default' | 'slide' | 'scale' | 'rotate' | 'wave';
  staggerDelay?: number;
}

function WordAnim({
  isAnim,
  word,
  textSize = "md:text-[13rem] desktop:text-[20rem] lg:text-[18rem] xxl:text-[25rem]",
  marge = "pt-6 xxl:pt-8",
  variant = 'default',
  staggerDelay = 0.1,
}: IProps) {
  const wordArray = word.split("");

  // Animation variants for different effects
  const containerVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: staggerDelay,
        delayChildren: 0.2,
      },
    },
  };

  const getLetterVariants = () => {
    switch (variant) {
      case 'slide':
        return {
          hidden: { 
            y: 100, 
            opacity: 0,
            rotateX: -90,
          },
          visible: { 
            y: 0, 
            opacity: 1,
            rotateX: 0,
            transition: {
              type: "spring",
              damping: 12,
              stiffness: 100,
              duration: 0.8,
            },
          },
        };
      
      case 'scale':
        return {
          hidden: { 
            scale: 0, 
            opacity: 0,
            rotateZ: -180,
          },
          visible: { 
            scale: 1, 
            opacity: 1,
            rotateZ: 0,
            transition: {
              type: "spring",
              damping: 8,
              stiffness: 80,
              duration: 1.2,
            },
          },
        };
      
      case 'rotate':
        return {
          hidden: { 
            rotateY: -90, 
            opacity: 0,
            x: -50,
          },
          visible: { 
            rotateY: 0, 
            opacity: 1,
            x: 0,
            transition: {
              type: "spring",
              damping: 10,
              stiffness: 60,
              duration: 1.0,
            },
          },
        };
      
      case 'wave':
        return {
          hidden: { 
            y: 50, 
            opacity: 0,
            rotateZ: 15,
          },
          visible: (i: number) => ({ 
            y: 0, 
            opacity: 1,
            rotateZ: 0,
            transition: {
              type: "spring",
              damping: 12,
              stiffness: 100,
              delay: i * 0.05,
              duration: 0.6,
            },
          }),
        };
      
      default: // Enhanced version of original
        return {
          hidden: { 
            rotateX: -90, 
            opacity: 0,
            y: 50,
          },
          visible: { 
            rotateX: 0, 
            opacity: 1,
            y: 0,
            transition: {
              type: "spring",
              damping: 15,
              stiffness: 120,
              duration: 0.8,
            },
          },
        };
    }
  };

  const letterVariants = getLetterVariants();

  return (
    <motion.div 
      className="flex" 
      translate="no"
      variants={containerVariants}
      initial="hidden"
      animate={isAnim ? "visible" : "hidden"}
    >
      {wordArray.map((letter, index) => {
        return (
          <div key={index} className={`overflow-hidden ${marge}`}>
            <motion.p
              className={`w-full font-humane text-[12rem] leading-[0.7] ${textSize}`}
              variants={letterVariants}
              custom={index}
              whileHover={{
                scale: 1.05,
                rotateZ: Math.random() * 10 - 5,
                transition: { duration: 0.2 }
              }}
            >
              {letter === " " ? <span>&nbsp;</span> : letter}
            </motion.p>
          </div>
        );
      })}
    </motion.div>
  );
}

export default WordAnim; 