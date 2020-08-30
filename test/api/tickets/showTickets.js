const expect = require('chai').expect;
const request = require('supertest');

const app = require('../../../app');
const { connect } = require('mongoose');
const conn = require('./../../../bin/www')
describe('POST /showTickets',()=>{
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
it('OK , Showing All tickets' ,(done)=>{
    request(app).post('/showTickets')
    .send({
        slotTime : "30 Aug 2020 22:00:00 +05:30"
    })
    .then(res=>{
        const body = res.body;
        expect(body).to.contain.property('allTicket')
        done();
    })
    .catch(err=>{
        done(err);
    })
})
it('Fail, Should require Slot Time' ,(done)=>{
    request(app).post('/showTickets')
    .send({
        slotTime : "30 Aug 2020 22:00:00 +05:30"
    })
    .then(res=>{
        const body = res.body;
        expect(body).to.not.contain.property('allTicket')
        done();
    })
    .catch(err=>{
        done(err);
    })
})
