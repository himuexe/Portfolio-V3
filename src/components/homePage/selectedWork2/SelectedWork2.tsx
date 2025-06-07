"use client";

import React, { useRef } from "react";
import { IProject, ISocialMedia } from "@/utils/types";
import H1 from "@/components/global/H1";
import { useInView } from "react-intersection-observer";
import OneProject from "./OneProject";

interface IProps {
  projects?: IProject[];
  socialMedia?: ISocialMedia[];
}

function SelectedWork2({ projects = [], socialMedia = [] }: IProps) {
  const ref = useRef<HTMLDivElement | null>(null);
  const [inViewRef] = useInView({ 
    triggerOnce: true,
    threshold: 0.1
  });

  // If no projects are passed, don't render the component
  if (!projects || projects.length === 0) {
    return null;
  }

  // Create a ref callback function to handle both refs
  const setRefs = (node: HTMLDivElement | null) => {
    // For the useRef hook
    ref.current = node;
    // For the useInView hook
    inViewRef(node);
  };

  // Limit to 3 projects to display
  const displayProjects = projects.slice(0, 3);

  return (
    <div 
      ref={setRefs}
      className="relative z-20 flex w-full justify-center bg-background"
    >
      <div className="flex max-w-[150rem] flex-col items-start justify-center px-0 py-20 lg:mt-0 lg:px-10 lg:py-0 lg:pt-20">
        <div className="px-5 lg:px-0">
          <H1 title="SELECTED WORK" />
        </div>
        
        <div className="mt-5 flex w-full flex-col flex-wrap lg:mt-10 lg:flex-row">
          {displayProjects.map((project: IProject, index) => {
            return (
              <OneProject 
                key={project.id || project._id} 
                index={index} 
                project={project}
                socialMedia={socialMedia}
              />
            );
          })}
        </div>
      </div>
    </div>
  );
}

export default SelectedWork2; 