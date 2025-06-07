"use client";

import React from "react";
import ComeUpText from "../animated/ComeUpText";
import AnimUp from "../animated/AnimUp";
import { useInView } from "react-intersection-observer";
import TimeZoneComponent from "../TimeZoneComponent";

interface SocialMediaItem {
  _id?: string;
  name: string;
  link: string;
}

interface IProps {
  socialMedia: SocialMediaItem[];
}

function ContactInfo({ socialMedia = [] }: IProps) {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.5 });
  
  // Fallback social media links if no data is provided
  const defaultSocialMedia: SocialMediaItem[] = [
    { name: "LinkedIn", link: "https://www.linkedin.com/in/himanshuexe/" },
    { name: "GitHub", link: "https://github.com/himuexe" },
    { name: "X", link: "https://x.com/himuexe" },
    { name: "Instagram", link: "https://instagram.com" },
  ];

  // Use provided socialMedia data or default to the hardcoded links
  const socialLinks: SocialMediaItem[] = socialMedia.length > 0 
    ? socialMedia 
    : defaultSocialMedia;

  return (
    <div
      ref={ref}
      className="flex w-full flex-col font-Antonio md:w-1/4 md:pl-10 lg:pl-20"
    >
      <div>
        <AnimUp duration={1.2} inView={inView}>
          <h3 className="bold text-xl opacity-50">CONTACT DETAILS</h3>
        </AnimUp>
        <div className="mt-5 flex flex-col space-y-1">
          <AnimUp duration={1.5} inView={inView}>
            <p>+91 9828477222</p>
          </AnimUp>
          <AnimUp duration={1.8} inView={inView}>
            <p>himanshusworkplace@gmail.com</p>
          </AnimUp>
          <AnimUp duration={2} inView={inView}>
            <p>Jaipur, India</p>
          </AnimUp>
        </div>
      </div>

      <div>
        <AnimUp duration={2} inView={inView}>
          <h3 className="bold mt-10 text-xl opacity-50">SOCIALS</h3>
        </AnimUp>
        <div className="mt-3 flex flex-col space-y-2 underline">
          {socialLinks.map((item, index) => (
            <a 
              className="" 
              href={item.link} 
              key={item._id || `social-${index}`} 
              target="_blank" 
              rel="noopener noreferrer"
            >
              <AnimUp duration={2.2} inView={inView}>
                <ComeUpText text={item.name} />
              </AnimUp>
            </a>
          ))}
        </div>
      </div>

      <TimeZoneComponent inView={inView} />
    </div>
  );
}

export default ContactInfo; 