export class Profile {
    constructor(firstName, lastName, photo, location, description, followers, following, posts) {
        this.firstName = firstName;
        this.lastName = lastName;
        this.photo = photo;
        this.location = location;
        this.description = description;
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
            require('../assets/image-profile-1.jpg'),
            'Germany',
            'I\'m a Traveler. I\'m like listening to music, going to the cinema, walking with my friends, drawing pictures and traveling.',
            1500,
            86,
            116,
        );
    }

    static jenAustin() {
        return new Profile(
            'Jen',
            'Austin',
            require('../assets/image-profile-2.jpg'),
            'Tokyo',
            'I\'m a Traveler. I\'m like listening to music, going to the cinema, walking with my friends, drawing pictures and traveling.',
            2500,
            172,
            25,
        );
    }

    static jenniferGreen() {
        return new Profile(
            'Jennifer',
            'Green',
            require('../assets/image-profile-3.jpg'),
            'Germany',
            'Hi! My name is Jennifer. I’m 25 and I live in Berlin. I’m interested in computer science, music, sport and fantasy literature.',
            2500,
            172,
            25,
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

    static travel1() {
        return new Post(
            require('../assets/image-travel-1.jpg'),
            'Travel',
        );
    }

    static style1() {
        return new Post(
            require('../assets/image-style-1.jpg'),
            'Style',
        );
    }
}
