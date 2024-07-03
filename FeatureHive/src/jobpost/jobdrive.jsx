
import { ChevronRightIcon } from '@heroicons/react/20/solid'

const statuses = {
  offline: 'text-gray-500 bg-gray-100/10',
  online: 'text-green-400 bg-green-400/10',
  error: 'text-rose-400 bg-rose-400/10',
}
const environments = {
  Preview: 'text-gray-400 bg-gray-400/10 ring-gray-400/20',
  Production: 'text-indigo-400 bg-indigo-400/10 ring-indigo-400/30',
}
const deployments = [
  {
    id: 1,
    href: '#',
    projectName: 'ios-app',
    teamName: 'Planetaria',
    status: 'offline',
    statusText: 'Initiated 1m 32s ago',
    description: 'Deploys from GitHub',
    environment: 'Preview',
  },
  {
    id: 2,
    href: '#',
    projectName: 'mobile-api',
    teamName: 'Planetaria',
    status: 'online',
    statusText: 'Deployed 3m ago',
    description: 'Deploys from GitHub',
    environment: 'Production',
  },
  {
    id: 3,
    href: '#',
    projectName: 'tailwindcss.com',
    teamName: 'Tailwind Labs',
    status: 'offline',
    statusText: 'Deployed 3h ago',
    description: 'Deploys from GitHub',
    environment: 'Preview',
  },
  {
    id: 4,
    href: '#',
    projectName: 'api.protocol.chat',
    teamName: 'Protocol',
    status: 'error',
    statusText: 'Failed to deploy 6d ago',
    description: 'Deploys from GitHub',
    environment: 'Preview',
  },
]

function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
}
function formatDate(string){
  var options = { year: 'numeric', month: 'long', day: 'numeric' };
  return new Date(string).toLocaleDateString([],options);
} 

export default function Drive({deployments}) {
  return (
    <div className='p-6'>
    <div className="border-b border-gray-200 bg-white px-4 py-5 sm:px-6">
        <h3 className="text-base font-semibold leading-6 text-gray-900">Drive Process</h3>
        <p className="mt-1 text-sm text-gray-500">
          Job posting drive process.
        </p>
      </div>
    <ul role="list" className="divide-y divide-white/5">
      {deployments.map((deployment , index) => (
        <li key={deployment._id} className="relative flex items-center space-x-4 py-4">
          <div className="min-w-0 flex-auto">
            <div className="flex items-center gap-x-3">
              <div className={classNames(statuses['online'], 'flex-none rounded-full p-1')}>
                <div className="h-2 w-2 rounded-full bg-current" />
              </div>
              <h2 className="min-w-0 text-sm font-semibold leading-6 text-black">
                <a href={deployment.href} className="flex gap-x-2">
                  <span className="truncate">{deployment.step_name}</span>
                  <span className="text-gray-400">/</span>
                  <span className="whitespace-nowrap">{formatDate(deployment.from_date)}</span> to <span className="whitespace-nowrap">{formatDate(deployment.till_date)}</span>
                  <span className="absolute inset-0" />
                </a>
              </h2>
            </div>
            <div className="mt-3 flex items-center gap-x-2.5 text-xs leading-5 text-gray-400">
              <p className="truncate">{deployment.description}</p>
              <svg viewBox="0 0 2 2" className="h-0.5 w-0.5 flex-none fill-gray-300">
                <circle cx={1} cy={1} r={1} />
              </svg>
              <p className="whitespace-nowrap">{deployment.location}</p>
            </div>
          </div>
          <div className='rounded-full flex-none py-1 px-2 text-xs font-medium ring-1 ring-inset'>
            {deployment.step_number}
          </div>
        </li>
      ))}
    </ul>
    </div>
  )
}

