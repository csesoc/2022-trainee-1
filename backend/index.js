const cors = require("cors");
const express = require("express");
const fs = require("fs");
const bodyParser = require('body-parser');

const app = express();
const port = 8000;
const saveFile = 'tasks.json'

app.use(express.json());
app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));

app.get('/tasks', (req, res) => {
    res.json(JSON.parse(fs.readFileSync(saveFile)));
})

app.post('/tasks', (req, res) => {
    const tasks = JSON.parse(fs.readFileSync(saveFile));
    console.log(tasks);
    tasks.push(req.body);
    console.log(tasks);
    fs.writeFileSync(saveFile, JSON.stringify(tasks, null, 4));
    res.sendStatus(200);
})

app.listen(port, () => console.log(`Server started on port ${port}`))