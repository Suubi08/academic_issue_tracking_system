import React from "react";
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from "recharts";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/Card";

const IssueChart = ({ totalissues, resolvedIssues, inProgressIssues, pendingIssues }) => {
  const data = [
    { name: "Resolved", value: resolvedIssues, color: "#166534" },
    { name: "In Progress", value: inProgressIssues, color: "#DC2626" },
    { name: "Pending", value: pendingIssues, color: "#EAB308" },
  ];

  return (
    <Card className="p-3">
      <CardHeader className="pb-2">
        <CardTitle className="text-base">Issue Statistics</CardTitle>
      </CardHeader>
      <CardContent className="flex flex-col items-center">
        <div className="h-40 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={data}
                cx="50%"
                cy="50%"
                innerRadius={30}
                outerRadius={60}
                paddingAngle={2}
                dataKey="value"
                label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                labelLine={false}
              >
                {data.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>
        <div className="grid grid-cols-3 gap-3 w-full mt-3 text-center text-xs">
          <div>
            <p className="text-gray-500">TOTAL</p>
            <p className="font-bold">{totalissues}</p>
          </div>
          <div>
            <p className="text-gray-500">Resolved</p>
            <p className="font-bold text-green-600">{resolvedIssues}</p>
          </div>
          <div>
            <p className="text-gray-500">Pending</p>
            <p className="font-bold text-yellow-600">{pendingIssues}</p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default IssueChart;
