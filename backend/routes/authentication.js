require('dotenv').config();
const {Router}=require('express');
const passport=require('passport');4
const bcrypt =require('bcrypt')
const { User } = require('../models/user');
const { Cart } = require('../models/cart');

const route=Router()

route.post('/auth/signup',async(req,res)=>{
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
            //return res.status(200).json({ message: 'Login Successfull', user:name });
            req.session.save((err) => {
                if (err) return next(err);
                return res
                .status(200)
                .json({ message: 'Login Successfull', user:name });
            });
        });
    }
    catch{
        res.status(500).json({ message: 'Server error' });
    }
})

route.post('/auth/signin', (req, res, next) => {
    passport.authenticate('local', (err, user, info) => {
        if (err) return next(err);
        if (!user) {
            return res.status(400).json({message: 'Login failed'});
        }

        req.logIn(user, (err) => {
            if (err) return next(err);
            //return res.status(200).json({ message: 'Login Successfull', user:user.name });
            req.session.save((err) => {
                if (err) return next(err);
                return res
                .status(200)
                .json({ message: 'Login Successful', user: user.name });
            });
        });
    })(req, res, next);
});




route.get("/auth/google",
    passport.authenticate("google", { scope: ["profile", "email"], prompt:'select_account' })
);

route.get('/auth/google/pull',(req, res, next) => {
    passport.authenticate("google", (err, user, info) => {
        if (err || !user) {
            return res.send(`
                <script>
                    window.opener.postMessage({ success: false, message: 'Authentication failed' }, '${process.env.CLIENT_URL}');
                    window.close();
                </script>
            `);
        }

        req.logIn(user, (err) => {
        if (err) {
            return res.send(`
                <script>
                    window.opener.postMessage({ success: false, message: 'Login failed' },' ${process.env.CLIENT_URL}');
                    window.close();
                </script>
            `);
        }

        req.session.save((err) => {
        if (err) {
          // fallback to failure if save() blows up
          return res.send(`
            <script>
              window.opener.postMessage(
                { success: false, message: 'Session save failed' },
                '${process.env.CLIENT_URL}'
              );
              window.close();
            </script>
          `);
        }

        // now cookie is in the response, browser will store it
        return res.send(`
          <script>
            window.opener.postMessage(
              {
                success: true,
                message: 'Authentication successful',
                user: ${JSON.stringify(user.name)}
              },
              '${process.env.CLIENT_URL}'
            );
            window.close();
          </script>
        `);
        });
        // return res.send(`
        //     <script>
        //         window.opener.postMessage({ success: true, message: 'Authentication successful', user: ${JSON.stringify(user.name)} }, 
        //         '${process.env.CLIENT_URL}');
        //         window.close();
        //     </script>
        // `);
        });
    })(req, res, next);
})

route.get('/signout',(req,res)=>{
    req.logout((err) => {
		if (err) return res.status(400).json({'attempt': false});
        req.session.destroy((err) => {
            if (err) {
                return res.status(400).json({'attempt': false}); 
            }
            res.clearCookie('connect.sid', {
            domain: '.onrender.com',
            path: '/',                         
            secure: true,                     
            httpOnly: true,                    
            sameSite: 'none'                   
            }); 
            res.status(200).json({'attempt': true});})
    });
});




module.exports=route