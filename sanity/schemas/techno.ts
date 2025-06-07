import { defineField, defineType } from "sanity";

export default defineType({
  name: "techno",
  title: "Technologies",
  type: "document",
  fields: [
    defineField({
      name: "title",
      title: "Title",
      type: "string",
    }),
  ],
}); 