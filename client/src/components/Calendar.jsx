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

    
