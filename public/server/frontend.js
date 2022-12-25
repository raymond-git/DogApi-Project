const cors = require("cors");
const express = require("express");
const mongoose = require("mongoose");
mongoose.set('strictQuery', false); // Add this if you don't want to use the old behavior 
const MongoClient = require("mongodb").MongoClient;
const bodyParser = require("body-parser");
const User = require("./models/user"); // Access models folder/user.js file to use in this server side
const bcrypt = require("bcrypt"); // Hash password for security reason
const app = express();

app.use(cors());
app.use(express.json()); // to parse JSON bodies
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*"); // The value "*" allows any domain to make requests
  res.header("Access-Control-Allow-Headers", "Content-Type"); // The value "Content-Type" allows the Content type header to be included in the request. Fixed Post request
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
const url = "mongodb://localhost:27017";
const client = new MongoClient(url);
client
  .connect()
  .then(() => {
    console.log("Connected to the database");
  })
  .catch((error) => {
    console.log("Can not connect to the database", error);
  });


  app.post("/signup", async (req, res) => {
    const { email, password } = req.body;
    const hashpassword = await bcrypt.hash(password, 10); //Hashed the user's password when signing up
    const user = new User({
      email: email,
      password: hashpassword,
    });
    user.save((error) => { // Save user information to mongoDB database
      if (error) {
        res.status(500).send(error);
      } else {
        res.send("You have successfully registered your account");
      }
    });
  });


// Server sends user form request to the client
app.post("/login", async (req, res) => {
  const { email, password } = req.body;
  const dbName = "test";
  const db = client.db(dbName);
  const collection = db.collection("signups");
  collection.find({ email: email, password: password }).then((user) => {
    if (user) {
      bcrypt.compare(password, user.password).then((match) => {
        if (match) {
          res.status(200).json({
            status: "You have successfully logged in",
          });
        } else {
          res.status(401).json({
            status: "Invalid email or password",
          });
        }
      });
    } else {
      res.status(401).json({
        status: "Invalid email or password",
      });
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