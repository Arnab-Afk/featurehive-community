import { Link } from 'react-router-dom'

export default function Cards({jobs}) {
  
  return (
    <ul role="list" className="grid grid-cols-1 gap-x-6 gap-y-8 lg:grid-cols-3 xl:gap-x-8">
      {jobs.map((job,index) => (
        <li key={job._id} className="overflow-hidden rounded-xl border border-gray-200">
          <Link to={`/jobpost/${job._id}`}>
          <div className="flex items-center gap-x-4 border-b border-gray-900/5 bg-gray-50 p-6">
            <img
              src={job.imgurl}
              alt={job.imgurl}
              className="h-12 w-12 flex-none rounded-lg bg-white object-cover ring-1 ring-gray-900/10"
            />
            <div className="text-sm font-medium leading-6 text-gray-900">
                {job.job_title}
                </div>
          </div>
          <dl className="-my-3 divide-y divide-gray-100 px-6 py-4 text-sm leading-6">
            <div className="flex justify-between gap-x-4 py-3">
              <dt className="text-gray-500">Salary : Rs{job.salary}</dt>
              <dd className="text-gray-700">
                {job.location}
              </dd>
            </div>
            <div className="flex justify-between gap-x-4 py-3">    
            
            <p className="mt-2 text-sm text-gray-500">
              {job.description}
            </p>
            
            </div>
            
          </dl>
          </Link>
        </li>
      ))}
    </ul>
  )
}
