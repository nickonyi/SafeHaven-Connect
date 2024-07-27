import mongoose from 'mongoose';

const registrationSchema = new mongoose.Schema({
    ticketId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Ticket',
        required: true
    },
    
    userId: {
        type: String,
        required: true
    },

    eventId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Event',
        required: true
    },
    
    email: {
        type: String,
        required: true
    },
    
    numberOfSeats: {
        type: Number,
        required: true
    },
    
    ticketType: {
        type: String,
        required: true
    },
    totalPrice: {
        type: Number,
        required: true
    },
    status: {
        type: String,
        required: true
    }
}, { timestamps: true });

const Registration = mongoose.model('Registration', registrationSchema);

export default Registration;