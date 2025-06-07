"use client";

import { Dispatch, SetStateAction } from "react";
import Link from "next/link";

interface IProps {
  isOpen: boolean;
  setIsOpen: Dispatch<SetStateAction<boolean>>;
  duration: number;
  item: {
    name: string;
    link: string;
  };
}

function MobileMenuItem({ isOpen, setIsOpen, item, duration }: IProps) {
  const styles = {
    transition: `transform ${duration}s ease`,
    transform: isOpen ? "translateY(0)" : `translateY(300px)`,
  };
  
  return (
    <div style={styles}>
      <Link
        onClick={() => setIsOpen(false)}
        className="ml-5"
        href={item.link}
      >
        {item.name}
      </Link>
    </div>
  );
}

export default MobileMenuItem; 