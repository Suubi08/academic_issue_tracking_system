import React, { useEffect, useState } from 'react'
import { Card, CardContent } from './ui/Card';

const ShowSlide = ({ images }) => {
  const [currentImage, setCurrentImage] = useState(0)

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImage((prev) => (prev + 1) % images.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <Card className="relative w-full max-h-[200px] overflow-hidden rounded-lg shadow-md">
      <img
        src={images[currentImage]}
        alt="Slideshow"
        className="w-full h-full object-cover transition-opacity duration-500"
      />
    </Card>
  )
}

export default ShowSlide;