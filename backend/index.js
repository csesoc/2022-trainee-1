const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
const cors = require("cors");
const express = require("express");
const fs = require("fs");
const bodyParser = require('body-parser');

const app = express();
const port = 8000;
const saveFile = 'tasks.json'

const credentials = '.certificate'

const client = new MongoClient('<CONNECTION STRING HERE>', {
  sslKey: credentials,
  sslCert: credentials,
  serverApi: ServerApiVersion.v1
});

app.use(express.json());
app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));

async function run() {
    await client.connect();
    const database = client.db("projects-trainee-1");
    const tasksCollection = database.collection("tasks");
    // const docCount = await collection.countDocuments({});
    // perform actions using client
    app.get('/tasks', async (req, res) => {
        res.send(await tasksCollection.find().toArray());
    })

    app.post('/tasks', async (req, res) => {
        const newTask = req.body;
        await tasksCollection.insertOne(newTask);
        res.sendStatus(200);
    })

    app.delete('/tasks', async (req, res) => {
        const idToDelete = req.body.idToDelete;
        // const data = JSON.parse(fs.readFileSync(saveFile));
        // data['taskList'] = data['taskList'].filter(task => task['id'] != idToDelete);
        // fs.writeFileSync(saveFile, JSON.stringify(data, null, 4));
        await tasksCollection.deleteOne({"_id" : ObjectId(idToDelete)});
        res.sendStatus(200);
    })
}

run().catch(console.dir).then(() => {
    app.listen(port, () => console.log(`Server started on port ${port}`))
});

