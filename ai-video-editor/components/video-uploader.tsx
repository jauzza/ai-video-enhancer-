"use client"

import type React from "react"

import { useState, useRef } from "react"
import { Upload, FileVideo } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"

interface VideoUploaderProps {
  onFileUpload: (file: File) => void
}

export function VideoUploader({ onFileUpload }: VideoUploaderProps) {
  const [isDragging, setIsDragging] = useState(false)
  const fileInputRef = useRef<HTMLInputElement>(null)

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault()
    setIsDragging(true)
  }

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault()
    setIsDragging(false)
  }

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault()
    setIsDragging(false)

    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      const file = e.dataTransfer.files[0]
      if (file.type.startsWith("video/")) {
        onFileUpload(file)
      } else {
        alert("Please upload a video file.")
      }
    }
  }

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      onFileUpload(e.target.files[0])
    }
  }

  const handleButtonClick = () => {
    fileInputRef.current?.click()
  }

  return (
    <Card
      className={`border-2 border-dashed p-12 text-center ${
        isDragging ? "border-blue-500 bg-blue-50 dark:bg-blue-900/10" : "border-gray-300 dark:border-gray-700"
      }`}
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
    >
      <div className="flex flex-col items-center justify-center">
        <div className="w-20 h-20 mb-4 rounded-full bg-gray-100 dark:bg-gray-800 flex items-center justify-center">
          <FileVideo size={32} className="text-gray-500 dark:text-gray-400" />
        </div>
        <h3 className="text-xl font-medium mb-2">Upload your video</h3>
        <p className="text-gray-500 dark:text-gray-400 mb-6 max-w-md">
          Drag and drop your video file here, or click the button below to browse your files
        </p>
        <Button onClick={handleButtonClick}>
          <Upload size={16} className="mr-2" /> Select Video
        </Button>
        <input type="file" ref={fileInputRef} onChange={handleFileChange} accept="video/*" className="hidden" />
        <p className="text-xs text-gray-500 dark:text-gray-400 mt-4">
          Supported formats: MP4, MOV, AVI, WebM (Max size: 500MB)
        </p>
      </div>
    </Card>
  )
}
