import { useState, useEffect } from "react"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "./ui/Card"

const Calendar = ({ issues = [], isLoading }) => {
  const [currentMonth, setCurrentMonth] = useState(new Date())
  const [filteredIssues, setFilteredIssues] = useState(issues)

  // Update filtered issues when issues prop changes
  useEffect(() => {
    setFilteredIssues(issues)
  }, [issues])

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
    // Convert date to string format for comparison (YYYY-MM-DD)
    const dateStr = date.toISOString().split("T")[0]

    // Check if any issues fall on this date
    // This is a simplified example - in a real app, you'd compare with actual issue dates
    const issuesOnDay = filteredIssues.filter((issue) => {
      const issueDate = new Date(issue.lastUpdate).toISOString().split("T")[0]
      return issueDate === dateStr
    })

    if (issuesOnDay.length > 0) {
      // Determine status based on the first issue (you could enhance this logic)
      return { hasIssue: true, status: issuesOnDay[0].status }
    }

    // Fallback to the random assignment for demo purposes
    const day = date.getDate()
    if (day % 5 === 0) return { hasIssue: true, status: "Resolved" }
    if (day % 7 === 0) return { hasIssue: true, status: "Pending" }
    if (day % 3 === 0) return { hasIssue: true, status: "In Progress" }
    return { hasIssue: false }
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
                  // Get all issues for this day
                  const dateStr = day.date.toISOString().split("T")[0];
                  const issuesOnDay = filteredIssues.filter((issue) => {
                    if (!issue.lastUpdate) return false;
                    const issueDate = new Date(issue.lastUpdate).toISOString().split("T")[0];
                    return issueDate === dateStr;
                  });

                  // Count issues by status
                  const statusCounts = {
                    Resolved: 0,
                    "In Progress": 0,
                    Pending: 0,
                  };
                  issuesOnDay.forEach((issue) => {
                    if (issue.status === "resolved" || issue.status === "Resolved") statusCounts.Resolved++;
                    else if (issue.status === "in progress" || issue.status === "In Progress") statusCounts["In Progress"]++;
                    else if (issue.status === "pending" || issue.status === "Pending") statusCounts.Pending++;
                  });

                  const totalIssues = issuesOnDay.length;

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
                      {totalIssues > 0 && (
                        <div className="flex flex-col items-center mt-1 space-y-0.5">
                          <span className="text-xs font-semibold">{totalIssues} issue{totalIssues > 1 ? "s" : ""}</span>
                          <div className="flex space-x-1">
                            {statusCounts.Pending > 0 && (
                              <span className="bg-yellow-500 text-white text-[10px] px-1 rounded">
                                P:{statusCounts.Pending}
                              </span>
                            )}
                            {statusCounts["In Progress"] > 0 && (
                              <span className="bg-red-800 text-white text-[10px] px-1 rounded">
                                IP:{statusCounts["In Progress"]}
                              </span>
                            )}
                            {statusCounts.Resolved > 0 && (
                              <span className="bg-green-500 text-white text-[10px] px-1 rounded">
                                R:{statusCounts.Resolved}
                              </span>
                            )}
                          </div>
                        </div>
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
      </CardContent>
    </Card>
  )
}

export default Calendar

