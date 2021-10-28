import { ImageSourcePropType } from 'react-native';

export class Article {
    constructor(title, description, content, image, date, author, likes, comments) {
        this.title = title;
        this.description = description;
        this.content = content;
        this.image = image;
        this.date = date;
        this.author = author;
        this.likes = likes;
        this.comments = comments;
    }

    static howToEatHealthy() {
        return new Article(
            'How To Eat Healthy',
            '10 Useful Tips',
            'There\'s a lot of advice out there on how to eat healthy, and if we\'re being honest, it can sometimes feel like too much to think about. Especially when you\'re hungry. Remember when you were a kid and eating was as simple as open, chew, enjoy? Yes, those were simpler times. Now, knowing how to eat healthy doesn\'t seem quite as straightforward. Between the diet fads, gourmet trends, and a rotating roster of superfoods, eating well has gotten, well, complicated.',
            require('../assets/image-background.jpg'),
            '19 Sep, 2018',
            Profile.markVolter(),
            [
                Like.byMarkVolter(),
                Like.byHubertFranck(),
            ],
            [
                Comment.byHubertFranck(),
            ],
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
    constructor(text, date, author) {
        this.text = text;
        this.date = date;
        this.author = author;
    }

    static byHubertFranck() {
        return new Comment(
            'This very useful information for me Thanks for your article!',
            'Today 11:10 am',
            Profile.hubertFranck(),
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

