import mongoose from 'mongoose';
const { Schema } = mongoose;

const ticketSchema = new Schema({
    eventId: {
        type: Schema.Types.ObjectId,
        ref: 'Event',
        required: true
    },
    userId: {
        type: String,
        required: true
    },
    type: {
        type: String,
        enum: ['Regular', 'VIP'],
        required: true
    },
    sit:{
        type: Number,
        required: true
    },
    price: {
        type: Number,
        required: true
    }
});

const Ticket = mongoose.model('Ticket', ticketSchema);

export default Ticket;

