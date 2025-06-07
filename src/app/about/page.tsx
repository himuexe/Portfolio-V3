import { Metadata } from 'next';
import HeaderAbout from "@/components/about/HeaderAbout";
import ContentAbout from "@/components/about/ContentAbout";
import PageTransition from "@/components/layout/PageTransition";
import Footer from '@/components/homePage/footer/Footer';
import {
  getAllSocialMedia,
} from "../../../sanity/lib/queries";
import { client } from '../../../sanity/lib/client';
import { cache } from "react";

const clientFetch = cache(client.fetch.bind(client));

export const metadata: Metadata = {
  title: "About | Portfolio V3",
  description: "Learn more about me, my skills, and my journey as a full-stack developer",
};

export default async function About() {
  const socialMedia = await clientFetch(getAllSocialMedia);

  return (
    <PageTransition value="ABOUT">
      <main>
        <HeaderAbout />
        <ContentAbout />
        <Footer socialMedia={socialMedia} />
      </main>
    </PageTransition>
  );
} 