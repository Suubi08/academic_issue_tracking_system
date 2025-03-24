import React, { useEffect, useState } from 'react'
import { Card } from './ui/Card';

const ShowSlide = ({images}) => {
    const [currentImage,setCurrentImage]=useState(0)

     useEffect(() => {
        const interval = setInterval(() => {
          setCurrentImage((prev) => (prev + 1) % images.length);
        }, 3000);
        return () => clearInterval(interval);
      }, []);

  return (
  <Card>
    <div className="bg-amber-50 h-[20%] relative overflow-hidden rounded-lg">
 <img
            src={images[currentImage]}
            alt="Slideshow"
            className="w-full h-full object-cover transition-opacity duration-500"
          />    </div>
          </Card>
  )
}

export default ShowSlide;