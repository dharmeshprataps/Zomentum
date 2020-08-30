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
it('OK , Showing ticket' ,(done)=>{
    request(app).post('/showTicket')
    .send({
        "token" : "$2b$10$tqz5bFLab6yVSLJCTSFFzOnnJ9aduBUXzhxNXAmEqMCabcTrItbYu"
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
it('Fail, Should require token' ,(done)=>{
    request(app).post('/showTicket')
    .send({
        "token" : "$2b$10$tqz5bFLab6yVSLJCTSFFzOnnJ9aduBUXzhxNXAmEqMCabcTrItbYu"
    })
    .then(res=>{
        const body = res.body;
        expect(body).to.not.contain.property('ticket')
        done();
    })
    .catch(err=>{
        done(err);
    })
})
