import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import Card from './Cards/Card';
import { Products, urlFor } from '../../../types/products';
import { client } from '@/sanity/lib/client';
import { allProducts } from '@/sanity/lib/query';

const ProductList = () => {
  const [products, setProducts] = useState<Products[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const fetchedProducts: Products[] = await client.fetch(allProducts);
        setProducts(fetchedProducts);
      } catch (err) {
        setError('Failed to fetch products. Please try again later.');
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, []);

  if (loading) {
    return <div className="max-w-6xl mx-auto px-4 py-8">Loading products...</div>;
  }

  if (error) {
    return <div className="max-w-6xl mx-auto px-4 py-8 text-red-500">{error}</div>;
  }

  if (products.length === 0) {
    return <div className="max-w-6xl mx-auto px-4 py-8">No products found.</div>;
  }

  return (
<div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-3 pb-10 border-b-2">
    {products.map((product) => (
      <Link 
        href={`/all-products/${product.slug.current}`} 
        key={product._id}
        className="focus-visible:outline-none"
      >
        <Card
          id={product._id}
          title={product.productName}
          description={product.description}
          color={product.productName}
          price={product.price}
          imagesUrls={urlFor(product.image).url()}
        />
      </Link>
    ))}
  </div>

  );
};

export default ProductList;
