"use client";

import Link from "next/link";
import { useState } from "react";
import { navBarLinks } from "@/utils/navbarLinks";
import MobileMenu from "./MobileMenu";
import ComeUpText from "@/components/animated/ComeUpText";

function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <div className="fixed left-1/2 top-0 z-50 flex w-full max-w-[150rem] -translate-x-1/2 items-center justify-between px-5 py-3 font-Antonio mix-blend-difference lg:px-10">
        <Link href="/">
          <h2>Himanshu Sharma</h2>
          <p className="text-xs opacity-50">Jaipur India</p>
        </Link>
        <div className="hidden md:flex md:space-x-10">
          {navBarLinks.map((item) => {
            return (
              <Link href={item.link} key={item.name}>
                <ComeUpText text={item.name} />
              </Link>
            );
          })}
        </div>
        <button className="flex md:hidden" onClick={() => setIsOpen(!isOpen)}>
          {isOpen ? "CLOSE" : "MENU"}
        </button>
      </div>
      <MobileMenu isOpen={isOpen} setIsOpen={setIsOpen} />
    </>
  );
}

export default Navbar; 