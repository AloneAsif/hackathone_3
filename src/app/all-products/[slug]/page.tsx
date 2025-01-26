import Button from '@/app/components/Button';
import Image from 'next/image';
import Link from 'next/link';
import { Products } from '../../../../types/products';
import { client } from '@/sanity/lib/client';
import { urlFor } from '../../../../types/products';

interface ProductPageProps {
  params: Promise<{slug: string}>
}

const getProduct = async (slug: string): Promise<Products> => {
  return client.fetch(
    `*[_type == "product" && slug.current == $slug][0]{
      _id,
      productName,
      title,
      image,
      price,
      description
    }`,
    { slug }
  );
};

export default async function ProductPage({ params }: ProductPageProps) {
  const { slug } = await params;
  const product = await getProduct(slug);

  if (!product) {
    return <div>Product not found</div>;
  }



  return (
    <div className="grid grid-cols-12 px-8 md:px-20 my-16 md:my-16 gap-0 md:gap-10">
      <div className="col-span-12 md:col-span-6">
        <Image
          src={urlFor(product.image).url()}// Assuming imagesUrls is an array.
          alt={product.productName}
          width={500}
          height={500}
        />
      </div>
      <div className="col-span-12 md:col-span-6 pr-18 pt-10 md:pt-0">
        <h2 className="text-3xl">{product.productName}</h2>
        <p className="py-10">{product.description}
        </p>
        <h3>${product.price}</h3>
        <div className="flex mt-6">
          <Link href="/cart">
            <Button text="Add to Cart" classNames="rounded-full py-2" />
          </Link>
        </div>
      </div>
    </div>
  );
}
