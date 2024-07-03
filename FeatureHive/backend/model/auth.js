
import express from 'express';
import jwt from 'jsonwebtoken';
import passport from 'passport';

import User from '../models/User.js';
import TPO from '../models/TPO.js';

const router = express.Router();

function isLoggedIn(req, res, next) {
    console.log(req.user)
    req.user ? next() : res.sendStatus(401);
}

// const redirectURI = process.env.NODE_ENV == "PROD" ? "/callbackgoogle/?callback=" : "http://localhost:5173/callbackgoogle/?callback=" 
const redirectURI = "/callbackgoogle/?callback=";
const redirectTpo = "/callbacktpogoogle/?callback=";
const JWT_token = "FEATURE"; // :)  yes 


router.get('/google',
    passport.authenticate('google', { scope: ['email', 'profile'],
    hostedDomain:"somaiya.edu",
    hd:'somaiya.edu',
     }));

router.get('/google/callback',
    passport.authenticate('google', {
        successRedirect: '/auth/protected',
        failureRedirect: '/auth/failure'
    }),
    function (req, res) {
        // Successful authentication, redirect home.
        res.json({
            sucess: true
        });
    });

router.get('/protected', isLoggedIn, async (req, res) => {
    const data = req.user;
    const decoded = jwt.decode(data.id_token)
    
    
    try {
        // let tpo = await TPO.findOne({ 'email': decoded.email });
        let tpo = undefined;
        if(tpo){
            const data = { id: tpo.id }
            const token = jwt.sign(data, JWT_token);
            res.redirect(redirectURI+token)
        } else {
            let user = await User.findOne({ 'personal_info.email':decoded.email });
            if (!user) {
                // const user = new User({
                //     personal_info: { 'email': decoded.email } //this commented code is for creating a new user if not found
                //   });
                // await user.save();
                res.status(401).send("User not found");   
            } else {
                const data = { id: user.id}
                const token = jwt.sign(data, JWT_token);
                user.personal_info.gimg=decoded.picture;
                await user.save();
                
                res.redirect(redirectURI+token+"&gimg="+decoded.picture)
            }
        }
    } catch (error) {
        console.error(error);
    }
});

router.get('/logout', (req, res) => {
    req.logout((err) => {
        if (err) {
            // Handle error if logout encounters an issue
            console.error('Error during logout:', err);
            return res.status(500).send('Error during logout');
        }

        // Logout successful, destroy the session
        req.session.destroy((err) => {
            if (err) {
                // Handle error if session destruction encounters an issue
                console.error('Error destroying session:', err);
                return res.status(500).send('Error destroying session');
            }

            // Session destroyed, send response to the client
            res.send('Logout successful');
        });
    });
});

export default router;
