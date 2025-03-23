"use client"

import { useState } from "react"
import { ChevronLeft, ChevronRight } from "lucide-react"

const Calendar=({ issues, isLoading })=> {
  const [currentMonth, setCurrentMonth] = useState(new Date())

  const daysOfWeek = ["Mon", "Tue", "Wed", "Thur", "Fri", "Sat", "Sun"]

  // Get days in month
  const getDaysInMonth = (year, month) => {
    return new Date(year, month + 1, 0).getDate()
  }

  // Get first day of month (0 = Sunday, 1 = Monday, etc.)
  const getFirstDayOfMonth = (year, month) => {
    const firstDay = new Date(year, month, 1).getDay()
    return firstDay === 0 ? 6 : firstDay - 1 // Adjust to make Monday = 0
  }

  const year = currentMonth.getFullYear()
  const month = currentMonth.getMonth()
  const daysInMonth = getDaysInMonth(year, month)
  const firstDayOfMonth = getFirstDayOfMonth(year, month)

  // Get days from previous month to fill first week
  const daysFromPrevMonth = firstDayOfMonth

  // Get total number of days to display (including days from prev/next month)
  const totalDays = Math.ceil((daysInMonth + daysFromPrevMonth) / 7) * 7

  // Get days from next month to fill last week
  const daysFromNextMonth = totalDays - (daysInMonth + daysFromPrevMonth)

  // Generate calendar days
  const calendarDays = []

  // Previous month days
  const prevMonthDays = getDaysInMonth(year, month - 1)
  for (let i = 0; i < daysFromPrevMonth; i++) {
    calendarDays.push({
      day: prevMonthDays - daysFromPrevMonth + i + 1,
      isCurrentMonth: false,
      date: new Date(year, month - 1, prevMonthDays - daysFromPrevMonth + i + 1),
    })
  }

  // Current month days
  for (let i = 1; i <= daysInMonth; i++) {
    calendarDays.push({
      day: i,
      isCurrentMonth: true,
      date: new Date(year, month, i),
    })
  }

  // Next month days
  for (let i = 1; i <= daysFromNextMonth; i++) {
    calendarDays.push({
      day: i,
      isCurrentMonth: false,
      date: new Date(year, month + 1, i),
    })
  }

  // Format month name
  const monthName = currentMonth.toLocaleString("default", { month: "long" })

  // Navigate to previous/next month
  const prevMonth = () => {
    setCurrentMonth(new Date(year, month - 1, 1))
  }

  const nextMonth = () => {
    setCurrentMonth(new Date(year, month + 1, 1))
  }

  // Check if a day has issues
  const getDayIssues = (date) => {
    // This is a placeholder. In a real app, you would check if any issues fall on this date
    // For now, we'll just randomly assign issues to some days
    const day = date.getDate()
    if (day % 5 === 0) return { hasIssue: true, status: "Resolved" }
    if (day % 7 === 0) return { hasIssue: true, status: "Pending" }
    if (day % 3 === 0) return { hasIssue: true, status: "In Progress" }
    return { hasIssue: false }
  }

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow">
      <div className="flex items-center justify-between p-4 border-b border-gray-200 dark:border-gray-700">
        <h2 className="text-lg font-medium">Calendar</h2>
        <div className="flex items-center space-x-2">
          <button
            className="p-1 rounded-md border border-gray-300 dark:border-gray-600 hover:bg-gray-100 dark:hover:bg-gray-700"
            onClick={prevMonth}
          >
            <ChevronLeft className="h-4 w-4" />
          </button>
          <button
            className="p-1 rounded-md border border-gray-300 dark:border-gray-600 hover:bg-gray-100 dark:hover:bg-gray-700"
            onClick={nextMonth}
          >
            <ChevronRight className="h-4 w-4" />
          </button>
        </div>
      </div>
      <div className="p-4">
        {isLoading ? (
          <div className="space-y-2">
            <div className="h-8 w-full bg-gray-200 dark:bg-gray-700 rounded animate-pulse" />
            <div className="h-64 w-full bg-gray-200 dark:bg-gray-700 rounded animate-pulse" />
          </div>
        ) : (
          <>
            <div className="text-center mb-4">
              <h3 className="text-lg font-medium">
                {monthName} {year}
              </h3>
            </div>
            <div className="grid grid-cols-7 gap-1">
              {daysOfWeek.map((day) => (
                <div key={day} className="text-center text-xs font-medium text-gray-500 py-1">
                  {day}
                </div>
              ))}
              {calendarDays.map((day, index) => {
                const dayIssue = getDayIssues(day.date)
                return (
                  <div
                    key={index}
                    className={`
                      text-center p-1 relative min-h-[40px] flex flex-col items-center justify-center
                      ${!day.isCurrentMonth ? "text-gray-400" : ""}
                      ${
                        day.isCurrentMonth && new Date().toDateString() === day.date.toDateString()
                          ? "bg-primary/10 rounded-md font-bold"
                          : ""
                      }
                    `}
                  >
                    <span>{day.day}</span>
                    {dayIssue.hasIssue && (
                      <span
                        className={`
                          w-2 h-2 rounded-full mt-1
                          ${
                            dayIssue.status === "Resolved"
                              ? "bg-green-500"
                              : dayIssue.status === "In Progress"
                                ? "bg-red-800"
                                : "bg-yellow-500"
                          }
                        `}
                      />
                    )}
                  </div>
                )
              })}
            </div>
            <div className="mt-4 flex items-center justify-center space-x-4 text-xs">
              <div className="flex items-center">
                <span className="w-2 h-2 rounded-full bg-yellow-500 mr-1"></span>
                <span>pending</span>
              </div>
              <div className="flex items-center">
                <span className="w-2 h-2 rounded-full bg-red-800 mr-1"></span>
                <span>in progress</span>
              </div>
              <div className="flex items-center">
                <span className="w-2 h-2 rounded-full bg-green-500 mr-1"></span>
                <span>resolved</span>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  )
}

export default Calendar;