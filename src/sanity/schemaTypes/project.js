import { defineField, defineType } from "sanity";

export const projectType = defineType({
  name: "project",
  title: "Project",
  type: "document",

  fields: [
    defineField({
      name: "title",
      title: "Project title",
      type: "string",
      validation: (rule) => rule.required(),
    }),

    defineField({
      name: "slug",
      title: "Slug",
      type: "slug",
      options: {
        source: "title",
        maxLength: 96,
      },
      validation: (rule) => rule.required(),
    }),

    defineField({
      name: "brand",
      title: "Brand / Client",
      description:
        "Select the brand this project belongs to. Add new brands in the Brands section.",
      type: "reference",
      to: [{ type: "brand" }],
      validation: (rule) => rule.required(),
    }),

    defineField({
      name: "category",
      title: "Category",
      type: "string",
      options: {
        list: [
          { title: "Brand Identity", value: "Brand Identity" },
          { title: "Graphic Design", value: "Graphic Design" },
          { title: "Social Media Design", value: "Social Media Design" },
          { title: "Creative Campaigns", value: "Creative Campaigns" },
          { title: "Digital Design", value: "Digital Design" },
          { title: "Other", value: "Other" },
        ],
      },
      validation: (rule) => rule.required(),
    }),

    defineField({
      name: "year",
      title: "Year",
      type: "number",
    }),

    defineField({
      name: "coverImage",
      title: "Cover Image",
      description: "The main image displayed in the portfolio grid.",
      type: "image",
      options: {
        hotspot: true,
      },
      validation: (rule) => rule.required(),
    }),

    defineField({
      name: "gallery",
      title: "Design Gallery",
      description:
        "Upload additional designs belonging to this project or campaign.",
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

    defineField({
      name: "description",
      title: "Description",
      type: "text",
      rows: 4,
    }),

    defineField({
      name: "featured",
      title: "Featured Project",
      description: "Show this project in the featured work section.",
      type: "boolean",
      initialValue: false,
    }),
  ],

  preview: {
    select: {
      title: "title",
      subtitle: "brand.name",
      media: "coverImage",
    },
  },
});
