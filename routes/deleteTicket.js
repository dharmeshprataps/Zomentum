const express = require('express');
const Tickets = require('../models/ticket')
const deleteTicketRouter = express.Router();
deleteTicketRouter.route("/")
    .post(async(req,res,next)=>{
        const token = req.body.token;
        if(!token){
            const Err= new Error("Token is required")
            return next(Err);
        }
        try{
            await Tickets.findOneAndDelete({token});
        }
        catch(err){
            return next (err)
        }
        res.send("Done")
    })
module.exports = deleteTicketRouter