const mongoose= require('mongoose')
const showSchema = mongoose.Schema({
    timming: {
        required: true,
        type : String,
        unique : true
    },
    totalTickets:{
        required : true,
        type: Number
    } 
})

const Shows = mongoose.model('Show',showSchema)
module.exports = Shows;