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
    res.json(JSON.parse(fs.readFileSync(saveFile))['taskList']);
})

app.post('/tasks', (req, res) => {
    const data = JSON.parse(fs.readFileSync(saveFile));
    const newTask = req.body;
    newTask['id'] = data['autoIncrement'];
    data['autoIncrement']++;
    data['taskList'].push(req.body);
    fs.writeFileSync(saveFile, JSON.stringify(data, null, 4));
    res.sendStatus(200);
})

app.delete('/tasks', (req, res) => {
    const idToDelete = req.body.idToDelete;
    const data = JSON.parse(fs.readFileSync(saveFile));
    data['taskList'] = data['taskList'].filter(task => task['id'] != idToDelete);
    fs.writeFileSync(saveFile, JSON.stringify(data, null, 4));
    res.sendStatus(200);
})

app.listen(port, () => console.log(`Server started on port ${port}`))