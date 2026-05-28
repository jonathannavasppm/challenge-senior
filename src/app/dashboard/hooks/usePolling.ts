"use client"

import { useState, useEffect } from "react"
import type { Activity } from "@/app/dashboard/types"
import { RECENT_ACTIVITIES } from "@/data/mock-data"

const POLLING_INTERVAL = 5000

export function usePolling() {
  const [activities, setActivities] = useState<Activity[]>(RECENT_ACTIVITIES)
  const [lastUpdated, setLastUpdated] = useState<number>(Date.now())
  const [isPolling, setIsPolling] = useState(true)

  useEffect(() => {
    const interval = setInterval(() => {
      const fetchActivities = async () => {
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

      fetchActivities()
    }, POLLING_INTERVAL)

    return () => clearInterval(interval)
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
