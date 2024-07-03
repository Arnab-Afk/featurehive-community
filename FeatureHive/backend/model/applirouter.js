import express from 'express';

import User from '../models/User.js';
import JobPosting from '../models/JobPost.js';
import Application from '../models/Application.js';
import Company from '../models/Company.js';
import fetchUser from '../middleware/fetchUser.js';

const router = express.Router();
router.use(fetchUser);

// get one/all application(s) of a student
router.get('/:id?', async (req, res) => {
    try {
        const user = await User.findById(req.user.id);
        if (!user) {
            return res.status(404).send("User not found");
        }
        
        const app_id = req.params.id;

        if (app_id) {
            const application = await Application.findById(app_id).populate({
                path: 'job_id',
                model: 'JobPosting',
                populate: {
                    path: 'company_id',
                    model: 'Company'
                }
            });
            if (!application) {
                return res.status(404).send("Application not found");
            }
            const job_id=application.job_id;
            const job=await JobPosting.findById(job_id);
            application.job=job;
            res.json(application);
        } else {
            const applications = await Application.find({student_id: user.id}).populate({
                path: 'job_id',
                model: 'JobPosting',
                populate: {
                    path: 'company_id',
                    model: 'Company'
                }
            });
            res.json(applications);

        }
    } catch (error) {
        console.error(error);
        res.status(500).send("Server error");
    }
});

// create an application
router.post('/', async (req, res) => {
    const {job_id,resume_id} = req.body;

    try {
        let user = await User.findById(req.user.id);
        let job=await JobPosting.findById(job_id);

        let application = await Application.findOne({student_id: user.id, job_id: job_id});
        if (application) {
            return res.status(400).send("Application already exists");
        }

        let resume = user.resumes.find((x) => x.id == resume_id);
        if (!user||!job||!resume) {
            return res.status(404).send(job +resume +"Not found");
        }

        if (user._id.toString() !== req.user.id) {
            return res.status(403).send("Not allowed to update user info");
        }
        
        const newApplication = new Application({
            student_id: user.id,
            job_id,
            resume_id,
            status: {"applied":true,"shortlisted":false,"accepted":false,"rejected":false}
        });
        await newApplication.save();
        res.json(newApplication);
    } catch (error) {
        console.error(error);
        res.status(500).send("Server error");
    }
});

// delete an application
router.delete('/:id', async (req, res) => {
    try {
        let user = await User.findById(req.user.id);
        if (!user) {
            return res.status(404).send("User not found");
        }
        const application = await Application.findById(req.params.id);
        if (!application) {
            return res.status(404).send("Application not found");
        }
        if (application.student_id.toString() !== user.id) {
            return res.status(403).send("Not allowed to delete application");
        }
        await application.deleteOne();
        res.json(application);
    } catch (error) {
        console.error(error);
        res.status(500).send("Server error");
    }
});

router.get('/test/:id', async (req, res) => {
    try {
        const applicationId = req.params.id;

        // Find application by ID and populate the related job posting
        const application = await Application.findById(applicationId).populate({
            path: 'job_id',
            model: 'JobPosting',
            populate: {
                path: 'company_id',
                model: 'Company'
            }
        });

        if (!application) {
            return res.status(404).send('Application not found');
        }

        res.json(application);
    } catch (error) {
        console.error(error);
        res.status(500).send('Internal server error');
    }
});

export default router;