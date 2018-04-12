const LocalStrategy = require('passport-local').Strategy;
const bcrypt = require('bcrypt');

module.exports = {
    //! This method is used to login via passport.
    login: new LocalStrategy({
        usernameField: 'email', // req.body.email != req.body.username
        passReqToCallback: true,
    }, (req, email, password, done) => {
        const db = req.app.get('db')
        db.user_table.findOne({ email: email })
            .then(user => {
                if (!user || !bcrypt.compareSync(password, user.password)) {
                    return done('Invalid email or password');
                }
                
                delete user.password;
                
                done(null, user);
            })
            .catch(err => {
                done(err);
            });
    }),
    //! This method is used to serialize User via passport.

    
    //! This method is used to deserialize User via passport.

}