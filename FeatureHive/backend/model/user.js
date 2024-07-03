import mongoose, { Schema } from 'mongoose';
import { Buffer } from "buffer";

const userSchema = new Schema({
    personal_info: {
        first_name: { type: String, default: '' },
        middle_name: { type: String, default: '' },
        last_name: { type: String, default: '' },
        email: { type: String, required: true, unique: true },
        phone: { type: String, default: '' },
        address: { type: String, default: '' },
        email_verified: { type: Boolean, default: false },
        mother_name: { type: String, default: '' },
        gimg:{ type: String, default: ''}
    },
    academic_details: {
        degree: { type: String, default: '' },
        branch: { type: String, default: '' },
        year_of_graduation: { type: Number, default: 0 },
        cgpa: { type: Number, default: 0 },
    },
    profile: {
        skills: { type: [String], default: [] },
        experience: [
            {
                company: { type: String, default: '' },
                profile: { type: String, default: '' },
                from_date: { type: Date, default: null },
                to_date: { type: Date, default: null },
                description: { type: String, default: '' },
            },
        ],
        projects: { type: [String], default: [] },
        certifications: { type: [String], default: [] },
        interested_roles: { type: [String], default: [] },
        interested_companies: { type: [String], default: [] },
    },
    resumes: [
        {
            resume_id: { type: mongoose.Schema.Types.ObjectId, default: null },
            resume_name: { type: String, default: '' },
            file_data: { type: Buffer, default:'' },
            upload_date: { type: Date, default: null },
            content_type:{ type: String, default: '' },
            resumelink: { type: String, default: '' },
        },
    ],
}, { strict: false });

const User = mongoose.model('User', userSchema);

export default User;
 