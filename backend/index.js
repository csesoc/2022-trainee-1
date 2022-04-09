const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
const cors = require("cors");
const express = require("express");
const fs = require("fs");
const bodyParser = require('body-parser');
const { env } = require('process')
require('dotenv').config()

const app = express();
const PORT = 8000;
const MONGO_CONNECTION_STRING = env.MONGO_CONNECTION_STRING;

const CREDENTIALS_PATH = '.certificate'

const client = new MongoClient(MONGO_CONNECTION_STRING, {
  sslKey: CREDENTIALS_PATH,
  sslCert: CREDENTIALS_PATH,
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
        await tasksCollection.insertOne(newTask, (e) => {
            if (e) return;
        });
        res.status(200).send({newId: newTask._id});
    })

    app.delete('/tasks', async (req, res) => {
        const idToDelete = req.body.idToDelete;
        await tasksCollection.deleteOne({"_id" : ObjectId(idToDelete)});
        res.sendStatus(200);
    })
}

run().catch(console.dir).then(() => {
    app.listen(PORT, () => console.log(`Server started on port ${PORT}`))
});

