require('dotenv').config()
const cors = require("cors");
const express = require("express");
const mongoose = require("mongoose");
mongoose.set("strictQuery", false); // Add this if you don't want to use the old behavior
const MongoClient = require("mongodb").MongoClient
const bodyParser = require("body-parser");
const {findOne} = require("./models/user")
const User = require("./models/user"); // Access models folder/user.js file to use in this server side
const bcrypt = require("bcrypt"); // Hash password for security reason
const jwt = require('jsonwebtoken');
const cookieParser = require("cookie-parser");
const validator = require('validator');
const app = express();
app.use(cookieParser());
app.use(express.json()); // to parse JSON bodies
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*"); // The value "*" allows any domain to make requests
  res.header("Access-Control-Allow-Headers", "Content-Type"); // The value "Content-Type" allows the Content type header to be included in the request. Fixed Post request
  // res.header("Access-Control-Allow-Methods")
  next();
});

// Set up the connection to the mongoDB database
// mongoose.connect("mongodb://127.0.0.1:27017").then(() => {
// // mongoose.connect("mongodb://localhost:27017").then(() => {
//   const port = process.env.PORT || 3002;
//   app.listen(port, () => {
//     console.log(`Server listening on port ${port}`);
//   });
// });

const corsOptions ={
   origin:'*', 
   credentials:true,            //access-control-allow-credentials:true
   optionSuccessStatus:200,
}
app.use(cors(corsOptions)) // Use this after the variable declaration

const dbURI = process.env.MONGODB_URI;
const dbPassword = process.env.MONGODB_PASSWORD;

mongoose.connect(dbURI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  auth: {
    username: "ray5354",
    password: dbPassword
  }
})
  .then(() => {
    console.log("MongoDB Connected");
    const port = process.env.PORT || 8080;
    app.listen(port, () => {
      console.log(`Server listening on port ${port}`);
    });
  })
  .catch(err => console.log(err));

  app.get("/", (req, res) => {
    res.send("hello world")
    console.log("connected to server");
  });

  app.post("/signup", async (req, res) => {
    try {
      const { email, password } = req.body;
      
      // Check and handle error messages on the server side before sending them to the client
      const existingUser = await User.findOne({ email });
      if (existingUser) {
        return res.status(400).json({
          error: "Email already exists, try a new one",
        });
      } 

      if(email.length === 0 && password.length === 0 ) {
        return res.status(400).json({
          error: "Please enter valid email and password",
        });
    }

      if (!email) {
        return res.status(400).json({
          error: "Please enter an email",
        });
      } 

      if (!password) {
        return res.status(400).json({
          error: "Please enter a password",
        });
      } 

      const hashedPassword = await bcrypt.hash(password, 10);
      const userCredential = new User({ 
        email: email, 
        password: hashedPassword 
      });
      
      // If there are no errors, the user's information is successfully stored in the MongoDB database
      await userCredential.save();
      return res.status(201).json({ 
        status: "Success", 
        message: "You have successfully registered your account!"
      });

    } catch (error) {
      return res.status(500).json({ 
        status: "Error", 
        message: error.message 
      });
    }
  });

const secretKey = process.env.SECRET_KEY;

// Server sends user form request to the client
app.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!validator.isEmail(email)) {
      return res.status(401).json({
        error: "Please enter a valid email address",
      });
    }
    const dbName = "test";
    const db = client.db(dbName);
    const collection = db.collection("signups");
    const userCredential = await collection.findOne({ email: email });

    if (!userCredential) { //Check if user exists in the database
      return res.status(401).json({
        error: "Please enter a valid email and password",
      });
    }

    const matchPassword = await bcrypt.compare(password, userCredential.password);
    if (!matchPassword) {
      return res.status(401).json({
        error: "Please enter a valid email and password",
      });
    }

    const payload = { // MongoDb User Id
      id: userCredential._id,
    };
    const token = jwt.sign(payload, secretKey);   // Authenticate user and set token, example:

    res.cookie('token', token, { //Store token in cookie
      httpOnly: true,
      secure: true,
      sameSite: 'None'
    });

    return res.status(201).send({
      authenticated: "Token is set in the http=only and secure cookie"
    });

  } catch (error) {
    return res.status(401).json({
      invalid: error,
    });
  }
}); 