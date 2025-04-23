import { VideoEditor } from "@/components/video-editor"

export default function Home() {
  return (
    <main className="min-h-screen bg-gray-50 dark:bg-gray-900 p-4 md:p-8">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-2">Smart AI Video Editor</h1>
        <p className="text-gray-600 dark:text-gray-400 mb-8">
          Upload a video and let AI create the perfect edit based on your preferences
        </p>
        <VideoEditor />
      </div>
    </main>
  )
}
