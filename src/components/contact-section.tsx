"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { toast } from "@/hooks/use-toast"
import { MapPin, Phone, Mail } from 'lucide-react'

export function ContactSection() {
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [message, setMessage] = useState("")

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Itt lenne a tényleges form küldés logikája
    console.log("Form submitted:", { name, email, message })
    toast({
      title: "Üzenet elküldve!",
      description: "Köszönjük megkeresését, hamarosan válaszolunk.",
    })
    setName("")
    setEmail("")
    setMessage("")
  }

  return (
    <section className="py-24 bg-white">
      <div className="container mx-auto px-4">
        <h2 className="text-4xl font-bold text-center mb-12">Kapcsolat</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          <div>
            <h3 className="text-2xl font-semibold mb-6">Írjon nekünk</h3>
            <form onSubmit={handleSubmit}>
              <div className="space-y-4">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                    Név
                  </label>
                  <Input
                    id="name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                  />
                </div>
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                    E-mail
                  </label>
                  <Input
                    id="email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                </div>
                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1">
                    Üzenet
                  </label>
                  <Textarea
                    id="message"
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    required
                    rows={4}
                  />
                </div>
                <Button type="submit" className="w-full">Küldés</Button>
              </div>
            </form>
          </div>
          <div>
            <h3 className="text-2xl font-semibold mb-6">Elérhetőségeink</h3>
            <div className="space-y-4">
              <div className="flex items-start">
                <MapPin className="w-6 h-6 mr-4 text-primary" />
                <p>123 Broadway, New York, NY 10001, USA</p>
              </div>
              <div className="flex items-center">
                <Phone className="w-6 h-6 mr-4 text-primary" />
                <p>+1 (555) 123-4567</p>
              </div>
              <div className="flex items-center">
                <Mail className="w-6 h-6 mr-4 text-primary" />
                <p>info@newyorkwebsite.com</p>
              </div>
            </div>
            <div className="mt-8">
              <h4 className="text-xl font-semibold mb-4">Nyitvatartás</h4>
              <p>Hétfő - Péntek: 9:00 - 17:00</p>
              <p>Szombat - Vasárnap: Zárva</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

