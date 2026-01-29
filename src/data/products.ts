import { Category, DeliveryArea, Product } from "@/types/product";

export const categories: Category[] = [
  {
    id: "cat-1",
    name: "Three Piece",
    slug: "three-piece",
    image: "/assets/product-1.jpg",
    productCount: 45,
  },
  {
    id: "cat-2",
    name: "Salwar Kameez",
    slug: "salwar-kameez",
    image: "/assets/product-2.jpg",
    productCount: 32,
  },
  {
    id: "cat-3",
    name: "Kurti",
    slug: "kurti",
    image: "/assets/product-3.jpg",
    productCount: 28,
  },
  {
    id: "cat-4",
    name: "Saree",
    slug: "saree",
    image: "/assets/product-4.jpg",
    productCount: 56,
  },
];

export const deliveryAreas: DeliveryArea[] = [
  { id: "dhaka-inside", name: "Inside Dhaka", charge: 80 },
  { id: "dhaka-suburb", name: "Suburb Dhaka", charge: 100 },
  { id: "dhaka-outside", name: "Outside Dhaka", charge: 150 },
];

export const products: Product[] = [
  {
    id: "prod-1",
    title: "JSC-1018",
    categoryId: "cat-1",
    stitchType: "UNSTITCH",
    sizes: [],
    regularPrice: 1300,
    price: 1200,
    inStock: true,
    sku: "JSC-1018-UN",
    isTopSelling: true,
    newArrival: true,
    isCustomeRelation: false,
    color: "#1a365d",
    manufacturer: "Bangladesh",
    displayPriority: "17",
    keywords: ["cotton", "three-piece", "navy"],
    body: "54",
    pantLong: "",
    kamizLong: "44",
    innerAndSalwar: "38",
    description:
      "<p><strong>Inspired Stitch Collection</strong></p><ul><li>Kamiz- Jomjom Cotton</li><li>Pant- Jomjom Cotton</li><li>Dupatta- Jomjom Cotton</li><li>Kamiz Length-44</li><li>Pant - 40</li><li>Dupatta- 5 hat</li><li>Sleeves - 20</li></ul>",
    instruction:
      "<p><strong>Instructions:</strong></p><ul><li>Wash in room temperature water with mild detergent</li><li>Wash every part separately</li><li>Don't soak more than 3 minutes</li></ul>",
    videoUrl: "",
    liveLink: "",
    featuredImage: {
      id: "img-1",
      url: "/assets/product-1.jpg",
      filename: "product-1.jpg",
      altText: "JSC-1018",
    },
    galleryImages: [
      {
        id: "img-1a",
        url: "/assets/product-2.jpg",
        filename: "product-1.jpg",
        altText: "JSC-1018 View 1",
      },
      {
        id: "img-1b",
        url: "/assets/product-3.jpg",
        filename: "product-3.jpg",
        altText: "JSC-1018 View 2",
      },
    ],
    attachProduct: null,
    attachProductId: "prod-2",
    relatedProducts: [],
    createdAt: "2026-01-21T08:43:14.726Z",
    updatedAt: "2026-01-21T08:43:38.091Z",
  },
  {
    id: "prod-2",
    title: "JSC-1017",
    categoryId: "cat-1",
    stitchType: "STITCH",
    sizes: ["38", "40", "42", "44", "46"],
    regularPrice: 2800,
    price: 2300,
    inStock: true,
    sku: "JSC-1017-ST",
    isTopSelling: true,
    newArrival: true,
    isCustomeRelation: true,
    color: "#1a365d",
    manufacturer: "Bangladesh",
    displayPriority: "12",
    keywords: ["cotton", "three-piece", "stitched"],
    body: null,
    pantLong: "39",
    kamizLong: "47",
    innerAndSalwar: null,
    description:
      '<p><strong>DETAILS:</strong></p><ul><li>Kamiz- JamJam Cotton</li><li>Salwar - Jamjam Cotton</li><li>Dupatta-Jamjam Cotton</li><li>Salwar Long - 37"</li><li>Kamiz Long- 43"</li><li>Sleeve Long- 18"</li><li>Dupatta Measurement - 5 Hat</li></ul>',
    instruction:
      "<p><strong>Instructions:</strong></p><ul><li>Wash in room temperature water with mild detergent</li><li>Wash every part separately</li><li>Don't soak more than 3 minutes</li></ul>",
    videoUrl: "",
    liveLink: "",
    featuredImage: {
      id: "img-2",
      url: "/assets/product-2.jpg",
      filename: "product-2.jpg",
      altText: "JSC-1017",
    },
    galleryImages: [
      {
        id: "img-2a",
        url: "/assets/product-2.jpg",
        filename: "product-2.jpg",
        altText: "JSC-1017 View 1",
      },
      {
        id: "img-2b",
        url: "/assets/product-4.jpg",
        filename: "product-4.jpg",
        altText: "JSC-1017 View 2",
      },
    ],
    attachProduct: null,
    attachProductId: null,
    relatedProducts: [],
    createdAt: "2026-01-20T07:55:53.645Z",
    updatedAt: "2026-01-21T08:38:28.165Z",
  },
  {
    id: "prod-3",
    title: "JSC-1016",
    categoryId: "cat-2",
    stitchType: "STITCH",
    sizes: ["38", "40", "42", "44"],
    regularPrice: 2200,
    price: 1900,
    inStock: true,
    sku: "JSC-1016-ST",
    isTopSelling: false,
    newArrival: true,
    isCustomeRelation: false,
    color: "#1a365d",
    manufacturer: "Bangladesh",
    displayPriority: "10",
    keywords: ["cotton", "salwar-kameez", "navy"],
    body: null,
    pantLong: "38",
    kamizLong: "45",
    innerAndSalwar: null,
    description:
      "<p><strong>Premium Salwar Kameez</strong></p><ul><li>Premium Cotton Fabric</li><li>Elegant Embroidery</li><li>Comfortable Fit</li></ul>",
    instruction:
      "<p><strong>Care Instructions:</strong></p><ul><li>Hand wash recommended</li><li>Iron on medium heat</li></ul>",
    videoUrl: "",
    liveLink: "",
    featuredImage: {
      id: "img-3",
      url: "/assets/product-3.jpg",
      filename: "product-3.jpg",
      altText: "JSC-1016",
    },
    galleryImages: [
      {
        id: "img-3a",
        url: "/assets/product-3.jpg",
        filename: "product-3.jpg",
        altText: "JSC-1016 View 1",
      },
    ],
    attachProduct: null,
    attachProductId: null,
    relatedProducts: [],
    createdAt: "2026-01-19T10:30:00.000Z",
    updatedAt: "2026-01-19T10:30:00.000Z",
  },
  {
    id: "prod-4",
    title: "JSC-1015",
    categoryId: "cat-3",
    stitchType: "STITCH",
    sizes: ["36", "38", "40", "42"],
    regularPrice: 1800,
    price: 1500,
    inStock: true,
    sku: "JSC-1015-ST",
    isTopSelling: true,
    newArrival: false,
    isCustomeRelation: false,
    color: "#f5a623",
    manufacturer: "Bangladesh",
    displayPriority: "8",
    keywords: ["cotton", "kurti", "peach"],
    body: null,
    pantLong: "",
    kamizLong: "42",
    innerAndSalwar: null,
    description:
      "<p><strong>Elegant Kurti</strong></p><ul><li>Soft Cotton Fabric</li><li>Beautiful Print Design</li><li>Perfect for Daily Wear</li></ul>",
    instruction:
      "<p><strong>Care Instructions:</strong></p><ul><li>Machine wash cold</li><li>Do not bleach</li></ul>",
    videoUrl: "",
    liveLink: "",
    featuredImage: {
      id: "img-4",
      url: "/assets/product-4.jpg",
      filename: "product-4.jpg",
      altText: "JSC-1015",
    },
    galleryImages: [
      {
        id: "img-4a",
        url: "/assets/product-4.jpg",
        filename: "product-4.jpg",
        altText: "JSC-1015 View 1",
      },
    ],
    attachProduct: null,
    attachProductId: null,
    relatedProducts: [],
    createdAt: "2026-01-18T14:20:00.000Z",
    updatedAt: "2026-01-18T14:20:00.000Z",
  },
  {
    id: "prod-5",
    title: "JSC-1014",
    categoryId: "cat-1",
    stitchType: "UNSTITCH",
    sizes: [],
    regularPrice: 1600,
    price: 1400,
    inStock: true,
    sku: "JSC-1014-UN",
    isTopSelling: false,
    newArrival: false,
    isCustomeRelation: false,
    color: "#c2185b",
    manufacturer: "Bangladesh",
    displayPriority: "6",
    keywords: ["cotton", "three-piece", "magenta"],
    body: "52",
    pantLong: "",
    kamizLong: "43",
    innerAndSalwar: "36",
    description:
      "<p><strong>Unstitched Three Piece</strong></p><ul><li>High Quality Cotton</li><li>Vibrant Colors</li><li>Easy to Customize</li></ul>",
    instruction:
      "<p><strong>Care Instructions:</strong></p><ul><li>Wash separately first time</li><li>Use color-safe detergent</li></ul>",
    videoUrl: "",
    liveLink: "",
    featuredImage: {
      id: "img-5",
      url: "/assets/product-2.jpg",
      filename: "product-2.jpg",
      altText: "JSC-1014",
    },
    galleryImages: [
      {
        id: "img-5a",
        url: "/assets/product-2.jpg",
        filename: "product-2.jpg",
        altText: "JSC-1014 View 1",
      },
    ],
    attachProduct: null,
    attachProductId: "prod-6",
    relatedProducts: [],
    createdAt: "2026-01-17T09:15:00.000Z",
    updatedAt: "2026-01-17T09:15:00.000Z",
  },
  {
    id: "prod-6",
    title: "JSC-1013",
    categoryId: "cat-2",
    stitchType: "STITCH",
    sizes: ["38", "40", "42", "44", "46"],
    regularPrice: 2500,
    price: 2100,
    inStock: false,
    sku: "JSC-1013-ST",
    isTopSelling: true,
    newArrival: false,
    isCustomeRelation: true,
    color: "#1a365d",
    manufacturer: "Bangladesh",
    displayPriority: "5",
    keywords: ["cotton", "salwar-kameez", "premium"],
    body: null,
    pantLong: "40",
    kamizLong: "46",
    innerAndSalwar: null,
    description:
      "<p><strong>Premium Stitched Collection</strong></p><ul><li>Designer Salwar Kameez</li><li>Premium Cotton</li><li>Exclusive Design</li></ul>",
    instruction:
      "<p><strong>Care Instructions:</strong></p><ul><li>Dry clean recommended</li><li>Iron inside out</li></ul>",
    videoUrl: "",
    liveLink: "",
    featuredImage: {
      id: "img-6",
      url: "/assets/product-1.jpg",
      filename: "product-1.jpg",
      altText: "JSC-1013",
    },
    galleryImages: [
      {
        id: "img-6a",
        url: "/assets/product-1.jpg",
        filename: "product-1.jpg",
        altText: "JSC-1013 View 1",
      },
    ],
    attachProduct: null,
    attachProductId: null,
    relatedProducts: [],
    createdAt: "2026-01-16T11:45:00.000Z",
    updatedAt: "2026-01-16T11:45:00.000Z",
  },
];

// Link attach products after initialization
products[0].attachProduct = products[1];
products[4].attachProduct = products[5];

export const getProductById = (id: string): Product | undefined => {
  return products.find((p) => p.id === id);
};

export const getProductsByCategory = (categoryId: string): Product[] => {
  return products.filter((p) => p.categoryId === categoryId);
};

export const getTopSellingProducts = (): Product[] => {
  return products.filter((p) => p.isTopSelling);
};

export const getNewArrivals = (): Product[] => {
  return products.filter((p) => p.newArrival);
};

export const getFeaturedProducts = (): Product[] => {
  return products.slice(0, 4);
};
