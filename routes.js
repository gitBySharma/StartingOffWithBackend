const fs = require("fs");

const requestHandler = (req, res) => {
    if (req.url === "/") {
        res.write("<html>");
        res.write("<head><title>Enter message</title></head>");
        res.write('<body><form action="/redirected" method="POST"><input type="text" name="Subhankar Sharma"><button type="submit">Send</button></form></body>');
        res.write("</html>");
        return res.end();
    }
    if (req.url === '/redirected' && req.method === 'POST') {
        const body = [];
        req.on("data", (chunk) => {
            console.log(chunk);
            body.push(chunk);
        });

        req.on("end", () => {
            const parsedBody = Buffer.concat(body).toString();
            const message = parsedBody.split("=")[1];
            fs.writeFile('message.txt', message, (err) => {
                res.statusCode = 302;
                res.setHeader('Location', '/');
                return res.end();
            });

        })

    }
};

module.exports = requestHandler;