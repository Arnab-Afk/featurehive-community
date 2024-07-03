import express from 'express';

import TPO from '../models/TPO.js';
import JobPosting from '../models/JobPost.js';
import Application from '../models/Application.js';

import fetchUser from '../middleware/fetchUser.js';
import tpoMiddle from '../middleware/tpoMiddle.js';
import User from '../models/User.js';
import tpo from '../middleware/tpoMiddle.js';


const router = express.Router();

router.use(fetchUser);
router.use(tpoMiddle);

router.get('/:id?', async (req, res) => {
    try {
        const id = req.params.id;
        if (id) {
            const job = await JobPosting.findById(id);
            if (!job) {
                return res.status(404).send("Job not found");
            }
            res.json(job);
        } else {
            const jobs = await JobPosting.find();
            res.json(jobs);
        }
    } catch (error) {
        console.error(error);
        res.status(500).send("Server error");
    }
});

// Route to add job posting
router.post('/', async (req, res) => {
    const { company_id, job_title, description, location, salary, posted_date, application_deadline, requirements, imgurl,drive_process } = req.body;

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
            drive_process,
            imgurl,
        });
        await jobPosting.save();
        res.json(jobPosting);
    } catch (error) {
        console.error(error);
        res.status(500).send("Server error");
    }
});

// Route to update job posting
router.put('/:id', async (req, res) => {
    const { company_id, job_title, description, location, salary, posted_date, application_deadline, active, verified, requirements, drive_process , imgurl } = req.body;
    const id = req.params.id;

    try {
        const jobPosting = await JobPosting.findById(id);
        if (!jobPosting) {
            return res.status(404).send("Job Posting not found");
        }

        jobPosting.company_id = company_id || jobPosting.company_id;
        jobPosting.job_title = job_title || jobPosting.job_title;
        jobPosting.description = description || jobPosting.description;
        jobPosting.location = location || jobPosting.location;
        jobPosting.salary = salary || jobPosting.salary;
        jobPosting.posted_date = posted_date || jobPosting.posted_date;
        jobPosting.application_deadline = application_deadline || jobPosting.application_deadline;
        jobPosting.active = active !== undefined ? active : jobPosting.active;
        jobPosting.verified = verified !== undefined ? verified : jobPosting.verified;
        jobPosting.requirements = requirements || jobPosting.requirements;
        jobPosting.drive_process = drive_process || jobPosting.drive_process;
        jobPosting.imgurl=imgurl||jobPosting.imgurl;

        await jobPosting.save();
        res.json(jobPosting);
    } catch (error) {
        console.error(error);
        res.status(500).send("Server error");
    }
});

// Route to delete job posting
router.delete('/:id', async (req, res) => {
    try {
        const jobPosting = await JobPosting.findById(req.params.id);
        if (!jobPosting) {
            return res.status(404).send("Job Posting not found");
        }

        await jobPosting.delete();
        res.json(jobPosting);
    } catch (error) {
        console.error(error);
        res.status(500).send("Server error");
    }
});

// get job applications
router.get('/:jobid/applications/:appid?', async (req, res) => {
    try {
        const jobid = req.params.jobid;
        const appid = req.params.appid;

        const job = await JobPosting.findById(jobid);

        if (!job) {
            return res.status(404).send("Job not found");
        }

        if (appid) {
            const application = await Application.findById(appid);
            if (!application) {
                return res.status(404).send("Application not found");
            }
            res.json(application);
        } else {
            const applications = await Application.find({ job_id: job.id });
            res.json(applications);
        }
    } catch (error) {
        console.error(error);
        res.status(500).send("Server error");
    }
});
export default router;
