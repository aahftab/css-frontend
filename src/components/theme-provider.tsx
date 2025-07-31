import { createContext, useContext, useEffect, useState } from "react"

type Theme = "dark" | "light" | "system"

type ThemeProviderProps = {
  children: React.ReactNode
  defaultTheme?: Theme
  storageKey?: string
}

type ThemeProviderState = {
  theme: Theme
  setTheme: (theme: Theme) => void
}

const initialState: ThemeProviderState = {
  theme: "system",
  setTheme: () => null,
}

const ThemeProviderContext = createContext<ThemeProviderState>(initialState)

export function ThemeProvider({
  children,
  defaultTheme = "system",
  storageKey = "vite-ui-theme",
  ...props
}: ThemeProviderProps) {
  const [theme, setTheme] = useState<Theme>(
    () => (localStorage.getItem(storageKey) as Theme) || defaultTheme
  )

  useEffect(() => {
    const root = window.document.documentElement

    root.classList.remove("light", "dark")

    if (theme === "system") {
      const systemTheme = window.matchMedia("(prefers-color-scheme: dark)")
        .matches
        ? "dark"
        : "light"

      root.classList.add(systemTheme)
      
      // Update theme-color meta tag for status bar
      updateStatusBarColor(systemTheme)
      return
    }

    root.classList.add(theme)
    
    // Update theme-color meta tag for status bar
    updateStatusBarColor(theme)
  }, [theme])
  
  // Function to update status bar color based on theme
  const updateStatusBarColor = (currentTheme: string) => {
    const metaThemeColor = document.querySelector('meta[name="theme-color"]')
    
    if (metaThemeColor) {
      if (currentTheme === 'dark') {
        metaThemeColor.setAttribute('content', '#09090b') // Your dark background color
      } else {
        metaThemeColor.setAttribute('content', '#ffffff') // Your light background color
      }
    }
  }

  const value = {
    theme,
    setTheme: (theme: Theme) => {
      localStorage.setItem(storageKey, theme)
      setTheme(theme)
    },
  }

  return (
    <ThemeProviderContext.Provider {...props} value={value}>
      {children}
    </ThemeProviderContext.Provider>
  )
}

export const useTheme = () => {
  const context = useContext(ThemeProviderContext)

  if (context === undefined)
    throw new Error("useTheme must be used within a ThemeProvider")

  return context
}