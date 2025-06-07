"use client";

import Image from "next/image";
import React from "react";
import { IProject, SanityImage, ISocialMedia } from "@/utils/types";
import { useInView } from "react-intersection-observer";
import AnimUp from "@/components/animated/AnimUp";
import Cursor from "@/components/Cursor";
import { useRouter } from "next/navigation";
import urlFor from "../../../../sanity/lib/urlFor";

interface IProps {
  project: IProject;
  index: number;
  socialMedia?: ISocialMedia[];
}

function OneProject({ project, index  }: IProps) {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.5,
  });

  const router = useRouter();

  // Handle opening the external link if provided
  const handleArrowClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (project.link) {
      window.open(project.link, '_blank');
    }
  };
  
  // Handle navigating to the project detail page
  const handleImageClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (project.slug?.current) {
      router.push(`/work/${project.slug.current}`);
    }
  };

  // Get the correct image URL based on the project data
  const getImageUrl = (): string => {
    // If it's a standard URL from src or url property
    if ('src' in project.mainImage && typeof project.mainImage.src === 'string') {
      return project.mainImage.src;
    }
    if ('url' in project.mainImage && typeof project.mainImage.url === 'string') {
      return project.mainImage.url;
    }
    
    // If it's a Sanity image object
    if ('_type' in project.mainImage && 'asset' in project.mainImage) {
      return urlFor(project.mainImage as SanityImage).url();
    }
    
    // Default placeholder
    return "/image/placeholder.jpg";
  };

  // Get alt text for the image
  const getImageAlt = (): string => {
    if ('alt' in project.mainImage && typeof project.mainImage.alt === 'string') {
      return project.mainImage.alt;
    }
    return "Project image";
  };

  return (
    <div
      ref={ref}
      className={`${
        index % 3 === 0 ? "w-full" : "w-full lg:w-1/2"
      } group flex flex-col items-center border border-white border-opacity-20 p-4 lg:p-10`}
    >
      <Cursor
        className="hidden group-hover:flex group-hover:bg-white"
        name={project.name}
      />
      
      <div className="w-full">
        <AnimUp inView={inView} duration={1.2} className="flex justify-between">
          <h2 className="mb-2 font-Antonio text-xl font-bold uppercase">
            {project.name}
          </h2>
          <div
            onClick={handleArrowClick}
            className="cursor-pointer z-10"
          >
            <Image
              className="rotate-12 transform duration-500 group-hover:-rotate-[80deg]"
              src="/Arrow.svg"
              alt="arrow"
              width={20}
              height={20}
            />
          </div>
        </AnimUp>
        
        <AnimUp inView={inView} duration={2}>
          <div
            onClick={handleImageClick}
            className={`relative overflow-hidden cursor-pointer ${
              inView ? "scale-100" : "scale-20"
            } w-full flex justify-center items-center`}
          >
            <Image
              className="w-full h-auto transform object-cover opacity-100 transition duration-700 ease-out hover:scale-[97%] group-hover:opacity-100 lg:opacity-80"
              src={getImageUrl()}
              alt={getImageAlt()}
              width={1500}
              height={900}
            />
          </div>
        </AnimUp>

        <div className="mt-2 flex justify-between space-x-2">
          <AnimUp inView={inView} duration={2}>
            <div className="flex w-6/12 font-Antonio text-base">
              {Array.isArray(project.categories) ? 
                project.categories.map((category, idx) => {
                  const categoryTitle = typeof category === 'string' ? category : category.title;
                  const key = typeof category === 'string' ? `cat-${idx}` : (category._id || `cat-${idx}`);
                  return (
                    <p className="flex" key={key}>
                      <span className="flex">&nbsp;</span>
                      {categoryTitle}&nbsp;/
                    </p>
                  );
                }) : null}
            </div>
          </AnimUp>

          <AnimUp
            inView={inView}
            duration={2}
            className="flex w-full items-start justify-end font-Antonio text-base lg:mr-5"
          >
            <p className="mr-2 hidden opacity-50 md:flex">Completed</p>
            {new Date(project.date).toLocaleDateString("en-US", {
              day: "numeric",
              month: "long",
              year: "numeric",
            })}
          </AnimUp>
        </div>
      </div>
    </div>
  );
}

export default OneProject; 