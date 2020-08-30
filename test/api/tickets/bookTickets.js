const expect = require('chai').expect;
const request = require('supertest');

const app = require('../../../app');
const { connect } = require('mongoose');
const conn = require('./../../../bin/www')
describe('POST /tickets',()=>{
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
it('OK , creating a new ticket' ,(done)=>{
    request(app).post('/tickets')
    .send({
        username: "Dharmes",
        phoneNumber: 8299169095,
        slotTime : "30 Aug 2020 22:00:00 +05:30"
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
it('Fail , creating ticket requires username' ,(done)=>{
    request(app).post('/tickets')
    .send({
        phoneNumber: "8299169095",
        slotTime : "30 Aug 2020 22:00:00 +05:30"
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
it('Fail , creating ticket requires slot time' ,(done)=>{
    request(app).post('/tickets')
    .send({
        username: "Dharmes",
        phoneNumber: "8299169095"
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
it('Fail , creating ticket requires phone number' ,(done)=>{
    request(app).post('/tickets')
    .send({
        username: "Dharmes",
        slotTime : "30 Aug 2020 22:00:00 +05:30"
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
