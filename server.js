var Express = require('express');

var app = Express();

app.get('/', (request, response) => {
    response.status(200).send("Hello world");
});

app.get('/test', (request, response) => {
    response.status(500).send({"message": "This is a error response"});
});

app.get('/queryTest',(request, response) => {
    if(!request.query.id){
        response.status(500).send({"message":"Query is undefined"});
    }else{
        response.status(200).send({"message":"Query is :"+request.query.id});
    }
    
})

var server = app.listen(8080, ()=>{
    console.log("listening on port localhost:" + server.address().port + "...");
});

module.exports = server;