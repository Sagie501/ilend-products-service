export interface Product {
  id: number;
  name: string;
  description: string;
  pictureLinks: Array<string>;
  requestedPrice: number;
  rating: number;
  ownerId: number;
  categoryId: number;
}
