import { defineField, defineType } from "sanity";

export const brandType = defineType({
  name: "brand",
  title: "Brand",
  type: "document",

  fields: [
    defineField({
      name: "name",
      title: "Brand name",
      type: "string",
      validation: (rule) => rule.required(),
    }),

    defineField({
      name: "slug",
      title: "URL slug",
      type: "slug",
      options: {
        source: "name",
        maxLength: 96,
      },
      validation: (rule) => rule.required(),
    }),

    defineField({
      name: "logo",
      title: "Brand logo",
      type: "image",
      options: {
        hotspot: true,
      },
    }),

    defineField({
      name: "description",
      title: "Brand description",
      type: "text",
      rows: 3,
    }),
  ],

  preview: {
    select: {
      title: "name",
      media: "logo",
    },
  },
});
