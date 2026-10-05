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
    "brand": brand->name,
    "coverImage": coverImage.asset->url
  }
`);

export const ALL_PROJECTS_QUERY = defineQuery(`
  *[
    _type == "project"
  ]
  | order(_createdAt desc)
  {
    _id,
    title,
    slug,
    category,
    year,
    description,
    featured,
    "brand": brand->name,
    "coverImage": coverImage.asset->url
  }
`);

export const PROJECT_BY_SLUG_QUERY = defineQuery(`
  *[
    _type == "project"
    && slug.current == $slug
  ][0]
  {
    _id,
    title,
    slug,
    category,
    year,
    description,
    featured,
    "brand": brand->name,
    "coverImage": coverImage.asset->url,
    "gallery": gallery[]{
      "url": asset->url,
      "alt": coalesce(alt, "")
    }
  }
`);
