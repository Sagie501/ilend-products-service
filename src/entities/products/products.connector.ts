export class ProductsConnector {
  products = [
    {
      id: "5",
      ownerId: "1",
      name: "Ski",
      description: "This is ski",
      imageURI: null,
      requestedPrice: 25,
      rating: 4.5
    }
  ];

  async getFirstProduct() {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(this.products[0]);
      }, 500);
    });
  }

  async getProductsByUserId(userId: string) {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(this.products);
      }, 500);
    });
  }

  async getUserWishList(userId: string) {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(this.products);
      }, 500);
    });
  }

  async getUserFavoriteCategories(userId: string) {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve([]);
      }, 500);
    });
  }
}
