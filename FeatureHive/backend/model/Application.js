import mongoose, { Schema } from 'mongoose';

const ApplicationSchema = new Schema({
    student_id: String,
    job_id: String,
    resume_id: String,
    application_date: {type:Date, default: Date.now()},
    status: {
      applied: { type: Boolean, default: false },
      shortlisted: { type: Boolean, default: false },
      interview_scheduled: {type: Boolean, default: false },
      technical_round:{ type: Boolean, default: false },
      offer_made: { type: Boolean, default: false },
      offer_accepted: { type: Boolean, default: false }
    },
    drive_process_completion: [
        {
            step_id: {type:String,default:""},
            status: {type: Boolean, default: false},
            completion_date: {type:Date, default: Date.now()}
        }
    ]
});

const Application = mongoose.model('Application', ApplicationSchema);

export default Application;
