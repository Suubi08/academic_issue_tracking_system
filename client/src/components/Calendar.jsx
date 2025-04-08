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
