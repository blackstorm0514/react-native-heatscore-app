import { ImageSourcePropType } from 'react-native';

export class Product {
    constructor(title, subtitle, description, categories, primaryImage, rating, images, details) {
        this.title = title;
        this.subtitle = subtitle;
        this.description = description;
        this.categories = categories;
        this.primaryImage = primaryImage;
        this.rating = rating;
        this.images = images;
        this.details = details;
    }

    static howToTrainYourDragonMovie() {
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
    constructor(title, description) {
        this.title = title;
        this.description = description;
    }

    static yearDetail(year) {
        return new ProductDetails('Year', `${year}`);
    }

    static countryDetail(country) {
        return new ProductDetails('Country', country);
    }

    static minutesDetail(length) {
        return new ProductDetails('Length', `${length} min`);
    }
}
