"use client";
import React, { useEffect } from "react";
import { useInView } from "react-intersection-observer";
import AnimUp from "@/components/animated/AnimUp";
import Image from "next/image";
import { useRouter } from "next/navigation";
import ComeUpText from "@/components/animated/ComeUpText";
import WordAnim from "@/components/animated/WordAnim";
import urlFor from "../../../../sanity/lib/urlFor";
import { IProject, SanityImage } from "@/utils/types";

function Header({ project }: { project: IProject }) {
  
  // Debug logging
  useEffect(() => {
    console.log("Project in Header component:", project);
    // Check image
    if (project.mainImage) {
      console.log("Image data:", project.mainImage);
      if ('asset' in project.mainImage) {
        try {
          const imageUrl = urlFor(project.mainImage).url();
          console.log("Generated image URL:", imageUrl);
        } catch (error) {
          console.error("Error generating image URL:", error);
        }
      }
    }
    // Check gallery
    if (project.gallery) {
      console.log("Gallery data:", project.gallery);
    }
  }, [project]);

  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.2,
  });
  const router = useRouter();

  const displayIndex = (index: number) => {
    if (index + 1 >= 0 && index + 1 <= 9) {
      return `#0${index + 1}`;
    }
    return `#${index}`;
  };

  const splitedName = project.name.split("");

  // Get categories display
  const categoriesDisplay = project.categories.map(category => {
    return typeof category === 'string' ? category : category.title;
  });

  // Get technologies display
  const technoDisplay = project.techno.map(tech => {
    return typeof tech === 'string' ? tech : tech.title;
  });

  // Get image URL for gallery if available
  const getGalleryImageUrl = (image: SanityImage | { src?: string; url?: string; alt?: string }): string => {
    if ('src' in image && image.src && typeof image.src === 'string') return image.src;
    if ('url' in image && image.url && typeof image.url === 'string') return image.url;
    if ('asset' in image) {
      try {
        const url = urlFor(image).url();
        return url || '/placeholder-image.jpg';
      } catch (error) {
        console.error('Error generating image URL:', error);
        return '/placeholder-image.jpg';
      }
    }
    return '/placeholder-image.jpg'; // fallback image
  };

  return (
    <div
      className={`flex w-screen justify-center`}
      style={{
        backgroundColor: project.primaryColor || "#121212",
      }}
    >
      <div className="justify-centers relative flex w-full max-w-[150rem] flex-col items-start px-0 pb-10 pt-20 font-Antonio lg:flex-row lg:px-10">
        <div
          ref={ref}
          className="z-10 flex w-full flex-col justify-between px-5 lg:sticky lg:top-[50%] lg:min-h-[80vh] lg:w-[22%] lg:-translate-y-1/2 lg:px-0 lg:pr-10"
          style={{
            color: project.secondaryColor || "#FFFFFF",
          }}
        >
          <div className="flex flex-col justify-between">
            <button
              type="button"
              onClick={() => router.push("/work")}
              className="group"
            >
              <AnimUp
                inView={inView}
                duration={1.5}
                delay={1.2}
                className="flex space-x-2 text-base"
              >
                <svg
                  className="rotate-[150deg] transform duration-500 group-hover:rotate-[185deg]"
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                >
                  <path d="M5 12h14M12 5l7 7-7 7" />
                </svg>
                <ComeUpText text={"BACK TO WORKS"} />
              </AnimUp>
            </button>

            <div className="mt-10 flex flex-wrap ">
              {splitedName.map((word, index) => {
                return (
                  <div key={index} className="!font-humane" >
                    <WordAnim
                      marge=""
                      textSize="!text-[10rem] !leading-[8rem]"
                      word={word.toUpperCase()}
                      isAnim={inView}
                    />
                  </div>
                );
              })}
            </div>
            <AnimUp
              duration={1.2}
              delay={1.2}
              inView={inView}
              className="font-humane text-9xl"
            >
              <p>{displayIndex(1)}</p>
            </AnimUp>
          </div>
          <div className="flex-flex-col h-full items-center justify-center space-y-3 pt-5 font-Antonio text-sm">
            <AnimUp inView={inView} duration={1} delay={1.2}>
              <p className="mr-2 hidden text-gray-400 md:flex">Completed</p>
              <p className="text-base">
                {new Date(project.date).toLocaleDateString("en-En", {
                  day: "numeric",
                  month: "long",
                  year: "numeric",
                })}
              </p>
            </AnimUp>
            <AnimUp inView={inView} duration={1.2} delay={1.2}>
              <p className="hidden items-center text-gray-400 md:flex">Role</p>
              <div className="flex w-full flex-wrap text-sm">
                {categoriesDisplay.map((category, index) => {
                  return (
                    <p className="flex text-base" key={index}>
                      {category}
                      {index + 1 < categoriesDisplay.length && "/"}
                      &nbsp;{" "}
                    </p>
                  );
                })}
              </div>
            </AnimUp>
            <AnimUp inView={inView} duration={1.5} delay={1.2}>
              <p className="mr-2 hidden text-gray-400 md:flex">Technologies</p>
              <div className="flex flex-wrap text-sm">
                {technoDisplay.map((tech, index) => {
                  return (
                    <p key={index}>
                      {" "}
                      <span>&nbsp;</span>
                      {tech}&nbsp; {index + 1 < technoDisplay.length && "/"}
                    </p>
                  );
                })}
              </div>
            </AnimUp>

            {project.link && project.link !== "" && (
              <AnimUp
                inView={inView}
                duration={1.5}
                delay={1.2}
                className="pt-5 text-base"
              >
                <a href={project.link} target="_blank" className="underline">
                  VISIT PROJECT
                </a>
              </AnimUp>
            )}
          </div>
        </div>

        <div className="fixed -bottom-10 left-0 z-0 flex w-full max-w-[150rem] flex-col px-4 font-humane text-[28rem] opacity-5 md:flex-row md:px-20">
          <div className="flex">
            <h2 className="uppercase leading-[0.8]">W</h2>
            <h2 className="uppercase leading-[0.8]">0</h2>
          </div>
          <div className="flex">
            <h2 className="uppercase leading-[0.8]">R</h2>
            <h2 className="uppercase leading-[0.8]">K</h2>
          </div>
        </div>

        <div className="mt-5 flex w-full flex-col justify-between px-5 lg:sticky lg:top-[55%] lg:mt-0 lg:hidden lg:min-h-[80vh] lg:w-[22%] lg:-translate-y-1/2 lg:pl-10">
          <AnimUp
            inView={inView}
            duration={1.5}
            delay={1.2}
            className="text-base"
          >
            <p>{project.title}</p>
          </AnimUp>
          <AnimUp
            inView={inView}
            duration={1.5}
            delay={1.2}
            className="pt-5 font-Antonio text-sm"
          >
            <p>{project.description}</p>
          </AnimUp>
        </div>
        <div className="w-full px-4 lg:w-[70%] lg:px-0 lg:pb-80">
          {project.gallery && (
            <AnimUp
              inView={inView}
              duration={1.5}
              delay={1.2}
              className="flex w-full flex-col items-center justify-center space-y-5 pt-10 lg:space-y-10 lg:pt-0"
            >
              {project.gallery?.map((image, index) => (
                <div key={index} className="w-full overflow-hidden rounded-lg">
                  <Image
                    src={getGalleryImageUrl(image)}
                    alt={`Project image ${index + 1}`}
                    width={1200}
                    height={800}
                    className="w-full object-cover"
                  />
                </div>
              ))}
            </AnimUp>
          )}
          <button
            type="button"
            onClick={() => router.push("/work")}
            className="group ml-5 mt-5 lg:ml-0 lg:mt-10"
          >
            <AnimUp
              inView={inView}
              duration={1.5}
              delay={1.2}
              className="flex space-x-2 text-base"
            >
              <svg
                className="rotate-[150deg] transform duration-500 group-hover:rotate-[185deg]"
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="currentColor"
              >
                <path d="M5 12h14M12 5l7 7-7 7" />
              </svg>
              <ComeUpText text={"BACK TO WORKS"} />
            </AnimUp>
          </button>
        </div>
        <div className="hidden w-full flex-col justify-between lg:sticky lg:top-1/2 lg:flex lg:min-h-[80vh] lg:w-[25%] lg:-translate-y-1/2 lg:pl-10">
          <AnimUp
            inView={inView}
            duration={1.5}
            delay={1.2}
            className="text-base"
          >
            <p>{project.title}</p>
          </AnimUp>
          <AnimUp
            inView={inView}
            duration={1.5}
            delay={1.2}
            className="pt-5 font-Antonio text-sm"
          >
            <p>{project.description}</p>
          </AnimUp>
        </div>
      </div>
    </div>
  );
}

export default Header; 