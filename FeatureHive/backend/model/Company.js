import mongoose, { Schema } from 'mongoose';

const jobPostingSchema = new Schema({
  company_id: String,
  job_title: String,
  imgurl: String,
  description: String,
  location: String,
  salary: Number,
  posted_date: Date,
  application_deadline: Date,
  active: { type: Boolean, default: false },
  verified: { type: Boolean, default: false },
  requirements: {
    degree: String,
    branch: [String],
    min_cgpa: Number,
    skills_required: [String],
    min_experience_months: Number
  },
  drive_process: [
    {
      step_number: Number,
      step_name: String,
      description: String,
      from_date: Date,
      till_date: Date,
      location: String,
      duration_minutes: Number
    }
  ]
},{ strict: false });

// Compile the schema into a model
const JobPosting = mongoose.model('JobPosting', jobPostingSchema);

export default JobPosting;
