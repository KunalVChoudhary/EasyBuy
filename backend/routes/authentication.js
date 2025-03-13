const {Router}=require('express');
const passport=require('passport');4
const bcrypt =require('bcrypt')
const { User } = require('../models/user');
const { Cart } = require('../models/cart');

const route=Router()

route.post('/signup',async(req,res)=>{
    try{
        const {email,name,password}=req.body;
        let user= await User.findOne({email});
        if (user){return res.status(400).json({ message: 'User already exists' })}
        const hashedPassword = await bcrypt.hash(password, 10);
        user = await User.create({ name, email, password: hashedPassword });
        await Cart.create({userId:user.id,items:[]})
        req.logIn(user, (err) => {
            if (err) {
                return res.status(500).json({ message: 'Login failed after registration' });
            }
            res.redirect('/');
        });
    }
    catch{
        res.status(500).json({ message: 'Server error' });
    }
})

route.post('/signin', (req, res, next) => {
    passport.authenticate('local', (err, user, info) => {
        if (err) return next(err);
        if (!user) {
            return res.redirect(`/failure?message=${encodeURIComponent(info.message)}`);
        }

        req.logIn(user, (err) => {
            if (err) return next(err);
            return res.redirect('/');
        });
    })(req, res, next);
});




route.get("/auth/google",
    passport.authenticate("google", { scope: ["profile", "email"], prompt:'select_account' })
);

route.get('/auth/google/pull',
    passport.authenticate('google', { failureRedirect: '/failure',successRedirect:'/' }),);

route.get('/signout',(req,res)=>{
    req.logout((err) => {
		if (err) return res.sendStatus(400);
        req.session.destroy((err) => {
            if (err) {
                return res.redirect('/'); 
            }
            res.clearCookie('connect.sid'); 
            res.redirect('/');})
    });
});

route.get('/failure',(req,res)=>{
    let message;
    {req.query.message? message=req.query.message:message="server error"}
    res.json({message})
})




module.exports=route