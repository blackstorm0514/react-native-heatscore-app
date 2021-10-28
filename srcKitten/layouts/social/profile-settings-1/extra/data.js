import { ImageSourcePropType } from 'react-native';

export class Profile {
    constructor(firstName, lastName, photo, gender, age, weight, height, email, phoneNumber) {
        this.firstName = firstName;
        this.lastName = lastName;
        this.photo = photo;
        this.gender = gender;
        this.age = age;
        this.weight = weight;
        this.height = height;
        this.email = email;
        this.phoneNumber = phoneNumber;
    }

    get fullName() {
        return `${this.firstName} ${this.lastName}`;
    }

    static jenniferGreen() {
        return new Profile(
            'Jennifer',
            'Green',
            require('../assets/image-profile.jpg'),
            'Female',
            25,
            48,
            174,
            'jen.green@gmail.com',
            '+375 44 846 97 68',
        );
    }
}
