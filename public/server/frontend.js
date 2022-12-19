const express = require('express');
const app = express();

app.use(express.json()); // to parse JSON bodies

// The value "*" allows any domain to make requests
// The value "Content-Type" allows the Content type header to be included in the request. Fixed Post request
app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Content-Type");
    next();
  });

// Server sends this response to a client
app.post('/login', (req, res) => {
  const { name, email } = req.body;
  console.log(`${name}! You have successfully registerd your account with your email: ${email} `);
  // Do something with the form data here, like saving it to a database
  res.send({ message: 'Success!' });
});

const port = process.env.PORT || 3002;
app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});

  