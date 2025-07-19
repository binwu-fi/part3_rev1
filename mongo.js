//for 3.12
// eriytetty person.js //const mongoose = require("mongoose");

if (process.argv.length < 3) {
  console.log("give password as argument");
  process.exit(1);
}

const password = process.argv[2];
const nameToAdd = process.argv[3];
const numberToAdd = process.argv[4];

// eriytetty person.js //const url = `mongodb+srv://binwufi:${password}@cluster0.hwvcrac.mongodb.net/personApp?retryWrites=true&w=majority`;

// eriytetty person.js //mongoose.set("strictQuery", false);
// eriytetty person.js //mongoose.connect(url);

// eriytetty person.js //const personSchema = new mongoose.Schema({
// eriytetty person.js //  name: String,
// eriytetty person.js //  number: String,
// eriytetty person.js //});

// eriytetty person.js //const Person = mongoose.model("Person", personSchema);

// following part are for 3.12 testing
/*
const person = new Person({
  name: "Marju Kalju",
  number: "09-111111",
});
*/

// eriytetty person.js //const person = new Person({
// eriytetty person.js //  name: nameToAdd,
// eriytetty person.js //  number: numberToAdd,
// eriytetty person.js //});

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

// following part are for 3.12 testing
/*
person.save().then((result) => {
  console.log("person saved");
  mongoose.connection.close();
});
*/
