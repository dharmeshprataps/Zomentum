const express = require('express');
const Tickets = require('../models/ticket')
const deleteTicketRouter = express.Router();
const Show = require('./../models/show')
deleteTicketRouter.route("/")
    .post(async(req,res,next)=>{
        const token = req.body.token;
        if(!token){
            const Err= new Error("Token is required")
            return next(Err);
        }
        try{
            const ticket = await Tickets.findOne({token});
            const show = await Show.findOne({_id: ticket.slotTime});
            await Tickets.findOneAndDelete({token});
            await Show.findOneAndUpdate({_id:show._id},{ totalTickets: show.totalTickets-1 })
        }
        catch(err){
            return next (err)
        }
        res.send("Done")
    })
module.exports = deleteTicketRouter