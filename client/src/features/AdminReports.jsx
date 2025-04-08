const AdminReports = () => {
  return (
    <div className="space-y-6">
      <h2 className="text-lg font-medium">System Reports</h2>

      <div className="grid gap-6 md:grid-cols-2">
        <div className="rounded-lg border bg-white p-6 shadow">
          <h3 className="mb-4 text-base font-medium">User Activity</h3>
          <div className="h-60 bg-gray-100 flex items-center justify-center">
            <p className="text-gray-500">User activity chart placeholder</p>
          </div>
          <div className="mt-4 text-sm text-gray-500">
            <p>Shows login activity and system usage over time.</p>
          </div>
        </div>

        <div className="rounded-lg border bg-white p-6 shadow">
          <h3 className="mb-4 text-base font-medium">Issue Resolution</h3>
          <div className="h-60 bg-gray-100 flex items-center justify-center">
            <p className="text-gray-500">Issue resolution chart placeholder</p>
          </div>
          <div className="mt-4 text-sm text-gray-500">
            <p>Tracks issue resolution times and success rates.</p>
          </div>
        </div>

        <div className="rounded-lg border bg-white p-6 shadow">
          <h3 className="mb-4 text-base font-medium">System Performance</h3>
          <div className="h-60 bg-gray-100 flex items-center justify-center">
            <p className="text-gray-500">
              System performance chart placeholder
            </p>
          </div>
          <div className="mt-4 text-sm text-gray-500">
            <p>Monitors system response times and resource usage.</p>
          </div>
        </div>

        <div className="rounded-lg border bg-white p-6 shadow">
          <h3 className="mb-4 text-base font-medium">User Distribution</h3>
          <div className="h-60 bg-gray-100 flex items-center justify-center">
            <p className="text-gray-500">User distribution chart placeholder</p>
          </div>
          <div className="mt-4 text-sm text-gray-500">
            <p>Shows the distribution of users by role and status.</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminReports;
