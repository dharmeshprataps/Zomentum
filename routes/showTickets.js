const express = require('express');
const Tickets = require('../models/ticket')
const showTicketsRouter = express.Router();
const Shows = require('./../models/show')
showTicketsRouter.route('/')
    .post(async(req,res,next)=>{
        const slotTime = String(req.body.slotTime);
        try{
            // finding all the show for the slot. 
            const show = await Shows.findOne({timming:slotTime}).exec();
            if(!show){
                const Err = new Error ("Show with this id has no tickets booked")
                return next(Err);
            }
            // taking out all the tickets
            const ticket = await Tickets.find({}).exec();
            if(!ticket){
                const Err = new Error ("Show with this id has no tickets booked")
                return next(Err);
            }
            var ticketMap = new Map()
            ticket.forEach(function(ticket) {
                
                // adding all the tickets with given show slot time int the hash map  
                if(String(ticket.slotTime)==String(show._id))
                    ticketMap[ticket._id] = ticket;
            });
            // sending the hash map.
            res.send({allTicket : ticketMap})
        }
        catch(err){
             next(err)
        }

    })

module.exports= showTicketsRouter;   