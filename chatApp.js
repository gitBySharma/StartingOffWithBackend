const http = require("http");
const fs = require("fs");

const server = http.createServer((req, res) => {
    if (req.url === '/') {
        fs.readFile("message.txt", { encoding: "utf-8" }, (err, data) => {
            if (err) {
                console.log(err);
            }
            res.write("<html>");
            res.write("<head><title>Enter message</title></head>");
            res.write(`<body>${data}</body>`)
            res.write('<body><form action="/redirected" method="POST"><input type="text" name="Entered Input"><button type="submit">Send</button></form></body>');
            res.write("</html>");
            return res.end();
        })

    }

    if (req.url === "/redirected" && req.method === "POST") {
        const body = [];
        req.on("data", (chunk) => {
            body.push(chunk);
        });

        req.on("end", () => {
            const parsedBody = Buffer.concat(body).toString();
            const message = parsedBody.split("=")[1];

            fs.writeFile("message.txt", message, (err) => {
                if (err) {
                    console.log("Error encountered" + err);
                }
                res.statusCode = 302;
                res.setHeader('location', '/');
                console.log("File created, please check in directory");
                return res.end();
            })
        })
    }

});

server.listen(4000, () => { console.log("Server is live") });