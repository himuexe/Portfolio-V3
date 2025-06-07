"use client";
import ComeUpText from "@/components/animated/ComeUpText";
import LayoutSection from "@/components/layout/LayoutSection";
import Link from "next/link";
import AnimUp from "@/components/animated/AnimUp";
import { useInView } from "react-intersection-observer";

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
    link: "https://linkedin.com/in/himanshuexe"
  },
  {
    _id: "2",
    name: "GitHub",
    link: "https://github.com/himuexe/Portfolio-V3"
  },
  {
    _id: "3",
    name: "X",
    link: "https://twitter.com/himuexe"
  }
];

function Footer({ socialMedia = defaultSocialMedia }: Partial<IProps>) {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.2,
  });

  return (
    <LayoutSection className="flex flex-col items-center justify-center">
      <h2 className="absolute left-1/2 top-1/2 w-10/12 -translate-x-1/2 -translate-y-1/2 text-center font-humane text-[10rem] leading-[0.8] opacity-10 md:text-[25rem]">{`LET'S WORK`}</h2>
      <div
        ref={ref}
        className="z-10 flex w-11/12 flex-col items-center justify-center text-center font-Antonio text-2xl uppercase leading-relaxed md:w-6/12"
      >
        <AnimUp inView={inView}>
          <p className="mb-10">
            {`What do you think about embarking on a remarkable journey of creation
        together ? WANT TO DISCUSS A NEW PROJECT ?`}
          </p>
        </AnimUp>
        <AnimUp inView={inView}>
          <Link
            className="group flex h-12 w-48 flex-col overflow-hidden rounded-full bg-white py-1 text-background"
            href="/contact"
          >
            <p className="transform transition duration-500 group-hover:-translate-y-10">
              CONTACT ME
            </p>
            <p className="-translate-y-1 transform transition duration-500 group-hover:-translate-y-10">
              CONTACT ME
            </p>
          </Link>
        </AnimUp>
      </div>
      <div className="absolute bottom-5 flex w-full flex-col-reverse items-center justify-center px-5 font-Antonio md:flex-row md:justify-between lg:px-10">
        <AnimUp className="mt-8 text-center md:mt-0" inView={inView}>
          <p>© {new Date().getFullYear()} Portfolio V3. All rights reserved.</p>
        </AnimUp>
        <AnimUp inView={inView}>
          <div className="flex w-8/12 justify-between space-x-5 underline md:w-full">
            {socialMedia.map((item) => {
              return (
                <a className="" href={item.link} key={item._id}>
                  <ComeUpText text={item.name} />
                </a>
              );
            })}
          </div>
        </AnimUp>
      </div>
    </LayoutSection>
  );
}

export default Footer; 