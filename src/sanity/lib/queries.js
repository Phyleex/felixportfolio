import { defineQuery } from "next-sanity";

export const PROJECTS_QUERY = defineQuery(`
  *[
    _type == "project"
    && featured == true
  ]
  | order(_createdAt desc)
  {
    _id,
    title,
    slug,
    category,
    year,
    description,
    "coverImage": coverImage.asset->url
  }
`);
