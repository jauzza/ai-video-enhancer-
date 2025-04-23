"use client"

import { useState } from "react"
import { Play, Download, Clock, Tag, Percent, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Slider } from "@/components/ui/slider"
import { Badge } from "@/components/ui/badge"
import { Card } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { VideoUploader } from "@/components/video-uploader"
import { VideoPlayer } from "@/components/video-player"
import { SceneTimeline } from "@/components/scene-timeline"
import { MetadataDisplay } from "@/components/metadata-display"
import { LoadingSpinner } from "@/components/loading-spinner"

type EditorState = "upload" | "preferences" | "processing" | "results"

export function VideoEditor() {
  const [state, setState] = useState<EditorState>("upload")
  const [videoFile, setVideoFile] = useState<File | null>(null)
  const [videoUrl, setVideoUrl] = useState<string | null>(null)
  const [minDuration, setMinDuration] = useState(1)
  const [maxDuration, setMaxDuration] = useState(10)
  const [scoreThreshold, setScoreThreshold] = useState(70)
  const [keywords, setKeywords] = useState<string[]>([])
  const [keywordInput, setKeywordInput] = useState("")
  const [resultData, setResultData] = useState<any>(null)
  const [processingProgress, setProcessingProgress] = useState(0)

  const handleFileUpload = (file: File) => {
    setVideoFile(file)
    setVideoUrl(URL.createObjectURL(file))
    setState("preferences")
  }

  const addKeyword = () => {
    if (keywordInput.trim() && !keywords.includes(keywordInput.trim())) {
      setKeywords([...keywords, keywordInput.trim()])
      setKeywordInput("")
    }
  }

  const removeKeyword = (keyword: string) => {
    setKeywords(keywords.filter((k) => k !== keyword))
  }

  const handleGenerateEdit = () => {
    setState("processing")

    // Simulate processing with progress
    let progress = 0
    const interval = setInterval(() => {
      progress += 5
      setProcessingProgress(progress)

      if (progress >= 100) {
        clearInterval(interval)
        // Mock result data
        setResultData({
          duration: 45.2,
          scenes: [
            {
              startTime: 0,
              endTime: 8.5,
              caption: "Person walking through a modern hallway",
              score: 85,
              tags: ["hallway", "modern", "walking"],
            },
            {
              startTime: 8.5,
              endTime: 15.2,
              caption: "Close-up of company branding on wall",
              score: 92,
              tags: ["branding", "logo", "close-up"],
            },
            {
              startTime: 15.2,
              endTime: 25.8,
              caption: "Team collaborating in open workspace",
              score: 88,
              tags: ["workspace", "team", "collaboration"],
            },
            {
              startTime: 25.8,
              endTime: 35.1,
              caption: "Product demonstration on large screen",
              score: 79,
              tags: ["product", "demonstration", "screen"],
            },
            {
              startTime: 35.1,
              endTime: 45.2,
              caption: "Customer testimonial interview",
              score: 81,
              tags: ["testimonial", "interview", "customer"],
            },
          ],
        })
        setState("results")
      }
    }, 200)
  }

  const resetEditor = () => {
    setVideoFile(null)
    setVideoUrl(null)
    setResultData(null)
    setProcessingProgress(0)
    setState("upload")
  }

  return (
    <div className="space-y-6">
      {state === "upload" && <VideoUploader onFileUpload={handleFileUpload} />}

      {state === "preferences" && (
        <Card className="p-6">
          <div className="flex flex-col md:flex-row gap-6">
            <div className="md:w-1/3">
              {videoUrl && (
                <div className="aspect-video bg-black rounded-lg overflow-hidden mb-4">
                  <video src={videoUrl} className="w-full h-full object-contain" controls />
                </div>
              )}
              <div className="text-sm text-gray-500 dark:text-gray-400">
                <p className="font-medium">{videoFile?.name}</p>
                <p>{(videoFile?.size / (1024 * 1024)).toFixed(2)} MB</p>
              </div>
            </div>

            <div className="md:w-2/3 space-y-6">
              <h2 className="text-xl font-semibold">Edit Preferences</h2>

              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium mb-2 flex items-center gap-2">
                    <Clock size={16} /> Scene Duration Range (seconds)
                  </label>
                  <div className="flex items-center gap-4">
                    <Input
                      type="number"
                      min={0.5}
                      max={maxDuration}
                      step={0.5}
                      value={minDuration}
                      onChange={(e) => setMinDuration(Number(e.target.value))}
                      className="w-24"
                    />
                    <span>to</span>
                    <Input
                      type="number"
                      min={minDuration}
                      max={60}
                      step={0.5}
                      value={maxDuration}
                      onChange={(e) => setMaxDuration(Number(e.target.value))}
                      className="w-24"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2 flex items-center gap-2">
                    <Percent size={16} /> Score Threshold: {scoreThreshold}
                  </label>
                  <Slider
                    value={[scoreThreshold]}
                    min={0}
                    max={100}
                    step={1}
                    onValueChange={(value) => setScoreThreshold(value[0])}
                    className="w-full"
                  />
                  <div className="flex justify-between text-xs text-gray-500 mt-1">
                    <span>0</span>
                    <span>50</span>
                    <span>100</span>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2 flex items-center gap-2">
                    <Tag size={16} /> Keywords to Prioritize
                  </label>
                  <div className="flex gap-2 mb-2">
                    <Input
                      value={keywordInput}
                      onChange={(e) => setKeywordInput(e.target.value)}
                      placeholder="Add keyword (e.g., hallway, branding)"
                      onKeyDown={(e) => e.key === "Enter" && addKeyword()}
                    />
                    <Button onClick={addKeyword} variant="outline">
                      Add
                    </Button>
                  </div>
                  <div className="flex flex-wrap gap-2 mt-2">
                    {keywords.map((keyword) => (
                      <Badge key={keyword} variant="secondary" className="flex items-center gap-1">
                        {keyword}
                        <button onClick={() => removeKeyword(keyword)} className="ml-1">
                          <X size={12} />
                        </button>
                      </Badge>
                    ))}
                    {keywords.length === 0 && <span className="text-sm text-gray-500">No keywords added</span>}
                  </div>
                </div>
              </div>

              <div className="flex justify-end gap-4 pt-4">
                <Button variant="outline" onClick={resetEditor}>
                  Cancel
                </Button>
                <Button onClick={handleGenerateEdit}>
                  <Play size={16} className="mr-2" /> Generate Edit
                </Button>
              </div>
            </div>
          </div>
        </Card>
      )}

      {state === "processing" && (
        <Card className="p-6">
          <div className="flex flex-col items-center justify-center py-12">
            <LoadingSpinner progress={processingProgress} />
            <h3 className="text-xl font-medium mt-6">Processing Your Video</h3>
            <p className="text-gray-500 dark:text-gray-400 mt-2 text-center max-w-md">
              Our AI is analyzing your video and creating an optimized edit based on your preferences. This may take a
              few minutes.
            </p>
          </div>
        </Card>
      )}

      {state === "results" && resultData && (
        <div className="space-y-6">
          <Card className="p-6">
            <div className="flex flex-col md:flex-row gap-6">
              <div className="md:w-2/3">
                <VideoPlayer videoUrl={videoUrl} />
                <div className="flex justify-between mt-4">
                  <Button variant="outline" onClick={resetEditor}>
                    New Edit
                  </Button>
                  <Button>
                    <Download size={16} className="mr-2" /> Download Edit
                  </Button>
                </div>
              </div>

              <div className="md:w-1/3">
                <Tabs defaultValue="timeline">
                  <TabsList className="w-full">
                    <TabsTrigger value="timeline" className="flex-1">
                      Timeline
                    </TabsTrigger>
                    <TabsTrigger value="metadata" className="flex-1">
                      Metadata
                    </TabsTrigger>
                  </TabsList>
                  <TabsContent value="timeline" className="mt-4">
                    <SceneTimeline scenes={resultData.scenes} duration={resultData.duration} />
                  </TabsContent>
                  <TabsContent value="metadata" className="mt-4">
                    <MetadataDisplay data={resultData} />
                  </TabsContent>
                </Tabs>
              </div>
            </div>
          </Card>
        </div>
      )}
    </div>
  )
}
