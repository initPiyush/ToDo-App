// Core Module
const path = require('path');

// External Module
const express = require('express');
const { default: mongoose } = require('mongoose');
const DB_PATH = "MONGO_URI=mongodb+srv://<username>:<password>@cluster.mongodb.net/myDB?retryWrites=true&w=majority";
const cors = require('cors');

//Local Module
const todoItemsRouter = require("./routes/todoItemRouter")
const errorsController = require("./controllers/error");

const app = express();

app.use(express.urlencoded());
app.use(express.json());
app.use(cors());

app.use("/api/todo", todoItemsRouter);

app.use(errorsController.errorPage);

const PORT = 3000;

mongoose.connect(DB_PATH).then(() => {
  console.log('Connected to Mongo');
  app.listen(PORT, () => {
    console.log(`Server running on address http://localhost:${PORT}`);
  });
}).catch(err => {
  console.log('Error while connecting to Mongo: ', err);
});
