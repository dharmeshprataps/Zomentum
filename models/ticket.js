const mongoose=  require('mongoose');
const ticketSchema = mongoose.Schema({
    username:{
        type: String,
        required : true
    },
    phoneNumber : {
        type : Number,
        required: true
    },
    slotTime: {
        type : mongoose.Schema.Types.ObjectId,
        ref: 'Show',
        required: true
    },
    token:{
        type: String,
        required: true
    }
},{
    timestamps: true
})

const Tickets = mongoose.model('ticket',ticketSchema);
module.exports = Tickets;