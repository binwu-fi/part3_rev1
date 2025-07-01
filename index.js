//console.log("hello world");

const http = require("http");

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

const app = http.createServer((request, response) => {
  response.writeHead(200, { "Content-type": "application/json" });
  response.end(JSON.stringify(persons));
});

const PORT = 3001;
app.listen(PORT);
console.log(`Server running on port ${PORT}`);
