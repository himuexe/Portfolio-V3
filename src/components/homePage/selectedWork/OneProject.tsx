"use client";

import React, { Dispatch, SetStateAction, useEffect } from "react";
import Image from "next/image";
import AnimUp from "@/components/animated/AnimUp";
import { useInView } from "react-intersection-observer";
import { useRouter } from "next/navigation";
import ProjectDetails from "./ProjectDetails";
import HoverProjectDetails from "./HoverProjectDetails";



// Define types for the component
interface Project {
  _id: string;
  name: string;
  slug: { current: string };
  date: string;
  description: string;
  categories: { _id: string; title: string }[];
  techno: { _id: string; title: string }[];
  mainImage: {
    alt?: string;
    url: string;
  };
}

interface SocialMedia {
  _id: string;
  title: string;
  url: string;
}

interface IProps {
  project: Project;
  index: number;
  socialMedia: SocialMedia[];
  setIsBlendMode: Dispatch<SetStateAction<boolean>>;
  isDesktopClicked: boolean;
  setIsDesktopClicked: Dispatch<SetStateAction<boolean>>;
}

function OneProject({
  project,
  index,
  socialMedia,
  setIsBlendMode,
  isDesktopClicked,
  setIsDesktopClicked,
}: IProps) {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.5,
  });

  const router = useRouter();

  const onProjectClick = () => {
    if (window.innerWidth > 1100) {
      setIsBlendMode(false);
      setIsDesktopClicked(true);
    } else {
      router.push(`/work/${project.slug.current}`);
    }
  };

  useEffect(() => {
    const handleScroll = () => {
      setTimeout(() => {
        setIsDesktopClicked(false);
        setIsBlendMode(true);
      }, 200);
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [isDesktopClicked, setIsDesktopClicked, setIsBlendMode]);

  return (
    <div
      id={project._id}
      ref={ref}
      key={project._id}
      className="group relative flex w-full max-w-[150rem] flex-col items-center justify-center px-5 py-0 md:h-screen md:py-0"
    >
      {!isDesktopClicked && (
        <button
          onClick={onProjectClick}
          className="absolute z-30 h-screen w-full bg-transparent"
        />
      )}
      <div className="z-10 flex w-full translate-y-20 mix-blend-exclusion lg:hidden lg:h-36 lg:translate-y-12">
        <AnimUp inView={inView} duration={1.5}>
          <h2
            className={`flex pt-5 text-left font-humane text-[10rem] uppercase leading-[0.8] lg:m-0`}
          >
            {project.name}
          </h2>
        </AnimUp>
      </div>
      <div
        className={`relative top-20 ${
          isDesktopClicked ? "scale-110 opacity-30" : "scale-100"
        } h-[220px] max-h-[600px] w-full max-w-5xl transform cursor-pointer overflow-hidden duration-700 phone:h-[400px] md:h-[80%] lg:w-10/12`}
      >
        <Image
          loading="lazy"
          className="object-cover"
          src={project.mainImage.url}
          alt={
            project.mainImage?.alt
              ? project.mainImage.alt
              : "Main project Image"
          }
          fill
        />
      </div>
      <ProjectDetails isDesktopClicked={isDesktopClicked} project={project} />
      <HoverProjectDetails
        isDesktopClicked={isDesktopClicked}
        project={project}
        socialMedia={socialMedia}
        index={index}
      />
    </div>
  );
}

export default OneProject; 