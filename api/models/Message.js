import mongoose from 'mongoose';

const MessageSchema = mongoose.Schema(
    {
    conversationId: {
        type: string
    },
    sender:{
        type: string
    },
    text :{
        type: string
    }
    },
    {
    timestamps: true
});

const Message = mongoose.model('Message', MessageSchema);

export default Message;