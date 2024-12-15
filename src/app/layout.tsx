import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import { CartProvider } from "../contexts/card-context"
import { Navbar } from '@/components/navbar'
import { Footer } from '@/components/footer'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'New York Website',
  description: 'Discover the magic of New York City',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="hu">
      <body className={inter.className}>
        <CartProvider>
          <Navbar />
          {children}
          <Footer/>
        </CartProvider>
      </body>
    </html>
  )
}

