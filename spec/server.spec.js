var Request = require("request");

describe("Server()", ()=> {
    var server;
    beforeAll(()=> {
        server = require("../server");
    });
    afterAll(()=>{
        server.close();
    });

    describe("GET /", ()=>{
        var data ={};
        beforeAll((done)=> {
            Request.get("http://localhost:8080/", (error, response, body)=> {
                //console.log(error);
                data.status = response.statusCode;
                data.body =body
                done();
            });
        });

        it("status 200", ()=> {
           // console.log(data);
            expect(data.status).toBe(200);
        });
        it("body", ()=> {
            expect(data.body).toBe("Hello world");
        });
    });

    describe("GET /test", ()=>{
        var data ={};
        beforeAll((done)=> {
            Request.get("http://localhost:8080/test", (error, response, body)=> {
                //console.log("JSON parse >> ", JSON.parse(body));
                data.status = response.statusCode;
                data.body =JSON.parse(body);
                done();
            });
        });

        it("status 500", ()=> {
            expect(data.status).toBe(500);
        });
        it("body", ()=> {
            expect(data.body.message).toBe("This is a error response");
        });
    });

    describe("GET /queryTest", ()=>{
        describe("do not pass the query and get status 500", () => {
            var data ={};
            beforeAll((done) =>{
                Request.get("http://localhost:8080/queryTest", (error, response, body)=> {
                    console.log("response status code >>>",response.statusCode);
                    console.log("JSON parse >> ", JSON.parse(body));
                    data.status = response.statusCode;
                    data.body =JSON.parse(body);
                    done();
                });
            });
            it("status 500", ()=> {
                expect(data.status).toBe(500);
            });
            it("body", ()=> {
                expect(data.body.message).toBe("Query is undefined");
            });
        });
        describe("pass the query with status 200", () => {
            var data ={};
            beforeAll((done) =>{
                Request.get("http://localhost:8080/queryTest?id=28", (error, response, body)=> {
                    console.log("response status code >>>",response.statusCode);
                    console.log("JSON parse >> ", JSON.parse(body));
                    data.status = response.statusCode;
                    data.body =JSON.parse(body);
                    done();
                });

            });
            it("status 200", ()=> {
                expect(data.status).toBe(200);
            });
            it("body", ()=> {
                expect(data.body.message).toBe("Query is :28");
            });
        });

        
    });

});