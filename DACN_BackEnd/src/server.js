require('dotenv').config();
const express = require('express'); // commonjs
const configViewEngine = require('./config/viewEngine');
const initWebRoute = require('./routes/web');
const initAPIRoute = require('./routes/api');
const connection = require('./config/database');


const app = express() // app express
const port = process.env.PORT || 8888 // port
const hostname = process.env.HOST_NAME

// Middleware
// config req.body
app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ limit: '50mb', extended: true }));

// config template engine
configViewEngine(app);

// khai báo route
//app.use('/', webRoutes);
initWebRoute(app);

// khai báo API route
initAPIRoute(app);

// Error handling middleware
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Something broke!');
});


// test connection

// simple query
// connection.query(
//     'SELECT * FROM Users u',
//     function (err, results, fields) {
//         console.log("Results là : ", results); // results contains rows returned by server
//         console.log("Fields là : ", fields); // fields contais extra meta data about results, if available
//     }
// )


app.listen(port, hostname, () => {
    console.log(`Example app listening at http://${hostname}:${port}`)
})

// //Load HTTP module (thư viện đã có sẵn khi cài đặt node.js)
// const http = require("http");
// const hostname = "127.0.0.1"; //cái này === http://localhost
// const port = 3000;
// //Create HTTP server and listen on port 3000 for requests
// const server = http.createServer((req, res) => {
// //Set the response HTTP header with HTTP status and Content type
// res.statusCode = 200;
// res.setHeader("Content-Type", "text/plain");
// res.end("Hello World\n");
// });
// //listen for request on port 3000, and as a callback function have the port listened on logged
// server.listen(port, hostname, () => {
// console.log(`Server running at http://${hostname}:${port}/`);
// });
// //tự động chạy trên localhost
// // server.listen(port, () => {
// // console.log(`Server running at http://${hostname}:${port}/`);
// // });