const express = require('express');
const { graphqlHTTP } = require('express-graphql');
const schema = require('./schema/schema');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();

app.use(cors());

mongoose.connect(
    // PROD ONLY - ENTER PASSWORD IN THE URL
    'mongodb+srv://amar:PASSWORD@cluster0.kihrevq.mongodb.net/?retryWrites=true&w=majority'
);
mongoose.connection.once('open', () => {
    console.log('connected to db');
});

// The middleware needs to know the structure of the data, so that it can easily jump in and retrieve the data from any point inside the data because that is the main use of graphQL
app.use(
    '/graphql',
    graphqlHTTP({
        schema: schema,
        // set to access the api inside the browser with a dummy interface
        graphiql: true,
    })
);

app.listen(4000, () => {
    console.log('Listening for requests on port 4000');
});
