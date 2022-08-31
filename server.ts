const express = require('express');
const bodyParser = require('body-parser');
const swagger = require('swagger-ui-express');

// Express
const app = express();

//body-parser
app.use(bodyParser.urlencoded({ extended: true }))

// body-parser application/json
app.use(bodyParser.json())

//swagger File
const swaggerDocument = require('./swagger.json');


app.use(
    '/doc',
    swagger.serve, 
    swagger.setup(swaggerDocument)
  );

// Configuring the database
const dburl = 'http://localhost:3000/books'

//Router
app.get('/', (req:any, res:any) => {
    res.json({"message": "Welcome to BookShop application."});
});

require('./app/routes.ts')(app);

// listen for requests
app.listen(4000, () => {
    console.log("Server is listening on port 4000");
});