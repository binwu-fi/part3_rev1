const express = require("express");
const app = express();

app.use(express.json());

let persons = [
  {
    id: "1",
    name: "Arto Hellas",
    number: "040-123456",
  },
  {
    id: "2",
    name: "Ada Lovelace",
    number: "36-987654321",
  },
  {
    id: "3",
    name: "Dan Abramov",
    number: "12-43-658256",
  },
];

app.get("/api/persons", (request, response) => {
  response.json(persons);
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
  response.status(202).end();
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
    id: gereratedId(),
  };

  console.log(person);
  response.json(person);
});

const PORT = 3001;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
