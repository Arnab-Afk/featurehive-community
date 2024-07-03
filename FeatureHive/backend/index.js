import express from "express";
import ViteExpress from "vite-express";
import passport from 'passport';
import session from 'express-session';
import connectTOMongo from './db.js';
import './passport.js';

import api from './routes/router.js';
import auth from './routes/auth.js'; // temp


const app = express();

app.use(express.json());
app.use(session({ secret: 'cats', resave: false, saveUninitialized: true }));
app.use(passport.initialize());
app.use(passport.session());

connectTOMongo();

app.use('/api', api);
app.use('/auth', auth); // remove after adding /api/auth to google oauth callbacks. Also change in passport.js

app.get("/hello", (req, res) => {
  res.send("Hello Vite + React!");
});

ViteExpress.listen(app, 8000, () =>
  console.log("Server is listening on port 8000..."),
);
