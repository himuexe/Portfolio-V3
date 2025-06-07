import { defineField, defineType } from "sanity";

export default defineType({
  name: "projectState",
  title: "Project State",
  type: "document",
  fields: [
    defineField({
      name: "title",
      title: "Title",
      type: "string",
    }),
  ],
}); 