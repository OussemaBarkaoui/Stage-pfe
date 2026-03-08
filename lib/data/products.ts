export type Product = {
  id: string;
  title: string;
  price: number;
  currency: string;
  sku: string;
  stockLabel?: string;
  description: string;
  heroImage: string;
  gallery: string[];
  sizes: string[];
  categories: string[];
  collections: string[];
};

export const products: Product[] = [
  {
    id: "1",
    title: "Champions League Supporter KomBat Pro - Red & Yellow",
    price: 149.9,
    currency: "TND",
    sku: "TST-FN-1191",
    stockLabel: "In Stock",
    description:
      "Official Champions League jersey in breathable KomBat Pro fabric for peak performance and all-day comfort.",
    heroImage: "https://taraji-store.com/wp-content/uploads/2025/12/26--scaled.jpg",
    gallery: [
      "https://taraji-store.com/wp-content/uploads/2025/10/11--scaled.jpg",
      "https://taraji-store.com/wp-content/uploads/2025/06/31--scaled.jpg",
      "https://taraji-store.com/wp-content/uploads/2025/01/04-3.jpg",
    ],
    sizes: ["XS", "S", "M", "L", "XL", "XXL"],
    categories: ["Home Kits"],
    collections: ["Afro Collection"],
  },
  {
    id: "2",
    title: "Legend Training Top",
    price: 109.5,
    currency: "TND",
    sku: "TST-PR-3902",
    stockLabel: "New",
    description:
      "Lightweight training top with breathable panels and water-repellent finish for intense sessions.",
    heroImage: "https://taraji-store.com/wp-content/uploads/2025/05/24-3-1.jpg",
    gallery: [
      "https://taraji-store.com/wp-content/uploads/2025/05/24-3-1.jpg",
      "https://taraji-store.com/wp-content/uploads/2025/06/31--scaled.jpg",
      "https://taraji-store.com/wp-content/uploads/2025/10/11--scaled.jpg",
    ],
    sizes: ["S", "M", "L", "XL"],
    categories: ["Training"],
    collections: ["Elite Performance"],
  },
  {
    id: "3",
    title: "Home Shorts 24/25",
    price: 89,
    currency: "TND",
    sku: "TST-SH-2450",
    stockLabel: "In Stock",
    description:
      "Official 24/25 home shorts with dryCELL tech and iconic side stripes.",
    heroImage: "https://taraji-store.com/wp-content/uploads/2025/06/31--scaled.jpg",
    gallery: [
      "https://taraji-store.com/wp-content/uploads/2025/06/31--scaled.jpg",
      "https://taraji-store.com/wp-content/uploads/2025/01/04-3.jpg",
      "https://taraji-store.com/wp-content/uploads/2025/12/26--scaled.jpg",
    ],
    sizes: ["XS", "S", "M", "L"],
    categories: ["Home Kits"],
    collections: ["Match Essentials"],
  },
  {
    id: "4",
    title: "Retro Scarf",
    price: 59.9,
    currency: "TND",
    sku: "TST-AC-8801",
    stockLabel: "Limited Edition",
    description:
      "Double-sided embroidered retro scarf to show your colors on matchday.",
    heroImage: "https://taraji-store.com/wp-content/uploads/2025/01/04-3.jpg",
    gallery: [
      "https://taraji-store.com/wp-content/uploads/2025/01/04-3.jpg",
      "https://taraji-store.com/wp-content/uploads/2025/12/26--scaled.jpg",
      "https://taraji-store.com/wp-content/uploads/2025/05/24-3-1.jpg",
    ],
    sizes: ["TU"],
    categories: ["Accessories"],
    collections: ["Heritage"],
  },
  {
    id: "5",
    title: "Matchday Hoodie",
    price: 179,
    currency: "TND",
    sku: "TST-HO-3001",
    stockLabel: "Pre-order",
    description:
      "Premium fleece-lined hoodie with invisible zip and sculpted hood for a modern matchday look.",
    heroImage: "https://taraji-store.com/wp-content/uploads/2025/10/15--scaled.jpg",
    gallery: [
      "https://taraji-store.com/wp-content/uploads/2025/10/15--scaled.jpg",
      "https://taraji-store.com/wp-content/uploads/2025/11/38--scaled.jpg",
      "https://taraji-store.com/wp-content/uploads/2025/05/24-3-1.jpg",
    ],
    sizes: ["S", "M", "L", "XL", "XXL"],
    categories: ["Lifestyle"],
    collections: ["Street"],
  },
  {
    id: "6",
    title: "Goalkeeper Gloves",
    price: 129.5,
    currency: "TND",
    sku: "TST-GK-7700",
    stockLabel: "Best Seller",
    description:
      "GripControl latex goalkeeper gloves with reinforced punch zones and breathable mesh.",
    heroImage: "https://taraji-store.com/wp-content/uploads/2025/11/38--scaled.jpg",
    gallery: [
      "https://taraji-store.com/wp-content/uploads/2025/11/38--scaled.jpg",
      "https://taraji-store.com/wp-content/uploads/2025/10/15--scaled.jpg",
      "https://taraji-store.com/wp-content/uploads/2025/12/26--scaled.jpg",
    ],
    sizes: ["7", "8", "9", "10"],
    categories: ["Goalkeeper"],
    collections: ["Pro Gear"],
  },
];

export const getProductById = (id: string): Product | undefined =>
  products.find((item) => item.id === id);
