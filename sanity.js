import { createClient } from "@sanity/client";
import imageUrlBuilder from "@sanity/image-url";

const client = createClient({
  projectId: "isulyr63",
  dataset: "production",
  useCdn: true, // set to `false` to bypass the edge cache
  apiVersion: "2023-08-18", // use current date (YYYY-MM-DD) to target the latest API version
});

const builder = imageUrlBuilder(client);
export const urlFor = (source) => builder.image(source);

export default client;
