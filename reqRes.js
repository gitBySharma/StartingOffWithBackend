const http = require('http');

const server = http.createServer((req, res) => {
    if (req.url === "/home") {
        res.write("Welcome Home");
        res.end();
    }
    if (req.url === "/about") {
        res.write("Welcome to About Us page");
        res.end();
    }
    if (req.url === "/node") {
        res.write("Welcome to my Node JS Project");
        res.end();
    }
});

server.listen(4000);