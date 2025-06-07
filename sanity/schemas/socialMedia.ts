import { defineField, defineType } from "sanity";

export default defineType({
  name: "socialMedia",
  title: "Social Media",
  type: "document",
  fields: [
    defineField({
      name: "name",
      title: "Name",
      type: "string",
    }),
    defineField({
      name: "link",
      title: "link",
      type: "string",
    }),
    defineField({
      name: "icon",
      title: "icon",
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
  ],
}); 