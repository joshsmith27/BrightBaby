const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const cors = require('cors');
const massive = require('massive');
const multer  = require('multer')
const upload = multer({ dest: 'client/src/uploads/' })
require('dotenv').config()
const productsEndpoints = require('./controllers/productsController.js')
const serverController = require('./controllers/serverController.js')



const app = express();
app.use(express.static(path.join(__dirname, '../client/build')));
massive( process.env.CONNECTION_STRING ).then( (dbInstance) =>
  {
    app.set('db', dbInstance);
  });

app.use( bodyParser.json() );


app.get('/api/products/getproducts', productsEndpoints.getProducts);
app.get(`/api/products/getDetails/:id`, productsEndpoints.getDetails);
app.get(`/api/products/getImages/:id`, productsEndpoints.getImages);

app.post('/api/products/postproducts/:id', productsEndpoints.postProduct);
app.post('/api/product/add/images', upload.array('photos', 3), productsEndpoints.uploadImages);
app.delete(`/api/products/delete/:id`, productsEndpoints.deleteProduct)


const port = process.env.PORT || 5000
app.listen( port , () => { console.log(`Server listening on port ${port}`); } );
