const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const cors = require('cors');
const massive = require('massive');
const productsEndpoints = require('./controllers/productsController.js')
const serverController = require('./controllers/serverController.js')
require('dotenv').config();

const app = express();
massive( process.env.CONNECTION_STRING )
  .then( (dbInstance) =>{
    app.set('db', dbInstance);
  });



 app.use(express.static(path.resolve(__dirname, '../client/build')));

app.post('/admin/api/products/postProducts/:id', productsEndpoints.postProduct);


const port = process.env.PORT || 5000
app.listen( port , () => { console.log(`Server listening on port ${port}`); } );
