import { useState } from "react";
import { Copy, Check, User } from "lucide-react";

const Avatar = ({ src, alt }) => {
  return (
    <div className="size-20 rounded-full bg-purple-200 flex items-center justify-center overflow-hidden">
      {src ? (
        <img src={src} alt={alt} className="size-full object-cover" />
      ) : (
        <User className="size-10 text-purple-600" />
      )}
    </div>
  );
};

const UserInfoCard = ({ user }) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(user.regNo);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000); // Reset after 2 seconds
  };

  return (
    <div className="flex flex-col items-center bg-white dark:bg-gray-900 rounded-lg shadow-lg p-6">
      {/* Avatar */}
      <Avatar src={user.profilePic} alt={user.username} />

      {/* Username */}
      <h2 className="mt-4 text-lg font-bold text-gray-900 dark:text-white">
        WELCOME, {user.username.toUpperCase()}
      </h2>

      {/* Registration Number with Copy Button */}
      <div className="flex items-center space-x-2 mt-1 text-gray-500 dark:text-gray-400 cursor-pointer">
        <p className="text-sm">{user.regNo}</p>
        <button onClick={handleCopy} className="hover:text-gray-700">
          {copied ? <Check className="size-4 text-green-500" /> : <Copy className="size-4" />}
        </button>
      </div>

      {/* Info Card */}
      <div className="mt-4 bg-gray-100 dark:bg-gray-800 p-4 rounded-lg w-full">
        <p className="text-xs font-semibold text-gray-500">SEMESTER</p>
        <p className="text-lg font-medium">{user.semester}</p>

        <p className="text-xs font-semibold text-gray-500 mt-2">Course</p>
        <p className="text-lg font-medium">{user.course}</p>

        <p className="text-xs font-semibold text-gray-500 mt-2">Year</p>
        <p className="text-lg font-medium">{user.year}</p>
      </div>
    </div>
  );
};

export default UserInfoCard;
