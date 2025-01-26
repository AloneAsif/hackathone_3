// Sanity Types
import { client } from '@/sanity/lib/client';
export interface Products {
    _id: string;
    productName: string;
    _type: string;
    image?: {
      asset: {
        _ref: string;
        _type: 'image';
      };
    };
    price: number;
    description?: string;
    slug: {
      _type: 'slug';
      current :string;
    }
  }
  


  // Helper function to build image URLs
  import imageUrlBuilder from '@sanity/image-url';
  
  const builder = imageUrlBuilder(client);
  export function urlFor(source: any) {
    return builder.image(source);
  }
  