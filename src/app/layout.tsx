import type { Metadata } from "next";
import { Antonio } from "next/font/google";
import localFont from "next/font/local";
import "./globals.css";
import { Providers } from "./providers";
import LenisScrollProvider from "@/components/layout/LenisScrollProvider";
import ProgressBar from "@/components/layout/ProgressBar";
import ScrollProgress from "@/components/animated/ScrollProgress";
import Loading from "@/components/layout/Loading";
import Navbar from "@/components/layout/navbar/Navbar";
import ErrorBoundary from "@/components/layout/ErrorBoundary";
import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/next";

// Google Fonts
const antonio = Antonio({
  subsets: ["latin"],
  variable: "--font-antonio",
  display: "swap",
});

// Local Fonts
const humane = localFont({
  src: [
    {
      path: "../../public/fonts/humane/Humane-Light.ttf",
      weight: "300",
      style: "normal",
    },
    {
      path: "../../public/fonts/humane/Humane-Regular.ttf",
      weight: "400",
      style: "normal",
    },
    {
      path: "../../public/fonts/humane/Humane-Medium.ttf",
      weight: "500",
      style: "normal",
    },
    {
      path: "../../public/fonts/humane/Humane-Bold.ttf",
      weight: "700",
      style: "normal",
    },
  ],
  variable: "--font-humane",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Himanshu Sharma | Creative Full Stack Developer",
  description: "Creative developer  crafting exceptional digital experiences with modern web technologies.",
  keywords: ["portfolio", "web developer", "creative developer", "framer", "react", "next.js", "three.js"],
  authors: [{ name: "Himanshu Sharma" }],
  creator: "Himanshu Sharma",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://portfolio-v3-six-olive.vercel.app",
    title: "Himanshu Sharma | Creative Full Stack Developer",
    description: "Creative developer  crafting exceptional digital experiences with modern web technologies.",
    siteName: "Portfolio V3",
  },
  twitter: {
    card: "summary_large_image",
    title: "Himanshu Sharma | Creative Full Stack Developer",
    description: "Creative developer  crafting exceptional digital experiences with modern web technologies.",
    creator: "@luv_vice",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${humane.variable} ${antonio.variable}`}>
      <body className="bg-[#111111] text-white antialiased">
        <Providers>
          <LenisScrollProvider>
            <ProgressBar />
            <ScrollProgress />
            <Loading />
            <ErrorBoundary>
              <Navbar />
              {children}
            </ErrorBoundary>
            <Analytics />
            <SpeedInsights />
          </LenisScrollProvider>
        </Providers>
      </body>
    </html>
  );
}
