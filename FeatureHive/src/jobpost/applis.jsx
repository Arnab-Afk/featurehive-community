import { ArrowTopRightOnSquareIcon, PhoneIcon } from "@heroicons/react/20/solid";

const people = [
  {
    name: "Google",
    job_role: "Regional Paradigm Technician ",
    hold: "Under review",
    reject: "Application rejected",
    passed: "Application passed",
    jobrole: "Dev-ops engineer",
    applied_date: "May",
    end_date: "June 24",
    salary: "₹2500000",
    email: "janecooper@example.com",
    telephone: "+1-202-555-0170",
    imageUrl:
      "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=4&w=256&h=256&q=60",
  },
  {
    name: "Amazon",
    job_role: "Customer Markets Executive",
    hold: "Under review",
    reject: "Application rejected",
    passed: "Application passed",
    jobrole: "Software Engineer",
    applied_date: "May",
    end_date: "June 24",
    salary: "₹2500000",
    email: "example@example.com",
    telephone: "+1-202-555-0170",
    imageUrl:
      "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=4&w=256&h=256&q=80",
    }, 
  // More people...
];

export default function UserApplications() {
  return (
    <div className="bg-gray-100">
     
      <div className="grid grid-cols-1 gap-8 sm:grid-cols-3 lg:grid-cols-3 px-10 py-8">
        <ul
          role="list"
          className="grid grid-rows-3 gap-2 sm:grid-cols-1 lg:grid-cols-1 flex-1"
        >
          {people.map((person) => (
            <li
              key={person.email}
              className="col-span-1 divide-y divide-gray-200 rounded-lg bg-white shadow"
            >
              <div className="flex w-full items-center justify-between space-x-6 p-6">
                <div className="flex-1 truncate">
                  <div className="flex item-center space-x-5">
                    <h3 className="truncate text-xl font-semibold text-gray-900">
                      {person.name}
                    </h3>

                    <span className="inline-flex flex-shrink-0 items-center rounded-full bg-yellow-50 px-2 py-0.5 text-xs font-medium text-yellow-700 ring-1 ring-inset ring-yellow-600/20">
                      {person.hold}
                    </span>
                  </div>

                  <div className="py-3 flex justify-start text-gray-700 font-semibold">
                    <span className="border-2 border-gray-400 p-1 bg-gray-50 inline-block rounded-md">
                      Salary: {person.salary}
                    </span>
                  </div>
                  <p className="truncate text-base text-gray-500">
                    {person.job_role}
                  </p>
                  <p className="font-medium mt-1 text-sm leading-6 text-gray-700">
                    {person.jobrole}
                  </p>
                  <p className="font-medium mt-1 text-base leading-6 text-blue-700">
                    {person.applied_date} - {person.end_date}
                  </p>
                </div>
                <img
                  className="h-10 w-10 flex-shrink-0 rounded-full bg-gray-300"
                  src={person.imageUrl}
                  alt=""
                />
              </div>

              <div>
                <div className="-mt-px flex">
                  <div className="flex w-0 flex-1">
                    <a
                      href={`mailto:${person.email}`}
                      className="relative -mr-px inline-flex w-0 flex-1 items-center justify-center gap-x-3 rounded-bl-lg border border-transparent py-4 text-sm font-semibold text-gray-900"
                    >
                      <ArrowTopRightOnSquareIcon
                        className="h-6 w-5 text-gray-400"
                        aria-hidden="true"
                      />
                      Get more details
                    </a>
                  </div>
                </div>
              </div>
            </li>
          ))}
        </ul>
        
      </div>
    </div>
  );
}