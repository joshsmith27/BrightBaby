const express = require('express');
const path = require('path');

const bodyParser = require('body-parser');
const cors = require('cors');
const massive = require('massive');
const productsEndpoints = require('./controllers/productsController.js')

require('dotenv').config();
massive( process.env.CONNECTION_STRING )
.then( (dbInstance) =>{
    app.set('db', dbInstance);
  });

const app = express();
app.use(express.static(path.resolve(__dirname, '../client/build')));

app.get('/api/hello', (req, res) => {
    res.send({ express: 'Hello From Express' });
  });

  app.get('*', function(request, response) {
    response.sendFile(path.resolve(__dirname, '../client/build', 'index.html'));
  });
const port = process.env.PORT || 5000
app.listen( port , () => { console.log(`Server listening on port ${port}`); } );
