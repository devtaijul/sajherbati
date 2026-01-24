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
  stitchType: 'STITCH' | 'UNSTITCH';
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
  featuredImage: ProductImage;
  galleryImages: ProductImage[];
  attachProduct: Product | null;
  attachProductId: string | null;
  relatedProducts: Product[];
  createdAt: string;
  updatedAt: string;
}

export interface Category {
  id: string;
  name: string;
  slug: string;
  image: string;
  productCount: number;
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
  stitchType: 'STITCH' | 'UNSTITCH';
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
  status: 'pending' | 'confirmed' | 'processing' | 'shipped' | 'delivered' | 'cancelled';
  createdAt: string;
}

export interface DeliveryArea {
  id: string;
  name: string;
  charge: number;
}
