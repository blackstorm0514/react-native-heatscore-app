import { ImageSourcePropType } from 'react-native';

export class Product {
    constructor(id, title, subtitle, image, price, amount) {
        this.id = id;
        this.title = title;
        this.subtitle = subtitle;
        this.image = image;
        this.price = price;
        this.amount = amount;
    }

    get formattedPrice() {
        return `$${this.price}`;
    }

    get totalPrice() {
        return this.price * this.amount;
    }

    static pinkChair() {
        return new Product(
            0,
            'Pink Chair',
            'Furniture',
            require('../assets/image-product-1.png'),
            130,
            1,
        );
    }

    static blackLamp() {
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
