require("dotenv").config(); //for 3.13 vaihe2
const express = require("express");
const Person = require("./models/person"); //for 3.13 vaihe2
const app = express();

const cors = require("cors"); //for 3.9

app.use(cors()); //for 3.9
app.use(express.json());
app.use(express.static("dist")); //näyttää staattista sisältöä eli index.html

//Next lines are for 3.8
const morgan = require("morgan");

// Custom token to log the request body
morgan.token("request-body", (req) => {
  return JSON.stringify(req.body);
});

const customFormat =
  ":method :url :status :res[content-length] - :response-time ms :request-body";

// Use the custom format
app.use(morgan(customFormat));
// 3.8 ends

// below code for 3.13 copied from mongo.js
const mongoose = require("mongoose");
const password = process.argv[2];
const url = `mongodb+srv://binwufi:${password}@cluster0.hwvcrac.mongodb.net/personApp?retryWrites=true&w=majority`;

mongoose.set("strictQuery", false);
mongoose.connect(url);

const personSchema = new mongoose.Schema({
  name: String,
  number: String,
});

personSchema.set("toJSON", {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString();
    delete returnedObject._id;
    delete returnedObject.__v;
  },
});

app.get("/api/persons", (request, response) => {
  Person.find({}).then((persons) => {
    response.json(persons);
  });
});

app.get("/api/info", (request, response) => {
  response.send(
    `Phonebook has info for ${persons.length} people <br> ${new Date()}`
  );
});

app.get("/api/persons/:id", (request, response) => {
  const id = request.params.id;
  const person = persons.find((person) => person.id === id);
  if (person) {
    response.json(person);
  } else {
    response.status(404).end();
  }
});

app.delete("/api/persons/:id", (request, response) => {
  const id = request.params.id;
  persons = persons.filter((person) => person.id !== id);
  response.status(204).end(); //status code korjattu 204:ksi
});

function getRandomInt(Max) {
  return Math.floor(Math.random() * Max);
}

const gereratedId = () => {
  const newId = getRandomInt(1000000);
  return newId;
};

app.post("/api/persons", (request, response) => {
  const body = request.body;
  const person = {
    name: body.name,
    number: body.number,
    id: gereratedId().toString(), // korjaus, id korjattu stringiksi
  };

  if (!body.name && body.number) {
    return response.status(400).json({
      error: "name is emty",
    });
  }

  if (!body.number && body.name) {
    return response.status(400).json({
      error: "number is empty",
    });
  }

  if (!body.name && !body.number) {
    return response.status(400).json({
      error: "content is empty",
    });
  }

  let find = false;

  persons.forEach((item) => {
    if (item.name === body.name) {
      find = true;
      return response.status(400).json({
        error: "name must be unique",
      });
    }
  });

  if (find === false) {
    persons = persons.concat(person);
  }

  console.log("The information of new person:", person);
  response.json(person);
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
