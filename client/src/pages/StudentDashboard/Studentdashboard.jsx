import React, { useState, useEffect } from "react";
import dayjs from "dayjs";
import  image1 from "../../assets/1.jpg"
import  image2 from "../../assets/2.jpg"
import  image3 from "../../assets/3.jpg"

const images = [
   image1 ,
  image2,
  image3,
];

const issues = [
    {
        resoled: true,
        date: "2025-03-20T07:12:11.768Z"
    },
    {
        resoled: true,
        date: "2025-03-13T07:12:11.768Z"
    },
    {
        resoled: false,
        date: "2025-03-16T07:12:11.768Z"
    },
    {
        resoled: false,
        date: "2025-03-03T07:12:11.768Z"
    },
    {
        resoled: true,
        date: "2025-03-01T07:12:11.768Z"
    },
]

const StudentDashboard = () => {
  const [currentImage, setCurrentImage] = useState(0);
  const [currentDate, setCurrentDate] = useState(dayjs());

  // Auto-change images every 3 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImage((prev) => (prev + 1) % images.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  // Calendar logic
  const prevMonth = () => setCurrentDate(currentDate.subtract(1, "month"));
  const nextMonth = () => setCurrentDate(currentDate.add(1, "month"));
  const startOfMonth = currentDate.startOf("month");
  const endOfMonth = currentDate.endOf("month");
  const daysInMonth = endOfMonth.date();
  const firstDayIndex = startOfMonth.day();
  const days = Array.from({ length: firstDayIndex + daysInMonth }, (_, i) => {
    return i < firstDayIndex ? null : i - firstDayIndex + 1;
  });

  return (
    <div className="flex flex-row h-screen">
      {/* Left Side */}
      <div className="bg-amber-400 w-[70%] flex flex-col p-4">
        {/* Slideshow */}
        <div className="bg-amber-50 h-[40%] relative overflow-hidden rounded-lg">
          <img
            src={images[currentImage]}
            alt="Slideshow"
            className="w-full h-full object-cover transition-opacity duration-500"
          />
        </div>

        <div className="flex-grow flex justify-center items-center text-2xl font-bold text-white">
          Welcome, Student!
        </div>
      </div>

      {/* Right Side (Calendar) */}
      <div className="bg-amber-950 w-[30%] p-4 text-white">
        <div className="w-full bg-white text-gray-900 border border-gray-300 shadow-lg rounded-lg p-4">
          <div className="flex items-center justify-between mb-4">
            <button className="p-2 rounded-full hover:bg-gray-200" onClick={prevMonth}>
              <svg aria-label="Previous" className="w-5 h-5 text-gray-700" viewBox="0 0 24 24">
                <path fill="currentColor" d="M15.75 19.5 8.25 12l7.5-7.5"></path>
              </svg>
            </button>
            <h2 className="text-lg font-semibold">{currentDate.format("MMMM YYYY")}</h2>
            <button className="p-2 rounded-full hover:bg-gray-200" onClick={nextMonth}>
              <svg aria-label="Next" className="w-5 h-5 text-gray-700" viewBox="0 0 24 24">
                <path fill="currentColor" d="m8.25 4.5 7.5 7.5-7.5 7.5"></path>
              </svg>
            </button>
          </div>

          <div className="grid grid-cols-7 gap-1 text-center text-gray-700">
            {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((day) => (
              <div key={day} className="font-semibold">
                {day}
              </div>
            ))}
            {days.map((day, index) => (
              <div key={index} className={`p-2 relative ${day ? "text-gray-900" : "text-gray-300"}`}>
                {day || ""}
                <span className="size-1.5 bg-amber-600 rounded-3xl right-1 bottom-0 left-[50%] absolute"></span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default StudentDashboard;
