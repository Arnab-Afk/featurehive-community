import express from 'express';
import mongoose from 'mongoose';
import multer from 'multer';
import JobPosting from '../models/JobPost.js';
import User from '../models/User.js';
import Application from '../models/Application.js';
import Company from '../models/Company.js';
import fetchUser from '../middleware/fetchUser.js';
import tpoMiddle from '../middleware/tpoMiddle.js';
import Tpo from '../models/TPO.js';
const upload = multer();
const router = express.Router();

router.get('/', fetchUser, async (req, res) => {
    try {
        const user = await User.findById(req.user.id);
        if (!user) {
            return res.status(404).send("User not found");
        }
        res.json(user);
    } catch (error) {
        console.error(error);
        res.status(500).send("Server error");
    }
});

router.post('/', fetchUser, tpoMiddle, async (req, res) => {
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

//route to get all users personal info 
router.get('/students', fetchUser, tpoMiddle, async (req, res) => {
    try {
        // Project only the personal_info and academic_details fields for all users
        const users = await User.find({}, { 'personal_info': 1, 'academic_details': 1 });

        res.json(users);
    } catch (error) {
        console.error(error);
        res.status(500).send("Server error");
    }
});

//tpo stats number count of users and job postings
router.get('/stats', fetchUser, tpoMiddle, async (req, res) => {
    try {
        const users = await User.countDocuments();
        const jobs = await JobPosting.countDocuments();
        const companies=await Company.countDocuments();
        const applications = await Application.countDocuments();
        res.json({ users, jobs , companies,applications});
    } catch (error) {
        console.error(error);
        res.status(500).send("Server error");
    }
});


router.get('/personalInfo', fetchUser, async (req, res) => {
    try {
        const user = await User.findById(req.user.id);

        if (!user) {
            return res.status(404).send("User not found");
        }
        res.json(user.personal_info);
    } catch (error) {
        console.error(error);
        res.status(500).send("Server error");
    }
});

router.put('/personalInfo', fetchUser, async (req, res) => {
    const {
        first_name,
        middle_name,
        last_name,
        mother_name,
        phone,
        address,
    } = req.body;

    try {
        let user = await User.findById(req.user.id);

        if (!user) {
            return res.status(404).send("User not found");
        }

        if (user._id.toString() !== req.user.id) {
            return res.status(403).send("Not allowed to update user info");
        }

        user.personal_info.first_name = first_name || user.personal_info.first_name;
        user.personal_info.middle_name = middle_name || user.personal_info.middle_name;
        user.personal_info.last_name = last_name || user.personal_info.last_name;
        user.personal_info.mother_name = mother_name || user.personal_info.mother_name;
        user.personal_info.phone = phone || user.personal_info.phone;
        user.personal_info.address = address || user.personal_info.address;
        await user.save();

        res.json(user.personal_info);
    } catch (error) {
        console.error(error);
        res.status(500).send("Server error");
    }
});

router.get('/academicInfo', fetchUser, async (req, res) => {
    try {
        const user = await User.findById(req.user.id);
        if (!user) {
            return res.status(404).send("User not found");
        }
        res.json(user.academic_details);
    } catch (error) {
        console.error(error);
        res.status(500).send("Server error");
    }
});

router.put('/academicInfo', fetchUser, async (req, res) => {
    const { degree, branch, year_of_graduation, cgpa } = req.body;

    try {
        let user = await User.findById(req.user.id);

        if (!user) {
            return res.status(404).send("User not found");
        }

        if (user._id.toString() !== req.user.id) {
            return res.status(403).send("Not allowed to update user info");
        }

        user.academic_details.degree = degree || user.academic_details.degree;
        user.academic_details.branch = branch || user.academic_details.branch;
        user.academic_details.year_of_graduation = year_of_graduation || user.academic_details.year_of_graduation;
        user.academic_details.cgpa = cgpa || user.academic_details.cgpa;
        await user.save();

        res.json(user);
    } catch (error) {
        console.error(error);
        res.status(500).send("Server error");
    }
});

router.get('/profile', fetchUser, async (req, res) => {
    try {
        const user = await User.findById(req.user.id);
        if (!user) {
            return res.status(404).send("User not found");
        }
        res.json(user.profile);
    } catch (error) {
        console.error(error);
        res.status(500).send("Server error");
    }
});

router.put('/profile', fetchUser, async (req, res) => {
    const {skills, experience, projects, certifications, interested_roles, interested_companies } = req.body;

    try {
        let user = await User.findById(req.user.id);

        if (!user) {
            return res.status(404).send("User not found");
        }

        if (user._id.toString() !== req.user.id) {
            return res.status(403).send("Not allowed to update user info");
        }

        user.profile.skills = skills || user.profile.skills;
        user.profile.experience = experience || user.profile.experience;
        user.profile.projects = projects || user.profile.projects;
        user.profile.certifications = certifications || user.profile.certifications;
        user.profile.interested_roles = interested_roles || user.profile.interested_roles;
        user.profile.interested_companies = interested_companies || user.profile.interested_companies;
        await user.save();

        res.json(user);
    } catch (error) {
        console.error(error);
        res.status(500).send("Server error");
    }
});
//route to check is user is user or tpo
router.get('/check', fetchUser, async (req, res) => {
    try {
        const user = await User.findById(req.user.id);
        
        if (!user) {
            const tpo = await Tpo.findById(req.user.id);
            return res.json("tpo");
            if (!tpo) {
                return res.status(404).send("User not found");
            }
        }
        else{
            res.json("user");
        }
        
    } catch (error) {
        console.error(error);
        res.status(500).send("Server error");
    }
});

// Resume Endpoints

router.put('/upload-resumes', fetchUser, upload.array('resumes', 10), async (req, res) => {
    
    const files = req.files;
    // const resumeName = req.body.resume_name;

    if (!files || files.length === 0) {
        return res.status(400).send('No files uploaded.');
    }

    try {
        let user = await User.findById(req.user.id);
        if (!user) {
            return res.status(404).send('User not found');
        }
        
        files.forEach(file => {
            const resume = {
                resume_id: new mongoose.Types.ObjectId(),
                resume_name: req.body.resume_name,
                file_data: file.buffer,
                content_type: file.mimetype,
                upload_date: new Date(),
            };
            user.resumes.push(resume);
        });

        await user.save();
        res.status(200).send('Resumes uploaded successfully');
    } catch (err) {
        res.status(500).send(err.message);
    }
});


//upload resume link 
router.put('/resume-link', fetchUser, async (req, res) => {
    const { resumelink , resume_name } = req.body;
    try {
        let user = await User.findById(req.user.id);
        if (!user) {
            return res.status(404).send('User not found');
        }
        const resume = {
            resume_id: new mongoose.Types.ObjectId(),
            resume_name: resume_name,
            resumelink: resumelink,
            upload_date: new Date(),
        };
        user.resumes.push(resume);
        await user.save();
        
        res.status(200).send('Resume link uploaded successfully');
    } catch (err) {
        res.status(500).send(err.message);
    }
});
//get all resumes
router.get('/resume-link', fetchUser, async (req, res) => {
    try {
        const user = await User.findById(req.user.id);
        if (!user) {
            return res.status(404).send('User not found');
        }
        const resumes=user.resumes;
        res.json(resumes);
    } catch (err) {
        res.status(500).send(err.message);
    }
});

router.get('/file/:resume_id', fetchUser, async (req, res) => {
    const resume_id = req.params.resume_id;

    try {
        let user = await User.findById(req.user.id);
        if (!user) {
            return res.status(404).send('Resume not found');
        }else{
            console.log("user found");
        }
        const resume = user.resumes.find((resume) => resume.id == resume_id)
        // const resume = user.resumes.resume_name("resume3.pdf");
        // const resume = user.resumes.file_data;
        if (!resume) {
            return res.status(404).send('Resume not found');
        } else {
            console.log('resume found');
            console.log(resume);
        }
        
        res.contentType(resume.content_type);
        res.send(resume.file_data);
    } catch (err) {
        res.status(500).send(err.message);
    }
});

//route to get all job postings of all companies
router.get('/all', async (req, res) => {
    try {
        const jobs = await JobPosting.find();
        res.json(jobs);
    } catch (error) {
        console.error(error);
        res.status(500).send("Server error");
    }
});

router.get('/job/:id?', fetchUser, async (req, res) => {
    try {
        const id = req.params.id;
        if (id) {
            let job = await JobPosting.findById(id).populate({path: 'company_id', model: 'Company'});
            if (!job) {
                return res.status(404).send("Job not found");
            }
            let application = await Application.findOne({job_id:id, student_id:req.user.id});
            let data = {job: job, application:application}
            console.log(data)

            res.json(data);
        } else {
            // const jobs = await JobPosting.find();
            // res.json(jobs);
            res.status(404).send('Noob')
        }
    } catch (error) {
        console.error(error);
        res.status(500).send("Server error");
    }
});

export default router;