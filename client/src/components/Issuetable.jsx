import React from 'react'

const Issuetable = (issue ,isloading) => {
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
                        <th>STATUS</th>
                        <th>LAST UPDATE</th>
                        <th>ACTION</th>
                        </tr>
                        
                           
                    </thead>
                </table>
            </div>
         </div>
        
    </div>
  )
}

export default Issuetable;