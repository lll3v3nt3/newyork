"use client"

import { useState } from "react"
import { ShoppingCart, X, Plus, Minus } from 'lucide-react'
import { Button } from "@/components/ui/button"
import { useCart } from "@/contexts/card-context"
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"
import { CheckoutProcess } from "@/components/checkout-process"

export function CartComponent() {
  const { items, removeFromCart, updateQuantity, clearCart, getTotalItems, getTotalPrice } = useCart()
  const [isOpen, setIsOpen] = useState(false)
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false)

  const handleUpdateQuantity = (itemId: number, newQuantity: number) => {
    updateQuantity(itemId, newQuantity)
  }

  const handleCheckout = () => {
    setIsCheckoutOpen(true)
  }

  const closeCheckout = () => {
    setIsCheckoutOpen(false)
  }

  return (
    <Sheet open={isOpen} onOpenChange={setIsOpen}>
      <SheetTrigger asChild>
        <Button variant="outline" size="icon" className="relative">
          <ShoppingCart className="h-4 w-4" />
          {getTotalItems() > 0 && (
            <span className="absolute -top-2 -right-2 bg-primary text-primary-foreground rounded-full w-5 h-5 flex items-center justify-center text-xs">
              {getTotalItems()}
            </span>
          )}
        </Button>
      </SheetTrigger>
      <SheetContent>
        <SheetHeader>
          <SheetTitle>Kosár</SheetTitle>
        </SheetHeader>
        {items.length === 0 ? (
          <p className="text-center mt-4">A kosár üres</p>
        ) : (
          <>
            {!isCheckoutOpen ? (
              <>
                <ul className="mt-4 space-y-4">
                  {items.map((item) => (
                    <li key={item.id} className="flex justify-between items-center">
                      <div className="flex-1">
                        <p className="font-semibold">{item.name}</p>
                        <p className="text-sm text-gray-500">
                          ${item.price} x {item.quantity}
                        </p>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Button
                          variant="outline"
                          size="icon"
                          onClick={() => handleUpdateQuantity(item.id, item.quantity - 1)}
                          aria-label="Mennyiség csökkentése"
                        >
                          <Minus className="h-4 w-4" />
                        </Button>
                        <span className="w-8 text-center">{item.quantity}</span>
                        <Button
                          variant="outline"
                          size="icon"
                          onClick={() => handleUpdateQuantity(item.id, item.quantity + 1)}
                          aria-label="Mennyiség növelése"
                        >
                          <Plus className="h-4 w-4" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => removeFromCart(item.id)}
                          aria-label="Termék eltávolítása"
                        >
                          <X className="h-4 w-4" />
                        </Button>
                      </div>
                    </li>
                  ))}
                </ul>
                <div className="mt-6 space-y-4">
                  <p className="font-semibold text-lg">
                    Összesen: ${getTotalPrice().toFixed(2)}
                  </p>
                  <Button onClick={clearCart} variant="outline" className="w-full">
                    Kosár ürítése
                  </Button>
                  <Button onClick={handleCheckout} className="w-full">Fizetés</Button>
                </div>
              </>
            ) : (
              <CheckoutProcess onClose={closeCheckout} />
            )}
          </>
        )}
      </SheetContent>
    </Sheet>
  )
}

