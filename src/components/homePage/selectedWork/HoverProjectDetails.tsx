"use client";

import React from "react";
import AnimUp from "@/components/animated/AnimUp";
import Link from "next/link";

// Define types for the component
interface Project {
  _id: string;
  name: string;
  slug: { current: string };
  date: string;
  description: string;
  categories: { _id: string; title: string }[];
  techno: { _id: string; title: string }[];
}

interface SocialMedia {
  _id: string;
  title: string;
  url: string;
}

interface IProps {
  project: Project;
  isDesktopClicked: boolean;
  index: number;
  socialMedia: SocialMedia[];
}

function HoverProjectDetails({
  project,
  isDesktopClicked,
  index,
}: IProps) {
  const displayIndex = (index: number) => {
    if (index + 1 >= 0 && index + 1 <= 9) {
      return `#0${index + 1}`;
    }
    return `#${index}`;
  };
  
  return (
    <div className="absolute left-[35%] top-1/4 z-20 hidden h-[70%] w-[25%] -translate-x-2/3 flex-col lg:flex">
      {/* INDEX NUMBER */}
      <AnimUp
        duration={1.2}
        inView={isDesktopClicked}
        className="font-humane text-9xl"
      >
        <p>{displayIndex(index)}</p>
      </AnimUp>

      {/* INDEX 1 */}
      <div className="flex-flex-col h-full items-center justify-center space-y-1 pt-5 font-Antonio text-sm">
        <AnimUp
          inView={isDesktopClicked}
          duration={1}
          className="flex items-center lg:mr-5"
        >
          <p className="mr-2 hidden text-gray-300 md:flex">Completed</p>
          <p className="text-sm">
            {new Date(project.date).toLocaleDateString("en-En", {
              day: "numeric",
              month: "long",
              year: "numeric",
            })}
          </p>
        </AnimUp>
        <AnimUp
          inView={isDesktopClicked}
          duration={1.2}
          className="flex items-center lg:mr-5"
        >
          <p className="mr-2 hidden items-center text-gray-300 md:flex">Role</p>
          {project.categories.map((c) => {
            return (
              <p className="flex text-sm" key={c._id}>
                <span className="flex">&nbsp;</span>
                {c.title}&nbsp;/
              </p>
            );
          })}
        </AnimUp>
        <AnimUp
          inView={isDesktopClicked}
          duration={1.5}
          className="flex items-center lg:mr-5"
        >
          <p className="mr-2 hidden text-gray-300 md:flex">Technologies</p>
          <div className="flex flex-wrap text-sm">
            {project.techno.map((t) => {
              return (
                <p key={t._id}>
                  {" "}
                  <span>&nbsp;</span>
                  {t.title}&nbsp;/
                </p>
              );
            })}
          </div>
        </AnimUp>
        {/* INDEX 2 */}
        <AnimUp
          inView={isDesktopClicked}
          duration={1.5}
          className="pt-5 text-sm"
        >
          <p>{project.description}</p>
        </AnimUp>
        <AnimUp
          inView={isDesktopClicked}
          duration={2}
          className="pt-5 font-Antonio text-sm font-black underline lg:text-2xl"
        >
          <Link href={`/work/${project.slug.current}`}>EXPLORE</Link>
        </AnimUp>
      </div>
    </div>
  );
}

export default HoverProjectDetails; 