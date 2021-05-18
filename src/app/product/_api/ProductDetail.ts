export interface Facemask {
  title: string;
  shop: string;
  seller: string;
  price: string;
  rating: number;
  ratingCount: string;
  isBestSeller: boolean;
  hasDiscount: boolean;
  discountedPrice: string;
  discountPercent: string;
  image: string;
}

export interface ProductDetail {
  facemasks: Facemask[];
}
