"use client";

import { navBarLinks } from "@/utils/navbarLinks";
import { Dispatch, SetStateAction } from "react";
import MobileMenuItem from "./MobileMenuItem";

interface IProps {
  isOpen: boolean;
  setIsOpen: Dispatch<SetStateAction<boolean>>;
}

function MobileMenu({ isOpen, setIsOpen }: IProps) {
  return (
    <div
      className={`fixed z-40 h-screen w-full bg-background pt-14 transition duration-700 ease-in-out ${
        isOpen ? "translate-x-0" : "translate-x-full"
      }`}
    >
      <div className="flex flex-col items-start pt-10 font-humane text-[7rem] sm:text-[8rem] md:text-[10rem] leading-[0.80]">
        <>
          {navBarLinks.map((item, index) => {
            return (
              <div key={item.name} className="h-24 sm:h-28 md:h-32 overflow-hidden pt-2">
                <MobileMenuItem
                  item={item}
                  isOpen={isOpen}
                  setIsOpen={setIsOpen}
                  duration={1 + index * 0.2}
                />
              </div>
            );
          })}
        </>
      </div>
    </div>
  );
}

export default MobileMenu; 