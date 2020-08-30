const expect = require('chai').expect;
const request = require('supertest');

const app = require('../../../app');
const { connect } = require('mongoose');
const conn = require('./../../../bin/www')
describe('POST /updateTickets',()=>{
    before((done)=>{
        conn.connect()
        .then(()=>done())
        .catch(err=> done(err))
    })
    before((done)=>{
        conn.close()
        .then(()=>done())
        .catch(err=>done(err))
    })
})
it('OK , creating updating a ticket' ,(done)=>{
    request(app).post('updateTickets')
    .send({
        "previousPhoneNumber": 8299169095,
        "previousBookingTime" : "29 Aug 2020 23:37:02 +05:30",
        "token" : "$2b$10$tqz5bFLab6yVSLJCTSFFzOnnJ9aduBUXzhxNXAmEqMCabcTrItbYu",
        "newPhoneNumber": 8299222095,
        "newSlotTime" : "30 Aug 2020 06:00:00 +05:30"
    })
    .then(res=>{
        const body = res.body;
        expect(body).to.contain.property('message')
        done();
    })
    .catch(err=>{
        done(err);
    })
})
it('Fail , creating ticket requires previous phone number' ,(done)=>{
    request(app).post('/updateTickets')
    .send({
        
        "previousBookingTime" : "29 Aug 2020 23:37:02 +05:30",
        "token" : "$2b$10$tqz5bFLab6yVSLJCTSFFzOnnJ9aduBUXzhxNXAmEqMCabcTrItbYu",
        "newPhoneNumber": 8299222095,
        "newSlotTime" : "30 Aug 2020 06:00:00 +05:30"
    })
    .then(res=>{
        const body = res.body;
       expect(body).to.not.contain.property('message')
        done();
    })
    .catch(err=>{
        done(err);
    })
})
it('Fail , creating ticket requires new slot time' ,(done)=>{
    request(app).post('/updateTickets')
    .send({
        "previousPhoneNumber": 8299169095,
        "previousBookingTime" : "29 Aug 2020 23:37:02 +05:30",
        "token" : "$2b$10$tqz5bFLab6yVSLJCTSFFzOnnJ9aduBUXzhxNXAmEqMCabcTrItbYu",
        "newPhoneNumber": 8299222095,
    })
    .then(res=>{
        const body = res.body;
       expect(body).to.not.contain.property('message')
        done();
    })
    .catch(err=>{
        done(err);
    })
})
it('Fail , creating ticket requires new phone number' ,(done)=>{
    request(app).post('/updateTickets')
    .send({
        "previousPhoneNumber": 8299169095,
        "previousBookingTime" : "29 Aug 2020 23:37:02 +05:30",
        "token" : "$2b$10$tqz5bFLab6yVSLJCTSFFzOnnJ9aduBUXzhxNXAmEqMCabcTrItbYu",
        "newSlotTime" : "30 Aug 2020 06:00:00 +05:30"
    })
    .then(res=>{
        const body = res.body;
       expect(body).to.not.contain.property('message')
        done();
    })
    .catch(err=>{
        done(err);
    })
})
it('Fail , creating ticket requires previous booking time' ,(done)=>{
    request(app).post('/updateTickets')
    .send({
        "previousPhoneNumber": 8299169095,
        "newPhoneNumber": 8299222095,
        "token" : "$2b$10$tqz5bFLab6yVSLJCTSFFzOnnJ9aduBUXzhxNXAmEqMCabcTrItbYu",
        "newSlotTime" : "30 Aug 2020 06:00:00 +05:30"
    })
    .then(res=>{
        const body = res.body;
       expect(body).to.not.contain.property('message')
        done();
    })
    .catch(err=>{
        done(err);
    })
})
it('FAIL , token is required for updating ticket' ,(done)=>{
    request(app).post('updateTickets')
    .send({
        "previousPhoneNumber": 8299169095,
        "previousBookingTime" : "29 Aug 2020 23:37:02 +05:30",
        "token" : "$2b$10$tqz5bFLab6yVSLJCTSFFzOnnJ9aduBUXzhxNXAmEqMCabcTrItbYu",
        "newPhoneNumber": 8299222095,
        "newSlotTime" : "30 Aug 2020 06:00:00 +05:30"
    })
    .then(res=>{
        const body = res.body;
        expect(body).to.contain.property('message')
        done();
    })
    .catch(err=>{
        done(err);
    })
})