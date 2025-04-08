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
