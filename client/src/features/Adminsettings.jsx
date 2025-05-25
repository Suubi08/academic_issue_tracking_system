import { useState } from "react";

const Adminsettings = () => {
  const [formData, setFormData] = useState({
    siteName: "AITS - Academic Issue Tracking System",
    supportEmail: "support@aits.edu",
    maxFileSize: 10,
    maintenanceMode: false,
    allowRegistration: true,
    requireEmailVerification: true,
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // In a real app, you would save the settings here
    alert("System settings saved successfully!");
  };

  return (
    <div className="space-y-6">
      <h2 className="text-lg font-medium">System Settings</h2>

      <div className="rounded-lg border bg-white p-6 shadow">
        <form onSubmit={handleSubmit}>
          <div className="grid gap-6 md:grid-cols-2">
            <div>
              <label
                htmlFor="siteName"
                className="block text-sm font-medium text-gray-700"
              >
                Site Name
              </label>
              <input
                type="text"
                id="siteName"
                name="siteName"
                value={formData.siteName}
                onChange={handleChange}
                className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-purple-500 focus:outline-none focus:ring-purple-500 sm:text-sm"
              />
            </div>

            <div>
              <label
                htmlFor="supportEmail"
                className="block text-sm font-medium text-gray-700"
              >
                Support Email
              </label>
              <input
                type="email"
                id="supportEmail"
                name="supportEmail"
                value={formData.supportEmail}
                onChange={handleChange}
                className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-purple-500 focus:outline-none focus:ring-purple-500 sm:text-sm"
              />
            </div>

            <div>
              <label
                htmlFor="maxFileSize"
                className="block text-sm font-medium text-gray-700"
              >
                Maximum File Upload Size (MB)
              </label>
              <input
                type="number"
                id="maxFileSize"
                name="maxFileSize"
                value={formData.maxFileSize}
                onChange={handleChange}
                min="1"
                max="50"
                className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-purple-500 focus:outline-none focus:ring-purple-500 sm:text-sm"
              />
            </div>
          </div>

          <div className="mt-6">
            <h3 className="text-sm font-medium text-gray-700">
              System Options
            </h3>
            <div className="mt-2 space-y-4">
              <div className="flex items-start">
                <div className="flex h-5 items-center">
                  <input
                    id="maintenanceMode"
                    name="maintenanceMode"
                    type="checkbox"
                    checked={formData.maintenanceMode}
                    onChange={handleChange}
                    className="h-4 w-4 rounded border-gray-300 text-purple-600 focus:ring-purple-500"
                  />
                </div>
                <div className="ml-3 text-sm">
                  <label
                    htmlFor="maintenanceMode"
                    className="font-medium text-gray-700"
                  >
                    Maintenance Mode
                  </label>
                  <p className="text-gray-500">
                    Put the system in maintenance mode (only admins can access)
                  </p>
                </div>
              </div>

              <div className="flex items-start">
                <div className="flex h-5 items-center">
                  <input
                    id="allowRegistration"
                    name="allowRegistration"
                    type="checkbox"
                    checked={formData.allowRegistration}
                    onChange={handleChange}
                    className="h-4 w-4 rounded border-gray-300 text-purple-600 focus:ring-purple-500"
                  />
                </div>
                <div className="ml-3 text-sm">
                  <label
                    htmlFor="allowRegistration"
                    className="font-medium text-gray-700"
                  >
                    Allow Registration
                  </label>
                  <p className="text-gray-500">
                    Allow new users to register accounts
                  </p>
                </div>
              </div>

              <div className="flex items-start">
                <div className="flex h-5 items-center">
                  <input
                    id="requireEmailVerification"
                    name="requireEmailVerification"
                    type="checkbox"
                    checked={formData.requireEmailVerification}
                    onChange={handleChange}
                    className="h-4 w-4 rounded border-gray-300 text-purple-600 focus:ring-purple-500"
                  />
                </div>
                <div className="ml-3 text-sm">
                  <label
                    htmlFor="requireEmailVerification"
                    className="font-medium text-gray-700"
                  >
                    Require Email Verification
                  </label>
                  <p className="text-gray-500">
                    Require users to verify their email address before accessing
                    the system
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-8 flex justify-end">
            <button
              type="button"
              className="rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2"
            >
              Reset to Defaults
            </button>
            <button
              type="submit"
              className="ml-3 rounded-md bg-purple-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2"
            >
              Save Settings
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Adminsettings;
