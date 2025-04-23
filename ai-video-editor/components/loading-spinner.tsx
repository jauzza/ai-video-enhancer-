"use client"

import { CircularProgressbar, buildStyles } from "react-circular-progressbar"
import "react-circular-progressbar/dist/styles.css"

interface LoadingSpinnerProps {
  progress: number
}

export function LoadingSpinner({ progress }: LoadingSpinnerProps) {
  return (
    <div className="w-24 h-24">
      <CircularProgressbar
        value={progress}
        text={`${Math.round(progress)}%`}
        styles={buildStyles({
          textSize: "16px",
          pathColor: `rgba(62, 152, 199, ${progress / 100})`,
          textColor: "#3e98c7",
          trailColor: "#d6d6d6",
          backgroundColor: "#3e98c7",
        })}
      />
    </div>
  )
}
