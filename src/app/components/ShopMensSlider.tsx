"use client"
import React, {useEffect, useRef, useState} from 'react';
import Slider from "react-slick";
import arrowRightIcon from "@public/images/icons/right-arrow.svg";
import arrowLeftIcon from "@public/images/icons/left-arrow.svg";
import Card from './Cards/Card';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Image from 'next/image';
import { Products } from '../../../types/products';
import { client } from '@/sanity/lib/client';
import { allProducts } from '@/sanity/lib/query';
import Link from 'next/link';
import { urlFor } from '../../../types/products';

// 

const ShopMensSlider = () => {
    const sliderRef = useRef<Slider | null>(null);

  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    autoplay: true,
    autoplaySpeed: 2000,
    slidesToShow: 2,
    slidesToScroll: 1,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 1,
        },
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 2,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 1,
        },
      },
    ],
  };



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
    <>
    <div className="flex mb-4 items-center justify-end">
          <div className="flex items-center gap-4">
            <p>Shop Men's</p>
            <div className="bg-[#F5F5F5] px-5 py-4 rounded-full cursor-pointer" onClick={() => sliderRef.current?.slickPrev()}>
              <Image src={arrowLeftIcon} alt="Arrow Left"/>
            </div>
            <div className="bg-[#E5E5E5] px-5 py-4 rounded-full cursor-pointer" onClick={() => sliderRef.current?.slickNext()}>
              <Image src={arrowRightIcon} alt="Arrow Right"/>
            </div>
          </div>
        </div>
    <div className="pb-10">
      <Slider {...settings} ref={sliderRef}>
        
      {products.map((product) => (
  <Link 
    href={`/all-products/${product.slug.current}`} 
    key={product._id}
    className="focus-visible:outline-none"
  >
    <Card
      id={product._id}
      title={product.productName}
      description={''}
      color={product.productName}
      price={product.price}
      imagesUrls={urlFor(product.image).url()}
    />
  </Link>
))}


      </Slider>
    </div>
    </>
  );
}

export default ShopMensSlider