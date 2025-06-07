"use client";

import { useRef, useState } from "react";
import OneProject from "./OneProject";

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
  projects: Project[];
  socialMedia: SocialMedia[];
}


function SelectedWork({ projects, socialMedia }: IProps) {
  const [isDesktopClicked, setIsDesktopClicked] = useState(false);
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [isBlendMode, setIsBlendMode] = useState(true);

  const ref = useRef(null);

  return (
    <div
      ref={ref}
      className="relative z-20 mt-20 flex flex-col items-center justify-center bg-background lg:mt-0"
    >
      <h2 className="sticky top-20 z-0 mr-5 w-full text-right font-humane text-[10rem] uppercase leading-[0.8] opacity-10 lg:mr-0 lg:pl-20 lg:text-left lg:text-[20rem]">
        Selected Work
      </h2>
      
      {projects.map((project: Project, index) => {
        return (
          <OneProject
            isDesktopClicked={isDesktopClicked}
            setIsDesktopClicked={setIsDesktopClicked}
            setIsBlendMode={setIsBlendMode}
            socialMedia={socialMedia}
            project={project}
            key={project._id}
            index={index}
          />
        );
      })}
    </div>
  );
}

export default SelectedWork; 