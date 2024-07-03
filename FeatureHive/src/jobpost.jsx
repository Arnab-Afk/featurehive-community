import {useState, useEffect} from 'react';
import { useParams } from "react-router-dom";
import axios from 'axios';
import DriveProcess from './progressbar';
import Drive from './drive';
export default function Post() {
  const params = useParams();
  const token=localStorage.getItem('user-token');
  const job_id = params.id;
  const [job, setJob] = useState({company_id: {}, requirements:{skills_required: []}, drive_process:[]});
  const [application, setApplication] = useState();
  const [resumes, setResumes] = useState([]);
  const [resume, setResume] = useState();

  async function submit() {
    if(!application){
      try {
        const response = await axios.post('/api/applications', {
          job_id: job_id,
          resume_id: resume,
        }, {
          headers: {
            'auth-token': token, // Replace with your actual header and token
          }
        });
        setApplication(response.data);
      } catch (error) {
        console.error('Error submitting application:', error);
      }
    }
  }

  const fetchJob = async () => {
    try {
      const response =  await axios.get(`/api/user/job/${job_id}`, {
        headers: {
          'auth-token': token, // Replace with your actual header and token
        }
      });
      setJob(response.data.job);
      setApplication(response.data.application);
    } catch (error) {
      console.error('Error fetching job data:', error);
    }
  };

  const fetchResume = async () => {
    try {
      const response =  await axios.get(`/api/user/resume-link`, {
        headers: {
          'auth-token': token, // Replace with your actual header and token
        }
      });
      // console.log(response.data);
      setResumes(response.data);
    } catch (error) {
      console.error('Error fetching resume data:', error);
    }

  };
  
  useEffect(() => {
    fetchJob();
    fetchResume();
  }, []);

  // const companyname=job.company_id.name;
  return (
    <div className="bg-white py-4">
      <div key={job._id} className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-2xl lg:mx-0">
          <img
            src="https://tailwindui.com/img/logos/48x48/reform.svg"
            className="h-12 w-12 flex-none rounded-lg bg-white object-cover ring-1 ring-gray-900/10"
          />
          <h3 className="font-semibold text-gray-900 py-2">
            {job.company_id.name}
          </h3>

          <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
            {job.job_title}
          </h2>
          <p className="mt-6 text-lg leading-8 text-gray-600">
            {job.description}
          </p>
        </div>
        <dl className="mx-auto mt-16 grid max-w-2xl grid-cols-1 gap-x-8 gap-y-16 text-base leading-7 sm:grid-cols-2 lg:mx-0 lg:max-w-none lg:grid-cols-3">
          <div>
            <dt className="font-semibold text-gray-900">Salary</dt>
            <dd className="mt-1 text-gray-600">{job.salary}</dd>
          </div>
          <div>
            <dt className="font-semibold text-gray-900">Location</dt>
            <dd className="mt-1 text-gray-600">{job.location}</dd>
          </div>
          <div>
            <dt className="font-semibold text-gray-900">Description</dt>
            <dd className="mt-1 text-gray-600">{job.description}</dd>
          </div>
          <div className="">
            <dt className="font-semibold text-gray-900">Skills required</dt>
            {job && (
              <dd className="mt-1 text-gray-600">
                {job.requirements.skills_required.join(", ")}
              </dd>
            )}
            {/* {job.requirements.skills_required.map((skill,index) => (
                  <dd className="mt-1 text-gray-600">{skill}</dd>
                ))} */}
          </div>
          <div>
            <div className=" max-w-64 -mt-1 h-10">
              <label
                htmlFor="course"
                className="mt-1 text-sm font-semibold leading-6  text-black"
              >
                Resume
              </label>
              <select
                id="course"
                name="course"
                onChange={(e) => setResume(e.target.value)}
                className="mt-2 block w-full rounded-md border-0 py-3 pl-5 pr-10 text-gray-900 ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-blue-600 sm:text-sm sm:leading-6 bg-transparent hover:bg-grey-100 focus:bg-gray-100  "
                defaultValue=""
                placeholder="Select Resume"
              >
                <option value="" disabled selected>
                  Select Resume
                </option>
                {resumes.map((r) => (
                  <option key={r._id} value={r._id}>
                    {r.resume_name}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </dl>

        <div className="w-full flex flex-row justify-baseline gap-6 mt-10">
          <button
            className={`w-28 h-10 rounded-lg text-white ${
              application ? "cursor-not-allowed bg-red-700" : "bg-red-600 hover:bg-red-700"
            }`}
            onClick={submit}
          >
            {application ? "Applied" : "Apply"}
          </button>
        </div>
        <div className="bg-gray-100 bg-opacity-25 shadow-xl mt-7 rounded-lg">
          <Drive deployments={job.drive_process} />
        </div>

        <div className="p-5 mt-10">
          <DriveProcess />
        </div>
      </div>
    </div>
  );
}
  