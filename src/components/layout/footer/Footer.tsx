"use client";

import AnimUp from "@/components/animated/AnimUp";
import React from "react";
import { useInView } from "react-intersection-observer";
import ComeUpText from "@/components/animated/ComeUpText";

interface SocialMedia {
  _id: string;
  name: string;
  link: string;
}

interface IProps {
  socialMedia: SocialMedia[];
}

// Default social media links
const defaultSocialMedia: SocialMedia[] = [
  {
    _id: "1",
    name: "LinkedIn",
    link: "https://linkedin.com/in/portfoliov3"
  },
  {
    _id: "2",
    name: "GitHub",
    link: "https://github.com/portfoliov3"
  },
  {
    _id: "3",
    name: "Twitter",
    link: "https://twitter.com/portfoliov3"
  },
  {
    _id: "4",
    name: "Dribbble",
    link: "https://dribbble.com/portfoliov3"
  }
];

function Footer({ socialMedia = defaultSocialMedia }: Partial<IProps>) {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.2,
  });
  
  return (
    <div
      ref={ref}
      className="flex w-full flex-col-reverse items-center justify-center px-5 pb-5 pt-10 font-Antonio md:flex-row lg:items-start lg:justify-between lg:px-10"
    >
      <AnimUp className="mt-10 text-center md:mt-0" inView={inView}>
        <p>© {new Date().getFullYear()} Portfolio V3. All rights reserved.</p>
      </AnimUp>
      <AnimUp inView={inView}>
        <div className="flex justify-between space-x-5 underline">
          {socialMedia.map((item) => {
            return (
              <a className="mx-4" href={item.link} key={item._id}>
                <ComeUpText text={item.name} />
              </a>
            );
          })}
        </div>
      </AnimUp>
    </div>
  );
}

export default Footer; 