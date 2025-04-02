const Notifications = () => {
  const notifications = [
    {
      id: 1,
      title: "New Issue assigned to Dr.kalema",
      description: "Assignment submission error",
      time: "10 minutes ago",
      read: false,
      type: "assignment",
    },
    {
      id: 2,
      title: "New Issue assigned to Dr.kalema",
      description: "Assignment submission error",
      time: "10 minutes ago",
      read: false,
      type: "assignment",
    },
    {
      id: 3,
      title: "New Issue assigned to Dr.kalema",
      description: "Assignment submission error",
      time: "10 minutes ago",
      read: false,
      type: "assignment",
    },
    {
      id: 4,
      title: "Issue resolved",
      description: "Missing course materials",
      time: "1 day ago",
      read: true,
      type: "resolution",
    },
    {
      id: 5,
      title: "New Issue assigned to Dr.kalema",
      description: "System will be down for maintainance",
      time: "2 days ago",
      read: true,
      type: "system",
    },
  ]
  return <div className="bg-green-500 text-center text-3xl font-bold">Notifications</div>
}

export default Notifications

