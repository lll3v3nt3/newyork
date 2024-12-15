"use client"

import { useState } from "react"
import Image from "next/image"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { 
  Pagination, 
  PaginationContent, 
  PaginationItem, 
  PaginationLink, 
  PaginationNext, 
  PaginationPrevious 
} from "@/components/ui/pagination"
import { useCart } from "@/contexts/card-context"

// Generáljunk 50 termék adatot
const generateProducts = (count: number) => {
  return Array.from({ length: count }, (_, i) => ({
    id: i + 1,
    name: `New York Termék ${i + 1}`,
    description: `Ez egy fantasztikus New York-i termék leírása. Termék ${i + 1}`,
    price: Math.floor(Math.random() * 100) + 10,
    image: `/shirt.png`
  }))
}

const products = generateProducts(50)

export function ProductsSection() {
  const [currentPage, setCurrentPage] = useState(1)
  const [searchTerm, setSearchTerm] = useState("")
  const [notification, setNotification] = useState<string | null>(null);
  const productsPerPage = 9
  const { addToCart } = useCart()

  // Szűrjük a termékeket a keresési kifejezés alapján
  const filteredProducts = products.filter(product =>
    product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    product.description.toLowerCase().includes(searchTerm.toLowerCase())
  )

  // Számoljuk ki az aktuális oldalon megjelenítendő termékeket
  const indexOfLastProduct = currentPage * productsPerPage
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage
  const currentProducts = filteredProducts.slice(indexOfFirstProduct, indexOfLastProduct)

  // Oldalszámok generálása
  const pageNumbers = []
  for (let i = 1; i <= Math.ceil(filteredProducts.length / productsPerPage); i++) {
    pageNumbers.push(i)
  }

  const handleAddToCart = (product: typeof products[0]) => {
    addToCart(product)
    setNotification(`${product.name} hozzáadva a kosárhoz.`)
    setTimeout(() => setNotification(null), 3000) // 3 másodperc után eltűnik
  }

  return (
    <section className="pt-32 pb-24 bg-gray-50">
      <div className="container mx-auto px-4">
        <h2 className="text-4xl font-bold text-center mb-12">New York-i Termékek</h2>
        
        {/* Keresőmező */}
        <div className="mb-8">
          <Input
            type="text"
            placeholder="Keresés termékek között..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="max-w-md mx-auto"
          />
        </div>

        {/* Termékek rácsa */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {currentProducts.map((product) => (
            <Card key={product.id} className="flex flex-col">
              <CardContent className="p-4">
                <Image
                  src={product.image}
                  alt={product.name}
                  width={200}
                  height={200}
                  className="w-full h-48 object-cover rounded-md mb-4"
                />
                <h3 className="text-xl font-semibold mb-2">{product.name}</h3>
                <p className="text-gray-600 mb-4">{product.description}</p>
              </CardContent>
              <CardFooter className="flex justify-between items-center mt-auto">
                <span className="text-lg font-bold">${product.price}</span>
                <Button onClick={() => handleAddToCart(product)}>Kosárba</Button>
              </CardFooter>
            </Card>
          ))}
        </div>

        {/* Lapozó */}
        <Pagination className="mt-12">
          <PaginationContent>
            <PaginationItem>
              <PaginationPrevious 
                onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                aria-disabled={currentPage === 1}
              />
            </PaginationItem>
            {pageNumbers.map((number) => (
              <PaginationItem key={number}>
                <PaginationLink 
                  onClick={() => setCurrentPage(number)}
                  isActive={currentPage === number}
                >
                  {number}
                </PaginationLink>
              </PaginationItem>
            ))}
            <PaginationItem>
              <PaginationNext 
                onClick={() => setCurrentPage(prev => Math.min(prev + 1, pageNumbers.length))}
                aria-disabled={currentPage === pageNumbers.length}
              />
            </PaginationItem>
          </PaginationContent>
        </Pagination>
      </div>
      {notification && (
        <div className="fixed bottom-4 right-4 bg-green-500 text-white p-2 rounded shadow-lg">
          {notification}
        </div>
      )}
    </section>
  )
}

