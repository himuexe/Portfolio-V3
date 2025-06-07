import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import PageTransition from "@/components/layout/PageTransition";
import React, { cache } from "react";
import { client } from "../../../../sanity/lib/client";
import {
  getAllSocialMedia,
  getOneProject,
  getProjectsSlug,
} from "../../../../sanity/lib/queries";
import Footer from "@/components/homePage/footer/Footer";
import Header from "@/components/work/oneWork/Header";
import urlFor from "../../../../sanity/lib/urlFor";
import { IProject } from "@/utils/types";

const clientFetch = cache(client.fetch.bind(client));

export const revalidate = 60;

interface ProjectPageProps {
  params: {
    slug: string;
  };
}

interface TechItem {
  _id: string;
  title: string;
}

export async function generateMetadata({ params }: ProjectPageProps): Promise<Metadata> {
  // Get the slug from params - await params in Next.js 15
  const { slug } = await params;
  
  const project = await client.fetch(getOneProject, {
    slug,
  });

  if (!project) {
    return {
      title: "Project Not Found | Portfolio V3",
    };
  }

  const techno = Array.isArray(project.techno)
    ? project.techno.map((item: TechItem) => item.title).join(", ")
    : "";

  return {
    title: `${project.name} | Portfolio V3`,
    description: `Explore ${project.title}, a project focusing on ${techno}.`,
    openGraph: project.mainImage ? {
      images: [
        {
          url: urlFor(project.mainImage).url(),
          alt: project.title,
        },
      ],
    } : undefined,
  };
}

interface SanitySlug {
  slug: {
    current: string;
  };
}

export async function generateStaticParams() {
  try {
    const slugs = await client.fetch(getProjectsSlug);
    
    // Ensure slugs is an array and each item has a current property
    if (!Array.isArray(slugs) || slugs.length === 0) {
      console.warn('No project slugs found from Sanity');
      return [];
    }
    
    return slugs
      .filter((item: SanitySlug) => item && item.slug && typeof item.slug.current === 'string')
      .map((item: SanitySlug) => ({
        slug: item.slug.current,
      }));
  } catch (error) {
    console.error('Error fetching project slugs:', error);
    return [];
  }
}

export default async function ProjectPage({ params }: ProjectPageProps) {
  // Get the slug from params - await params in Next.js 15
  const { slug } = await params;
  
  const project = await client.fetch(getOneProject, { slug }) as IProject;
  const socialMedia = await clientFetch(getAllSocialMedia);

  if (!project) {
    notFound();
  }

  return (
    <PageTransition value={project.name.toUpperCase()}>
      <Header project={project} />
      <Footer socialMedia={socialMedia} />
    </PageTransition>
  );
} 