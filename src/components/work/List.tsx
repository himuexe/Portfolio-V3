"use client";
import React, { useState, useMemo, useEffect } from "react";
import OneProject from "../homePage/selectedWork2/OneProject";
import ProjectBulletList from "./ProjectBulletList";
import { IProject } from "@/utils/types";

interface Category {
  _id: string;
  title: string;
}

interface IProps {
  projects: IProject[];
  categories: Category[];
}

function List({ projects, categories }: IProps) {
  // Debug logging
  useEffect(() => {
    console.log("Projects received:", projects);
    console.log("Categories received:", categories);
  }, [projects, categories]);

  // Add "All" category if it doesn't exist
  const allCategories = useMemo(() => {
    const hasAllCategory = categories.some(cat => cat.title === "All");
    if (!hasAllCategory && categories.length > 0) {
      return [{ _id: "all", title: "All" }, ...categories];
    }
    return categories;
  }, [categories]);

  const [categorySelected, setCategorySelected] = useState<Category>(
    allCategories.length > 0 ? allCategories[0] : { _id: "all", title: "All" }
  );
  const [isBulletList, setIsBulletList] = useState(false);

  const filteredProjects = useMemo(() => {
    if (!categorySelected || categorySelected.title === "All") return projects;
    
    return projects.filter((project) => {
      // Check if categories is an array of objects or strings
      return project.categories.some(category => {
        if (typeof category === 'string') {
          return category === categorySelected.title;
        } else {
          return category.title === categorySelected.title;
        }
      });
    });
  }, [categorySelected, projects]);

  // Debug logging for filtered projects
  useEffect(() => {
    console.log("Filtered projects:", filteredProjects);
  }, [filteredProjects]);

  const projectCounts = useMemo(() => {
    const counts: { [key: string]: number } = {};
    
    // Count for all projects
    counts["All"] = projects.length;
    
    // Count by category
    projects.forEach((project) => {
      project.categories.forEach((category) => {
        const categoryTitle = typeof category === 'string' ? category : category.title;
        counts[categoryTitle] = (counts[categoryTitle] || 0) + 1;
      });
    });
    
    return counts;
  }, [projects]);

  const onClick = (c: Category) => {
    if (categorySelected !== c) {
      setCategorySelected(c);
    }
  };

  return (
    <div className="mx-auto w-full max-w-[150rem] px-0 lg:px-10 lg:pt-20">
      <div className="md:pt-18 sticky top-0 z-10 flex flex-col justify-between px-5 pt-16 mix-blend-difference md:top-10 md:flex-row md:items-end">
        <div className="flex w-full flex-col items-end justify-between space-x-5 md:flex-row lg:items-center">
          <div className="relative mb-4 flex w-20 items-center justify-between mix-blend-difference">
            <div
              className={`absolute h-8 w-8 ${
                isBulletList ? "translate-x-0" : "translate-x-[49.6px]"
              } transform border border-b-2 border-white duration-500`}
            />
            <button
              className={`${
                isBulletList ? "scale-75 opacity-100" : "scale-100 opacity-50"
              } transform pl-[2px] duration-500`}
              type="button"
              onClick={() => setIsBulletList(true)}
            >
              <svg width="28" height="28" viewBox="0 0 24 24" fill="currentColor">
                <path d="M4 6h16v2H4zm0 5h16v2H4zm0 5h16v2H4z"/>
              </svg>
            </button>
            <button
              className={`${
                !isBulletList ? "scale-75 opacity-100" : "scale-100 opacity-50"
              } transform pl-[2px] duration-500`}
              type="button"
              onClick={() => setIsBulletList(false)}
            >
              <svg width="28" height="28" viewBox="0 0 24 24" fill="currentColor">
                <path d="M3 3h8v8H3zm10 0h8v8h-8zM3 13h8v8H3zm10 0h8v8h-8z"/>
              </svg>
            </button>
          </div>
          <div className="mt-2 flex items-center space-x-5 font-Antonio text-base underline md:mt-0">
            {allCategories.map((c) => (
              <button
                className={`${
                  categorySelected.title === c.title ? "opacity-100" : "opacity-50"
                }`}
                onClick={() => onClick(c)}
                key={c._id}
              >
                {c.title} ({projectCounts[c.title] || 0})
              </button>
            ))}
          </div>
        </div>
      </div>

      <div>
        {isBulletList ? (
          <div className="mt-5 flex min-h-screen w-full animate-fadeIn flex-col space-y-10 px-5 pb-52 pt-10">
            {filteredProjects.map((project: IProject, index) => {
              return (
                <ProjectBulletList
                  index={index}
                  project={project}
                  key={project._id || project.id}
                />
              );
            })}
          </div>
        ) : (
          <div className="mt-10 flex w-full animate-fadeIn cursor-none flex-col flex-wrap md:mt-32 lg:mt-10 lg:flex-row">
            {filteredProjects.map((project: IProject, index) => {
              return (
                <OneProject
                  index={index}
                  project={project}
                  key={project._id || project.id}
                />
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}

export default List; 