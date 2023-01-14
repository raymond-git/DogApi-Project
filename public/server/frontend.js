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
const user = require('./models/user');
const cookieParser = require("cookie-parser");
const app = express();
app.use(cookieParser());

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
  const dbName = "test";
  const db = client.db(dbName);
  const collection = db.collection("signups");
  const secretKey = process.env.SECRET_KEY;

  try {
    const userCredential = await collection.findOne({ email: email });

    if (!userCredential) {
      return res.status(401).json({
        error: "Please enter valid email and password",
      });
    }

    const matchPassword = await bcrypt.compare(password, userCredential.password);
    if (!matchPassword) {
     return res.status(401).json({
        error: "Invalid email or password",
      });
    }

    // MongoDb User Id
    const payload = {
      id: userCredential._id,
    };

    // Authenticate user and set token, example:
    const token = jwt.sign(payload, secretKey, { expiresIn: "1hr" });
    res.cookie("access_token", token, { 
      httpPnly: true,
      secure: true,
      sameSite: 'Strict'
    }).status(200).json({
      message: "Successfully Logged in",
    });
  } catch (error) {
    return res.status(401).json({
      error: "Invalid Token",
    });
  }
}); 

app.get("/welcome", authenticateToken, (req, res, next) => {
  res.status(401).json({
    message: "hello"
  })
})

function authenticateToken(req, res, next){
  const secretKey = process.env.SECRET_KEY;
  const token = req.cookies.access_token;
  if (!token) {
    return res.status(401).json("Token is not found");
  }

  jwt.verify(token, secretKey, (err, payload) => {
    if (err) {
      return res.status(403).json("Invalid Token");
    }
    req.userCredential = {
      id: payload.id,
    };
    next();
  });
}


// app.get("/welcome", authenticateToken, (req, res, next) => {
//   req.storeEmail
// })

// function authenticateToken(req, res, next) {
//   const secretKey = process.env.SECRET_KEY;
//   const authHeader = req.headers['authorization'] // Extract the authorization from client assuming it contains a token
//   const token = authHeader && authHeader.split(' ')[1] // This is getting the '{Token}` portion from the client side 
//   if(!token){
//     return res.status(401).json({
//       error: "Unauthorized",
//     })  
//   }

//   try{
//     const verifyToken = jwt.verify(token, secretKey);
//     req.storeEmail = verifyToken.email;
//     next()
//   } catch(error){
//     return res.status(401).json({
//       message: "Invalid Token"
//     })
//   }
// }
  


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
