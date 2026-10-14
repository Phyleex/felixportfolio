import { defineField, defineType } from "sanity";

export const serviceType = defineType({
  name: "service",
  title: "Services",
  type: "document",

  fields: [
    defineField({
      name: "title",
      title: "Service Title",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),

    defineField({
      name: "number",
      title: "Display Number",
      type: "string",
      description: 'For example, "01", "02", "03".',
      validation: (Rule) => Rule.required(),
    }),

    defineField({
      name: "description",
      title: "Description",
      type: "text",
      rows: 4,
      validation: (Rule) => Rule.required(),
    }),

    defineField({
      name: "subServices",
      title: "Sub-services",
      type: "array",
      of: [
        {
          type: "object",
          name: "subService",
          fields: [
            defineField({
              name: "title",
              title: "Sub-service Title",
              type: "string",
              validation: (Rule) => Rule.required(),
            }),
          ],
          preview: {
            select: {
              title: "title",
            },
          },
        },
      ],
    }),

    defineField({
      name: "order",
      title: "Display Order",
      type: "number",
      description: "Lower numbers appear first.",
      initialValue: 1,
      validation: (Rule) => Rule.required().integer().min(0),
    }),

    defineField({
      name: "isVisible",
      title: "Visible on Website",
      type: "boolean",
      description: "Turn off to hide this service from the website.",
      initialValue: true,
    }),
  ],

  orderings: [
    {
      title: "Display Order",
      name: "orderAsc",
      by: [{ field: "order", direction: "asc" }],
    },
  ],

  preview: {
    select: {
      title: "title",
      number: "number",
      isVisible: "isVisible",
    },
    prepare({ title, number, isVisible }) {
      return {
        title: `${number || ""} ${title || "Untitled Service"}`,
        subtitle:
          isVisible === false ? "Hidden on website" : "Visible on website",
      };
    },
  },
});
