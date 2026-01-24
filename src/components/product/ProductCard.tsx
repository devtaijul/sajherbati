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
        regularPrice: product.regularPrice,
        size: "Free",
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
      className="card-product group block"
    >
      <div className="relative aspect-[3/4] overflow-hidden">
        <Image
          src={
            product.featuredImageId
              ? product.featuredImage.url
              : PLACEHOLDER_IMAGE.PRODUCT
          }
          alt={product.title}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
          width={400}
          height={600}
        />

        {/* Badges */}
        <div className="absolute top-3 left-3 flex flex-col gap-2">
          {discount > 0 && <span className="badge-sale">-{discount}%</span>}
          {product.newArrival && <span className="badge-new">New</span>}
          {!product.inStock && (
            <span className="bg-muted text-muted-foreground text-xs font-semibold px-2 py-1 rounded">
              Out of Stock
            </span>
          )}
        </div>

        {/* Favorite button */}
        <button
          onClick={handleFavorite}
          className="absolute top-3 right-3 p-2 bg-card/80 rounded-full shadow-md hover:bg-card transition-all"
          aria-label={favorite ? "Remove from favorites" : "Add to favorites"}
        >
          <Heart
            size={18}
            className={favorite ? "fill-accent text-accent" : "text-foreground"}
          />
        </button>

        {/* Quick actions */}
        <div className="absolute bottom-0 left-0 right-0 p-3 bg-gradient-to-t from-foreground/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <div className="flex gap-2">
            <button
              onClick={handleQuickAdd}
              className="flex-1 flex items-center justify-center gap-2 bg-card text-foreground py-2 rounded-lg font-medium text-sm hover:bg-primary hover:text-primary-foreground transition-colors"
            >
              <ShoppingBag size={16} />
              <span>
                {product.sizes.length > 0 ? "View Sizes" : "Add to Cart"}
              </span>
            </button>
            <div
              //href={`/product/${product.id}`}
              className="p-2 bg-card text-foreground rounded-lg hover:bg-primary hover:text-primary-foreground transition-colors"
            >
              <Eye size={18} />
            </div>
          </div>
        </div>
      </div>

      {/* Product info */}
      <div className="p-4">
        <h3 className="font-medium text-foreground group-hover:text-primary transition-colors line-clamp-1">
          {product.title}
        </h3>
        <p className="text-sm text-muted-foreground mt-1">
          {product.stitchType === "STITCH" ? "Stitched" : "Unstitched"}
        </p>
        <div className="flex items-center gap-2 mt-2">
          <span className="price-sale text-lg">৳{product.price}</span>
          {discount > 0 && (
            <span className="price-original">৳{product.regularPrice}</span>
          )}
        </div>
      </div>
    </Link>
  );
};

export default ProductCard;
