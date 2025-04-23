"use client"

import { useState } from "react"
import { ChevronDown, ChevronRight, Copy } from "lucide-react"
import { Button } from "@/components/ui/button"

interface MetadataDisplayProps {
  data: any
}

export function MetadataDisplay({ data }: MetadataDisplayProps) {
  const [expanded, setExpanded] = useState<Record<string, boolean>>({})

  const toggleExpand = (key: string) => {
    setExpanded({
      ...expanded,
      [key]: !expanded[key],
    })
  }

  const copyToClipboard = () => {
    navigator.clipboard.writeText(JSON.stringify(data, null, 2))
  }

  const renderValue = (value: any, path: string) => {
    if (value === null) return <span className="text-gray-500">null</span>
    if (typeof value === "boolean") return <span className="text-purple-600">{value.toString()}</span>
    if (typeof value === "number") return <span className="text-blue-600">{value}</span>
    if (typeof value === "string") return <span className="text-green-600">"{value}"</span>

    if (Array.isArray(value)) {
      return (
        <div>
          <div className="flex items-center cursor-pointer" onClick={() => toggleExpand(path)}>
            {expanded[path] ? <ChevronDown size={14} /> : <ChevronRight size={14} />}
            <span className="text-gray-500">Array({value.length})</span>
          </div>

          {expanded[path] && (
            <div className="pl-4 border-l border-gray-200 dark:border-gray-700 ml-1 mt-1">
              {value.map((item, i) => (
                <div key={i} className="mt-1">
                  <span className="text-gray-500">{i}: </span>
                  {renderValue(item, `${path}.${i}`)}
                </div>
              ))}
            </div>
          )}
        </div>
      )
    }

    if (typeof value === "object") {
      return (
        <div>
          <div className="flex items-center cursor-pointer" onClick={() => toggleExpand(path)}>
            {expanded[path] ? <ChevronDown size={14} /> : <ChevronRight size={14} />}
            <span className="text-gray-500">Object</span>
          </div>

          {expanded[path] && (
            <div className="pl-4 border-l border-gray-200 dark:border-gray-700 ml-1 mt-1">
              {Object.entries(value).map(([key, val]) => (
                <div key={key} className="mt-1">
                  <span className="text-gray-800 dark:text-gray-300">{key}: </span>
                  {renderValue(val, `${path}.${key}`)}
                </div>
              ))}
            </div>
          )}
        </div>
      )
    }

    return <span>{String(value)}</span>
  }

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h3 className="text-sm font-medium">JSON Metadata</h3>
        <Button variant="outline" size="sm" onClick={copyToClipboard} className="h-8">
          <Copy size={14} className="mr-1" /> Copy
        </Button>
      </div>

      <div className="bg-gray-50 dark:bg-gray-800 p-3 rounded-md text-sm font-mono overflow-auto max-h-[400px]">
        {Object.entries(data).map(([key, value]) => (
          <div key={key} className="mb-2">
            <span className="text-gray-800 dark:text-gray-300">{key}: </span>
            {renderValue(value, key)}
          </div>
        ))}
      </div>
    </div>
  )
}
