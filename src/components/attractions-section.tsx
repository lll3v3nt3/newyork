import Image from 'next/image'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

const attractions = [
  {
    name: "Szabadság-szobor",
    description: "Az Egyesült Államok egyik legismertebb jelképe és New York ikonikus látványossága.",
    image: "/placeholder.svg?height=400&width=600"
  },
  {
    name: "Central Park",
    description: "Hatalmas városi park Manhattan szívében, számos szabadtéri tevékenységgel és látványossággal.",
    image: "/placeholder.svg?height=400&width=600"
  },
  {
    name: "Empire State Building",
    description: "Híres felhőkarcoló lenyűgöző kilátással a városra a 86. emeleti kilátóból.",
    image: "/placeholder.svg?height=400&width=600"
  },
  {
    name: "Times Square",
    description: "Nyüzsgő tér hatalmas digitális hirdetőtáblákkal, a 'világ kereszteződése'.",
    image: "/placeholder.svg?height=400&width=600"
  },
  {
    name: "Metropolitan Művészeti Múzeum",
    description: "Világhírű múzeum több mint 2 millió műalkotással a világ minden tájáról.",
    image: "/placeholder.svg?height=400&width=600"
  },
  {
    name: "Broadway",
    description: "A színházi előadások Mekkája, ahol világszínvonalú musicaleket és darabokat láthat.",
    image: "/placeholder.svg?height=400&width=600"
  }
]

export function AttractionsSection() {
  return (
    <section className="py-12 bg-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl font-extrabold text-gray-900 mb-8 text-center">
          New York főbb látnivalói
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {attractions.map((attraction, index) => (
            <Card key={index} className="overflow-hidden transition-all duration-300 hover:shadow-xl hover:-translate-y-1">
              <Image
                src={attraction.image}
                alt={attraction.name}
                width={600}
                height={400}
                className="w-full h-48 object-cover transition-all duration-300 hover:scale-105"
              />
              <CardHeader>
                <CardTitle>{attraction.name}</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription>{attraction.description}</CardDescription>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}

