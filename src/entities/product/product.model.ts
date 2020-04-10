export interface Product {
  id: number;
  name: string;
  description: string;
  imageURI: string;
  requestedPrice: number;
  rating: number;
  ownerId: number;
  categoryId: number;
}
