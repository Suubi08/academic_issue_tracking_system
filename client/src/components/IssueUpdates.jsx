import React from 'react'

const IssueUpdates = ({issues}) => {

  return (
    <div>
        {issues.map((issue)=>(
            <div key={issue.id} className='flex items-center justify-between p-3 border rounded-lg'>
                <div className='flex flex-col '>
                <span className='font-medium'>{issue.title}</span>
                <div className='flex items-center justify-between gap-7 mt-2'>
                      {/* i will adjust if the issue is resolved  */}
                      <span className='ml-2 text-xs text-gray-800'>{issue.status === "Resolved"
                    ? "Wed 10:30-13:30"
                    : issue.status === "In Progress"
                      ? "Thu 09:00-11:00"
                      : "14:30-17:30"}</span>
                    <span
                    className={
                        `inline-flex items-center px-2 py-0.5  text-white rounded-full ${
                            issue.status==='Resolved'?'bg-green-800':issue.status==='Pending'?'bg-yellow-400':'bg-red-800'
                        }`
                    }>{issue.status}</span>

                  
                    </div>
                    </div>
            </div>
        ))}
    </div>
  )
}

export default IssueUpdates;
