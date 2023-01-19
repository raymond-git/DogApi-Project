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


// const MongoClient = require('mongodb').MongoClient;
// const dbURI = "mongodb+srv://ray5354:!Aznboi123@cluster0.a4hncvs.mongodb.net/test?retryWrites=true&w=majority";
// const clients = new MongoClient(dbURI, { useNewUrlParser: true });
// clients.connect((err) => {
//     if(err) throw err;
//     console.log("Connected to MongoDB Atlas");
//     // perform actions on the client object
//     clients.close();
// });



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
    const port = process.env.PORT || 3003;
    app.listen(port, () => {
      console.log(`Server listening on port ${port}`);
    });
  })
  .catch(err => console.log(err));


// Set up the connection to the mongoDB database
// mongoose.connect("mongodb://127.0.0.1:27017").then(() => {
// // mongoose.connect("mongodb://localhost:27017").then(() => {
//   const port = process.env.PORT || 3002;
//   app.listen(port, () => {
//     console.log(`Server listening on port ${port}`);
//   });
// });

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

const secretKey = process.env.SECRET_KEY;

// Server sends user form request to the client
app.post("/login", async (req, res) => {
  const { email, password } = req.body;

  // const dbName = "test";
  // const db = client.db(dbName);
  // const collection = db.collection("signups");
  try {
    // const userCredential = await collection.findOne({ email: email });
    const userCredential = await Amplify.DataStore.query(User, c => c.email("eq", email));
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
    })
    res.status(201).send({
      authenticated: "Token is set in the http=only and secure cookie"
    })

  } catch (error) {
    return res.status(401).json({
      error: "Invalid Token",
    });
  }
}); 


// app.get("/welcome", (req, res, next) => {
//   const authHeader = req.header('Authorization');
//   const token = authHeader.split(' ')[1];
//   if (authHeader && authHeader.split(' ')[0] === 'Bearer' && token) {
//     try {
//       jwt.verify(token, secretKey);
      
//       res.status(200).json({
//         message: 'All good'
//       });
//     } catch (err) {
//       res.status(401).json({
//         message: "Invalid or expired token"
//       });
//     }
//   } else {
//     res.status(401).json({
//       message: "Invalid token"
//     });
//   }
// });

  
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
