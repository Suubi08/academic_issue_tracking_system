import React, { useState } from 'react'
import image1 from '../assets/1.jpg'
import image2 from '../assets/2.jpg'
import image3 from '../assets/3.jpg'
import { Calendar, IssueChart, Issuetable, IssueUpdates, ShowSlide, TrackStudentIssues, UserInfoCard } from '../components'
import IssueTracking from '../components/IssueTracking'
const Studentdashboard = () => {
    const images = [
         image1 ,
        image2,
        image3,
      ];
      
      const [loading,setloading]=useState(false)
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
        <div className="p-4 md:p-6 w-full">
          <div className="mt-4 grid grid-cols-1 gap-4 lg:grid-cols-3">
            {/* Left Section (Main Content) */}
            <div className="lg:col-span-2 space-y-4">
              <ShowSlide images={images} />
              <TrackStudentIssues />
              <IssueChart  
                totalissues={totalissues}
                resolvedIssues={resolvedIssues} 
                inProgressIssues={inProgressIssues}
                pendingIssues={pendingIssues} 
              />
            </div>
    
            {/* Right Section (Sidebar Widgets) */}
            <div className="col-span-1 space-y-4">
              <UserInfoCard user={user} />
              <Calendar issues={issue} isLoading={loading} />
              <IssueTracking />
            </div>
          </div>
        </div>
      );
}

export default Studentdashboard;