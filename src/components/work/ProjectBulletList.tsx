import React from "react";
import Link from "next/link";
import { IProject } from "@/utils/types";
import AnimUp from "@/components/animated/AnimUp";
import { useInView } from "react-intersection-observer";

interface IProps {
  project: IProject;
  index: number;
}

function ProjectBulletList({ project, index }: IProps) {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.5,
  });

  // Get categories display
  const categoriesDisplay = project.categories.map(category => {
    return typeof category === 'string' ? category : category.title;
  });

  return (
    <div ref={ref} className="group">
      <Link href={`/work/${project.slug?.current || project.id || project._id}`}>
        <div className="flex flex-col border-b border-white border-opacity-20 pb-10 md:flex-row md:items-center md:justify-between">
          <div className="flex w-full flex-col md:w-8/12">
            <AnimUp inView={inView} duration={1 + index * 0.1}>
              <h2 className="mb-2 font-Antonio text-2xl font-bold uppercase md:text-3xl">
                {project.name}
              </h2>
            </AnimUp>
            <AnimUp inView={inView} duration={1.2 + index * 0.1}>
              <p className="mb-4 text-lg opacity-80 md:text-xl">
                {project.description}
              </p>
            </AnimUp>
            <AnimUp inView={inView} duration={1.4 + index * 0.1}>
              <div className="flex flex-wrap gap-2">
                {categoriesDisplay.map((category, idx) => (
                  <span
                    key={idx}
                    className="rounded-full border border-white/20 px-3 py-1 text-sm"
                  >
                    {category}
                  </span>
                ))}
              </div>
            </AnimUp>
          </div>
          
          <div className="mt-4 flex w-full flex-col items-start md:mt-0 md:w-4/12 md:items-end">
            <AnimUp inView={inView} duration={1.6 + index * 0.1}>
              <div className="mb-2 flex items-center space-x-2">
                <span className="text-sm opacity-50">Completed</span>
                <span className="font-Antonio">
                  {new Date(project.date).toLocaleDateString("en-En", {
                    day: "numeric",
                    month: "long",
                    year: "numeric",
                  })}
                </span>
              </div>
            </AnimUp>
            <AnimUp inView={inView} duration={1.8 + index * 0.1}>
              <div className="flex items-center space-x-2 font-Antonio text-sm uppercase opacity-70 group-hover:opacity-100">
                <span>View Project</span>
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  className="transform transition-transform group-hover:translate-x-1"
                >
                  <path d="M5 12h14M12 5l7 7-7 7" />
                </svg>
              </div>
            </AnimUp>
          </div>
        </div>
      </Link>
    </div>
  );
}

export default ProjectBulletList; 