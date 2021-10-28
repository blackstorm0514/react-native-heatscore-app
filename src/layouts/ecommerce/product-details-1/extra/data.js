import { ImageSourcePropType } from 'react-native';

export class Product {

    constructor(image, title, author, categories, rating, price, description, comments) {
        this.image = image;
        this.title = title;
        this.author = author;
        this.categories = categories;
        this.rating = rating;
        this.price = price;
        this.description = description;
        this.comments = comments;
    }

    static designSystemsBook() {
        return new Product(
            require('../assets/image-product.png'),
            'Design Systems',
            'Alla Kholmatova',
            ['Design', 'Art'],
            4,
            '$10',
            'Not all design systems are equally effective. Some can generate coherent user experiences, others produce confusing patchwork designs. Some inspire teams to contribute to them, while others are neglected. Some get better with time, more cohesive and better functioning; others get worse, becoming bloated and cumbersome.\n' +
            '\n' +
            'Throughout this book, Alla Kholmatova, previously a lead designer at FutureLearn, will share an approach and the key qualities of effective, enduring design systems. It’s based on Alla’s experiences, case-studies from AirBnB, Atlassian, Eurostar, TED, and Sipgate, plus 18 months of research and interviews — all attempting to figure out what works and what doesn’t work in real-life products. It may not answer every question, but it will help you figure out just the right strategy for establishing and evolving a design system in your organization.',
            [
                Comment.byHubertFranck(),
            ],
        );
    }
}

export class Profile {
    constructor(firstName, lastName, photo) {
        this.firstName = firstName;
        this.lastName = lastName;
        this.photo = photo;
    }

    get fullName() {
        return `${this.firstName} ${this.lastName}`;
    }

    static markVolter() {
        return new Profile(
            'Mark',
            'Volter',
            require('../assets/image-profile.jpg'),
        );
    }

    static hubertFranck() {
        return new Profile(
            'Hubert',
            'Franck',
            require('../assets/image-profile.jpg'),
        );
    }
}

export class Like {

    constructor(author) {
        this.author = author;
    }

    static byMarkVolter() {
        return new Like(
            Profile.markVolter(),
        );
    }

    static byHubertFranck() {
        return new Like(
            Profile.hubertFranck(),
        );
    }
}

export class Comment {
    constructor(text, date, author, comments, likes) {
        this.text = text;
        this.date = date;
        this.author = author;
        this.comments = comments;
        this.likes = likes;
    }

    static byHubertFranck() {
        return new Comment(
            'In my opinion this book is cool!',
            'Today 11:10 am',
            Profile.hubertFranck(),
            [
                Comment.byMarkVolter(),
            ],
            [
                Like.byMarkVolter(),
            ],
        );
    }

    static byMarkVolter() {
        return new Comment(
            'Thanks!',
            'Today 11:10 am',
            Profile.markVolter(),
            [],
            [],
        );
    }
}
