import { Message } from '../../chat-1/extra/data';

export class ChatService {

    createMessageGroups = (source) => {
        if (!source.length) {
            return [];
        }

        const result = [];
        const [firstMessage, ...messages] = source;

        let currentGroup = [firstMessage];

        messages.forEach((message) => {
            if (this.fitsGroupSafe(message, currentGroup)) {
                currentGroup.push(message);
            } else {
                result.push(currentGroup);
                currentGroup = [message];
            }
        });

        return [...result, currentGroup];
    };

    fitsGroupSafe = (message, group) => {
        const [firstGroupMessage] = group;

        return this.isSameGroupSafe(firstGroupMessage, message);
    };

    isSameGroup = (lhs, rhs) => {
        return lhs.reply === rhs.reply;
    };

    isSameGroupSafe = (lhs, rhs) => {
        if (lhs && rhs) {
            return this.isSameGroup(lhs, rhs);
        }

        return false;
    };
}
