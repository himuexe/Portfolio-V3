import { groq } from "next-sanity";

export const getAllPosts = groq`
*[_type == "post"] {
    ...,
    author->,
    categories[]->
} | order(publishedAt desc)
`;

export const getAllProject = groq`
*[_type == "project"] {
    ...,
    projectState->,
    categories[]->,
    techno[]->
} | order(date desc)`;

export const getFeaturedProjects = groq`
*[_type == "project" && featured == true] {
    ...,
    projectState->,
    categories[]->,
    techno[]->
} | order(date desc)[0...3]`;

export const getProjectsSlug = groq`
*[_type == "project"] {
slug
}
`;

export const getOneProject = groq`
*[_type == "project" && slug.current == $slug][0] {
  ...,
  projectState->,
  categories[]->,
  techno[]->
}`;

export const getAllSocialMedia = groq`
*[_type == "socialMedia"] {
    ...,
} `;

export const getAllServices = groq`
*[_type == "services"] {
    ...,
}`;

export const getAllProjectCategories = groq`
*[_type == "category"] {
    ...,
}
`; 