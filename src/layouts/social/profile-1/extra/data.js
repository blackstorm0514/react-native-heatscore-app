import { ImageSourcePropType } from 'react-native';

export class Profile {

    constructor(firstName, lastName, photo, location, followers, following, posts) {
        this.firstName = firstName;
        this.lastName = lastName;
        this.photo = photo;
        this.location = location;
        this.followers = followers;
        this.following = following;
        this.posts = posts;
    }

    get fullName() {
        return `${this.firstName} ${this.lastName}`;
    }

    static jenniferGreen() {
        return new Profile(
            'Jennifer',
            'Green',
            require('../assets/image-profile-1.jpg'),
            'Berlin, Germany',
            1500,
            700,
            86,
        );
    }

    static alexaTenorio() {
        return new Profile(
            'Alexa',
            'Tenorio',
            require('../assets/image-profile-2.jpg'),
            'Tokyo, Japan',
            2500,
            172,
            32,
        );
    }
}

export class Post {

    constructor(image, author, date, likes) {
        this.image = image;
        this.author = author;
        this.date = date;
        this.likes = likes;
    }

    static byAlexaTenorio() {
        return new Post(
            require('../assets/image-post-1.jpg'),
            Profile.alexaTenorio(),
            'Today 12:35 pm',
            [
                Like.byAlexaTenorio(),
                Like.byJenniferGreen(),
            ],
        );
    }

    static byJenniferGreen() {
        return new Post(
            require('../assets/image-post-2.jpg'),
            Profile.jenniferGreen(),
            'Today 12:35 pm',
            [
                Like.byAlexaTenorio(),
            ],
        );
    }
}

export class Like {

    constructor(author) {
        this.author = author;
    }

    static byAlexaTenorio() {
        return new Like(Profile.alexaTenorio());
    }

    static byJenniferGreen() {
        return new Like(Profile.jenniferGreen());
    }
}
