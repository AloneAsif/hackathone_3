import Image from "next/image";
import Link from "next/link";
import React from "react";

// Define the Product type
type Product = {
  id: string;
  // tags: string; // If tags are multiple, you can make this an array
  title: string;
  description?: string;
  color: string;
  price: number;
  imagesUrls: string; // Assuming a single image URL for now
};

// Card.tsx (corrected)
const Card: React.FC<Product> = ({
  id,
  title,
  description,
  color,
  price,
  imagesUrls,
}) => {
  return (
    <div className="mb-6 md:mb-6 m-auto md:m-0 px-2 focus-visible:outline-none">
      {/* Removed inner Link */}
      <div className="focus-visible:outline-none">
        <Image
          className="focus-visible:outline-none"
          src={imagesUrls}
          alt={title}
          width={300}
          height={300}
        />
        <div className="py-4 focus-visible:outline-none">
          <h2 className="font-semibold">{title}</h2>
          <p className="text-text-secondary-gray">{description}</p>
          <p className="text-text-secondary-gray">{color}</p>
        </div>
        <h3 className="font-semibold focus-visible:outline-none">
          ${price.toFixed(2)} {/* Added currency formatting */}
        </h3>
      </div>
    </div>
  );
};

export default Card;
