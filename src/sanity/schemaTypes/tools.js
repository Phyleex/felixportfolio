import { defineField, defineType } from "sanity";

export const toolType = defineType({
  name: "tool",
  title: "Tools & Technologies",
  type: "document",
  fields: [
    defineField({
      name: "name",
      title: "Tool Name",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "category",
      title: "Category",
      type: "string",
      options: {
        list: [
          { title: "Graphic Design", value: "graphic-design" },
          { title: "3D Design", value: "3d-design" },
          { title: "Video Editing", value: "video-editing" },
          { title: "UI/UX Design", value: "ui-ux" },
          { title: "Other", value: "other" },
        ],
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "logo",
      title: "Tool Logo",
      type: "image",
      options: { hotspot: true },
    }),
    defineField({
      name: "proficiency",
      title: "Proficiency (%)",
      type: "number",
      validation: (Rule) => Rule.required().min(0).max(100).integer(),
    }),
    defineField({
      name: "description",
      title: "Short Description",
      type: "text",
      rows: 3,
    }),
    defineField({
      name: "sortOrder",
      title: "Display Order",
      type: "number",
      initialValue: 10,
    }),
    defineField({
      name: "isVisible",
      title: "Show on Website",
      type: "boolean",
      initialValue: true,
    }),
  ],
  preview: {
    select: {
      title: "name",
      subtitle: "category",
      media: "logo",
    },
  },
});
