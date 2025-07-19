//for 3.12
const mongoose = require("mongoose");

if (process.argv.length < 3) {
  console.log("give password as argument");
  process.exit(1);
}

const password = process.argv[2];
const nameToAdd = process.argv[3];
const numberToAdd = process.argv[4];

const url = `mongodb+srv://binwufi:${password}@cluster0.hwvcrac.mongodb.net/personApp?retryWrites=true&w=majority`;

mongoose.set("strictQuery", false);
mongoose.connect(url);

const personSchema = new mongoose.Schema({
  name: String,
  number: String,
});

const Person = mongoose.model("Person", personSchema);

const person = new Person({
  name: nameToAdd,
  number: numberToAdd,
});

if (nameToAdd !== undefined && numberToAdd !== undefined) {
  person.save().then((result) => {
    console.log("added", person.name, "number", person.number, "to phonebook");
    mongoose.connection.close();
  });
} else if (nameToAdd === undefined && numberToAdd === undefined) {
  Person.find({}).then((result) => {
    console.log("phonebook:");
    result.forEach((person) => {
      console.log(person.name, person.number);
    });
    mongoose.connection.close();
  });
} else if (numberToAdd === undefined) {
  mongoose.connection.close();
}
