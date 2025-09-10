"use client"

import { useState, useRef } from "react"
import { Button } from "@/components/ui/button"
import { AlertTriangle } from "lucide-react"
import { cn } from "@/lib/utils"

export function SOSButton() {
  const [tapCount, setTapCount] = useState(0)
  const [isActivated, setIsActivated] = useState(false)
  const [isShaking, setIsShaking] = useState(false)
  const timeoutRef = useRef<NodeJS.Timeout>()

  const handleSOSTap = () => {
    const newTapCount = tapCount + 1
    setTapCount(newTapCount)
    setIsShaking(true)

    // Clear existing timeout
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current)
    }

    // Reset shake animation
    setTimeout(() => setIsShaking(false), 200)

    if (newTapCount >= 3) {
      // Activate SOS
      setIsActivated(true)
      setTapCount(0)

      // Simulate emergency call or alert
      alert(
        "🚨 EMERGENCY ALERT ACTIVATED!\n\nContacting emergency services...\n\nLocation: Current GPS coordinates\nTime: " +
          new Date().toLocaleString(),
      )

      // Reset after 5 seconds
      setTimeout(() => {
        setIsActivated(false)
      }, 5000)
    } else {
      // Reset tap count after 2 seconds if not completed
      timeoutRef.current = setTimeout(() => {
        setTapCount(0)
      }, 2000)
    }
  }

  return (
    <div className="fixed bottom-20 right-4 z-50">
      <Button
        onClick={handleSOSTap}
        className={cn(
          "h-14 w-14 rounded-full shadow-lg transition-all duration-200",
          isActivated
            ? "bg-red-600 hover:bg-red-700 animate-pulse"
            : tapCount > 0
              ? "bg-orange-500 hover:bg-orange-600"
              : "bg-red-500 hover:bg-red-600",
          isShaking && "animate-bounce",
        )}
        size="icon"
      >
        <AlertTriangle className="h-6 w-6 text-white" />
      </Button>

      {tapCount > 0 && !isActivated && (
        <div className="absolute -top-8 left-1/2 transform -translate-x-1/2">
          <div className="bg-black/80 text-white text-xs px-2 py-1 rounded whitespace-nowrap">{tapCount}/3 taps</div>
        </div>
      )}

      {isActivated && (
        <div className="absolute -top-8 left-1/2 transform -translate-x-1/2">
          <div className="bg-red-600 text-white text-xs px-2 py-1 rounded whitespace-nowrap animate-pulse">
            SOS ACTIVE
          </div>
        </div>
      )}
    </div>
  )
}
