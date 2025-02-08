"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { CineRegistrationForm } from "./components/cine-registration-form"
import Image from "next/image"
import { useRouter } from "next/navigation"
import { motion, AnimatePresence } from "framer-motion"

interface Cine {
  id: string
  name: string
  imageUrl: string
  pin: string
}

const MOCK_CINES: Cine[] = [
  { id: "1", name: "Multicines-Recreo", imageUrl: "/img/cines/multicines.jpg", pin: "1234" },
  { id: "2", name: "Supercines-Quicentro Sur", imageUrl: "/img/cines/supercines.png", pin: "5678" },
]

export default function CineSelectionPage() {
  const router = useRouter()
  const [cines, setCines] = useState<Cine[]>(MOCK_CINES)
  const [selectedCine, setSelectedCine] = useState<Cine | null>(null)
  const [pinInput, setPinInput] = useState("")
  const [isRegisterOpen, setIsRegisterOpen] = useState(false)

  const handleCineSelect = (cine: Cine) => {
    setSelectedCine(cine)
    setPinInput("")
  }

  const handlePinSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (pinInput === selectedCine?.pin) {
      router.push("/admin-cine")
    } else {
      alert("PIN incorrecto. Inténtalo de nuevo.")
    }
  }

  const handleNewCine = (cine: Cine) => {
    setCines((prev) => [...prev, { ...cine, id: Math.random().toString() }])
    setIsRegisterOpen(false)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-[#1c1c25] to-blue-900 max-w mx-auto text-white flex flex-col items-center justify-center p-8">
      
      {/* Título */}
      <motion.h1
        className="text-5xl font-extrabold text-cyan-400 mb-10 tracking-wide"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.7 }}
      >
        Selecciona tu Cine
      </motion.h1>

      {/* Lista de cines */}
      <div className="grid gap-10 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        <AnimatePresence>
          {cines.map((cine) => (
            <motion.div
              key={cine.id}
              className="group relative cursor-pointer"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.5 }}
              onClick={() => handleCineSelect(cine)}
            >
              <div className="relative w-52 h-52 rounded-xl overflow-hidden shadow-lg transform transition-transform duration-300 group-hover:scale-105 group-hover:shadow-2xl">
                <Image src={cine.imageUrl} alt={cine.name} fill className="object-cover" />
                <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <span className="text-2xl font-bold text-white">{cine.name}</span>
                </div>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>

        {/* Botón para agregar cine */}
        <motion.div
          className="flex items-center justify-center"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <Button
            onClick={() => setIsRegisterOpen(true)}
            className="w-52 h-52 bg-gray-800 bg-opacity-50 hover:bg-opacity-75 flex flex-col items-center justify-center rounded-xl text-center p-4 shadow-md transition-all duration-300 hover:shadow-lg"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-14 w-14 mb-2 text-cyan-400"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path fillRule="evenodd" d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z" clipRule="evenodd" />
            </svg>
            <span className="text-lg font-semibold">Registrar nuevo cine</span>
          </Button>
        </motion.div>
      </div>

      {/* Modal de PIN */}
      <Dialog open={!!selectedCine} onOpenChange={() => setSelectedCine(null)}>
        <DialogContent className="bg-gray-800 border border-gray-700 text-white rounded-lg">
          <DialogHeader>
            <DialogTitle className="text-2xl font-bold">Ingresar PIN</DialogTitle>
            <DialogDescription>Introduce el PIN para acceder a {selectedCine?.name}.</DialogDescription>
          </DialogHeader>
          <form onSubmit={handlePinSubmit} className="mt-4 space-y-4">
            <div>
              <Label htmlFor="pin">PIN</Label>
              <Input
                id="pin"
                type="password"
                value={pinInput}
                onChange={(e) => setPinInput(e.target.value)}
                required
                className="bg-gray-700 border-gray-600 focus:border-cyan-500 mt-1 rounded-lg"
              />
            </div>
            <Button type="submit" className="w-full bg-cyan-500 hover:bg-cyan-600 transition-all rounded-lg">
              Entrar
            </Button>
          </form>
        </DialogContent>
      </Dialog>

      {/* Modal de Registro */}
      <Dialog open={isRegisterOpen} onOpenChange={setIsRegisterOpen}>
        <DialogContent className="max-w-lg bg-gray-800 border border-gray-700 text-white rounded-lg">
          <DialogHeader>
            <DialogTitle className="text-2xl font-bold">Registrar Nuevo Establecimiento</DialogTitle>
            <DialogDescription>Completa el formulario para registrar tu cine.</DialogDescription>
          </DialogHeader>
          <CineRegistrationForm onSave={handleNewCine} />
        </DialogContent>
      </Dialog>
    </div>
  )
}
