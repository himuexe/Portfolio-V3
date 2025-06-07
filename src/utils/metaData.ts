import { Metadata } from 'next';

const globalMetadata: Metadata = {
  title: "Himanshu Sharma | Portfolio",
  description: "Creative Developer & Designer Portfolio",
  keywords: ["portfolio", "developer", "designer", "creative", "web development"],
  authors: [{ name: "Himanshu Sharma" }],
  creator: "Himanshu Sharma",
  publisher: "Himanshu Sharma",
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://portfolio-v3.dev',
    title: "Himanshu Sharma | Portfolio",
    description: "Creative Developer & Designer Portfolio",
    siteName: "Portfolio V3",
  },
  twitter: {
    card: 'summary_large_image',
    title: "Himanshu Sharma | Portfolio",
    description: "Creative Developer & Designer Portfolio",
    creator: '@himuexe',
  },
  verification: {
    google: 'your-google-verification-code',
  },
};

export default globalMetadata; 