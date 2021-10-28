import { ImageSourcePropType } from 'react-native';

export class Product {

  constructor(readonly title,
              readonly subtitle,
              readonly description,
              readonly categories,
              readonly primaryImage,
              readonly rating,
              readonly images,
              readonly details: ProductDetails[]) {
  }

  static howToTrainYourDragonMovie(): Product {
    return new Product(
      'How To Train YourDragon The Hidden World',
      'Part III',
      'When Hiccup discovers Toothless isn\'t the only Night Fury, he must seek "The Hidden World", a secret Dragon Utopia before a hired tyrant named Grimmel finds it first.',
      ['Adventure', 'Family', 'Fantasy'],
      require('../assets/image-product.png'),
      4,
      [
        require('../assets/image-product-1.jpeg'),
        require('../assets/image-product-1.jpeg'),
        require('../assets/image-product-1.jpeg'),
        require('../assets/image-product-1.jpeg'),
      ],
      [
        ProductDetails.yearDetail(2019),
        ProductDetails.countryDetail('USA'),
        ProductDetails.minutesDetail(112),
      ],
    );
  }
}

export class ProductDetails {

  constructor(readonly title,
              readonly description) {
  }

  static yearDetail(year): ProductDetails {
    return new ProductDetails('Year', `${year}`);
  }

  static countryDetail(country): ProductDetails {
    return new ProductDetails('Country', country);
  }

  static minutesDetail(length): ProductDetails {
    return new ProductDetails('Length', `${length} min`);
  }
}
