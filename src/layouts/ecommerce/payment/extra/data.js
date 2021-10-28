import { ImageSourcePropType } from 'react-native';

export class PaymentCard {

    constructor(number, logo, cardholderName, expireDate) {
        this.number = number;
        this.logo = logo;
        this.cardholderName = cardholderName;
        this.expireDate = expireDate;
    }

    static emilyClarckVisa() {
        return new PaymentCard(
            '4567 5678 7600 4560',
            require('../assets/visa-logo.png'),
            'Emily Clarck',
            '10/22',
        );
    }
}
