"use client"

import Image from "next/image"
import { Video } from "lucide-react"
import { useState } from "react"
import { cn } from "@/lib/utils"

interface ProductImageGalleryProps {
  image: string
  name: string
}

export function ProductImageGallery({ image, name }: ProductImageGalleryProps) {
  const [activeThumb, setActiveThumb] = useState(0)

  // For demo, we use the same image for all thumbnails
  const thumbnails = [
    { type: "image", src: image },
    { type: "image", src: image },
    { type: "image", src: image },
    { type: "video", label: "Video" },
  ]

  return (
    <div className="flex flex-col gap-4">
      {/* Main Image */}
      <div className="bg-card border border-border rounded-xl overflow-hidden shadow-sm relative aspect-square lg:aspect-video flex items-center justify-center">
        {thumbnails[activeThumb].type === "image" ? (
          <Image
            src={thumbnails[activeThumb].src!}
            alt={name}
            fill
            className="object-cover transition-transform duration-300"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
        ) : (
          <div className="absolute inset-0 flex flex-col items-center justify-center bg-muted text-muted-foreground">
            <Video className="h-12 w-12 text-primary mb-2" />
            <span className="text-sm font-medium">Product Video Placeholder</span>
          </div>
        )}
        
        {/* Badge */}
        <div className="absolute top-4 left-4">
          <span className="bg-primary text-primary-foreground text-xs font-medium px-3 py-1 rounded-full shadow-md">
            Bestseller
          </span>
        </div>
      </div>

      {/* Thumbnails */}
      <div className="grid grid-cols-4 gap-2">
        {thumbnails.map((thumb, index) => (
          <button
            key={index}
            onClick={() => setActiveThumb(index)}
            className={cn(
              "aspect-square rounded-lg overflow-hidden border bg-card transition-all flex items-center justify-center",
              activeThumb === index
                ? "border-2 border-primary"
                : "border-border hover:border-primary/50"
            )}
          >
            {thumb.type === "image" ? (
              <div className="relative w-full h-full">
                <Image
                  src={thumb.src!}
                  alt={`${name} thumb ${index + 1}`}
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 25vw, 100px"
                />
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center text-muted-foreground">
                <Video className="h-5 w-5 text-primary mb-1" />
                <span className="text-xs font-medium text-primary">Video</span>
              </div>
            )}
          </button>
        ))}
      </div>
    </div>
  )
}
