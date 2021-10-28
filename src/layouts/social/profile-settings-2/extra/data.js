import { ImageSourcePropType } from 'react-native';

export class Profile {
    constructor(firstName, lastName, photo, gender, description, age, weight, height, email, phoneNumber) {
        this.firstName = firstName;
        this.lastName = lastName;
        this.photo = photo;
        this.gender = gender;
        this.description = description;
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
            'Hi! My name is Jennifer. I’m 25 and I live in Berlin. I’m interested in computer science, music, sport and fantasy literature.',
            25,
            48,
            174,
            'jen.green@gmail.com',
            '+375 44 846 97 68',
        );
    }
}
