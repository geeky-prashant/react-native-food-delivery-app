import { SanityClient } from "@sanity/client";

let sanityQuery = (query, params) = SanityClient.fetch(query, params);

export const getFeaturedRestaurants = () => {
  return sanityQuery( `
  *[]
  `)
}