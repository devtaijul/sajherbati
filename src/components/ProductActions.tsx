"use client";

import { Button } from "@/components/ui/button";
import { PLACEHOLDER_IMAGE } from "@/config/image";
import { PAGES } from "@/config/page";
import { Product } from "@/types/product";
import {
  Check,
  ChevronRight,
  Heart,
  Minus,
  Plus,
  ShoppingBag,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export default function ProductActions({
  product,
  favorite,
  selectedSize,
  setSelectedSize,
  quantity,
  setQuantity,
  onAddToCart,
  onBuyNow,
  onToggleFavorite,
}: {
  product: Product;
  favorite: boolean;
  selectedSize: string;
  setSelectedSize: (size: string) => void;
  quantity: number;
  setQuantity: (quantity: number) => void;
  onAddToCart: () => void;
  onBuyNow: () => void;
  onToggleFavorite: () => void;
}) {
  console.log(
    "product.attachProduct.featuredImage?.url",
    product.attachProduct,
  );

  return (
    <div className="space-y-6">
      {/* Title & Price */}
      <div>
        <div className="flex items-center gap-2 mb-2">
          {product.newArrival && <span className="badge-new">New</span>}
          {/*  {discount > 0 && <span className="badge-sale">-{discount}%</span>} */}
        </div>
        <h1 className="text-2xl font-bold md:text-3xl font-display text-foreground">
          {product.title}
        </h1>
        <p className="mt-1 text-muted-foreground">
          {product.stitchType === "STITCH" ? "Stitched" : "Unstitched"} | SKU:{" "}
          {product.sku}
        </p>
        <div className="flex items-center gap-3 mt-4">
          <span className="text-3xl font-bold text-accent">
            ৳{product.price}
          </span>
          {product.regularPrice > 0 && (
            <span className="text-xl line-through text-muted-foreground">
              ৳{product.regularPrice}
            </span>
          )}
        </div>
      </div>

      {/* Stock Status */}
      <div className="flex items-center gap-2">
        {product.inStock ? (
          <>
            <Check size={18} className="text-success" />
            <span className="font-medium text-success">In Stock</span>
          </>
        ) : (
          <span className="font-medium text-destructive">Out of Stock</span>
        )}
      </div>

      {product.stitchType === "STITCH" && (
        <div className="flex gap-2">
          {product.sizes.map((size: string) => (
            <button
              key={size}
              onClick={() => setSelectedSize(size)}
              className={`px-4 py-2 border rounded  ${
                selectedSize === size && "bg-primary text-white"
              }`}
            >
              {size}
            </button>
          ))}
        </div>
      )}

      {/* Quantity */}
      <div>
        <h3 className="mb-3 font-medium">Quantity</h3>
        <div className="flex items-center gap-3">
          <button
            onClick={() => setQuantity(Math.max(1, quantity - 1))}
            className="p-2 transition-colors border rounded-lg border-border hover:bg-muted"
          >
            <Minus size={18} />
          </button>
          <span className="w-12 text-lg font-medium text-center">
            {quantity}
          </span>
          <button
            onClick={() => setQuantity(quantity + 1)}
            className="p-2 transition-colors border rounded-lg border-border hover:bg-muted"
          >
            <Plus size={18} />
          </button>
        </div>
      </div>

      <div className="flex gap-3">
        <Button onClick={onAddToCart}>
          <ShoppingBag className="mr-2" /> Add to Cart
        </Button>

        <Button variant="outline" onClick={onBuyNow}>
          Buy Now
        </Button>

        <Button variant="outline" onClick={onToggleFavorite}>
          <Heart className={favorite ? "fill-red-500 text-red-500" : ""} />
        </Button>
      </div>

      {/* Attached Product */}
      {product.attachProduct && (
        <div className="p-4 border bg-secondary/30 rounded-xl border-secondary">
          <h3 className="flex items-center gap-2 mb-3 font-medium">
            <span className="text-lg">✨</span>
            Stitched Version of This Product
          </h3>
          <Link
            href={PAGES.PRODUCT.VIEW(product.attachProduct.slug)}
            className="flex items-center gap-4 group"
          >
            <Image
              src={
                product.attachProduct.featuredImageId
                  ? product.attachProduct.featuredImage?.url
                  : PLACEHOLDER_IMAGE.PRODUCT
              }
              alt={product.attachProduct.title}
              className="object-cover w-20 h-24 rounded-lg"
              width={500}
              height={500}
            />
            <div className="flex-1">
              <p className="font-medium transition-colors group-hover:text-primary">
                {product.attachProduct.title}
              </p>
              <p className="text-sm text-muted-foreground">
                {product.attachProduct.stitchType === "STITCH"
                  ? "Stitched"
                  : "Unstitched"}
              </p>
              <p className="mt-1 font-bold text-accent">
                ৳{product.attachProduct.price}
              </p>
            </div>
            <ChevronRight size={20} className="text-muted-foreground" />
          </Link>
        </div>
      )}

      {/* Description */}
      <div>
        <h3 className="mb-3 text-lg font-semibold font-display">Description</h3>
        <div
          className="prose-sm prose max-w-none text-muted-foreground"
          dangerouslySetInnerHTML={{ __html: product.description }}
        />
      </div>

      {/* Product Details */}
      <div className="grid grid-cols-2 gap-4 p-4 bg-muted rounded-xl">
        {product.kamizLong && (
          <div>
            <span className="text-sm text-muted-foreground">Kamiz Length</span>
            <p className="font-medium">{product.kamizLong}&ldquo;</p>
          </div>
        )}
        {product.pantLong && (
          <div>
            <span className="text-sm text-muted-foreground">Pant Length</span>
            <p className="font-medium">{product.pantLong}&ldquo;</p>
          </div>
        )}
        {product.body && (
          <div>
            <span className="text-sm text-muted-foreground">Body</span>
            <p className="font-medium">{product.body}</p>
          </div>
        )}
        <div>
          <span className="text-sm text-muted-foreground">Manufacturer</span>
          <p className="font-medium">{product.manufacturer}</p>
        </div>
      </div>

      {/* Instructions */}
      {product.instruction && (
        <div>
          <h3 className="mb-3 text-lg font-semibold font-display">
            Care Instructions
          </h3>
          <div
            className="prose-sm prose max-w-none text-muted-foreground"
            dangerouslySetInnerHTML={{ __html: product.instruction }}
          />
        </div>
      )}
    </div>
  );
}
