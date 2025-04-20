import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Flappy Bird',
  description: 'A Flappy Bird clone built with Next.js',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body style={{ 
        margin: 0, 
        padding: 0,
        minHeight: '100vh',
        background: 'linear-gradient(to bottom, #1a1a1a, #2d2d2d)',
        color: 'white',
        fontFamily: 'Arial, sans-serif'
      }}>
        {children}
      </body>
    </html>
  )
} 