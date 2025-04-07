// src/lib/sanity.js
import { createClient } from '@sanity/client';
import imageUrlBuilder from '@sanity/image-url';

const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET,
  apiVersion: '2025-04-06', // Using the latest API version from your env.js
  useCdn: true, // Set to false if you want to ensure fresh data
});

// Set up a helper function for generating image URLs with the Sanity Image URL builder
const builder = imageUrlBuilder(client);
export const urlFor = (source) => {
  return builder.image(source);
};

export default client;