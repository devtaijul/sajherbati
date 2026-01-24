import { getFeaturedProducts } from "./../data/products";
export interface ProductImage {
  id: string;
  url: string;
  filename: string;
  altText: string;
}

export interface Product {
  id: string;
  title: string;
  categoryId: string;
  stitchType: "STITCH" | "UNSTITCH";
  sizes: string[];
  regularPrice: number;
  price: number;
  inStock: boolean;
  sku: string;
  isTopSelling: boolean;
  newArrival: boolean;
  isCustomeRelation: boolean;
  color: string;
  manufacturer: string;
  displayPriority: string;
  keywords: string[];
  body: string | null;
  pantLong: string;
  kamizLong: string;
  innerAndSalwar: string | null;
  description: string;
  instruction: string;
  videoUrl: string;
  liveLink: string;
  featuredImage: Media;
  galleryImages: Media[];
  attachProduct: Product | null;
  attachProductId: string | null;
  relatedProducts: Product[];
  createdAt: string;
  updatedAt: string;
}

type Media = {
  url: string;
  id: string;
  filename: string;
  mimeType: string;
  size: number;
  width: number | null;
  height: number | null;
  altText: string | null;
  caption: string | null;
  createdAt: Date;
  updatedAt: Date;
  productId: string | null;
};

export interface Category {
  id: string;
  title: string;
  slug: string;
  image: string;
  productCount: number;
  createdAt: string;
  updatedAt: string;
  featuredImageId: string;
  featuredImage: Media;
}

export interface CartItem {
  id: string;
  productId: string;
  title: string;
  price: number;
  regularPrice: number;
  size: string;
  quantity: number;
  image: string;
  stitchType: "STITCH" | "UNSTITCH";
}

export interface Order {
  id: string;
  trackingNumber: string;
  customerName: string;
  customerPhone: string;
  customerAddress: string;
  deliveryArea: string;
  note: string;
  items: CartItem[];
  subtotal: number;
  deliveryCharge: number;
  total: number;
  status:
    | "pending"
    | "confirmed"
    | "processing"
    | "shipped"
    | "delivered"
    | "cancelled";
  createdAt: string;
}

export interface DeliveryArea {
  id: string;
  name: string;
  charge: number;
}
