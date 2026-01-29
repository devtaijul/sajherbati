"use client";

import { Heart, ShoppingBag, Eye } from "lucide-react";
import { Product } from "@/types/product";
import { useCartContext } from "@/contexts/CartContext";
import Link from "next/link";
import { PAGES } from "@/config/page";
import Image from "next/image";
import { PLACEHOLDER_IMAGE } from "@/config/image";

interface ProductCardProps {
  product: Product;
}

const ProductCard = ({ product }: ProductCardProps) => {
  const { toggleFavorite, isFavorite, addToCart } = useCartContext();
  const favorite = isFavorite(product.id);
  const discount = Math.round(
    ((product.regularPrice - product.price) / product.regularPrice) * 100,
  );

  const handleQuickAdd = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();

    // For unstitch products, add without size
    // For stitch products with sizes, redirect to product page
    if (product.stitchType === "UNSTITCH" || product.sizes.length === 0) {
      addToCart({
        productId: product.id,
        title: product.title,
        price: product.price,
        size: "Unstitched",
        quantity: 1,
        image: product.featuredImage.url,
        stitchType: product.stitchType,
      });
    }
  };

  const handleFavorite = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    toggleFavorite(product.id);
  };

  return (
    <Link
      href={PAGES.PRODUCT.VIEW(product.slug)}
      className="block card-product group"
    >
      <div className="relative overflow-hidden aspect-3/4">
        <Image
          src={
            product.featuredImageId
              ? product.featuredImage.url
              : PLACEHOLDER_IMAGE.PRODUCT
          }
          alt={product.title}
          className="object-cover w-full h-full transition-transform duration-500 group-hover:scale-105"
          width={400}
          height={600}
        />

        {/* Badges */}
        <div className="absolute flex flex-col gap-2 top-3 left-3">
          {/*  {discount > 0 && <span className="badge-sale">-{discount}%</span>}
          {product.newArrival && <span className="badge-new">New</span>} */}
          {!product.inStock && (
            <span className="px-2 py-1 text-xs font-semibold rounded bg-muted text-muted-foreground">
              Out of Stock
            </span>
          )}
        </div>

        {/* Favorite button */}
        <button
          onClick={handleFavorite}
          className="absolute p-2 transition-all rounded-full shadow-md top-3 right-3 bg-card/80 hover:bg-card"
          aria-label={favorite ? "Remove from favorites" : "Add to favorites"}
        >
          <Heart
            size={18}
            className={favorite ? "fill-accent text-accent" : "text-foreground"}
          />
        </button>

        {/* Quick actions */}
        <div className="absolute bottom-0 left-0 right-0 p-3 transition-opacity duration-300 opacity-0 bg-linear-to-t from-foreground/60 to-transparent group-hover:opacity-100">
          <div className="flex gap-2">
            <button
              onClick={handleQuickAdd}
              className="flex items-center justify-center flex-1 gap-2 py-2 text-sm font-medium transition-colors rounded-lg bg-card text-foreground hover:bg-primary hover:text-primary-foreground"
            >
              <ShoppingBag size={16} />
              <span>
                {product.sizes.length > 0 ? "View Sizes" : "Add to Cart"}
              </span>
            </button>
            <div
              //href={`/product/${product.id}`}
              className="p-2 transition-colors rounded-lg bg-card text-foreground hover:bg-primary hover:text-primary-foreground"
            >
              <Eye size={18} />
            </div>
          </div>
        </div>
      </div>

      {/* Product info */}
      <div className="p-4">
        <h3 className="font-medium transition-colors text-foreground group-hover:text-primary line-clamp-1">
          {product.title}
        </h3>
        <p className="mt-1 text-sm text-muted-foreground">
          {product.stitchType === "STITCH" ? "Stitched" : "Unstitched"}
        </p>
        <div className="flex items-center gap-2 mt-2">
          <span className="text-lg price-sale">৳{product.price}</span>
          {discount > 0 && (
            <span className="price-original">৳{product.regularPrice}</span>
          )}
        </div>
      </div>
    </Link>
  );
};

export default ProductCard;
