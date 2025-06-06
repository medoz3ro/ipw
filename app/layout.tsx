import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import { Navigation } from "@/components/navigation"
import { ThemeProvider } from "@/components/theme-provider"
import { SettingsProvider } from "@/components/settings-provider"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Kompletna Web Aplikacija",
  description: "Aplikacija s prikazom podataka, galerijom, kontakt formom i postavkama",
    generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="hr" suppressHydrationWarning>
      <body className={inter.className}>
        <SettingsProvider>
          <ThemeProvider attribute="class" defaultTheme="light" enableSystem disableTransitionOnChange>
            <Navigation />
            <main>{children}</main>
          </ThemeProvider>
        </SettingsProvider>
      </body>
    </html>
  )
}
