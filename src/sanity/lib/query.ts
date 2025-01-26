import { groq } from "next-sanity";

// Fetch all products
export const allProducts = groq`*[_type == 'product']`;

// Fetch the first 5 products
export const fiveProducts = groq`*[_type == 'product'][8..-2]`;
