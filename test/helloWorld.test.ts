import * as mocha from 'mocha';
import * as chai from 'chai';
import chaiHttp = require('chai-http');
import app from '../src/App';

chai.use(chaiHttp);
const expect = chai.expect;

describe('baseRoute', () => {
    it('should be json', async () =>{
        
        // act
        let res = await chai.request(app).get('/');

        // assert
        expect(res.type).to.eql('application/json');
    });

    it("should have a message property", async () => {
        
        // act
        let res = await chai.request(app).get('/');

        // assert
        expect(res.body.message).to.eql('Hello world !!!');                
    });
});