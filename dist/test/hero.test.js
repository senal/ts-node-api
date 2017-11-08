"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const chai = require("chai");
const chaiHttp = require("chai-http");
const App_1 = require("../src/App");
chai.use(chaiHttp);
const expect = chai.expect;
describe('GET api/v1/heroes', () => {
    it('responds with JSON array', () => __awaiter(this, void 0, void 0, function* () {
        // act
        const res = yield chai.request(App_1.default).get('/api/v1/heroes');
        // assert
        expect(res.status).to.eql(200);
        expect(res).to.be.json;
        expect(res.body).to.be.an('array');
        expect(res.body).to.have.length(5);
    }));
    it('should include wolverine', () => __awaiter(this, void 0, void 0, function* () {
        // arrange
        let expectedKeys = ['id', 'name', 'aliases', 'occupation', 'gender', 'height', 'hair', 'eyes', 'powers'];
        // act
        let res = yield chai.request(App_1.default).get('/api/v1/heroes');
        let wolverine = res.body.find(hero => hero.name === 'Wolverine');
        // assert
        expect(wolverine).to.exist;
        expect(wolverine).to.have.all.keys(expectedKeys);
    }));
});
describe('GET api/v1/heroes/:id', () => {
    it('responds with single JSON object', () => __awaiter(this, void 0, void 0, function* () {
        // act
        let res = yield chai.request(App_1.default).get('/api/v1/heroes/1');
        // assert
        expect(res.status).to.be.eql(200);
        expect(res).to.be.json;
        expect(res.body).to.be.an('object');
    }));
    it('should return Luke Cage', () => __awaiter(this, void 0, void 0, function* () {
        // act
        let res = yield chai.request(App_1.default).get('/api/v1/heroes/1');
        // assert
        expect(res.body.message).to.equal('Success');
    }));
});
describe('POST api/v1/heroes', () => {
    it('should add new hero', () => __awaiter(this, void 0, void 0, function* () {
        // act
        let res = yield chai.request(App_1.default).post('/api/v1/heroes/')
            .set('content-type', 'application/x-www-form-urlencoded')
            .send({
            name: 'ranga',
            age: 35
        });
        // assert
        expect(res.status).to.be.eql(200);
        expect(res.body.message).to.be.equal('Success');
    }));
});
describe('PUT api/v1/heroes/', () => {
    it('should update the given resource', () => __awaiter(this, void 0, void 0, function* () {
        // act
        let res = yield chai.request(App_1.default).put('/api/v1/heroes/')
            .set('content-type', 'application/x-www-form-urlencoded')
            .send({
            id: 1,
            name: 'Ranga',
            age: 35
        });
        // assert
        expect(res.status).to.be.eql(200);
        expect(res.body.hero.name).to.be.equal("Ranga");
    }));
});
