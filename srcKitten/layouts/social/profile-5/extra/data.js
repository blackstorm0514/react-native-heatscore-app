import { ImageSourcePropType } from 'react-native';

export class Profile {
    constructor(firstName, lastName, photo, location, experience, height, weight, age, inseam) {
        this.firstName = firstName;
        this.lastName = lastName;
        this.photo = photo;
        this.location = location;
        this.experience = experience;
        this.height = height;
        this.weight = weight;
        this.age = age;
        this.inseam = inseam;
    }

    get fullName() {
        return `${this.firstName} ${this.lastName}`;
    }

    static jenAustin() {
        return new Profile(
            'Jen',
            'Austin',
            require('../assets/image-profile.jpg'),
            'Berlin, Germany',
            3,
            174,
            48,
            25,
            45,
        );
    }
}
