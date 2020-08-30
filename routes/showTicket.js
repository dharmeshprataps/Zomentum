const express = require('express');
const Tickets = require('../models/ticket')
const showTicketRouter = express.Router();
showTicketRouter.route('/')
    .post(async(req,res,next)=>{
        const token = req.body.token
        try{
            // finding the ticket 
            const ticket = await Tickets.findOne({token});
            if(!ticket){
                const Err= new Error("Ticket not found");
                return next(Err);
            }
            res.json({ticket: ticket})
        }
        catch(err){
             next(err)
        }

    })

module.exports= showTicketRouter;   