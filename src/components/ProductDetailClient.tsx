"use client";

import { useCartContext } from "@/contexts/CartContext";
import { useRouter } from "next/navigation";
import { useState } from "react";

import { ChevronRight } from "lucide-react";
import Link from "next/link";
import ProductActions from "./ProductActions";
import ProductGallery from "./ProductGallery";
import { Product } from "@/types/product";
import { useToast } from "@/hooks/use-toast";

export default function ProductDetailClient({ product }: { product: Product }) {
  const router = useRouter();
  const { toast } = useToast();
  const { addToCart, toggleFavorite, isFavorite } = useCartContext();

  const [selectedSize, setSelectedSize] = useState("");
  const [quantity, setQuantity] = useState(1);

  const favorite = isFavorite(product.id);

  const handleAddToCart = () => {
    if (
      product.stitchType === "STITCH" &&
      product.sizes.length > 0 &&
      !selectedSize
    ) {
      toast({
        title: "Please select a size",
        description: "You can find the size on the product page.",
      });
      return;
    }

    addToCart({
      productId: product.id,
      title: product.title,
      price: product.price,
      size: selectedSize || "Unstitched",
      quantity,
      image: product.featuredImage.url,
      stitchType: product.stitchType,
    });

    toast({
      title: "Added to cart!",
      description: "You can find your cart on the cart page.",
    });
  };

  const handleBuyNow = () => {
    handleAddToCart();
    router.push("/cart");
  };

  return (
    <main className="py-8 md:py-12">
      <div className="container-custom">
        {/* Breadcrumb */}
        <nav className="flex items-center gap-2 mb-8 text-sm">
          <Link href="/" className="text-muted-foreground">
            Home
          </Link>
          <ChevronRight size={14} />
          <Link href="/shop" className="text-muted-foreground">
            Shop
          </Link>
          <ChevronRight size={14} />
          <span className="font-medium">{product.title}</span>
        </nav>

        <div className="grid grid-cols-1 gap-12 lg:grid-cols-2">
          <ProductGallery product={product} />

          <ProductActions
            product={product}
            favorite={favorite}
            selectedSize={selectedSize}
            setSelectedSize={setSelectedSize}
            quantity={quantity}
            setQuantity={setQuantity}
            onAddToCart={handleAddToCart}
            onBuyNow={handleBuyNow}
            onToggleFavorite={() => toggleFavorite(product.id)}
          />
        </div>
      </div>
    </main>
  );
}
