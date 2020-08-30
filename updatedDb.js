const Ticket = require('./models/ticket')
const Show = require('./models/show')
module.exports = async()=>{
    try{
        const time = new Date().getTime();
        // Finding all the tickets 
        const ticket = await Ticket.find({}).exec();
        ticket.forEach(async(element) => {
            
            const show = await Show.findOne({_id: element.slotTime}).exec();
            const slotTimeStamp = Date.parse(show.timming)
            // Finding and deleting the ticket which is more than 8 hours old.
            if( slotTimeStamp+8*60*60*1000<time ){
                await Ticket.findOneAndDelete({_id:element._id}).exec();
                await Show.findOneAndUpdate({_id:show._id},{ totalTickets: show.totalTickets-1 })
            }
        }); 
    }
    catch(err){
        return err;
    }
}