"use client"

import { useState, useEffect } from "react"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "./ui/Card"

const Calendar = ({ issues = [], isLoading }) => {
  const [currentMonth, setCurrentMonth] = useState(new Date())
  const [filteredIssues, setFilteredIssues] = useState(issues)

  useEffect(() => {
    setFilteredIssues(issues)
  }, [issues])
const daysOfWeek = ["Mon", "Tue", "Wed", "Thur", "Fri", "Sat", "Sun"]

  const getDaysInMonth = (year, month) => {
    return new Date(year, month + 1, 0).getDate()
  }

  const getFirstDayOfMonth = (year, month) => {
    const firstDay = new Date(year, month, 1).getDay()
    return firstDay === 0 ? 6 : firstDay - 1
  }
   const year = currentMonth.getFullYear()
  const month = currentMonth.getMonth()
  const daysInMonth = getDaysInMonth(year, month)
  const firstDayOfMonth = getFirstDayOfMonth(year, month)
  const daysFromPrevMonth = firstDayOfMonth
  const totalDays = Math.ceil((daysInMonth + daysFromPrevMonth) / 7) * 7
  const daysFromNextMonth = totalDays - (daysInMonth + daysFromPrevMonth)

  const calendarDays = []
     const prevMonthDays = getDaysInMonth(year, month - 1)
  for (let i = 0; i < daysFromPrevMonth; i++) {
    calendarDays.push({
      day: prevMonthDays - daysFromPrevMonth + i + 1,
      isCurrentMonth: false,
      date: new Date(year, month - 1, prevMonthDays - daysFromPrevMonth + i + 1),
    })
  }

  for (let i = 1; i <= daysInMonth; i++) {
    calendarDays.push({
      day: i,
      isCurrentMonth: true,
      date: new Date(year, month, i),
    })
  }

  for (let i = 1; i <= daysFromNextMonth; i++) {
    calendarDays.push({
      day: i,
      isCurrentMonth: false,
      date: new Date(year, month + 1, i),
    })

      }

  const monthName = currentMonth.toLocaleString("default", { month: "long" })

  const prevMonth = () => {
    setCurrentMonth(new Date(year, month - 1, 1))
  }

  const nextMonth = () => {
    setCurrentMonth(new Date(year, month + 1, 1))
  }

  const getDayIssues = (date) => {
    const dateStr = date.toISOString().split("T")[0]

    const issuesOnDay = filteredIssues.filter((issue) => {
      const issueDate = new Date(issue.date_of_issue).toISOString().split("T")[0]
      return issueDate === dateStr
    })

    if (issuesOnDay.length > 0) {
      const statuses = [...new Set(issuesOnDay.map((i) => i.status.toLowerCase()))]
      return { hasIssue: true, statuses }
    }
  return { hasIssue: false, statuses: [] }
  }

  return (
    <Card className="dark:bg-gray-800 mt-4 shadow-md">
      <CardHeader>
        <CardTitle>
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
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="p-4">
          {isLoading ? (
            <div className="space-y-2">
              <div className="h-8 w-full bg-gray-200 dark:bg-gray-700 rounded animate-pulse" />
              <div className="h-64 w-full bg-gray-200 dark:bg-gray-700 rounded animate-pulse" />
            </div>
          ) :
    (
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
                      className={`text-center p-1 relative min-h-[40px] flex flex-col items-center justify-center
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
                        <div className="flex space-x-0.5 mt-1">
                          {dayIssue.statuses.map((status, idx) => (
                            <span
                              key={idx}
                              className={`w-2 h-2 rounded-full ${
                                status === "resolved"
                                  ? "bg-green-500"
                                  : status === "pending"
                                  ? "bg-red-800"
                                  : "bg-yellow-500"
                              }`}
                            />
                          ))}
                        </div>
                      )}
                    </div>
                  )
                })}
              </div>
              <div className="mt-4 flex items-center justify-center space-x-4 text-xs">
                <div className="flex items-center">
                  <span className="w-2 h-2 rounded-full bg-red-800 mr-1"></span>
                  <span>pending</span>
                </div>
                <div className="flex items-center">
                  <span className="w-2 h-2 rounded-full bg-yellow-500 mr-1"></span>
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
      </CardContent>
    </Card>
  )
}

export default Calendar

