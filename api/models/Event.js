import mongoose from 'mongoose';
const { Schema } = mongoose; 

const eventSchema = new Schema({ 
    name: {
        type: String,
        required: true
    },
    description: {
        type: String
    },
    date: {
        type: Date,
        required: true
    },
    location: {
        type: String,
        required: true 
    },
    venue: {
        type: String,
        required: true
    },
    createdBy: {
        type: String,
        required: true
    },
    image: { 
        type: String,
        required: false 
    }
});

const Event = mongoose.model('Event', eventSchema);
export default Event;
