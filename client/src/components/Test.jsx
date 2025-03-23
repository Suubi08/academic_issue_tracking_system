import React, { useState } from 'react'
import Issuetable from './Issuetable'
import Calendar from './Calendar'
import { Issues } from '../pages'
import IssueChart from './IssueChart'
import IssueUpdates from './IssueUpdates'
import UserInfoCard from './UserInfoCard'

import  image1 from "../assets/1.jpg"
import  image2 from "../assets/2.jpg"
import  image3 from "../assets/3.jpg"
import ShowSlide from './ShowSlide'


const Test = () => {
    const images = [
       image1 ,
      image2,
      image3,
    ];
    
    const [loading,setloading]=useState(true)
    const [user, setUser] = useState({
        username: "USERNAME",
        regNo: "REG NO",
        semester: "II",
        course: "Computer Science",
        year: "2024",
        profilePic:false,
      })
    const [issue, setIssue] = useState([
        { id: "1", title: "Course registration error", status: "Pending", lastUpdate: "Feb 15, 2025" },
        { id: "2", title: "Course registration error", status: "Pending", lastUpdate: "Feb 15, 2025" },
        { id: "3", title: "missing marks", status: "In Progress", lastUpdate: "Feb 15, 2025" },
        { id: "4", title: "results error", status: "Resolved", lastUpdate: "Feb 15, 2025" },
        { id: "5", title: "Software developnment issue", status: "Resolved", lastUpdate: "Feb 15, 2025" },
        { id: "6", title: "data structures", status: "Pending", lastUpdate: "Feb 15, 2028" },
      ])

    const totalissues=issue.length
    const resolvedIssues = issue.filter((issue) => issue.status === "Resolved").length
    const inProgressIssues = issue.filter((issue) => issue.status === "In Progress").length
    const pendingIssues = issue.filter((issue) => issue.status === "Pending").length
    
  return (
    <div>
        {/* <Issuetable issue={issue} Loading={loading}  /> */}
        {/* <Calendar/> */}
        {/* <IssueChart 
        totalissues={totalissues}
        resolvedIssues={resolvedIssues} 
        inProgressIssues={inProgressIssues}
        pendingIssues={pendingIssues} /> */}
        {/* <IssueUpdates issues={issue}/> */}
        <ShowSlide images={images}  />


    </div>
  )
}

export default Test