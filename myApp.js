require('dotenv').config();
const mongoose = require('mongoose');

mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => console.log(`DB connection error - ${err}`));

let personSchema = new mongoose.Schema({
  name: String,
  age: Number,
  favoriteFoods: [String],
});

const Person = mongoose.model('Person', personSchema);

const person1 = new Person({
  name: 'p1',
  age: 20,
  favoriteFoods: ['briyani']
});

const person2 = new Person({
  name: 'p2',
  age: 23,
  favoriteFoods: ['briyani', 'pizza']
});

const arrayOfPeople = [person1, person2];

const createAndSavePerson = (done) => {
  person1.save((err, data) => {
    err ? done(err) : done(null, data)
  })
};

const createManyPeople = (arrayOfPeople, done) => {
  Person.create(arrayOfPeople, (err, data) => {
    err ? done(err) : done(null, data)
  })
};

const findPeopleByName = (personName, done) => {
  Person.find({
    name: personName
  }, (err, data) => {
    err ? done(err) : done(null, data)
  })
};

const findOneByFood = (food, done) => {
  Person.findOne({
    favoriteFoods: food
  }, (err, data) => {
    err ? done(err) : done(null, data)
  })
};

const findPersonById = (personId, done) => {
  Person.findById(personId, (err, data) => {
    err ? done(err) : done(null, data)
  })
};

const findEditThenSave = (personId, done) => {
  const foodToAdd = "hamburger";

  Person.findById(personId, (err, person) => {
    err && done(err)
    person.favoriteFoods.push(foodToAdd);
    person.save((err, updatedPerson) => (err) ? done(err) : done(null, updatedPerson))
  })
};

const findAndUpdate = (personName, done) => {
  const ageToSet = 20;

  Person.findOneAndUpdate({
    name: personName
  }, {
    age: ageToSet
  }, {
    new: true
  }, (err, data) => {
    err ? done(err) : done(null, data)
  })
};

const removeById = (personId, done) => {
  Person.findByIdAndRemove(personId, (err, data) => {
    err ? done(err) : done(null, data)
  })
};

const removeManyPeople = (done) => {
  const nameToRemove = "Mary";

  Person.remove({
    name: nameToRemove
  }, (err, data) => {
    err ? done(err) : done(null, data)
  })
};

const queryChain = (done) => {
  const foodToSearch = "burrito";

  Person
    .find({
      favoriteFoods: foodToSearch
    })
    .sort({
      name: 1
    })
    .limit(2)
    .select({
      age: 0
    })
    .exec((err, data) => {
      err ? done(err) : done(null, data)
    })

};

/** **Well Done !!**
/* You completed these challenges, let's go celebrate !
 */

//----- **DO NOT EDIT BELOW THIS LINE** ----------------------------------

exports.PersonModel = Person;
exports.createAndSavePerson = createAndSavePerson;
exports.findPeopleByName = findPeopleByName;
exports.findOneByFood = findOneByFood;
exports.findPersonById = findPersonById;
exports.findEditThenSave = findEditThenSave;
exports.findAndUpdate = findAndUpdate;
exports.createManyPeople = createManyPeople;
exports.removeById = removeById;
exports.removeManyPeople = removeManyPeople;
exports.queryChain = queryChain;
