import { useEffect, useState } from "react"
import axios from "axios"
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from "recharts"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "./ui/Card"
import API from '../utils/axiosInstance';

const IssueChart = () => {
  const [resolvedIssues, setResolvedIssues] = useState(0)
  const [inProgressIssues, setInProgressIssues] = useState(0)
  const [pendingIssues, setPendingIssues] = useState(0)
  const [totalIssues, setTotalIssues] = useState(0)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchIssues = async () => {
      try {
        const response = await API.get("issues/")
        const issues = response.data || []
        setTotalIssues(issues.length)
        setResolvedIssues(
          issues.filter(
            (issue) => issue.status === "Resolved" || issue.status === "resolved"
          ).length
        )
        setInProgressIssues(
          issues.filter(
            (issue) => issue.status === "In Progress" || issue.status === "in progress"
          ).length
        )
        setPendingIssues(
          issues.filter(
            (issue) => issue.status === "Pending" || issue.status === "pending"
          ).length
        )
      } catch (error) {
        console.error("Error fetching issues:", error)
      } finally {
        setLoading(false)
      }
    }
    fetchIssues()
  }, [])

  const data = [
    { name: "Resolved", value: resolvedIssues, color: "#166534" },
    { name: "In Progress", value: inProgressIssues, color: "#DC2626" },
    { name: "Pending", value: pendingIssues, color: "#EAB308" },
  ]

  return (
    <Card className="mt-4 shadow-md">
      <CardHeader>
        <CardTitle className="text-lg font-medium">Issue Statistics</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex flex-col items-center">
          <div className="h-50 w-full">
            {loading ? (
              <div className="text-center text-gray-500 py-8">Loading chart...</div>
            ) : (
              <ResponsiveContainer width="100%" height={200}>
                <PieChart>
                  <Pie
                    data={data}
                    cx="50%"
                    cy="50%"
                    innerRadius={40}
                    outerRadius={80}
                    paddingAngle={2}
                    dataKey="value"
                    label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                    labelLine={false}
                  >
                    {data.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip formatter={(value, name) => [`${value} issues`, name]} />
                </PieChart>
              </ResponsiveContainer>
            )}
          </div>
        </div>
      </CardContent>

      <CardFooter className="grid grid-cols-4 gap-4 w-full mt-4 text-center">
        <div>
          <p className="text-sm text-gray-500 dark:text-gray-400">TOTAL</p>
          <p className="text-2xl font-bold">{totalIssues}</p>
        </div>
        <div>
          <p className="text-sm text-gray-500 dark:text-gray-400">Resolved</p>
          <p className="text-xl font-bold text-green-600">{resolvedIssues}</p>
        </div>
        <div>
          <p className="text-sm text-gray-500 dark:text-gray-400">In Progress</p>
          <p className="text-xl font-bold text-red-800 ">{inProgressIssues}</p>
        </div>
        <div>
          <p className="text-sm text-gray-500 dark:text-gray-400">Pending</p>
          <p className="text-xl font-bold text-yellow-600">{pendingIssues}</p>
        </div>
      </CardFooter>
    </Card>
  )
}

export default IssueChart

