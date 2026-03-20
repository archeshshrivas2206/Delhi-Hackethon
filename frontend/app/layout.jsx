import { Geist, Geist_Mono } from 'next/font/google'
import { Analytics } from '@vercel/analytics/next'
import './globals.css'
import { Toaster } from "react-hot-toast"

const geist = Geist({ subsets: ["latin"], variable: "--font-geist-sans" })
const geistMono = Geist_Mono({ subsets: ["latin"], variable: "--font-geist-mono" })

export const metadata = {
  title: 'Geo-Spatial Civic Governance Platform',
  description: 'A modern platform for civic governance and geo-spatial project tracking',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en" className="dark">
      <body className={`${geist.variable} ${geistMono.variable} font-sans antialiased`}>
        <Toaster position="top-right" />
        {children}
        <Analytics />
      </body>
    </html>
  )
}
