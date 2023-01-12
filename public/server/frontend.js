require('dotenv').config()
const cors = require("cors");
const express = require("express");
const mongoose = require("mongoose");
mongoose.set("strictQuery", false); // Add this if you don't want to use the old behavior
const MongoClient = require("mongodb").MongoClient;
const bodyParser = require("body-parser");
const {findOne} = require("./models/user")
const User = require("./models/user"); // Access models folder/user.js file to use in this server side
const bcrypt = require("bcrypt"); // Hash password for security reason
const jwt = require('jsonwebtoken');
const { Navigate } = require('react-router-dom');
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
const url = "mongodb://127.0.0.1:27017";
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
    try {
      const { email, password } = req.body;
      const existingUser = await User.findOne({ email });
      if (existingUser) {
        return res.status(400).json({
          status: "Email already exists"
        });
      }
      const hashedPassword = await bcrypt.hash(password, 10);
      const userCredential = new User({ 
        email: email, 
        password: hashedPassword 
      });
      
      await userCredential.save();
      res.status(201).json({ 
        status: "Success", 
        message: "You have successfully registered your account!"
      });

    } catch (error) {
      res.status(500).json({ 
        status: "Error", 
        message: error.message 
      });
    }
  });


// Server sends user form request to the client
app.post("/login", async (req, res) => {
  const { email, password } = req.body;
  const secretKey = process.env.SECRET_KEY;
  const dbName = "test";
  const db = client.db(dbName);
  const collection = db.collection("signups");

  try {
    const userCredential = await collection.findOne({ email: email });
    if(!userCredential){
      res.status(401).json({
        status: "Invalid email or password"
      });
    }
    const match = await bcrypt.compare(password, userCredential.password);
    if(!match){
      res.status(401).json({
        status: "Invalid email or password"
      });
    }
    const verifyToken = jwt.sign({ email: email }, secretKey, { expiresIn: '1hr' });
    return res.status(200).json({
      // status: "You have successfully logged in",
      verifyToken
    });

  } catch(error){
    if(error instanceof jwt.JsonWebTokenError){
      res.status(401).json({
        status: "Invalid Token"
      });
    }
  }

  const token = req.headers["authorization"]
}); 

//Server sends selected breed to client side
// app.post("/dogbreed", (req, res) => {
//   const BreedName = req.query.value;
//   const dogImageUrl = `https://dog.ceo/api/breed/${BreedName}/images/random/3`;
//   fetch(dogImageUrl, {
//     method: "GET",
//   })
//     .then((response) => response.json())
//     .then((data) => {
//       res.json(data);
//     })
//     .catch((error) => {
//       console.error(error);
//       res.sendStatus(500);
//     });
// });

// app.post("/dogBreed", (req, res) => {
//   const randomImageUrl = "https://dog.ceo/api/breeds/image/random/12";
//   fetch(randomImageUrl, {
//     method: "GET",
//   })
//     .then((response) => response.json())
//     .then((data) => {
//       res.json(data);
//     })
//     .catch((error) => {
//       console.error(error);
//       res.sendStatus(500);
//     });
// });
