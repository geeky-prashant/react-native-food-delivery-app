import { createClient } from "@sanity/client";
import imageUrlBuilder from "@sanity/image-url";

export const client = createClient({
  projectId: "",
  dataset: "production",
  useCdn: true,
  apiVersion: "2023-06-14",
});

const builder = imageUrlBuilder(client);

export const urlFor = (source) => builder.image(source);
