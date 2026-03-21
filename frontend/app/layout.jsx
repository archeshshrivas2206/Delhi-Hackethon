import { Geist, Geist_Mono } from 'next/font/google'
import { Analytics } from '@vercel/analytics/next'
import './globals.css'
import {ThemeProvider} from '@/components/theme-provider' 
import { Toaster } from "react-hot-toast"
import "leaflet/dist/leaflet.css"

const geist = Geist({ subsets: ["latin"], variable: "--font-geist-sans" })
const geistMono = Geist_Mono({ subsets: ["latin"], variable: "--font-geist-mono" })

export const metadata = {
  title: 'Geo-Spatial Civic Governance Platform',
  description: 'A modern platform for civic governance and geo-spatial project tracking',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${geist.variable} ${geistMono.variable} font-sans antialiased`}>
        <ThemeProvider
          attribute="class"
          defaultTheme="light"
          enableSystem={false}
        >
          {children}   {/* ✅ ONLY ONCE */}
        </ThemeProvider>

        <Toaster position="top-right" />
        <Analytics />
      </body>
    </html>
  )
}
