import { defineQuery } from "next-sanity";

// Homepage: featured projects only.
// The homepage component should limit the results to 6.
export const PROJECTS_QUERY = defineQuery(`
  *[_type == "project" && featured == true]
  | order(_createdAt desc)
  [0...6] {
    _id, title, slug, category, year, description, featured,
    "brand": brand->name,
    "coverImage": coverImage.asset->url
  }
`);

// Portfolio page: all projects.
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
      "url": coalesce(asset->url, file.asset->url),
      "alt": coalesce(alt, ""),
      "type": select(
        defined(asset->mimeType) && asset->mimeType match "video/*" => "video",
        defined(file.asset->mimeType) && file.asset->mimeType match "video/*" => "video",
        "image"
      ),
      "mimeType": coalesce(asset->mimeType, file.asset->mimeType)
    }
  }
`);

// Homepage: featured tools only.
// The homepage component should limit the results to 6.
export const FEATURED_TOOLS_QUERY = defineQuery(`
  *[
    _type == "tool"
    && isVisible == true
    && featured == true
  ]
  | order(sortOrder asc, name asc)
  [0...6] {
    _id,
    name,
    category,
    proficiency,
    description,
    featured,
    sortOrder,
    "logo": logo.asset->url
  }
`);

// Tools page: all visible tools.
export const TOOLS_QUERY = defineQuery(`
  *[
    _type == "tool"
    && isVisible == true
  ]
  | order(sortOrder asc, name asc)
  {
    _id,
    name,
    category,
    proficiency,
    description,
    featured,
    sortOrder,
    "logo": logo.asset->url
  }
`);

export const SERVICES_QUERY = defineQuery(`
  *[
    _type == "service"
    && isVisible == true
  ]
  | order(order asc, number asc)
  {
    _id,
    title,
    number,
    description,
    order,
    isVisible,
    "subServices": subServices[]{
      _key,
      title
    }
  }
`);