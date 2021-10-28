import { ImageSourcePropType } from 'react-native';

export class Product {

  constructor(readonly id,
              readonly title,
              readonly subtitle,
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
      0,
      'Pink Chair',
      'Furniture',
      require('../assets/image-product-1.png'),
      130,
      1,
    );
  }

  static blackLamp(): Product {
    return new Product(
      1,
      'Black Lamp',
      'Lighting',
      require('../assets/image-product-1.png'),
      80,
      1,
    );
  }
}
