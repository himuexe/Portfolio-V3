import { Metadata } from 'next';
import Header from "@/components/homePage/header/Header";
import Services from "@/components/homePage/services/Services";
import SelectedWork2 from "@/components/homePage/selectedWork2/SelectedWork2";
import Experience from "@/components/homePage/experience/Experience";
import AboutSection from "@/components/homePage/about/AboutSection";
import PageTransition from "@/components/layout/PageTransition";
import Footer from "@/components/homePage/footer/Footer";
import { client } from "../../sanity/lib/client";
import { cache } from "react";
import {
  getAllProject,
  getFeaturedProjects,
  getAllServices,
  getAllSocialMedia,
} from "../../sanity/lib/queries";

const clientFetch = cache(client.fetch.bind(client));

export const revalidate = 60;

export const metadata: Metadata = {
  title: "Himanshu Sharma | Creative Full Stack Developer",
  description: "Creative developer crafting exceptional digital experiences with modern web technologies.",
};

export default async function Home() {
  // Get featured projects for the homepage - fallback to all projects if none are featured
  let featuredProjects = await clientFetch(getFeaturedProjects);
  
  // If no featured projects, get all projects (limited to 3)
  if (!featuredProjects || featuredProjects.length === 0) {
    const allProjects = await clientFetch(getAllProject);
    featuredProjects = allProjects.slice(0, 3);
  }
  
  const socialMedia = await clientFetch(getAllSocialMedia);
  const services = await clientFetch(getAllServices);

  return (
    <PageTransition>
      <main>
        <Header />
        <Services services={services} />
        <SelectedWork2 projects={featuredProjects} socialMedia={socialMedia} />
        <Experience />
        <AboutSection />
        <Footer socialMedia={socialMedia} />
      </main>
    </PageTransition>
  );
}
