const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const cors = require('cors');
const massive = require('massive');
const multer  = require('multer');
const upload = multer({ dest: './server/uploads/' });
require('dotenv').config();
const session = require('express-session');
const passport = require('passport');
const productsEndpoints = require('./controllers/productsController.js');
const serverController = require('./controllers/serverController.js');
const loginConfig = require('./config/loginCofig.js');
const authenticate = require('./controllers/AuthenticationController.js');

const app = express();

app.use(express.static(path.join(__dirname, '../client/build')));
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

massive( process.env.CONNECTION_STRING ).then( (dbInstance) =>
  {
    console.log('The DB is up and running')
    app.set('db', dbInstance);
  });

app.use(session({
    name: 'rural-outfitters',
    secret: process.env.SESSION_SECRET, // {userId: 1} => apowienpafosdihvpoaiwnpeiruhpasokmv287394erijf
                                        // apowienpafosdihvpoaiwnpeiruhpasokmv287394erijf => {userId: 1}
    cookie: {
        //days hours minutes seconds milseconds
        expires:  5 * 24 * 60 * 60 *1000,
    },
    saveUninitialized: false,
    rolling: true,
    resave: false,
}));
app.use(passport.initialize());
app.use(passport.session());

app.use( bodyParser.json() );

passport.use('login', loginConfig.login);

passport.serializeUser((user, done) => {
  if (!user) {
      done('No user');
  }
  
  done(null, user);
},
);

passport.deserializeUser((user, done) => {
  const db = app.get('db');
  
  if (!db) {
      return done('Internal Server Error');
  }
  
  db.user_table.findOne({ userid: user.userid })
      .then(user => {
          if (!user) {
              return done(null, false);
          }
          
          delete user.password;
          
          done(null, user);
      })
      .catch(err => done(err));
});


app.get('/api/products/getproducts', productsEndpoints.getProducts);
app.get('/api/gethomeproducts', productsEndpoints.getHomeProducts);
app.get(`/api/products/getDetails/:id`, productsEndpoints.getDetails);
app.get(`/api/products/getImages/:id`, productsEndpoints.getImages);

app.post('/api/products/postproducts/:id', productsEndpoints.postProduct);
app.post('/api/product/add/images', upload.array('photos', 3), productsEndpoints.uploadImages);
app.post('/api/admin/login', passport.authenticate(['login']), authenticate.login);

app.delete(`/api/products/delete/:id`, productsEndpoints.deleteProduct)


const port = process.env.PORT || 5000
app.listen( port , () => { console.log(`Server listening on port ${port}`); } );
