import React, { useState, useEffect } from "react"
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


  // Auto-change images every 3 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImage((prev) => (prev + 1) % images.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);


  return (

        {/* Slideshow */}
        <div className="bg-amber-50 h-[40%] relative overflow-hidden rounded-lg">
          <img
            src={images[currentImage]}
            alt="Slideshow"
            className="w-full h-full object-cover transition-opacity duration-500"
          />
        </div>

        
     
  );
};

export default StudentDashboard;
