"use client"

import type React from "react"

import { createContext, useContext, useEffect, useState } from "react"

interface Settings {
  textSize: number
  darkMode: boolean
  animations: boolean
  colorScheme: "blue" | "green" | "purple" | "default"
}

interface SettingsContextType {
  settings: Settings
  updateSetting: <K extends keyof Settings>(key: K, value: Settings[K]) => void
}

const defaultSettings: Settings = {
  textSize: 16,
  darkMode: false,
  animations: true,
  colorScheme: "default",
}

const SettingsContext = createContext<SettingsContextType | undefined>(undefined)

export function SettingsProvider({ children }: { children: React.ReactNode }) {
  const [settings, setSettings] = useState<Settings>(defaultSettings)
  const [isLoaded, setIsLoaded] = useState(false)

  // Load settings from localStorage on mount
  useEffect(() => {
    const savedSettings = localStorage.getItem("appSettings")
    if (savedSettings) {
      try {
        const parsed = JSON.parse(savedSettings)
        setSettings({ ...defaultSettings, ...parsed })
      } catch (error) {
        console.error("Error parsing saved settings:", error)
      }
    }
    setIsLoaded(true)
  }, [])

  // Apply settings to document whenever they change
  useEffect(() => {
    if (!isLoaded) return

    // Apply text size
    document.documentElement.style.fontSize = `${settings.textSize}px`

    // Remove all color scheme classes
    document.documentElement.classList.remove("theme-blue", "theme-green", "theme-purple")

    // Apply color scheme
    if (settings.colorScheme !== "default") {
      document.documentElement.classList.add(`theme-${settings.colorScheme}`)
    }

    // Apply dark mode
    if (settings.darkMode) {
      document.documentElement.classList.add("dark")
      document.body.style.backgroundColor = settings.colorScheme === "default" ? "#111827" : ""
      document.body.style.color = "#f9fafb"
    } else {
      document.documentElement.classList.remove("dark")
      document.body.style.backgroundColor = settings.colorScheme === "default" ? "#ffffff" : ""
      document.body.style.color = "#111827"
    }

    // Save to localStorage
    localStorage.setItem("appSettings", JSON.stringify(settings))
  }, [settings, isLoaded])

  const updateSetting = <K extends keyof Settings>(key: K, value: Settings[K]) => {
    setSettings((prev) => ({ ...prev, [key]: value }))
  }

  return <SettingsContext.Provider value={{ settings, updateSetting }}>{children}</SettingsContext.Provider>
}

export function useSettings() {
  const context = useContext(SettingsContext)
  if (context === undefined) {
    throw new Error("useSettings must be used within a SettingsProvider")
  }
  return context
}
