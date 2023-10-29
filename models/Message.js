import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const MessageSchema = new Schema({
    Name        : { type: String, required: true },
    Email       : { type: String, required: true },
    Subject     : { type: String, required: true },
    Message     : { type: String, required: true },
});

export const Message = mongoose.models.Message || mongoose.model('Message', MessageSchema);
