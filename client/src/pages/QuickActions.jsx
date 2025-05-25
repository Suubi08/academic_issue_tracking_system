import { CardContent, Card, CardHeader, CardTitle } from "../components";
import { Send, UserPlus } from "lucide-react"

const QuickActions = () => {
  const actions = [
    {
      title: "Assign Issue",
      icon: UserPlus,
      color: "text-purple-500",
    },
    {
      title: "Send Notifications",
      icon: Send,
      color: "text-green-500",
    },
  ]
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg">QUICK ACTIONS</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          {actions.map((action) => (
            <button key={action.title} className="w-full justify-self-start h-12" variant="outline">
              <action.icon className={`h-5 w-5 ${action.color}`} />
              <span>{action.title}</span>
            </button>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}

export default QuickActions

