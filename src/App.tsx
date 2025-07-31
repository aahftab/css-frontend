import { ThemeProvider } from "@/components/theme-provider"
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom"
import { Navbar } from "./components/layout/Navbar"
import { Layout } from "./components/layout/Layout"
import { AppBackground } from "./components/layout/AppBackground"
import { Home } from "./pages/Home"
import { Services } from "./pages/Services"
import { Projects } from "./pages/Projects"
import { Settings } from "./pages/Settings"
import { Toaster } from "@/components/ui/sonner"

function App() {
  return (
    <ThemeProvider defaultTheme="light" storageKey="vite-ui-theme">
      <BrowserRouter>
        <AppBackground>
          <Navbar />
          <Layout>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/services" element={<Services />} />
              <Route path="/projects" element={<Projects />} />
              <Route path="/settings" element={<Settings />} />
              <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
          </Layout>
          <Toaster />
        </AppBackground>
      </BrowserRouter>
    </ThemeProvider>
  )
}

export default App