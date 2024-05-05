const express = require("express");
const { readFileSync } = require("fs");
const bodyParser = require('body-parser');
const webSocket = require("ws");
const https = require("https");
const app = express();
const httpsPort = process.env.PORT || 8000;
let datas = [];
app.use(bodyParser.json());

app.get("/", (req, resp) => {
    resp.status(200).send(readFileSync("./index.html", {encoding: "utf-8"}));
});
app.post("/save-data", (req, resp) => {
    const { speed, angle, distance, timestamp,latitude,longitude } = req.body;
    datas.push({ speed, angle, distance, timestamp,latitude,longitude });
    console.log(speed, angle, distance, timestamp, latitude,longitude);
    resp.send({ success: true });
});
app.get("/data", (req, resp) => {
    resp.send(datas);
});
app.get("/reset-data", (req, resp) => {
    datas = [];
    resp.send({ success: true });
});
app.listen(httpsPort, () => {
    console.log(`server running at port ${httpsPort}`);
})