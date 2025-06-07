"use client";
import React from "react";
import AnimUp from "../animated/AnimUp";
import { useInView } from "react-intersection-observer";

function ContentAbout() {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.2 });

  const stack = [
    {
      name: "Development",
      stacks: [
        "React",
        "NextJS",
        "TypeScript",
        "Tailwind",
        "Node.js",
        "Spring Boot",
        "Docker",
        "Java"
      ],
    },
    {
      name: "CREATIVE DEV",
      stacks: ["Gsap", "ThreeJS", "FramerMotion"],
    },
    {
      name: "CONTENT MANAGEMENT",
      stacks: ["Firebase", "Sanity"],
    },
    {
      name: "DEV OPS",
      stacks: ["Docker", "Kubernetes"],
    },
  ];

  return (
    <div
      ref={ref}
      className="flex w-full max-w-[150rem] flex-col px-5 pb-20 pt-5 font-Antonio lg:px-10 lg:pt-10"
    >
      <div className="w-full pt-10 lg:w-2/4 lg:pt-0">
        <AnimUp inView={inView} duration={0.5}>
          {`I am passionate about creating digital experiences that blend creativity 
          with technical excellence. My approach combines modern web technologies 
          with thoughtful design to craft websites that not only look stunning 
          but also provide exceptional user experiences.`}
        </AnimUp>
        <AnimUp inView={inView} duration={1} className="mt-5">
          {`My journey in web development has been driven by a constant desire to 
          learn and push the boundaries of what's possible on the web. I believe 
          in creating solutions that are both innovative and accessible, ensuring 
          that every project reflects the highest standards of craftsmanship.`}
        </AnimUp>
        <AnimUp inView={inView} duration={1.5} className="mt-10 flex space-x-2">
          <p className="opacity-50">{`LET'S WORK`}</p>
          <a href="mailto:himanshusworkplace@gmail.com">himanshusworkplace@gmail.com</a>
        </AnimUp>
      </div>
      <div className="mt-20 flex w-full flex-col lg:flex-row lg:items-end lg:justify-end">
        <div className="w-full lg:w-3/4">
          <AnimUp inView={inView} duration={2}>
            <h2 className="text-base uppercase">technologies</h2>
          </AnimUp>
          <div className="grid grid-cols-2 gap-5 pt-5 lg:grid-cols-4">
            {stack.map((item) => (
              <div key={item.name}>
                <AnimUp
                  inView={inView}
                  duration={2}
                  className="text-lg uppercase opacity-50"
                >
                  <p>{item.name}</p>
                </AnimUp>
                {item.stacks.map((stack, id) => (
                  <div key={id} className="">
                    <AnimUp inView={inView} duration={2}>
                      <p className="uppercase">{stack}</p>
                    </AnimUp>
                  </div>
                ))}
              </div>
            ))}
          </div>
        </div>
      </div>
      <AnimUp inView={inView} duration={2} className="w-full pt-32 lg:w-6/12">
        {`Every project is an opportunity to create something meaningful and 
        impactful. I'm committed to delivering solutions that not only meet 
        technical requirements but also inspire and engage users through 
        exceptional design and seamless functionality.`}
      </AnimUp>
    </div>
  );
}

export default ContentAbout; 