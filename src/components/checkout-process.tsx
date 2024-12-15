"use client"

import { useState } from "react"
import { useCart } from "../contexts/card-context"
import { Button } from "../components/ui/button"
import { Input } from "../components/ui/input"
import { Label } from "../components/ui/label"
import { RadioGroup, RadioGroupItem } from "../components/ui/radio-group"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../components/ui/select"
import { CreditCard, Truck, ShoppingBag, Check } from 'lucide-react'
import { motion, AnimatePresence } from "framer-motion"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "../components/ui/dialog"

type CheckoutStep = "payment" | "shipping" | "summary"

const stepIcons = {
  payment: CreditCard,
  shipping: Truck,
  summary: ShoppingBag,
}

const stepLabels = {
  payment: "Fizetés",
  shipping: "Szállítás",
  summary: "Összegzés",
}

export function CheckoutProcess({ onClose }: { onClose: () => void }) {
  const [step, setStep] = useState<CheckoutStep>("payment")
  const [paymentMethod, setPaymentMethod] = useState<"card" | "paypal">("card")
  const [isConfirmationOpen, setIsConfirmationOpen] = useState(false)
  const { getTotalPrice, clearCart } = useCart()

  const nextStep = () => {
    if (step === "payment") setStep("shipping")
    else if (step === "shipping") setStep("summary")
  }

  const prevStep = () => {
    if (step === "shipping") setStep("payment")
    else if (step === "summary") setStep("shipping")
  }

  const handleOrderConfirmation = () => {
    setIsConfirmationOpen(true)
  }

  const handleOrderComplete = () => {
    clearCart()
    setIsConfirmationOpen(false)
    onClose()
  }

  const steps: CheckoutStep[] = ["payment", "shipping", "summary"]
  const currentStepIndex = steps.indexOf(step)

  const renderStep = () => {
    switch (step) {
      case "payment":
        return (
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.3 }}
            className="space-y-6"
          >
            <h2 className="text-xl font-semibold">Fizetési mód kiválasztása</h2>
            <RadioGroup value={paymentMethod} onValueChange={(value: "card" | "paypal") => setPaymentMethod(value)}>
              <motion.div
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="flex items-center space-x-2 p-4 border rounded-lg hover:bg-gray-50 transition-colors cursor-pointer"
              >
                <RadioGroupItem value="card" id="card" />
                <Label htmlFor="card" className="flex items-center space-x-2 cursor-pointer">
                  <CreditCard className="h-5 w-5 text-primary" />
                  <span>Bankkártya</span>
                </Label>
              </motion.div>
              <motion.div
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="flex items-center space-x-2 p-4 border rounded-lg hover:bg-gray-50 transition-colors cursor-pointer"
              >
                <RadioGroupItem value="paypal" id="paypal" />
                <Label htmlFor="paypal" className="flex items-center space-x-2 cursor-pointer">
                  <ShoppingBag className="h-5 w-5 text-primary" />
                  <span>PayPal</span>
                </Label>
              </motion.div>
            </RadioGroup>
            {paymentMethod === "card" && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                className="space-y-4 mt-6"
              >
                <div>
                  <Label htmlFor="cardNumber">Kártyaszám</Label>
                  <Input id="cardNumber" placeholder="1234 5678 9012 3456" />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="expiry">Lejárati dátum</Label>
                    <Input id="expiry" placeholder="MM / YY" />
                  </div>
                  <div>
                    <Label htmlFor="cvc">CVC</Label>
                    <Input id="cvc" placeholder="123" />
                  </div>
                </div>
              </motion.div>
            )}
          </motion.div>
        )
      case "shipping":
        return (
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.3 }}
            className="space-y-6"
          >
            <h2 className="text-xl font-semibold">Szállítási adatok</h2>
            <div className="space-y-4">
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
              >
                <Label htmlFor="name">Név</Label>
                <Input id="name" placeholder="Teljes név" />
              </motion.div>
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
              >
                <Label htmlFor="address">Cím</Label>
                <Input id="address" placeholder="Utca, házszám" />
              </motion.div>
              <div className="grid grid-cols-2 gap-4">
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 }}
                >
                  <Label htmlFor="city">Város</Label>
                  <Input id="city" placeholder="Város" />
                </motion.div>
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4 }}
                >
                  <Label htmlFor="zip">Irányítószám</Label>
                  <Input id="zip" placeholder="1234" />
                </motion.div>
              </div>
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
              >
                <Label htmlFor="courier">Futárszolgálat</Label>
                <Select>
                  <SelectTrigger id="courier">
                    <SelectValue placeholder="Válasszon futárszolgálatot" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="gls">GLS</SelectItem>
                    <SelectItem value="dhl">DHL</SelectItem>
                    <SelectItem value="ups">UPS</SelectItem>
                  </SelectContent>
                </Select>
              </motion.div>
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6 }}
              >
                <Label htmlFor="email">E-mail cím</Label>
                <Input id="email" type="email" required />
              </motion.div>
            </div>
          </motion.div>
        )
      case "summary":
        return (
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.3 }}
            className="space-y-6"
          >
            <h2 className="text-xl font-semibold">Rendelés összegzése</h2>
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="space-y-4 p-6 bg-gray-50 rounded-lg"
            >
              <div className="flex justify-between items-center">
                <span className="text-gray-600">Fizetési mód:</span>
                <span className="font-medium">{paymentMethod === "card" ? "Bankkártya" : "PayPal"}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-600">Végösszeg:</span>
                <span className="text-2xl font-bold text-primary">${getTotalPrice().toFixed(2)}</span>
              </div>
            </motion.div>
            <motion.div
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <Button onClick={handleOrderConfirmation} className="w-full py-6 text-lg">
                Rendelés véglegesítése
              </Button>
            </motion.div>
          </motion.div>
        )
    }
  }

  return (
    <>
      <div className="space-y-8">
        <div className="relative flex justify-between">
          {/* Progress bar background */}
          <div className="absolute top-5 left-0 w-full h-1 bg-gray-200" />
          
          {/* Animated progress bar */}
          <motion.div
            className="absolute top-5 left-0 h-1 bg-primary"
            initial={{ width: "0%" }}
            animate={{ width: `${(currentStepIndex / (steps.length - 1)) * 100}%` }}
            transition={{ duration: 0.3 }}
          />

          {/* Step indicators */}
          {steps.map((s, index) => {
            const isCompleted = index <= currentStepIndex
            const Icon = stepIcons[s]

            return (
              <div key={s} className="flex flex-col items-center relative z-10">
                <motion.div
                  className={`w-10 h-10 rounded-full flex items-center justify-center ${
                    isCompleted ? "bg-primary text-primary-foreground" : "bg-gray-200"
                  }`}
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                  animate={{
                    scale: step === s ? 1.1 : 1,
                    transition: { duration: 0.2 }
                  }}
                >
                  <AnimatePresence mode="wait">
                    <motion.div
                      key={isCompleted ? "check" : "icon"}
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      exit={{ scale: 0 }}
                      transition={{ duration: 0.2 }}
                    >
                      {isCompleted ? <Check className="h-5 w-5" /> : <Icon className="h-5 w-5" />}
                    </motion.div>
                  </AnimatePresence>
                </motion.div>
                <motion.span
                  className="text-sm mt-2"
                  animate={{
                    fontWeight: step === s ? 600 : 400,
                    color: step === s ? "var(--primary)" : "var(--gray-600)"
                  }}
                >
                  {stepLabels[s]}
                </motion.span>
              </div>
            )
          })}
        </div>

        <AnimatePresence mode="wait">
          {renderStep()}
        </AnimatePresence>

        <motion.div
          className="flex justify-between mt-8"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
        >
          {step !== "payment" && (
            <Button
              onClick={prevStep}
              variant="outline"
              className="w-28"
            >
              Vissza
            </Button>
          )}
          {step !== "summary" ? (
            <Button
              onClick={nextStep}
              className="ml-auto w-28"
            >
              Következő
            </Button>
          ) : (
            <Button
              onClick={onClose}
              variant="outline"
              className="ml-auto w-28"
            >
              Bezárás
            </Button>
          )}
        </motion.div>
      </div>

      <Dialog open={isConfirmationOpen} onOpenChange={setIsConfirmationOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Köszönjük a rendelését!</DialogTitle>
            <DialogDescription>
              A rendelését sikeresen rögzítettük. Hamarosan e-mailben küldjük a rendelés részleteit.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button onClick={handleOrderComplete} className="w-full">
              Rendben
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  )
}

