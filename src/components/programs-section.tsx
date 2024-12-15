"use client";

import { useState } from "react"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Calendar, Clock, MapPin } from 'lucide-react'
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"

const programs = [
  {
    id: 1,
    title: "Broadway Show: The Lion King",
    description: "Experience the magic of Disney's The Lion King on Broadway.",
    date: "2024-06-15",
    time: "19:30",
    location: "Minskoff Theatre, 200 W 45th St",
    image: "/lion.jpg"
  },
  {
    id: 2,
    title: "Central Park Summer Concert",
    description: "Enjoy a free concert in the heart of Central Park.",
    date: "2024-07-20",
    time: "18:00",
    location: "Great Lawn, Central Park",
    image: "/images.jpg"
  },
  {
    id: 3,
    title: "New York Food Festival",
    description: "Taste the best cuisines New York has to offer in this annual food festival.",
    date: "2024-08-10",
    time: "11:00",
    location: "Hudson Yards",
    image: "/flatten.jpg"
  },
  {
    id: 4,
    title: "Metropolitan Museum of Art Tour",
    description: "Guided tour of the Met's most famous artworks.",
    date: "2024-09-05",
    time: "10:00",
    location: "1000 5th Ave",
    image: "/asd.jpg"
  }
]

// A `Program` típus definiálása
type Program = {
  id: number
  title: string
  description: string
  date: string
  time: string
  location: string
  image: string
}

export function ProgramsSection() {
  const [selectedProgram, setSelectedProgram] = useState<Program | null>(null)

  return (
    <section className="py-12 bg-gray-50">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-8">Programok New Yorkban</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {programs.map((program) => (
            <Card key={program.id} className="flex flex-col">
              <CardHeader className="p-0">
                <img src={program.image} alt={program.title} className="w-full h-48 object-cover rounded-t-lg" />
              </CardHeader>
              <CardContent className="flex-grow p-4">
                <CardTitle className="text-xl mb-2">{program.title}</CardTitle>
                <CardDescription className="mb-4">{program.description}</CardDescription>
                <div className="flex items-center text-sm text-gray-500 mb-2">
                  <Calendar className="w-4 h-4 mr-2" />
                  {new Date(program.date).toLocaleDateString('hu-HU')}
                </div>
                <div className="flex items-center text-sm text-gray-500 mb-2">
                  <Clock className="w-4 h-4 mr-2" />
                  {program.time}
                </div>
                <div className="flex items-center text-sm text-gray-500">
                  <MapPin className="w-4 h-4 mr-2" />
                  {program.location}
                </div>
              </CardContent>
              <CardFooter className="p-4">
                <Dialog>
                  <DialogTrigger asChild>
                    <Button className="w-full" onClick={() => setSelectedProgram(program)}>Részletek</Button>
                  </DialogTrigger>
                  <DialogContent className="sm:max-w-[425px]">
                    <DialogHeader>
                      <DialogTitle>{selectedProgram?.title}</DialogTitle>
                      <DialogDescription>{selectedProgram?.description}</DialogDescription>
                    </DialogHeader>
                    <div className="grid gap-4 py-4">
                      <div className="flex items-center gap-4">
                        <Calendar className="w-5 h-5" />
                        <p>{selectedProgram && new Date(selectedProgram.date).toLocaleDateString('hu-HU')}</p>
                      </div>
                      <div className="flex items-center gap-4">
                        <Clock className="w-5 h-5" />
                        <p>{selectedProgram?.time}</p>
                      </div>
                      <div className="flex items-center gap-4">
                        <MapPin className="w-5 h-5" />
                        <p>{selectedProgram?.location}</p>
                      </div>
                    </div>
                    <Button className="w-full">Jegyvásárlás</Button>
                  </DialogContent>
                </Dialog>
              </CardFooter>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
