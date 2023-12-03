import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import Provider from '@/context/provider'
import './globals.css'
import { Session } from 'next-auth'
import NavBar from '@/components/NavBar'
const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'FinTrack',
  description: 'All Purpose Financial Tracking Application',
}

export default function RootLayout({
  children, session
}: {
  children: React.ReactNode,
  session: Session,
})  {
  return (
    <html lang="en">
      <Provider session = {session}>
      <body className = {inter.className}>
        <main>
            <NavBar></NavBar>
            {children} 
        </main>
      </body>
      </Provider>
    </html>
  )
}
