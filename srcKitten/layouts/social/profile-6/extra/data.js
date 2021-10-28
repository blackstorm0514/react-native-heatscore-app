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

    static helenKuper() {
        return new Profile(
            'Helen',
            'Kuper',
            require('../assets/image-profile.jpg'),
            'Germany',
            1500,
            86,
            116,
        );
    }
}

export class Post {
    constructor(photo, category) {
        this.photo = photo;
        this.category = category;
    }

    static plant1() {
        return new Post(
            require('../assets/image-plant-1.jpg'),
            'Plants',
        );
    }

    static plant2() {
        return new Post(
            require('../assets/image-plant-2.jpg'),
            'Plants',
        );
    }

    static plant3() {
        return new Post(
            require('../assets/image-plant-3.jpg'),
            'Plants',
        );
    }

    static travel1() {
        return new Post(
            require('../assets/image-travel-1.jpg'),
            'Travel',
        );
    }

    static travel2() {
        return new Post(
            require('../assets/image-travel-2.jpg'),
            'Travel',
        );
    }

    static travel3() {
        return new Post(
            require('../assets/image-travel-3.jpg'),
            'Travel',
        );
    }

    static style1() {
        return new Post(
            require('../assets/image-style-1.jpg'),
            'Style',
        );
    }

    static style2() {
        return new Post(
            require('../assets/image-style-2.jpg'),
            'Style',
        );
    }

    static style3() {
        return new Post(
            require('../assets/image-style-3.jpg'),
            'Style',
        );
    }
}
