"use client";

import Image from "next/image";
import React, { Dispatch, SetStateAction, useEffect } from "react";
import { IProject, SanityImage, ISocialMedia } from "@/utils/types";
import { useInView } from "react-intersection-observer";
import AnimUp from "@/components/animated/AnimUp";
import Cursor from "@/components/Cursor";
import { useRouter } from "next/navigation";
import urlFor from "../../../sanity/lib/image";
import { motion } from "framer-motion";

interface IProps {
  project: IProject;
  index: number;
  socialMedia?: ISocialMedia[];
  isDesktopClicked?: boolean;
  setIsDesktopClicked?: Dispatch<SetStateAction<boolean>>;
  setIsBlendMode?: Dispatch<SetStateAction<boolean>>;
}

function OneProject({ 
  project, 
  isDesktopClicked = false,
  setIsDesktopClicked = () => {},
  setIsBlendMode = () => {} 
}: IProps) {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.5,
  });

  const router = useRouter();

  const onProjectClick = () => {
    // If project has a direct link, navigate to it
    if (project.link) {
      window.open(project.link, '_blank');
    } 
    // Otherwise navigate to the project detail page if it has a slug
    else if (project.slug?.current) {
      router.push(`/work/${project.slug.current}`);
    }
  };

  useEffect(() => {
    const handleScroll = () => {
      if (isDesktopClicked) {
        setTimeout(() => {
          setIsDesktopClicked(false);
          setIsBlendMode(true);
        }, 200);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [isDesktopClicked, setIsDesktopClicked, setIsBlendMode]);

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
    <motion.div
      ref={ref}
      className="group relative flex h-full flex-col items-center overflow-hidden rounded-lg bg-black/10 backdrop-blur-sm transition-all duration-300 hover:bg-black/20"
      whileHover={{ 
        y: -4,
        transition: { duration: 0.3 }
      }}
      initial={{ opacity: 0, y: 30 }}
      animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
      transition={{ duration: 0.6, delay: 0.1 }}
    >
      <button
        onClick={onProjectClick}
        className="absolute z-30 h-full w-full bg-transparent cursor-pointer"
      />
      
      <Cursor
        className="hidden group-hover:flex group-hover:bg-white"
        name={project.name}
      />
      
      <div className="relative w-full">
        <AnimUp inView={inView} duration={1.2} className="flex w-full justify-between p-4">
          <h2 className="font-Antonio text-xl font-bold uppercase sm:text-2xl">
            {project.name}
          </h2>
          <motion.div
            onClick={onProjectClick}
            className="cursor-pointer p-1"
            whileHover={{ rotate: -45, scale: 1.1 }}
            transition={{ duration: 0.2 }}
          >
            <Image
              className="rotate-12 transform"
              src="/Arrow.svg"
              alt="arrow"
              width={28}
              height={28}
            />
          </motion.div>
        </AnimUp>
        
        <div
          onClick={onProjectClick}
          className="overflow-hidden cursor-pointer"
        >
          <AnimUp inView={inView} duration={2}>
            <div className="relative aspect-[4/3] overflow-hidden">
              <motion.div
                whileHover={{ scale: 1.03 }}
                transition={{ duration: 0.4 }}
              >
                <Image
                  className="h-full w-full object-cover opacity-90 transition duration-300 ease-out group-hover:opacity-100"
                  src={getImageUrl()}
                  alt={getImageAlt()}
                  width={800}
                  height={600}
                />
              </motion.div>
            </div>
          </AnimUp>
        </div>
      </div>

      <div className="w-full p-4 pt-2">
        <AnimUp inView={inView} duration={2} className="flex flex-wrap gap-1 font-Antonio text-sm text-white/70">
          {Array.isArray(project.categories) ? 
            project.categories.map((category, idx) => {
              const categoryTitle = typeof category === 'string' ? category : category.title;
              return (
                <span key={idx} className="after:content-['/'] after:ml-1 last:after:content-none">
                  {categoryTitle}
                </span>
              );
            }) : null}
        </AnimUp>

        {project.description && (
          <AnimUp inView={inView} duration={2.2} className="mt-3">
            <p className="text-sm text-white/60 line-clamp-2">{project.description}</p>
          </AnimUp>
        )}
        
        <AnimUp
          inView={inView}
          duration={2.5}
          className="mt-4 flex items-center justify-between font-Antonio text-sm"
        >
          <span className="opacity-70">
            {new Date(project.date).getFullYear()}
          </span>
          
          {project.link && (
            <span className="cursor-pointer rounded-full border border-white/20 px-3 py-1 text-xs uppercase tracking-wider transition-colors hover:bg-white hover:text-black">
              View Project
            </span>
          )}
        </AnimUp>
      </div>
    </motion.div>
  );
}

export default OneProject; 