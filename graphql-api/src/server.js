// server.js
const express = require('express');
// require("../dbconnect/index");;
const { graphqlHTTP } = require('express-graphql');
const schema = require('./schema')
const cors = require('cors');
const connection = require('../dbconnect');
const app = express();

connection()

app.use(cors({
    origin: 'http://localhost:3000', // Replace with your React app's domain
    credentials: true, // Allow cookies and authorization headers
  }));

app.use('/graphql', graphqlHTTP({
  schema,
  graphiql: true, // Enable the GraphiQL interface for testing
}));

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
});
