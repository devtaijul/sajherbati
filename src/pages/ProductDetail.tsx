"use client";

import { useState } from "react";

import {
  Heart,
  ShoppingBag,
  Minus,
  Plus,
  ChevronRight,
  Check,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { useCartContext } from "@/contexts/CartContext";
import { getProductById, products } from "@/data/products";
import ProductCard from "@/components/product/ProductCard";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import Link from "next/link";

const ProductDetail = ({ id }: { id: string }) => {
  const navigate = useRouter();
  const { addToCart, toggleFavorite, isFavorite } = useCartContext();

  const product = getProductById(id || "");
  const [selectedImage, setSelectedImage] = useState(0);
  const [selectedSize, setSelectedSize] = useState("");
  const [quantity, setQuantity] = useState(1);

  if (!product) {
    return (
      <div className="container-custom py-16 text-center">
        <h1 className="text-2xl font-display font-bold mb-4">
          Product Not Found
        </h1>
        <Link href="/shop" className="text-primary hover:underline">
          Back to Shop
        </Link>
      </div>
    );
  }

  const favorite = isFavorite(product.id);
  const discount = Math.round(
    ((product.regularPrice - product.price) / product.regularPrice) * 100,
  );
  const allImages = [
    product.featuredImage,
    ...product.galleryImages.filter(
      (img) => img.id !== product.featuredImage.id,
    ),
  ];
  const relatedProducts = products
    .filter((p) => p.categoryId === product.categoryId && p.id !== product.id)
    .slice(0, 4);

  const handleAddToCart = () => {
    if (
      product.stitchType === "STITCH" &&
      product.sizes.length > 0 &&
      !selectedSize
    ) {
      toast.error("Please select a size");
      return;
    }

    addToCart({
      productId: product.id,
      title: product.title,
      price: product.price,
      regularPrice: product.regularPrice,
      size: selectedSize || "Free",
      quantity,
      image: product.featuredImage.url,
      stitchType: product.stitchType,
    });

    toast.success("Added to cart!");
  };

  const handleBuyNow = () => {
    handleAddToCart();
    navigate.push("/cart");
  };

  return (
    <main className="py-8 md:py-12">
      <div className="container-custom">
        {/* Breadcrumb */}
        <nav className="flex items-center gap-2 text-sm mb-8">
          <Link
            href="/"
            className="text-muted-foreground hover:text-foreground"
          >
            Home
          </Link>
          <ChevronRight size={14} className="text-muted-foreground" />
          <Link
            href="/shop"
            className="text-muted-foreground hover:text-foreground"
          >
            Shop
          </Link>
          <ChevronRight size={14} className="text-muted-foreground" />
          <span className="text-foreground font-medium">{product.title}</span>
        </nav>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
          {/* Image Gallery */}
          <div className="space-y-4">
            <div className="aspect-[3/4] rounded-xl overflow-hidden bg-muted">
              <img
                src={allImages[selectedImage]?.url}
                alt={product.title}
                className="w-full h-full object-cover"
              />
            </div>
            <div className="flex gap-3 overflow-x-auto pb-2">
              {allImages.map((image, index) => (
                <button
                  key={image.id}
                  onClick={() => setSelectedImage(index)}
                  className={`flex-shrink-0 w-20 h-24 rounded-lg overflow-hidden border-2 transition-colors ${
                    selectedImage === index
                      ? "border-primary"
                      : "border-transparent"
                  }`}
                >
                  <img
                    src={image.url}
                    alt={`${product.title} - ${index + 1}`}
                    className="w-full h-full object-cover"
                  />
                </button>
              ))}
            </div>
          </div>

          {/* Product Info */}
          <div className="space-y-6">
            {/* Title & Price */}
            <div>
              <div className="flex items-center gap-2 mb-2">
                {product.newArrival && <span className="badge-new">New</span>}
                {discount > 0 && (
                  <span className="badge-sale">-{discount}%</span>
                )}
              </div>
              <h1 className="text-2xl md:text-3xl font-display font-bold text-foreground">
                {product.title}
              </h1>
              <p className="text-muted-foreground mt-1">
                {product.stitchType === "STITCH" ? "Stitched" : "Unstitched"} |
                SKU: {product.sku}
              </p>
              <div className="flex items-center gap-3 mt-4">
                <span className="text-3xl font-bold text-accent">
                  ৳{product.price}
                </span>
                {discount > 0 && (
                  <span className="text-xl text-muted-foreground line-through">
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
                  <span className="text-success font-medium">In Stock</span>
                </>
              ) : (
                <span className="text-destructive font-medium">
                  Out of Stock
                </span>
              )}
            </div>

            {/* Size Selection */}
            {product.stitchType === "STITCH" && product.sizes.length > 0 && (
              <div>
                <h3 className="font-medium mb-3">Select Size</h3>
                <div className="flex flex-wrap gap-2">
                  {product.sizes.map((size) => (
                    <button
                      key={size}
                      onClick={() => setSelectedSize(size)}
                      className={`px-4 py-2 border rounded-lg font-medium transition-colors ${
                        selectedSize === size
                          ? "border-primary bg-primary text-primary-foreground"
                          : "border-border hover:border-primary"
                      }`}
                    >
                      {size}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Quantity */}
            <div>
              <h3 className="font-medium mb-3">Quantity</h3>
              <div className="flex items-center gap-3">
                <button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="p-2 border border-border rounded-lg hover:bg-muted transition-colors"
                >
                  <Minus size={18} />
                </button>
                <span className="w-12 text-center font-medium text-lg">
                  {quantity}
                </span>
                <button
                  onClick={() => setQuantity(quantity + 1)}
                  className="p-2 border border-border rounded-lg hover:bg-muted transition-colors"
                >
                  <Plus size={18} />
                </button>
              </div>
            </div>

            {/* Actions */}
            <div className="flex flex-col sm:flex-row gap-3">
              <Button
                size="lg"
                onClick={handleAddToCart}
                disabled={!product.inStock}
                className="btn-primary flex-1"
              >
                <ShoppingBag size={20} className="mr-2" />
                Add to Cart
              </Button>
              <Button
                size="lg"
                variant="outline"
                onClick={handleBuyNow}
                disabled={!product.inStock}
                className="flex-1"
              >
                Buy Now
              </Button>
              <Button
                size="lg"
                variant="outline"
                onClick={() => toggleFavorite(product.id)}
                className="px-4"
              >
                <Heart
                  size={20}
                  className={favorite ? "fill-accent text-accent" : ""}
                />
              </Button>
            </div>

            {/* Attached Product */}
            {product.attachProduct && (
              <div className="p-4 bg-secondary/30 rounded-xl border border-secondary">
                <h3 className="font-medium mb-3 flex items-center gap-2">
                  <span className="text-lg">✨</span>
                  Stitched Version of This Product
                </h3>
                <Link
                  href={`/product/${product.attachProduct.id}`}
                  className="flex items-center gap-4 group"
                >
                  <img
                    src={
                      product.attachProduct.featuredImage?.url ||
                      product.featuredImage.url
                    }
                    alt={product.attachProduct.title}
                    className="w-20 h-24 object-cover rounded-lg"
                  />
                  <div className="flex-1">
                    <p className="font-medium group-hover:text-primary transition-colors">
                      {product.attachProduct.title}
                    </p>
                    <p className="text-sm text-muted-foreground">
                      {product.attachProduct.stitchType === "STITCH"
                        ? "Stitched"
                        : "Unstitched"}
                    </p>
                    <p className="font-bold text-accent mt-1">
                      ৳{product.attachProduct.price}
                    </p>
                  </div>
                  <ChevronRight size={20} className="text-muted-foreground" />
                </Link>
              </div>
            )}

            {/* Description */}
            <div>
              <h3 className="font-display font-semibold text-lg mb-3">
                Description
              </h3>
              <div
                className="prose prose-sm max-w-none text-muted-foreground"
                dangerouslySetInnerHTML={{ __html: product.description }}
              />
            </div>

            {/* Product Details */}
            <div className="grid grid-cols-2 gap-4 p-4 bg-muted rounded-xl">
              {product.kamizLong && (
                <div>
                  <span className="text-sm text-muted-foreground">
                    Kamiz Length
                  </span>
                  <p className="font-medium">{product.kamizLong}"</p>
                </div>
              )}
              {product.pantLong && (
                <div>
                  <span className="text-sm text-muted-foreground">
                    Pant Length
                  </span>
                  <p className="font-medium">{product.pantLong}"</p>
                </div>
              )}
              {product.body && (
                <div>
                  <span className="text-sm text-muted-foreground">Body</span>
                  <p className="font-medium">{product.body}</p>
                </div>
              )}
              <div>
                <span className="text-sm text-muted-foreground">
                  Manufacturer
                </span>
                <p className="font-medium">{product.manufacturer}</p>
              </div>
            </div>

            {/* Instructions */}
            {product.instruction && (
              <div>
                <h3 className="font-display font-semibold text-lg mb-3">
                  Care Instructions
                </h3>
                <div
                  className="prose prose-sm max-w-none text-muted-foreground"
                  dangerouslySetInnerHTML={{ __html: product.instruction }}
                />
              </div>
            )}
          </div>
        </div>

        {/* Related Products */}
        {relatedProducts.length > 0 && (
          <section className="mt-16">
            <h2 className="section-title mb-8">Related Products</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
              {relatedProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          </section>
        )}
      </div>
    </main>
  );
};

export default ProductDetail;
