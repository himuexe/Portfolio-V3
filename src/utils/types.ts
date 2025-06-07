// Service types for portfolio sections
export interface IServices {
  name: string;
  description: string;
}

// Sanity image type
export interface SanityImage {
  _type: string;
  asset: {
    _ref: string;
    _type: string;
  };
  [key: string]: unknown; // For any other Sanity-specific properties
}

// Project types for portfolio showcase
export interface IProject {
  id?: string;
  _id?: string;
  name: string;
  title: string;
  description: string;
  link?: string;
  slug?: {
    current: string;
  };
  categories: Array<string | { _id?: string; title: string }>;
  primaryColor?: string;
  secondaryColor?: string;
  date: string;
  techno: Array<string | { _id?: string; title: string }>;
  mainImage: {
    src?: string;
    url?: string;
    alt?: string;
  } | SanityImage;
  gallery?: Array<SanityImage | { src?: string; url?: string; alt?: string; }>;
}

// Experience types for timeline
export interface IExperience {
  id: string;
  company: string;
  position: string;
  duration: string;
  description: string;
  technologies: string[];
}

// Social media types
export interface ISocialMedia {
  _id?: string;
  name: string;
  link: string;
  icon?: string;
  url?: string;
} 