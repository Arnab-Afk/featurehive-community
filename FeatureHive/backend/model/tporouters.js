import express from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import User from '../models/User.js';
import TPO from '../models/TPO.js';
import JobPosting from '../models/JobPost.js';
import Company from '../models/Company.js';

import fetchUser from '../middleware/fetchUser.js';

const JWT_token = "SWDC#KJSCE";

const router = express.Router();

// Middleware to check permissions
async function fetchTPO (req, res, next)  {
    try {
        let tpo = await TPO.findById(req.user.id);
        if (!tpo) {
            return res.status(404).send("User not found");
        }
        if (!(tpo.permissions.includes("tpo") || tpo.permissions.includes("company"))) {
            return res.status(403).send("Not allowed to perform this action");
        }
        req.tpo = tpo;
        next();
    } catch (error) {
        console.error(error);
        res.status(500).send("Server error");
    }
}

//add new user 
router.post('/addUser', async (req, res) => {
  const { email } = req.body;
  if (!email) {
      return res.status(400).send('Email and password are required');
  }

  try {
      let user = await User.findOne({ 'personal_info.email': email });
      if (user) {
          return res.status(400).send('User already exists');
      }
      user = new User({personal_info: { 'email': email }});
      await user.save();
      res.json(user);
  } catch (error) {
      console.error(error);
      res.status(500).send("Server error");
  }
});

// Company Login
router.post('/login', async (req, res) => {
  console.log(req.body);
  console.log(req.params);
  const { email, password } = req.body;
  console.log(email, password);
  try {
    const company = await Company.findOne({'email': email});

    console.log(company);

    if (!company) {
      return res.status(404).send("Company not found");
    }

    const isMatch = await bcrypt.compare(password, company.password);
    if (!isMatch) {
      return res.status(401).send("Invalid password");
    }

    // const token = company.generateAccessJWT();
    const data = { id: company.id };
    const token = jwt.sign(data, JWT_token);
    console.log(data);
    console.log(token);
    res.json({ 'token': token });
    
    // res.redirect("/company/callback/?callback="+token);

  } catch (error) {
    console.error(error);
    res.status(500).send("Server error");
  }
});

//route to get company details
router.get('/', fetchUser, async (req, res) => {
  try {
    const company = await Company.find();
    if (!company) {
      return res.status(404).send("Company not found");
    }
    res.json(company);
  } catch (error) {
    console.error(error);
    res.status(500).send("Server error");
  }
});


// Route to set company email and passwords
router.post('/addCompany', fetchUser, fetchTPO, async (req, res) => {
  const {email, password } = req.body;
  if (!email || !password) {
      return res.status(400).send('Email and password are required');
    }
  
  try {
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(password, salt);

      const newCompany = new Company({
          email,
          password:hashedPassword,
      });
      await newCompany.save();
      res.json(newCompany);
  } catch (error) {
      console.error(error);
      res.status(500).send("Server error");
  }
});

router.post('/addPosting', fetchUser, fetchTPO, async (req, res) => {
  const { company_id, job_title, description, location, salary, posted_date, application_deadline, requirements, drive_process } = req.body;
  if (req.tpo.permissions.includes('company'))
  try {
      const jobPosting = new JobPosting({
          company_id,
          job_title,
          description,
          location,
          salary,
          posted_date,
          application_deadline,
          requirements,
          drive_process
      });
      await jobPosting.save();
      res.json(jobPosting);
  } catch (error) {
      console.error(error);
      res.status(500).send("Server error");
  }
});

export default router;

