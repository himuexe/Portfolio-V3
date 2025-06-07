import { Metadata } from 'next';
import ContactHeader from "@/components/contact/ContactHeader";
import ContactForm from "@/components/forms/ContactForm";
import ContactInfo from "@/components/contact/ContactInfo";
import PageTransition from "@/components/layout/PageTransition";
import Footer from '@/components/homePage/footer/Footer';
import { cache } from "react";
import { client } from "../../../sanity/lib/client";
import { getAllSocialMedia } from "../../../sanity/lib/queries";

const clientFetch = cache(client.fetch.bind(client));

export const metadata: Metadata = {
  title: "Contact | Portfolio V3",
  description: "Get in touch for collaborations, projects, or just to say hello. Let's create something amazing together.",
};

export default async function Contact() {
  const socialMedia = await clientFetch(getAllSocialMedia);
  
  return (
    <PageTransition value="CONTACT">
      <main>
        <div className="relative mx-auto w-full max-w-[150rem] px-5 pt-20 lg:px-10">
          <ContactHeader />
          <div className="flex flex-col items-start md:flex-row">
            <ContactForm />
            <ContactInfo socialMedia={socialMedia} />
          </div>
        </div>
        <Footer socialMedia={socialMedia} />
      </main>
    </PageTransition>
  );
} 