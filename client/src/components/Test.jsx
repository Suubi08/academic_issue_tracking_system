import React, { useState } from 'react'
import Issuetable from './Issuetable'
import Calendar from './Calendar'

const Test = () => {
    const [loading,setloading]=useState(true)
    const [issue, setIssue] = useState([
        { id: "1", title: "Course registration error", status: "Pending", lastUpdate: "Feb 15, 2025" },
        { id: "2", title: "Course registration error", status: "Pending", lastUpdate: "Feb 15, 2025" },
        { id: "3", title: "missing marks", status: "In Progress", lastUpdate: "Feb 15, 2025" },
        { id: "4", title: "results error", status: "Resolved", lastUpdate: "Feb 15, 2025" },
        { id: "5", title: "Software developnment issue", status: "Resolved", lastUpdate: "Feb 15, 2025" },
        { id: "6", title: "data structures", status: "Pending", lastUpdate: "Feb 15, 2025" },
      ])
    
  return (
    <div>
        {/* <Issuetable issue={issue} Loading={loading}  /> */}
        <Calendar/>
    </div>
  )
}

export default Test