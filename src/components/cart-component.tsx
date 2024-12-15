"use client"

import { useState } from "react"
import { ShoppingCart, X, Plus, Minus } from 'lucide-react'
import { Button } from "../components/ui/button"
import { useCart } from "../contexts/card-context"
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "../components/ui/sheet"
import { ScrollArea } from "../components/ui/scroll-area"
import { Separator } from "../components/ui/separator"
import { Dialog, DialogContent } from "../components/ui/dialog"
import { CheckoutProcess } from "./checkout-process"

export function CartComponent() {
  const { items, removeFromCart, updateQuantity, clearCart, getTotalItems, getTotalPrice } = useCart()
  const [isOpen, setIsOpen] = useState(false)
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false)

  const handleUpdateQuantity = (itemId: number, newQuantity: number) => {
    updateQuantity(itemId, newQuantity)
  }

  const handleCheckout = () => {
    setIsCheckoutOpen(true)
    setIsOpen(false)
  }

  const closeCheckout = () => {
    setIsCheckoutOpen(false)
  }

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('hu-HU', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 2,
    }).format(price)
  }

  return (
    <>
      <Sheet open={isOpen} onOpenChange={setIsOpen}>
        <SheetTrigger asChild>
          <Button variant="outline" size="icon" className="relative">
            <ShoppingCart className="h-5 w-5" />
            {getTotalItems() > 0 && (
              <span className="absolute -top-2 -right-2 bg-primary text-primary-foreground rounded-full w-5 h-5 flex items-center justify-center text-xs font-medium">
                {getTotalItems()}
              </span>
            )}
          </Button>
        </SheetTrigger>
        <SheetContent className="flex flex-col w-full sm:max-w-lg">
          <SheetHeader className="space-y-2.5 pb-6">
            <SheetTitle className="text-xl font-semibold flex items-center">Kosár</SheetTitle>
            <Separator />
          </SheetHeader>

          {items.length === 0 ? (
            <div className="flex flex-col items-center justify-center flex-1 py-12">
              <ShoppingCart className="h-12 w-12 text-muted-foreground mb-4" />
              <p className="text-lg font-medium text-muted-foreground">A kosár üres</p>
            </div>
          ) : (
            <>
              <ScrollArea className="flex-1 -mx-6 px-6">
                <div className="space-y-4">
                  {items.map((item) => (
                    <div key={item.id} className="flex items-center justify-between py-4">
                      <div className="flex flex-col flex-1 min-w-0 pr-4">
                        <span className="text-sm font-medium truncate">{item.name}</span>
                        <span className="text-sm text-muted-foreground">
                          {formatPrice(item.price)} × {item.quantity}
                        </span>
                      </div>
                      <div className="flex items-center gap-2">
                        <div className="flex items-center rounded-md border">
                          <Button
                            variant="ghost"
                            size="icon"
                            className="h-8 w-8 rounded-none"
                            onClick={() => handleUpdateQuantity(item.id, item.quantity - 1)}
                            disabled={item.quantity <= 1}
                          >
                            <Minus className="h-3 w-3" />
                            <span className="sr-only">Mennyiség csökkentése</span>
                          </Button>
                          <div className="h-8 w-8 flex items-center justify-center text-sm tabular-nums">
                            {item.quantity}
                          </div>
                          <Button
                            variant="ghost"
                            size="icon"
                            className="h-8 w-8 rounded-none"
                            onClick={() => handleUpdateQuantity(item.id, item.quantity + 1)}
                          >
                            <Plus className="h-3 w-3" />
                            <span className="sr-only">Mennyiség növelése</span>
                          </Button>
                        </div>
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-8 w-8 text-muted-foreground hover:text-foreground"
                          onClick={() => removeFromCart(item.id)}
                        >
                          <X className="h-3 w-3" />
                          <span className="sr-only">Termék eltávolítása</span>
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </ScrollArea>
              <div className="space-y-4 pt-6">
                <Separator />
                <div className="space-y-1.5">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-muted-foreground">Részösszeg</span>
                    <span>{formatPrice(getTotalPrice())}</span>
                  </div>
                  <div className="flex items-center justify-between font-medium">
                    <span>Összesen</span>
                    <span>{formatPrice(getTotalPrice())}</span>
                  </div>
                </div>
                <div className="flex flex-col gap-2">
                  <Button onClick={handleCheckout} size="lg">
                    Fizetés
                  </Button>
                  <Button onClick={clearCart} variant="outline" size="lg">
                    Kosár ürítése
                  </Button>
                </div>
              </div>
            </>
          )}
        </SheetContent>
      </Sheet>

      <Dialog open={isCheckoutOpen} onOpenChange={setIsCheckoutOpen}>
        <DialogContent className="sm:max-w-[600px]">
          <CheckoutProcess onClose={closeCheckout} />
        </DialogContent>
      </Dialog>
    </>
  )
}
