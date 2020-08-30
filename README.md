# Zomentum
A REST API for movie theatre ticket booking system.

Features of the API -

    * Ticket is booked via user name, phone number and the show timings.
    * Update the timings of a ticket.
    * View all the tickets of a particular time.
    * Delete a particular ticket.
    * View user details of a particular ticket.
    * A ticket is expired after 8hrs difference between ticket timing and current time.
    * Expired tickets get automatically deleted.
    * Maximum of 20 tickets can be booked for a particular timing.
   
Each end point is created in a different file for the sake of simplicity and more readability.

Token(Ticket) is created by a hash of phone number and ticket booking time with bcrypt.js.

There are 2 Schemas created -

    Show Schema => It contains timmings of show and total number of tickets sold.
    Ticket Schema => It contains username, phoneNumber, reference to a show from show schema, timestamp and Token.
 
Whenever a ticket is booked then that number of tickets is increased by 1 if that show is already present in Schema. If not then a new show is created with 1 ticket.

Testing is done using mocha and chai.

To run server => npm start

To run testing => npm run test
