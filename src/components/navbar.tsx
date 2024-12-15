"use client"

import * as React from "react"
import Link from "next/link"
import { Menu, X } from 'lucide-react'
import { Button } from "@/components/ui/button"
import { CartComponent } from "@/components/cart-component"

const navItems = [
  { name: "Főoldal", href: "/" },
  { name: "Történelme", href: "/latnivalok" },
  { name: "Termékek", href: "/ettermek" },
  { name: "Programok", href: "/szallasok" },
  { name: "Kapcsolat", href: "/esemenyek" },
]

export function Navbar() {
  const [isOpen, setIsOpen] = React.useState(false)

  return (
    <nav className="bg-white shadow-md fixed top-0 left-0 right-0 z-50 transition-shadow duration-300">
      <div className="container mx-auto px-4">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link href="/" className="text-2xl font-bold text-gray-800">
              New York
            </Link>
          </div>
          
          <div className="hidden sm:flex-1 sm:flex sm:items-center sm:justify-center">
            <div className="flex space-x-8">
              {navItems.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  className="inline-flex items-center px-1 pt-1 text-sm font-medium text-gray-500 hover:text-gray-900"
                >
                  {item.name}
                </Link>
              ))}
            </div>
          </div>
          
          <div className="flex items-center">
            <CartComponent />
            <div className="sm:hidden">
              <Button
                variant="ghost"
                className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500"
                onClick={() => setIsOpen(!isOpen)}
              >
                <span className="sr-only">Főmenü megnyitása</span>
                {isOpen ? (
                  <X className="block h-6 w-6" aria-hidden="true" />
                ) : (
                  <Menu className="block h-6 w-6" aria-hidden="true" />
                )}
              </Button>
            </div>
          </div>
        </div>
      </div>

      {isOpen && (
        <div className="sm:hidden">
          <div className="pt-2 pb-3 space-y-1">
            {navItems.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className="block pl-3 pr-4 py-2 text-base font-medium text-gray-500 hover:text-gray-900 hover:bg-gray-50"
                onClick={() => setIsOpen(false)}
              >
                {item.name}
              </Link>
            ))}
          </div>
        </div>
      )}
    </nav>
  )
}

