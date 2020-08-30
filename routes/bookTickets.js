const express = require('express');
const ticket = require('../models/ticket')
const Shows = require('../models/show')
const ticketRouter = express.Router();
var moment =require('moment')
const bcrypt = require('bcrypt')
ticketRouter.route('/')
    .post( async (req,res,next) => {
        const username = req.body.username
        const phoneNumber = req.body.phoneNumber
        
        var date = new Date().getTime();
        var slotTime=req.body.slotTime
        
        
        //checking if username starttime and phonenumber are provided or not
        
        if(!username || !phoneNumber || !slotTime){
            const Err = new Error('UserName, SlotTime and PhoneNumber are required');
            return next(Err);
        }
        
        try{
            // creating a password hash which is a combitnation of current_time_stamp(date) and phonenumber
            var myPlaintextPassword = String(date)+'-'+String(phoneNumber)
            const newTicket = req.body;
            newTicket.token = myPlaintextPassword;
            // trying to find if a show exist for the time slot .
            var showSlot = await Shows.findOne({timming : slotTime}).exec();
            // creating a new show for that time slot with 1 ticket otherwise checking if tickets less than 20 and then adding 1 to total tickets.
            if(showSlot==null){
                showSlot = {
                    timming : slotTime,
                    totalTickets : 1
                }
                await Shows.create(showSlot);
            }
            else{
                if(showSlot.totalTickets >= 20){
                
                    const Err = new Error ("Tickets are Sold OUT")
                    return next(Err);
                
                }
                Shows.updateOne({timming : slotTime},{totalTickets: (showSlot.totalTickets+1)}).exec();
            }
            showSlot = await Shows.findOne({timming : slotTime});
            newTicket.slotTime = showSlot
            // hashing the plain password into a bcrypt hashed password with a salt of 10 rounds.
            await bcrypt.genSalt(10,(err,salt)=>{
                if(err){
                    return next(err);
                }
                bcrypt.hash(newTicket.token,salt,async (err,hash)=>{
                    if(err){
                        return next(err);
                    }
                    newTicket.token=hash;
                    // creating a new ticket and sending its details to the user.
                    try{
                        await ticket.create(newTicket);
                        res.json({message : `Your ticket has been generated with token => ${newTicket.token} at time ${moment(date).format("DD-MM-YYYY HH:mm:ss")} please keep both of them safe.`});
                    }
                    catch(err){
                        next(err);
                    }
                })
            })
            
            
        }
        catch(err){
            const Err = new Error(`Error generated while saving or generating token the ticket with a message => ${err}`);
            next(Err);
        }
    

    })

module.exports = ticketRouter;