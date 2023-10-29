var mongoose = require("mongoose");
var users = require("./user.js");
var bcrypt = require('bcryptjs');

// Connect to your MongoDB database
mongoose.connect('mongodb://127.0.0.1/image-website', { useNewUrlParser: true, useUnifiedTopology: true });

const UserSchema = new mongoose.Schema({
    username: { type: String, unique: true, required: true },
    hash: { type: String, required: true },
    firstName: { type: String, required: true },
    lastName: { type: String, required: true }
}, {
    // add createdAt and updatedAt timestamps
    timestamps: true
});

const User = mongoose.model('User', UserSchema);

let seedData = [];
users.forEach(seed => {
    const tmp_user = {};
    tmp_user.username = seed.username;
    tmp_user.firstName = seed.firstName;
    tmp_user.lastName = seed.lastName;
    tmp_user.hash = bcrypt.hashSync(seed.password, 10);
    seedData.push(tmp_user);
});

// // Insert data into the user collection
User.insertMany(seedData)
  .then(() => {
    console.log('Seed data inserted successfully.');
    mongoose.disconnect();
  })
  .catch((err) => {
    console.error(err);
    mongoose.disconnect();
  });