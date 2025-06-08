"use client";
import LayoutSection from "@/components/layout/LayoutSection";
import { useScroll, motion } from "framer-motion";
import Image from "next/image";
import useParallax from "../../../utils/useParallax";
import Link from "next/link";

function AboutSection() {
  const { scrollYProgress } = useScroll();
  const y = useParallax(scrollYProgress, -1400, 250);

  return (
    <LayoutSection className="mt-20 flex h-screen items-center justify-center font-Antonio">
      <div className="relative h-[90%] w-full overflow-hidden">
        <motion.div
          style={{ y }}
          className={`relative h-[110%] w-[105%] lg:w-[105%] `}
        >
          <Image
            className={`object-cover `}
            src="/image/cloud.jpg"
            fill
            alt="BMW"
            loading="lazy"
          />
        </motion.div>

        <p className="absolute left-5 top-10 w-8/12 text-sm md:text-base lg:left-10 lg:w-6/12">
          I am a passionate creative developer who combines technical expertise with artistic vision.
          My journey in web development spans several years, during which I&apos;ve honed my skills in
          modern technologies and design principles. I believe in creating digital experiences that
          not only function flawlessly but also inspire and engage users through thoughtful design
          and innovative interactions.
        </p>
        <h2 className="-bottom-22 absolute bottom-1/2 left-1/2 w-full -translate-x-1/2 translate-y-1/2  text-center font-humane text-[10rem] leading-[0.9]  md:text-[20rem]">
          ABOUT ME
        </h2>
        <Link
          className="group absolute bottom-28 right-5 transform rounded-full bg-white bg-opacity-10 px-4 py-2 mix-blend-difference duration-500 ease-in-out text-background/40  hover:bg-opacity-80 hover:text-background md:bottom-10 lg:right-10"
          href="/about"
        >
          Learn more about me
        </Link>
      </div>
    </LayoutSection>
  );
}

export default AboutSection; 