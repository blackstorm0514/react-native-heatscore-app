import { ImageRequireSource } from 'react-native';

export class Message {

    constructor(text, date, reply, attachment) {
        this.text = text;
        this.date = date;
        this.reply = reply;
        this.attachment = attachment;
    }

    static howAreYou() {
        return new Message(
            'Hello! How are you',
            '4:00 PM',
            false,
            null,
        );
    }

    static imFine() {
        return new Message(
            'Hey! I’m fine. Thanks!  And you?',
            '4:15 PM',
            true,
            null,
        );
    }

    static imFineToo() {
        return new Message(
            'I’m fine too! Thanks!',
            '4:19 PM',
            false,
            null,
        );
    }

    static walkingWithDog() {
        return new Message(
            'I’m walking with my dog',
            '4:20 PM',
            false,
            null,
        );
    }

    static imageAttachment1() {
        return new Message(
            'IMG_1357.JPG',
            '4:25 PM',
            false,
            MessageAttachment.petPhoto1(),
        );
    }

    static imageAttachment2() {
        return new Message(
            'Video_347869.AVI',
            '4:28 PM',
            false,
            MessageAttachment.petPhoto2(),
        );
    }

    static canIJoin() {
        return new Message(
            'Oh! He’s  so sweet! Can I join you and walk together?',
            '4:30 PM',
            true,
            null,
        );
    }

    static sure() {
        return new Message(
            'Yes, sure!',
            '4:35 PM',
            false,
            null,
        );
    }
}

export class MessageAttachment {
    constructor(source) {
        this.source = source;
    }

    static petPhoto1() {
        return new MessageAttachment(require('../assets/image-attachment-1.png'));
    }

    static petPhoto2() {
        return new MessageAttachment(require('../assets/image-attachment-2.jpg'));
    }
}
