var add = require("../app");

describe("Add functinality", ()=>{
    it("calculates x + y = z", ()=>{
        expect(add(10 , 5)).toEqual(15);
    });
    it("calculates x + y = y", ()=>{
        expect(add(10 , 5)).toEqual(15);
    })
})