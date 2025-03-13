require('dotenv').config();
const passport = require('passport');
const { Strategy } = require('passport-local');
const { User } = require('../models/user.js');
const bcrypt=require('bcrypt')

passport.use(new Strategy({ usernameField: 'email' }, async (email, password, done) => {
    try {
        const user = await User.findOne({ email });
        if (!user) return done(null, false, { message: 'User not found' });

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) return done(null, false, { message: 'Incorrect password' });

        return done(null, user);
    } catch (err) {
        return done(err);
    }
}));