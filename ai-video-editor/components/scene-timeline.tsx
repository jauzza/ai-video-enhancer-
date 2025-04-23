"use client"

import { useState } from "react"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

interface Scene {
  startTime: number
  endTime: number
  caption: string
  score: number
  tags: string[]
}

interface SceneTimelineProps {
  scenes: Scene[]
  duration: number
}

export function SceneTimeline({ scenes, duration }: SceneTimelineProps) {
  const [selectedScene, setSelectedScene] = useState<Scene | null>(null)

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60)
    const secs = Math.floor(seconds % 60)
    return `${mins}:${secs < 10 ? "0" : ""}${secs}`
  }

  const getScoreColor = (score: number) => {
    if (score >= 90) return "bg-green-500"
    if (score >= 75) return "bg-blue-500"
    if (score >= 60) return "bg-yellow-500"
    return "bg-red-500"
  }

  return (
    <div className="space-y-4">
      <div className="relative h-12 bg-gray-100 dark:bg-gray-800 rounded-md overflow-hidden">
        {scenes.map((scene, index) => {
          const width = ((scene.endTime - scene.startTime) / duration) * 100
          const left = (scene.startTime / duration) * 100

          return (
            <div
              key={index}
              className={`absolute top-0 h-full cursor-pointer hover:opacity-80 transition-opacity ${
                selectedScene === scene
                  ? "ring-2 ring-blue-500 ring-offset-2 ring-offset-white dark:ring-offset-gray-900"
                  : ""
              }`}
              style={{
                left: `${left}%`,
                width: `${width}%`,
                backgroundColor: `hsl(${index * 30}, 70%, 60%)`,
              }}
              onClick={() => setSelectedScene(scene)}
              title={scene.caption}
            />
          )
        })}
      </div>

      <div className="flex justify-between text-xs text-gray-500">
        <span>0:00</span>
        <span>{formatTime(duration / 2)}</span>
        <span>{formatTime(duration)}</span>
      </div>

      {selectedScene && (
        <Card className="p-4 mt-4">
          <div className="flex justify-between items-start mb-2">
            <div>
              <h4 className="font-medium">{selectedScene.caption}</h4>
              <p className="text-sm text-gray-500">
                {formatTime(selectedScene.startTime)} - {formatTime(selectedScene.endTime)}
              </p>
            </div>
            <div
              className={`px-2 py-1 rounded-full text-white text-xs font-medium ${getScoreColor(selectedScene.score)}`}
            >
              {selectedScene.score}
            </div>
          </div>
          <div className="flex flex-wrap gap-1 mt-2">
            {selectedScene.tags.map((tag) => (
              <Badge key={tag} variant="outline" className="text-xs">
                {tag}
              </Badge>
            ))}
          </div>
        </Card>
      )}

      {!selectedScene && (
        <p className="text-sm text-gray-500 italic">Click on a scene in the timeline to view details</p>
      )}
    </div>
  )
}
