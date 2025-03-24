import React from "react";
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from "recharts";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "./ui/Card";

const IssueChart = ({
  totalissues,
  resolvedIssues,
  inProgressIssues,
  pendingIssues,
}) => {
  const data = [
    { name: "Resolved", value: resolvedIssues, color: "#166534" },
    { name: "In Progress", value: resolvedIssues, color: "#DC2626" },
    { name: "Pending", value: resolvedIssues, color: "#EAB308" },
  ];

  return (
    <Card className="m-4 ml-2">
      <CardHeader>
        <CardTitle className="text-lg font-medium">Issue Statistics</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex flex-col items-center">
          <div className="h-50 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={data}
                  cx="50%"
                  cy="50%"
                  innerRadius={40}
                  outerRadius={80}
                  paddingAngle={2}
                  dataKey="value"
                  label={({ name, percent }) =>
                    `${name} ${(percent * 100).toFixed(0)}%`
                  }
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
        </div>
      </CardContent>

      <CardFooter className="grid grid-cols-4 gap-4 w-full mt-4 text-center">
        <div>
          <p className="text-sm text-gray-500 dark:text-gray-400">TOTAL</p>
          <p className="text-2xl font-bold">{totalissues}</p>
        </div>
        <div>
          <p className="text-sm text-gray-500 dark:text-gray-400">Resolved</p>
          <p className="text-xl font-bold text-green-600">{resolvedIssues}</p>
        </div>
        <div>
          <p className="text-sm text-gray-500 dark:text-gray-400">
            In Progress
          </p>
          <p className="text-xl font-bold text-red-800 ">{inProgressIssues}</p>
        </div>
        <div>
          <p className="text-sm text-gray-500 dark:text-gray-400">Pending</p>
          <p className="text-xl font-bold text-yellow-600">{pendingIssues}</p>
        </div>
      </CardFooter>
    </Card>
  );
};
export default IssueChart;
//   <div className="bg-white dark:bg-gray-800 rounded-lg shadow">
//   <div className="p-4 border-b border-gray-200 dark:border-gray-700">
//     <h2 className="text-lg font-medium">Issue Statistics</h2>
//   </div>
//   <div className="p-3">

//       <div className="flex flex-col items-center">
//         <div className="h-50 w-full">
//           <ResponsiveContainer width="100%" height="100%">
//             <PieChart>
//               <Pie
//                 data={data}
//                 cx="50%"
//                 cy="50%"
//                 innerRadius={40}
//                 outerRadius={80}
//                 paddingAngle={2}
//                 dataKey="value"
//                 label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
//                 labelLine={false}
//               >
//                 {data.map((entry, index) => (
//                   <Cell key={`cell-${index}`} fill={entry.color} />
//                 ))}
//               </Pie>
//               <Tooltip />
//             </PieChart>
//           </ResponsiveContainer>
//         </div>
//         <div className="grid grid-cols-4 gap-4 w-full mt-4 text-center">
//           <div>
//             <p className="text-sm text-gray-500 dark:text-gray-400">TOTAL</p>
//             <p className="text-2xl font-bold">{totalissues}</p>
//           </div>
//           <div>
//             <p className="text-sm text-gray-500 dark:text-gray-400">Resolved</p>
//             <p className="text-xl font-bold text-green-600">{resolvedIssues}</p>
//           </div>
//           <div>
//             <p className="text-sm text-gray-500 dark:text-gray-400">In Progress</p>
//             <p className="text-xl font-bold text-red-800 ">{inProgressIssues}</p>
//           </div>
//           <div>
//             <p className="text-sm text-gray-500 dark:text-gray-400">Pending</p>
//             <p className="text-xl font-bold text-yellow-600">{pendingIssues}</p>
//           </div>
//         </div>
//       </div>

//   </div>
// </div>
