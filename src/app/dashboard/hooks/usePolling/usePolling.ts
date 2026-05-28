"use client"

import { useState, useEffect, useRef } from "react"
import type { Activity } from "@/app/dashboard/types"
import { RECENT_ACTIVITIES } from "@/data/mock-data"
import { POLLING_INTERVAL } from "./const"

export function usePolling() {
  const [activities, setActivities] = useState<Activity[]>(RECENT_ACTIVITIES)
  const [lastUpdated, setLastUpdated] = useState<number>(0)
  const [isPolling, setIsPolling] = useState(true)
  const isPollingRef = useRef(isPolling)

  useEffect(() => {
    isPollingRef.current = isPolling
  }, [isPolling])

  useEffect(() => {
    setLastUpdated(Date.now())

    const tick = () => {
      if (!isPollingRef.current || document.visibilityState === "hidden") {
        return
      }
      const newActivity: Activity = {
        id: `act-${Date.now()}`,
        type: ["order", "signup", "refund", "review"][
          Math.floor(Math.random() * 4)
        ] as Activity["type"],
        message: `New activity at ${new Date().toLocaleTimeString()}`,
        timestamp: new Date().toISOString(),
      }
      setActivities((prev) => [newActivity, ...prev.slice(0, 19)])
      setLastUpdated(Date.now())
    }

    const interval = setInterval(tick, POLLING_INTERVAL)
    document.addEventListener("visibilitychange", tick)

    return () => {
      clearInterval(interval)
      document.removeEventListener("visibilitychange", tick)
    }
  }, [])

  const stopPolling = () => setIsPolling(false)
  const startPolling = () => setIsPolling(true)

  return {
    activities,
    lastUpdated,
    isPolling,
    stopPolling,
    startPolling,
  }
}
