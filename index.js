const express = require('express');
const { graphqlHTTP } = require('express-graphql');
const schema = require('./schema');
const connectDB = require('./db');

const app = express();
const port = process.env.PORT || 4001;

connectDB();

app.use(
  '/graphql',
  graphqlHTTP({
    schema,
    graphiql: true, 
  })
);

app.listen(port, () => {
  console.log(`GraphQL server is running`);
});
