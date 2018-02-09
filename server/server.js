const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const cors = require('cors');
const massive = require('massive');
require('dotenv').config();
const productsEndpoints = require('./controllers/productsController.js')
const serverController = require('./controllers/serverController.js')


const app = express();
massive( process.env.CONNECTION_STRING ).then( (dbInstance) =>
  {
    app.set('db', dbInstance);
  });

app.use( bodyParser.json() );
 app.use(express.static(path.resolve(__dirname, '../client/build')));

app.get('/admin/api/products/getproducts', productsEndpoints.getProducts);
app.post('/admin/api/products/postproducts/:id', productsEndpoints.postProduct);


const port = process.env.PORT || 5000
app.listen( port , () => { console.log(`Server listening on port ${port}`); } );
