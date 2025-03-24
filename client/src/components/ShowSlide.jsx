import React, { useEffect, useState } from 'react'
import { Card, CardContent } from './ui/Card';

const ShowSlide = ({images}) => {
    const [currentImage,setCurrentImage]=useState(0)

     useEffect(() => {
        const interval = setInterval(() => {
          setCurrentImage((prev) => (prev + 1) % images.length);
        }, 3000);
        return () => clearInterval(interval);
      }, []);

  return (
  <Card className="bg-amber-50 h-[20%] relative overflow-hidden rounded-lg">
    <CardContent  className=" h-full object-cover transition-opacity duration-500">
    <img
            src={images[currentImage]}
            alt="Slideshow"
            className='w-full'
          />  
    </CardContent>
   
          </Card>
  )
}

export default ShowSlide;