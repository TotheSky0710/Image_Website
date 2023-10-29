import { db } from 'helpers/api';

const Message = db.Message;

export const messageRepo = {
    sendMessage
};

async function sendMessage(params) {
    // validate
    const message = new Message(params);

    // save user
    await message.save();
}

