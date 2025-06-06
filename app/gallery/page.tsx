"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Play, Pause, ChevronLeft, ChevronRight, Home } from "lucide-react"
import Image from "next/image"
import Link from "next/link"

const images = [
  {
    id: 1,
    src: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=600&h=400&fit=crop",
    title: "Planinski vrh",
    description: "Prekrasni pejzaž s planinama u magli",
  },
  {
    id: 2,
    src: "https://images.unsplash.com/photo-1439066615861-d1af74d74000?w=600&h=400&fit=crop",
    title: "Mirno jezero",
    description: "Kristalno čisto jezero u šumi",
  },
  {
    id: 3,
    src: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=600&h=400&fit=crop",
    title: "Tropska plaža",
    description: "Zalazak sunca na tropskoj obali",
  },
  {
    id: 4,
    src: "https://images.unsplash.com/photo-1500382017468-9049fed747ef?w=600&h=400&fit=crop",
    title: "Cvijetno polje",
    description: "Šareno cvijetno polje u proljeće",
  },
  {
    id: 5,
    src: "https://images.unsplash.com/photo-1551632811-561732d1e306?w=600&h=400&fit=crop",
    title: "Snježne planine",
    description: "Majestične snježne planine zimi",
  },
  {
    id: 6,
    src: "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=600&h=400&fit=crop",
    title: "Šumska staza",
    description: "Mistična šumska staza u jesenjim bojama",
  },
]

export default function GalleryPage() {
  const [currentImageIndex, setCurrentImageIndex] = useState(0)
  const [isPlaying, setIsPlaying] = useState(false)

  useEffect(() => {
    let interval: NodeJS.Timeout

    if (isPlaying) {
      interval = setInterval(() => {
        setCurrentImageIndex((prevIndex) => (prevIndex === images.length - 1 ? 0 : prevIndex + 1))
      }, 3000) // Mijenja sliku svakih 3 sekunde
    }

    return () => {
      if (interval) {
        clearInterval(interval)
      }
    }
  }, [isPlaying])

  const goToPrevious = () => {
    setCurrentImageIndex(currentImageIndex === 0 ? images.length - 1 : currentImageIndex - 1)
  }

  const goToNext = () => {
    setCurrentImageIndex(currentImageIndex === images.length - 1 ? 0 : currentImageIndex + 1)
  }

  const toggleSlideshow = () => {
    setIsPlaying(!isPlaying)
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex items-center gap-4 mb-6">
        <Link href="/">
          <Button variant="outline" size="sm">
            <Home className="w-4 h-4 mr-2" />
            Početna
          </Button>
        </Link>
        <h1 className="text-3xl font-bold">Galerija slika</h1>
      </div>

      {/* Glavni slideshow */}
      <Card className="mb-8">
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            <span>Slideshow</span>
            <div className="flex gap-2">
              <Button variant="outline" size="sm" onClick={goToPrevious}>
                <ChevronLeft className="w-4 h-4" />
              </Button>
              <Button variant="outline" size="sm" onClick={toggleSlideshow}>
                {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
                {isPlaying ? "Zaustavi" : "Pokreni"}
              </Button>
              <Button variant="outline" size="sm" onClick={goToNext}>
                <ChevronRight className="w-4 h-4" />
              </Button>
            </div>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="relative">
            <Image
              src={images[currentImageIndex].src || "/placeholder.svg"}
              alt={images[currentImageIndex].title}
              width={600}
              height={400}
              className="w-full h-96 object-cover rounded-lg"
              crossOrigin="anonymous"
            />
            <div className="absolute bottom-4 left-4 bg-black bg-opacity-70 text-white p-3 rounded-lg">
              <h3 className="font-semibold">{images[currentImageIndex].title}</h3>
              <p className="text-sm">{images[currentImageIndex].description}</p>
            </div>
            <div className="absolute bottom-4 right-4 bg-black bg-opacity-70 text-white px-3 py-1 rounded-lg text-sm">
              {currentImageIndex + 1} / {images.length}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Galerija thumbnails */}
      <Card>
        <CardHeader>
          <CardTitle>Sve slike</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {images.map((image, index) => (
              <div
                key={image.id}
                className={`cursor-pointer transition-all duration-200 ${
                  index === currentImageIndex ? "ring-2 ring-blue-500 scale-105" : "hover:scale-105"
                }`}
                onClick={() => setCurrentImageIndex(index)}
              >
                <Image
                  src={image.src || "/placeholder.svg"}
                  alt={image.title}
                  width={150}
                  height={100}
                  className="w-full h-24 object-cover rounded-lg"
                  crossOrigin="anonymous"
                />
                <p className="text-sm text-center mt-1 truncate">{image.title}</p>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
