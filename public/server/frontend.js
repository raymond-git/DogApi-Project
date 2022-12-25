const MongoClient = require("mongodb").MongoClient;
const mongoose = require('mongoose');
const express = require("express");
const app = express();
const cors = require('cors');
const bodyParser = require("body-parser");
const User = require('./models/user'); // Access models folder/user.js file to use in this server side
const bcrypt = require('bcrypt'); // Hash password for security reason

app.use(bodyParser.json());
app.use(cors());
app.use(express.json()); // to parse JSON bodies
app.use(bodyParser.urlencoded({extended: true}));

// The value "*" allows any domain to make requests
// The value "Content-Type" allows the Content type header to be included in the request. Fixed Post request
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Content-Type");
  next();
});

// Set up the connection to the mongoDB database
mongoose.connect("mongodb://localhost:27017").then(() => {
  const port = process.env.PORT || 3002;
  app.listen(port, () => {
    console.log(`Server listening on port ${port}`);
  });
});


// Check to see if connected to MongoDB database
const url = "mongodb://localhost:27017"
const client = new MongoClient(url);
client.connect()
.then(() => {
  console.log('Connected to the database');
})
.catch((error) => {
  console.log('Eror connecting to the database', error);
})


// Server sends user form request to the client
app.post("/login", (req, res) => {
  const { email, password } = req.body;
  if (email && password != "") {
    res.send({ message: "You have succesfully signed in!" });
  } else {
    res.send({ Error: "Please enter the information to sign in" });
  }
});


app.post("/signup", async (req, res) => {
  const { email, password } = req.body;
  //Hashed the user's password when signing up
  const hashpassword = await bcrypt.hash(password, 10);
  const user = new User({
    email: email,
    password: hashpassword,
  });


  // Save user information to mongoDB database
  user.save((error) => {
    if (error) {
      res.status(500).send(error);
    } else {
      res.send("You have successfully registered your account");
    }
  });
});


// Server sends selected breed to client side
app.get("/dogbreed", (req, res) => {
  const BreedValues = req.query.value;
  const dogImageUrl = `https://dog.ceo/api/breed/${BreedValues}/images/random`;
  fetch(dogImageUrl, {
    method: "GET",
  })
    .then((response) => response.json())
    .then((data) => {
      res.json(data);
    })
    .catch((error) => {
      console.error(error);
      res.sendStatus(500);
    });
});

