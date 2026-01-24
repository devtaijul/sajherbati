"use client";

import { Media, Product } from "@/types/product";
import Image from "next/image";
import { useState } from "react";

export default function ProductGallery({ product }: { product: Product }) {
  const [selectedImage, setSelectedImage] = useState(0);

  const images = [
    product.featuredImage,
    ...product.galleryImages.filter(
      (img: Media) => img.id !== product.featuredImage.id,
    ),
  ];

  return (
    <div className="space-y-4">
      <div className="aspect-3/4 rounded-xl overflow-hidden bg-muted">
        <Image
          src={images[selectedImage].url}
          alt={product.title}
          className="w-full h-full object-cover"
          width={500}
          height={500}
        />
      </div>

      <div className="flex gap-3 overflow-x-auto">
        {images.map((img: Media, i: number) => (
          <button
            key={img.id}
            onClick={() => setSelectedImage(i)}
            className={`w-20 h-24 border-2 rounded-lg ${
              selectedImage === i ? "border-primary" : "border-transparent"
            }`}
          >
            <Image
              alt={product.title}
              src={img.url}
              className="w-full h-full object-cover"
              width={500}
              height={500}
            />
          </button>
        ))}
      </div>
    </div>
  );
}
