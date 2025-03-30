import React from 'react'

const Issuetable = ({ issue }) => {
    return (
        <div  className="bg-white dark:bg-gray-800 rounded-lg shadow">
            <div className="p-4 border-b border-gray-200 dark:border-gray-700">
                <h1 className="text-lg font-medium">My Issues</h1>
            </div>

            <div>
                <div className="overflow-x-auto">
                    <table className='min-w-full divide-y  divide-blue-800  dark:divide-gray-700'>
                        <thead className='bg-blue-700 dark:bg-gray:700 text-white ' >
                            <tr>
                                <th className='cellheader'>ISSUE TITLE</th>
                                <th className='cellheader'>STATUS</th>
                                <th className='cellheader'>LAST UPDATE</th>
                                <th className='cellheader'>ACTION</th>
                            </tr>
                        </thead>

                        <tbody className="bg-white dark:bg-gray-800 divide-y divide-blue-800 dark:divide-gray-700">
                            {issue.map((issue) => (
                                <tr key={issue.id}>
                                    <td className='px-6 py-6 whitespace-nowrap'>{issue.title}</td>
                                    <td className='px-6 py-6 whitespace-nowrap  '>
                                        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${issue.status === "Resolved"
                                                ? "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200"
                                                : issue.status === "In Progress"
                                                    ? "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200"
                                                    : "bg-red-100 text-red-800 dark:bg-red-900 dark:text-yellow-200"
                                            }`}
                                        >{issue.status}</span></td>
                                    <td className='px-6 py-6 whitespace-nowrap text-sm text-black font-bold '>{issue.lastUpdate}</td>
                                    <td className='px-6 py-6 whitespace-nowrap'>
                                        <button className='view'>view</button></td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>

        </div>
    )
}

export default Issuetable;