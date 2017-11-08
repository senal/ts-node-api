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
describe('baseRoute', () => {
    it('should be json', () => __awaiter(this, void 0, void 0, function* () {
        // act
        let res = yield chai.request(App_1.default).get('/');
        // assert
        expect(res.type).to.eql('application/json');
    }));
    it("should have a message property", () => __awaiter(this, void 0, void 0, function* () {
        // act
        let res = yield chai.request(App_1.default).get('/');
        // assert
        expect(res.body.message).to.eql('Hello world !!!');
    }));
});
