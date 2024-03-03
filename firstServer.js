const http = require("http");
const server = http.createServer((req, res) =>{
    res.writeHead(200,{"Content-Type":"text"})
    res.write("Subhankar Sharma");
    res.end();
});

server.listen(4000,()=>{
    console.log("server created successfully")
})