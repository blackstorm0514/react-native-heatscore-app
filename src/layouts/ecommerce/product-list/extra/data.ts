import { ImageSourcePropType } from 'react-native';

export class Product {

  constructor(readonly title,
              readonly category,
              readonly image,
              readonly price,
              readonly amount) {
  }

  get formattedPrice() {
    return `$${this.price}`;
  }

  get totalPrice() {
    return this.price * this.amount;
  }

  static pinkChair(): Product {
    return new Product(
      'Pink Chair',
      'Furniture',
      require('../assets/image-product-1.png'),
      130,
      1,
    );
  }

  static whiteChair(): Product {
    return new Product(
      'White Chair',
      'Furniture',
      require('../assets/image-product-2.jpg'),
      150,
      1,
    );
  }

  static woodChair(): Product {
    return new Product(
      'Wood Chair',
      'Furniture',
      require('../assets/image-product-1.png'),
      125,
      1,
    );
  }

  static blackLamp(): Product {
    return new Product(
      'Black Lamp',
      'Lighting',
      require('../assets/image-product-3.jpg'),
      80,
      1,
    );
  }
}
