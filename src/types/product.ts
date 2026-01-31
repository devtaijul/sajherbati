export interface ProductImage {
  id: string;
  url: string;
  filename: string;
  altText: string;
}

export interface Product {
  id: string;
  slug: string;
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
  featuredImageId: string;
  featuredImage: Media;
  galleryImages: Media[];
  attachProduct: Product | null;
  attachProductId: string | null;
  relatedProducts: Product[];
  createdAt: string;
  updatedAt: string;
}

export type StitchType = "STITCH" | "UNSTITCH";

export type OrderItems = {
  id: string;
  createdAt?: Date;
  updatedAt?: Date;
  title: string;
  image: string;
  price: number;
  quantity: number;
  productId: string;
  size: string;
  stitchType: StitchType;
  orderId?: string;
};

export type PaymentMethod = "CASH_ON_DELIVERY" | "BKASH";

export type Order = {
  id: string;
  name: string;
  phone: string;
  address: string;
  trackingNumber: string;
  paymentMethod: PaymentMethod;
  deliveryArea: string;
  subtotal: number;
  deliveryCharge: number;
  orderItems: OrderItems[];
  status: orderStatus;
  total: number;
  note: string | null;
  createdAt: Date;
  updatedAt: Date;
};

export type OrderCreate = {
  name: string;
  phone: string;
  address: string;
  paymentMethod: PaymentMethod;
  deliveryArea: string;
  subtotal: number;
  deliveryCharge: number;
  orderItems: OrderItems[];
  status?: orderStatus;
  total: number;
  note: string | null;
};

export type Media = {
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
  size: string;
  quantity: number;
  regularPrice?: number;
  image: string;
  stitchType: "STITCH" | "UNSTITCH";
}

export type orderStatus =
  | "PENDING"
  | "CONFIRMED"
  | "PROCESSING"
  | "SHIPPED"
  | "DELIVERED"
  | "CANCELLED";

export interface DeliveryArea {
  id: string;
  name: string;
  charge: number;
}
