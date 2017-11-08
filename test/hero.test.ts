import * as mocha from 'mocha';
import * as chai from 'chai';
import chaiHttp = require('chai-http');

import app from '../src/App';

chai.use(chaiHttp);
const expect = chai.expect;

describe('GET api/v1/heroes', () => {
    
   it('responds with JSON array', async () => {

        // act
        const res = await chai.request(app).get('/api/v1/heroes');
       
        // assert
        expect(res.status).to.eql(200);
        expect(res).to.be.json;
        expect(res.body).to.be.an('array');
        expect(res.body).to.have.length(5);
   
    })

   it('should include wolverine', async () => {

        // arrange
        let expectedKeys = ['id', 'name', 'aliases', 'occupation', 'gender', 'height', 'hair', 'eyes', 'powers'];

        // act
        let res = await chai.request(app).get('/api/v1/heroes');
        let wolverine = res.body.find(hero => hero.name === 'Wolverine');

        // assert
        expect(wolverine).to.exist;
        expect(wolverine).to.have.all.keys(expectedKeys); 
   });
});

describe('GET api/v1/heroes/:id', () =>{
    it('responds with single JSON object', async () => {
        // act
        let res = await chai.request(app).get('/api/v1/heroes/1');

        // assert
        expect(res.status).to.be.eql(200);
        expect(res).to.be.json;
        expect(res.body).to.be.an('object');
    });

    it('should return Luke Cage', async () => {
        // act
        let res = await chai.request(app).get('/api/v1/heroes/1');

        // assert
        expect(res.body.message).to.equal('Success');
     });
});

describe('POST api/v1/heroes', () => {
    it('should add new hero', async () =>{
        // act
        let res = await chai.request(app).post('/api/v1/heroes/')
        .set('content-type', 'application/x-www-form-urlencoded')
        .send({
            name: 'ranga',
            age: 35
        });
    
        // assert
        expect(res.status).to.be.eql(200);
        expect(res.body.message).to.be.equal('Success');
    });
    
});

describe('PUT api/v1/heroes/', () =>{
    it('should update the given resource', async () => {
        // act
        let res = await chai.request(app).put('/api/v1/heroes/')
        .set('content-type', 'application/x-www-form-urlencoded')
        .send({
            id: 1,
            name: 'Ranga',
            age: 35
        });

        // assert
        expect(res.status).to.be.eql(200);
        expect(res.body.hero.name).to.be.equal("Ranga");

    });
});
