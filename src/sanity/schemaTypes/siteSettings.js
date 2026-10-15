import { defineField, defineType } from "sanity";

export const siteSettingsType = defineType({
  name: "siteSettings",
  title: "Website Settings",
  type: "document",

  fields: [
    defineField({
      name: "studioName",
      title: "Studio Name",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "tagline",
      title: "Tagline",
      type: "string",
    }),
    defineField({
      name: "contactEmail",
      title: "Contact Email",
      type: "string",
    }),
    defineField({
      name: "phone",
      title: "Phone / WhatsApp 1",
      type: "string",
    }),
    defineField({
      name: "whatsappNumber2",
      title: "WhatsApp Number 2",
      type: "string",
      description:
        "Enter the second WhatsApp number with country code, e.g. 2349010466336.",
    }),
    defineField({
      name: "location",
      title: "Location",
      type: "string",
    }),
    defineField({
      name: "websiteTitle",
      title: "SEO Website Title",
      type: "string",
    }),
    defineField({
      name: "metaDescription",
      title: "SEO Meta Description",
      type: "text",
      rows: 3,
      validation: (Rule) => Rule.max(160),
    }),
    defineField({
      name: "xUrl",
      title: "X (Twitter) URL",
      type: "url",
    }),
    defineField({
      name: "tiktokUrl",
      title: "TikTok URL",
      type: "url",
    }),
    defineField({
      name: "footerText",
      title: "Footer Text",
      type: "string",
    }),
  ],

  preview: {
    prepare() {
      return {
        title: "Website Settings",
        subtitle: "LEEX Creative Studio configuration",
      };
    },
  },
});
