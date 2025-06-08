"use client";

import Link from "next/link";
import { useState } from "react";
import { navBarLinks } from "@/utils/navbarLinks";
import MobileMenu from "./MobileMenu";
import ComeUpText from "@/components/animated/ComeUpText";
import { motion } from "framer-motion";

function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <div className="fixed left-1/2 top-0 z-50 flex w-full max-w-[150rem] -translate-x-1/2 items-center justify-between px-5 py-3 font-Antonio mix-blend-difference lg:px-10">
        <Link href="/">
          <motion.div
            whileHover={{ scale: 1.02 }}
            transition={{ duration: 0.2 }}
          >
            <h2>Himanshu Sharma</h2>
            <p className="text-xs opacity-50">Jaipur India</p>
          </motion.div>
        </Link>
        
        <div className="hidden md:flex md:space-x-10">
          {navBarLinks.map((item, index) => {
            return (
              <Link href={item.link} key={item.name}>
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1, duration: 0.3 }}
                  whileHover={{ y: -2 }}
                >
                  <ComeUpText text={item.name} />
                </motion.div>
              </Link>
            );
          })}
        </div>
        
        <button 
          className="flex md:hidden" 
          onClick={() => setIsOpen(!isOpen)}
        >
          <motion.div
            animate={{ rotate: isOpen ? 180 : 0 }}
            transition={{ duration: 0.3 }}
          >
            {isOpen ? "CLOSE" : "MENU"}
          </motion.div>
        </button>
      </div>
      <MobileMenu isOpen={isOpen} setIsOpen={setIsOpen} />
    </>
  );
}

export default Navbar; 