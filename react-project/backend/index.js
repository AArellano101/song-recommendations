const express = require("express");
const cors = require("cors");
const fs = require("fs");
const rec = require('./rec');

const PORT = 3000;
const app = express();

const DATA_FILES = ["Identity", "Userdata", "StreamingHistory9"];

app.use(express.urlencoded({ extended: true }))
app.use(express.json())
app.use(cors())

let data = {};
let reccomendations = [];

app.get("/", cors(), async (req, res) => {
    try {
        res.send([]);
    } catch (error) {
        console.log(error);
    }
});

app.get("/info", cors(), async (req, res) => {
    try {
        res.send(reccomendations);
    } catch (error) {
        console.log(error);
    }
});

app.post("/post", async (req, res) => {
    const { path } = req.body;
    for (const file of DATA_FILES) {
        await fs.readFile(`${path}/${file}.json`, "utf8", (err, jsonString) => {
            data = JSON.parse(jsonString);
            if (file == "Identity" || file == "Userdata" || file == "thomas") {
                reccomendations = reccomendations.concat(rec.reccomend(data, "personal"));
            } else if (file == "StreamingHistory9") {
                reccomendations = reccomendations.concat(rec.reccomend(data, "history"));
            }
            
        });
    }
});

app.listen(PORT, () => {
	console.log(`Listening at http://localhost:${PORT}`);
});