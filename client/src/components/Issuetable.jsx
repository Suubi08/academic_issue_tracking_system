import React from 'react'

const Issuetable = ({issue ,loading}) => {
  return (
    <div>
        <div>
            <h1>My Issues</h1>
        </div>
         
         <div>
            <div>
                <table className='min-w-full divide-y divide-blue-800 dark:divide-gray-700'>
                    <thead className='bg-blue-800 dark:bg-gray:700 text-white ' >
                        <tr>
                        <th className='cellheader'>ISSUE TITLE</th>
                        <th className='cellheader'>STATUS</th>
                        <th className='cellheader'>LAST UPDATE</th>
                        <th className='cellheader'>ACTION</th>
                        </tr>       
                    </thead>

                    <tbody>
                        {issue.map((issue)=>(
                            <tr key={issue.id}>
                                <td>{issue.title}</td>
                                <td>{issue.status}</td>
                                <td>{issue.lastupdate}</td>
                                <td className=''><button className='view'>view</button></td>
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