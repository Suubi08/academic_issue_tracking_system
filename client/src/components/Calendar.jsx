import React, { useState } from 'react'

const Calendar = () => {
    const [currentMonth,setcurrentMonth]=useState(new Date())

    const daysofWeek =["Mon","Tue","Wed","Thur","Fri","Sat","Sun"]


     // Get days in month
  const getDaysInMonth = (year, month) => {
    return new Date(year, month + 1, 0).getDate()
  }

  // Get first day of month (0 = Sunday, 1 = Monday, etc.)
  const getFirstDayOfMonth = (year, month) => {
    const firstDay = new Date(year, month, 1).getDay()
    return firstDay === 0 ? 6 : firstDay - 1 // Adjust to make Monday = 0
  }

  
  return (
    <div>

    </div>
  )
}

export default Calendar;