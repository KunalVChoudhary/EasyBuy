require('dotenv').config();
const passport = require('passport');
const { Strategy } = require('passport-google-oauth20');
const { User } = require('../models/user.js');


passport.use(new Strategy({
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    callbackURL: `http://localhost:${process.env.PORT}/auth/google/pull`
  },
  async function(accessToken, refreshToken, profile, cb) {
    try {
        let user = await User.findOne({ 
            googleId: profile.id,
         });

        if (user) {
            return cb(null, user);
        } else {
            user = await User.create({ 
                googleId: profile.id ,
                name:profile.displayName,
                email:profile.emails[0].value,
            });
            await Cart.create({userId:user.id,items:[]})
            return cb(null, user);
        }
    } catch (error) {
        return cb(error, null);
    }
  }
));

passport.serializeUser((user, done) => {
    done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
    try {
        const user = await User.findById(id);
        done(null, user);
    } catch (err) {
        done(err, null);
    }
});
