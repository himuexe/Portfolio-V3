import { defineField, defineType } from "sanity";

export default defineType({
  name: "project",
  title: "Project",
  type: "document",
  fields: [
    defineField({
      name: "name",
      title: "Name",
      type: "string",
    }),
    defineField({
      name: "slug",
      title: "Slug",
      type: "slug",
      options: {
        source: "name",
        maxLength: 96,
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "link",
      title: "Link",
      type: "string",
    }),
    defineField({
      name: "featured",
      title: "Featured on Homepage",
      description: "Set to true to display this project in the Selected Works section on the homepage",
      type: "boolean",
      initialValue: false,
    }),
    defineField({
      name: "categories",
      title: "Categories",
      type: "array",
      of: [{ type: "reference", to: { type: "category" } }],
    }),
    defineField({
      name: "techno",
      title: "Technologies",
      type: "array",
      of: [{ type: "reference", to: { type: "techno" } }],
    }),
    defineField({
      name: "mainImage",
      title: "Main image",
      type: "image",
      options: {
        hotspot: true,
      },
      fields: [
        {
          name: "alt",
          type: "string",
          title: "Alternative Text",
        },
      ],
    }),
    defineField({
      name: "title",
      title: "titre",
      type: "string",
    }),
    defineField({
      name: "description",
      title: "Description",
      type: "string",
    }),
    defineField({
      name: "primaryColor",
      title: "primaryColor",
      type: "string",
      initialValue: "#111111",
    }),
    defineField({
      name: "secondaryColor",
      title: "secondaryColor",
      type: "string",
      initialValue: "#fffff",
    }),
    defineField({
      name: "date",
      title: "Date",
      type: "date",
      options: {
        dateFormat: "DD-MM-YYYY",
      },
    }),
    defineField({
      name: "projectState",
      title: "ProjectState",
      type: "reference",
      to: { type: "projectState" },
    }),
    defineField({
      name: "gallery",
      title: "Gallery",
      type: "array",
      of: [
        {
          type: "image",
          options: {
            hotspot: true,
          },
        },
      ],
    }),
  ],
}); 