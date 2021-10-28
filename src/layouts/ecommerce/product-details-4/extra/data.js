export class Product {
    constructor(title, description, price, primaryImage, images, details, options) {
        this.title = title;
        this.description = description;
        this.price = price;
        this.primaryImage = primaryImage;
        this.images = images;
        this.details = details;
        this.options = options;
    }

    static centralParkApartment() {
        return new Product(
            'Private Rooms with Central Park View',
            'The apartment consists of 2 separate bedrooms, 1 bathroom with a hair dryer. A flat-screen TV and Blu-ray player are available.\n' +
            '\n' +
            'Rodin Museum is 4.2 km from the apartment, while Orsay Museum is 5 km away. The nearest airport is Paris - Orly Airport, 13 km from the property.',
            ProductPrice.tenDollarsPerNight(),
            require('../assets/image-product.jpg'),
            [
                require('../assets/image-product.jpg'),
                require('../assets/image-product.jpg'),
                require('../assets/image-product.jpg'),
            ],
            [
                '2 Guests',
                '2 Bad',
                '2 Bath',
            ],
            [
                ProductOption.wifiOption(),
                ProductOption.tvOption(),
                ProductOption.parkingOption(),
            ],
        );
    }
}

export class ProductPrice {
    constructor(value, currency, scale) {
        this.value = value;
        this.currency = currency;
        this.scale = scale;
    }

    get formattedValue() {
        return `${this.currency}${this.value}`;
    }

    get formattedScale() {
        return `/${this.scale}`;
    }

    static tenDollarsPerNight() {
        return new ProductPrice(10, '$', 'night');
    }
}

export class ProductOption {
    constructor(icon, title) {
        this.icon = icon;
        this.title = title;
    }

    static wifiOption() {
        return new ProductOption('wifi', 'Wi-Fi');
    }

    static tvOption() {
        return new ProductOption('tv', 'TV');
    }

    static parkingOption() {
        return new ProductOption('car', 'Free Parking');
    }
}

