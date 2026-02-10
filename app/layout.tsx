import type { Metadata } from 'next'
import './globals.css'
import { Toaster } from 'sonner'
import localFont from 'next/font/local'

const sfPro = localFont({
  src: [
    {
      path: './fonts/SF Pro Text Regular.woff',
      weight: '400',
      style: 'normal',
    },
    {
      path: './fonts/SF Pro Text Medium.woff',
      weight: '500',
      style: 'normal',
    },
    {
      path: './fonts/SF Pro Text Bold.woff',
      weight: '700',
      style: 'normal',
    },
  ],
  variable: '--font-sf-pro',
})

export const metadata: Metadata = {
  title: 'AI Workout Plan Builder',
  description: 'Generate custom fitness plans with AI',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={sfPro.className}>
        {children}
        <Toaster position="top-center" />
      </body>
    </html>
  )
}