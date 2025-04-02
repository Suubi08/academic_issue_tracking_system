"use client"

import { useState, useEffect } from "react"
import { Download, ArrowUpRight, ArrowDownRight, HelpCircle, Filter, X } from "lucide-react"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "../../components"
import { Button } from "../../components/ui/"
import { Badge } from "../../components/ui/"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../../components/ui"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../../components/ui"
import { useNavigate } from "react-router-dom"
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip as RechartsTooltip,
  Legend,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Line,
  AreaChart,
  Area,
} from "recharts"
import { Switch } from "../../components/ui"

export default function Reports() {
  // Original state variables
  const [timeRange, setTimeRange] = useState("month")
  const [categoryFilter, setCategoryFilter] = useState("all")
  const [dateRange, setDateRange] = useState("last6months")
  const [comparisonMode, setComparisonMode] = useState(false)
  const navigate = useNavigate()

  // New state variables for filtering
  const [searchTerm, setSearchTerm] = useState("")
  const [showFilters, setShowFilters] = useState(false)
  const [filteredData, setFilteredData] = useState([])

  // Sample data for the charts
  const monthlyData = [
    { name: "Jan", pending: 4, inProgress: 2, resolved: 3, previousYear: 2 },
    { name: "Feb", pending: 6, inProgress: 3, resolved: 6, previousYear: 4 },
    { name: "Mar", pending: 5, inProgress: 4, resolved: 8, previousYear: 5 },
    { name: "Apr", pending: 7, inProgress: 5, resolved: 7, previousYear: 6 },
    { name: "May", pending: 3, inProgress: 2, resolved: 9, previousYear: 7 },
    { name: "Jun", pending: 5, inProgress: 3, resolved: 5, previousYear: 4 },
  ]

  const categoryData = [
    { name: "Marks", value: 35, lastMonth: 30 },
    { name: "Registration", value: 25, lastMonth: 28 },
    { name: "Submission", value: 15, lastMonth: 12 },
    { name: "Resources", value: 10, lastMonth: 15 },
    { name: "Scheduling", value: 15, lastMonth: 15 },
  ]

  const resolutionTimeData = [
    { name: "Marks", current: 2.5, previous: 3.2 },
    { name: "Registration", current: 4.2, previous: 5.0 },
    { name: "Submission", current: 1.8, previous: 2.1 },
    { name: "Resources", current: 3.5, previous: 3.0 },
    { name: "Scheduling", current: 5.0, previous: 5.5 },
  ]

  const satisfactionData = [
    { subject: "Response Time", A: 85, B: 75 },
    { subject: "Resolution Quality", A: 90, B: 80 },
    { subject: "Communication", A: 88, B: 70 },
    { subject: "Follow-up", A: 75, B: 65 },
    { subject: "Overall", A: 92, B: 78 },
  ]

  const weeklyTrendData = [
    { name: "Week 1", issues: 12 },
    { name: "Week 2", issues: 19 },
    { name: "Week 3", issues: 15 },
    { name: "Week 4", issues: 22 },
    { name: "Week 5", issues: 18 },
    { name: "Week 6", issues: 24 },
    { name: "Week 7", issues: 21 },
    { name: "Week 8", issues: 17 },
  ]

  // Apply filters when categoryFilter or dateRange changes
  useEffect(() => {
    let filtered = [...monthlyData]

    // Apply date range filter
    if (dateRange === "last3months") {
      filtered = filtered.slice(-3)
    } else if (dateRange === "last6months") {
      filtered = filtered.slice(-6)
    }

    setFilteredData(filtered)
  }, [categoryFilter, dateRange])

  const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042", "#8884d8"]

  // Function to handle report issue button click
  const handleReportIssue = () => {
    navigate("/issuereport")
  }

  // Function to toggle filters
  const handleFilterToggle = () => {
    setShowFilters(!showFilters)
  }

  // Function to clear all filters
  const clearFilters = () => {
    setCategoryFilter("all")
    setDateRange("last6months")
    setSearchTerm("")
  }

  // Calculate total issues
  const totalIssues =
    filteredData.length > 0
      ? filteredData.reduce((sum, month) => sum + month.pending + month.inProgress + month.resolved, 0)
      : monthlyData.reduce((sum, month) => sum + month.pending + month.inProgress + month.resolved, 0)

  // Calculate resolution rate
  const totalResolved =
    filteredData.length > 0
      ? filteredData.reduce((sum, month) => sum + month.resolved, 0)
      : monthlyData.reduce((sum, month) => sum + month.resolved, 0)

  const resolutionRate = Math.round((totalResolved / totalIssues) * 100)

  // Calculate change percentages for KPIs
  const issuesChange = +10 // Percentage change from previous period
  const resolvedChange = +15
  const rateChange = +5
  const timeChange = -8

  return (
    <div className="flex bg-gray-50">
      {/* Main Content */}
      <main className="flex-1  p-4 md:p-6">
        <div className="mb-6 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold">Reports & Analytics</h1>
            <p className="text-muted-foreground">View statistics and trends for academic issues</p>
          </div>
          <div className="flex flex-wrap items-center gap-3">
            <Button
              variant="outline"
              className={`flex items-center gap-2 ${
                categoryFilter !== "all" ? "bg-blue-50 border-blue-200 text-blue-600" : ""
              }`}
              onClick={handleFilterToggle}
            >
              <Filter className="h-4 w-4" />
              Filter
              {categoryFilter !== "all" && (
                <span className="ml-1 bg-blue-100 text-blue-800 text-xs font-medium px-2 py-0.5 rounded-full">1</span>
              )}
            </Button>

            <div className="flex items-center gap-2">
              <label className="text-sm whitespace-nowrap">Compare with previous period</label>
              <Switch checked={comparisonMode} onCheckedChange={setComparisonMode} />
            </div>

            <Button variant="outline" className="flex items-center gap-2">
              <Download className="h-4 w-4" />
              Export Report
            </Button>
          </div>
        </div>

        {/* Filter panel */}
        {showFilters && (
          <div className="mb-6 p-4 bg-gray-50 border border-gray-200 rounded-lg">
            <div className="flex justify-between items-center mb-3">
              <h3 className="font-medium">Filter Reports</h3>
              <button onClick={clearFilters} className="text-sm text-blue-600 flex items-center">
                Clear all filters <X className="h-4 w-4 ml-1" />
              </button>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label className="text-sm font-medium mb-1 block">Category</label>
                <Select value={categoryFilter} onValueChange={setCategoryFilter}>
                  <SelectTrigger>
                    <SelectValue placeholder="All Categories" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Categories</SelectItem>
                    <SelectItem value="marks">Marks</SelectItem>
                    <SelectItem value="registration">Registration</SelectItem>
                    <SelectItem value="submission">Submission</SelectItem>
                    <SelectItem value="resources">Resources</SelectItem>
                    <SelectItem value="scheduling">Scheduling</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <label className="text-sm font-medium mb-1 block">Status</label>
                <Select defaultValue="all">
                  <SelectTrigger>
                    <SelectValue placeholder="All Statuses" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Statuses</SelectItem>
                    <SelectItem value="pending">Pending</SelectItem>
                    <SelectItem value="inprogress">In Progress</SelectItem>
                    <SelectItem value="resolved">Resolved</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <label className="text-sm font-medium mb-1 block">Sort By</label>
                <Select defaultValue="newest">
                  <SelectTrigger>
                    <SelectValue placeholder="Sort By" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="newest">Newest First</SelectItem>
                    <SelectItem value="oldest">Oldest First</SelectItem>
                    <SelectItem value="priority">Priority</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>
        )}

        {/* Stats Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 mb-6">
          <Card>
            <CardContent className="p-4">
              <div className="flex justify-between items-start">
                <div>
                  <p className="text-sm text-muted-foreground">Total Issues</p>
                  <div className="text-3xl font-bold mt-1">{totalIssues}</div>
                </div>
                <div className={`flex items-center ${issuesChange >= 0 ? "text-green-500" : "text-red-500"}`}>
                  {issuesChange >= 0 ? <ArrowUpRight className="h-4 w-4" /> : <ArrowDownRight className="h-4 w-4" />}
                  <span className="text-sm font-medium">{Math.abs(issuesChange)}%</span>
                </div>
              </div>
              <div className="mt-4 h-2 bg-gray-100 rounded-full overflow-hidden">
                <div className="h-full bg-primary" style={{ width: "75%" }}></div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-4">
              <div className="flex justify-between items-start">
                <div>
                  <p className="text-sm text-muted-foreground">Resolved Issues</p>
                  <div className="text-3xl font-bold mt-1">{totalResolved}</div>
                </div>
                <div className={`flex items-center ${resolvedChange >= 0 ? "text-green-500" : "text-red-500"}`}>
                  {resolvedChange >= 0 ? <ArrowUpRight className="h-4 w-4" /> : <ArrowDownRight className="h-4 w-4" />}
                  <span className="text-sm font-medium">{Math.abs(resolvedChange)}%</span>
                </div>
              </div>
              <div className="mt-4 h-2 bg-gray-100 rounded-full overflow-hidden">
                <div className="h-full bg-green-500" style={{ width: "65%" }}></div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-4">
              <div className="flex justify-between items-start">
                <div>
                  <p className="text-sm text-muted-foreground">Resolution Rate</p>
                  <div className="text-3xl font-bold mt-1">{resolutionRate}%</div>
                </div>
                <div className={`flex items-center ${rateChange >= 0 ? "text-green-500" : "text-red-500"}`}>
                  {rateChange >= 0 ? <ArrowUpRight className="h-4 w-4" /> : <ArrowDownRight className="h-4 w-4" />}
                  <span className="text-sm font-medium">{Math.abs(rateChange)}%</span>
                </div>
              </div>
              <div className="mt-4 h-2 bg-gray-100 rounded-full overflow-hidden">
                <div className="h-full bg-blue-500" style={{ width: `${resolutionRate}%` }}></div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-4">
              <div className="flex justify-between items-start">
                <div>
                  <p className="text-sm text-muted-foreground">Avg. Resolution Time</p>
                  <div className="text-3xl font-bold mt-1">
                    4.2 <span className="text-sm font-normal">days</span>
                  </div>
                </div>
                <div className={`flex items-center ${timeChange <= 0 ? "text-green-500" : "text-red-500"}`}>
                  {timeChange <= 0 ? <ArrowDownRight className="h-4 w-4" /> : <ArrowUpRight className="h-4 w-4" />}
                  <span className="text-sm font-medium">{Math.abs(timeChange)}%</span>
                </div>
              </div>
              <div className="mt-4 h-2 bg-gray-100 rounded-full overflow-hidden">
                <div className="h-full bg-amber-500" style={{ width: "42%" }}></div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Rest of the component remains the same */}
        {/* ... */}

        {/* Issue Status Summary */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          <Card className="col-span-1">
            <CardHeader className="pb-2">
              <CardTitle className="text-lg">Issue Status</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-[220px]">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={[
                        { name: "Pending", value: 15, color: "#ef4444" },
                        { name: "In Progress", value: 10, color: "#f59e0b" },
                        { name: "Resolved", value: 30, color: "#10b981" },
                      ]}
                      cx="50%"
                      cy="50%"
                      innerRadius={60}
                      outerRadius={80}
                      paddingAngle={5}
                      dataKey="value"
                    >
                      {[
                        { name: "Pending", value: 15, color: "#ef4444" },
                        { name: "In Progress", value: 10, color: "#f59e0b" },
                        { name: "Resolved", value: 30, color: "#10b981" },
                      ].map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <RechartsTooltip formatter={(value, name) => [`${value} issues`, name]} />
                  </PieChart>
                </ResponsiveContainer>
              </div>
              <div className="grid grid-cols-3 gap-2 mt-2">
                <div className="flex flex-col items-center p-2 rounded-md bg-gray-50">
                  <Badge variant="destructive" className="mb-1">
                    15
                  </Badge>
                  <span className="text-xs text-center">Pending</span>
                </div>
                <div className="flex flex-col items-center p-2 rounded-md bg-gray-50">
                  <Badge variant="warning" className="mb-1">
                    10
                  </Badge>
                  <span className="text-xs text-center">In Progress</span>
                </div>
                <div className="flex flex-col items-center p-2 rounded-md bg-gray-50">
                  <Badge variant="success" className="mb-1">
                    30
                  </Badge>
                  <span className="text-xs text-center">Resolved</span>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="col-span-2">
            <CardHeader className="pb-2">
              <CardTitle className="text-lg">Weekly Trend</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-[280px]">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart
                    data={weeklyTrendData}
                    margin={{
                      top: 10,
                      right: 30,
                      left: 0,
                      bottom: 0,
                    }}
                  >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <RechartsTooltip />
                    <Area type="monotone" dataKey="issues" stroke="#8884d8" fill="#8884d8" fillOpacity={0.3} />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
        </div>

        <Tabs defaultValue="trends" className="w-full">
          <TabsList className="grid w-full grid-cols-4 mb-6">
            <TabsTrigger value="trends">Issue Trends</TabsTrigger>
            <TabsTrigger value="categories">Issue Categories</TabsTrigger>
          </TabsList>

          {/* Trends Tab */}
          <TabsContent value="trends">
            <Card>
              <CardHeader>
                <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-2">
                  <CardTitle>Issue Trends Over Time</CardTitle>
                  <div className="flex items-center gap-4">
                    <div className="flex items-center gap-2">
                      <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                      <span className="text-sm">Pending</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-3 h-3 bg-amber-500 rounded-full"></div>
                      <span className="text-sm">In Progress</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                      <span className="text-sm">Resolved</span>
                    </div>
                    {comparisonMode && (
                      <div className="flex items-center gap-2">
                        <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
                        <span className="text-sm">Previous Year</span>
                      </div>
                    )}
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="h-[400px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart
                      data={filteredData.length > 0 ? filteredData : monthlyData}
                      margin={{
                        top: 20,
                        right: 30,
                        left: 20,
                        bottom: 5,
                      }}
                    >
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="name" />
                      <YAxis />
                      <RechartsTooltip />
                      <Legend />
                      <Bar dataKey="pending" stackId="a" fill="#ef4444" name="Pending" />
                      <Bar dataKey="inProgress" stackId="a" fill="#f59e0b" name="In Progress" />
                      <Bar dataKey="resolved" stackId="a" fill="#10b981" name="Resolved" />
                      {comparisonMode && (
                        <Line type="monotone" dataKey="previousYear" stroke="#3b82f6" name="Previous Year" />
                      )}
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
              <CardFooter className="border-t pt-4">
                <div className="w-full">
                  <h4 className="text-sm font-medium mb-2">Trend Analysis</h4>
                  <p className="text-sm text-muted-foreground">
                    Issue resolution has improved by 15% compared to the previous period. The number of pending issues
                    has decreased, while the resolution rate has increased, indicating improved efficiency in handling
                    academic issues.
                  </p>
                </div>
              </CardFooter>
            </Card>
          </TabsContent>

          {/* Categories Tab */}
          <TabsContent value="categories">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Issue Categories Distribution</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="h-[350px]">
                    <ResponsiveContainer width="100%" height="100%">
                      <PieChart>
                        <Pie
                          data={categoryData}
                          cx="50%"
                          cy="50%"
                          labelLine={false}
                          label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                          outerRadius={120}
                          fill="#8884d8"
                          dataKey="value"
                        >
                          {categoryData.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                          ))}
                        </Pie>
                        <RechartsTooltip />
                      </PieChart>
                    </ResponsiveContainer>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Category Breakdown</CardTitle>
                  <CardDescription>Distribution of issues by category with month-over-month change</CardDescription>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-4">
                    {categoryData.map((category, index) => (
                      <li key={index} className="flex items-center justify-between">
                        <div className="flex items-center">
                          <span
                            className="w-3 h-3 rounded-full mr-2"
                            style={{ backgroundColor: COLORS[index % COLORS.length] }}
                          ></span>
                          <span>{category.name}</span>
                        </div>
                        <div className="flex items-center gap-4">
                          <span className="font-medium">{category.value}%</span>
                          <div
                            className={`flex items-center ${category.value > category.lastMonth ? "text-green-500" : category.value < category.lastMonth ? "text-red-500" : "text-gray-500"}`}
                          >
                            {category.value > category.lastMonth ? (
                              <ArrowUpRight className="h-4 w-4" />
                            ) : category.value < category.lastMonth ? (
                              <ArrowDownRight className="h-4 w-4" />
                            ) : (
                              <span>—</span>
                            )}
                            <span className="text-xs ml-1">{Math.abs(category.value - category.lastMonth)}%</span>
                          </div>
                        </div>
                      </li>
                    ))}
                  </ul>

                  <div className="mt-8">
                    <h4 className="text-sm font-medium mb-2">Category Insights</h4>
                    <div className="p-3 bg-blue-50 border border-blue-100 rounded-md">
                      <div className="flex items-start">
                        <HelpCircle className="h-5 w-5 text-blue-500 mr-2 mt-0.5" />
                        <div>
                          <h5 className="text-sm font-medium text-blue-700">Key Observation</h5>
                          <p className="text-sm text-blue-600 mt-1">
                            Marks-related issues continue to be the most common category (35%). Consider implementing
                            additional verification steps in the grading process.
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </main>
    </div>
  )
}

