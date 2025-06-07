import { Metadata } from 'next';
import List from "@/components/work/List";
import PageTransition from "@/components/layout/PageTransition";
import Footer from "@/components/homePage/footer/Footer";
import { client } from "../../../sanity/lib/client";
import {
  getAllProject,
  getAllProjectCategories,
  getAllSocialMedia
} from "../../../sanity/lib/queries";
import { cache } from "react";

const clientFetch = cache(client.fetch.bind(client));

export const revalidate = 60;

export const metadata: Metadata = {
  title: "Work | Portfolio V3",
  description: "Explore my portfolio of creative projects and web applications",
};

export default async function Work() {
  // Fetch real data from Sanity
  const projects = await clientFetch(getAllProject);
  const categories = await clientFetch(getAllProjectCategories);
  const socialMedia = await clientFetch(getAllSocialMedia);
  
  return (
    <PageTransition value="WORK">
      <main>
        <List projects={projects} categories={categories} />
        <Footer socialMedia={socialMedia} />
      </main>
    </PageTransition>
  );
} 