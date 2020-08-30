const express = require('express');
const ticket = require('../models/ticket')
const updateTicketRouter = express.Router();
const moment =require('moment')
const bcrypt = require('bcrypt')
const Shows = require('./../models/show')
updateTicketRouter.route('/')
    .post(async(req,res,next)=>{
        const previousPhoneNumber=req.body.previousPhoneNumber
        var previousBookingTime = req.body.previousBookingTime
        previousBookingTime = Date.parse(previousBookingTime)
        var token = req.body.token
        // checking if previous ticket details are provided.
        if( !previousPhoneNumber || !previousBookingTime || !token){
            const Err = new Error('TimeStamp, Token and PhoneNumber are required');
            next(Err);
        }
        try{

            // finding old ticket with token
            const oldTicket = await ticket.findOne({token}).exec();
            if(!oldTicket){
                const err =new Error("Ticket not Found")
                return next(err)
            }
            
            // getting previous ticket creation time
            var updatedAt = Date.parse(String(oldTicket.updatedAt+Date.parse("05:30:00")).substring(4,24))
            

            // checking if the details provided are similar to the details in database.
            if(String(oldTicket.phoneNumber)!=String(previousPhoneNumber) || updatedAt != previousBookingTime){
                const Err = new Error("Cant Find a ticket with these crendentials")
                return next(Err);
            }
            //decreasing the count of old timeslot number to tickets booked
            await Shows.updateOne({timming : oldTicket.slotTime.timming},{totalTickets:oldTicket.slotTime.totalTickets-1 }).exec()
            var username = oldTicket.username
            var slotTime= req.body.newSlotTime
            
            // removing the old ticket
            ticket.remove({token});
            const date = new Date().getTime();

            //creating a new token with the new details provided
            var myPlaintextPassword = String(date)+'-'+String(req.body.newPhoneNumber)
            var showSlot = await Shows.findOne({timming : slotTime}).exec();
            
            //updating the new slot tickets and creating new slot if slot not there
            console.log(showSlot)
            if(showSlot==null){
                showSlot = {
                    timming : slotTime,
                    totalTickets : 1
                }
                await Shows.create(showSlot).exec();
            }
            else{
                
                if(showSlot.totalTickets >= 20){
                    const Err = new Error ("Tickets are Sold OUT")
                    return next(Err);
                }

                Shows.updateOne({timming : slotTime},{totalTickets: (showSlot.totalTickets+1)}).exec();
            }
            showSlot = await Shows.findOne({timming : slotTime}).exec();
            
            const newTicket = {
                username : username,
                phoneNumber:req.body.newPhoneNumber,
                slotTime: showSlot
            }
            newTicket.token = myPlaintextPassword;
            //hashing the new password with bcrypt
            await bcrypt.genSalt(10,(err,salt)=>{
                if(err){
                    return next(err);
                }
        
                bcrypt.hash(newTicket.token,salt,async (err,hash)=>{
                    if(err){
                        return next(err);
                    }
                    newTicket.token=hash;
                    // new ticket generated
                    await ticket.create(newTicket,()=>{
                        res.json({message:`Your ticket has been updated with token => ${newTicket.token} at time ${moment(date).format("DD-MM-YYYY h:mm:ss")} please keep both of them safe.`});
                    })
                    
                })
            })

            
        }
        catch(err){
            next(err);
        }

    })

module.exports = updateTicketRouter;