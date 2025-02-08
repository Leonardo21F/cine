"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { ImageUpload } from "@/components/image-upload"
import { motion } from "framer-motion"

interface Cine {
  id: string
  name: string
  imageUrl: string
  pin: string
  address: string
  description: string
}

interface CineRegistrationFormProps {
  onSave: (cine: Cine) => void
}

export function CineRegistrationForm({ onSave }: CineRegistrationFormProps) {
  const [formData, setFormData] = useState<Partial<Cine>>({
    name: "",
    imageUrl: "",
    pin: "",
    address: "",
    description: "",
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onSave(formData as Cine)
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="max-w-lg w-full bg-gray-900 p-6 rounded-xl shadow-xl text-white overflow-y-auto max-h-[80vh]"
    >
      <h2 className="text-3xl font-bold text-cyan-400 text-center mb-6">Registrar Cine</h2>
      <motion.form
        onSubmit={handleSubmit}
        className="space-y-6"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <div className="space-y-2">
          <Label className="text-cyan-300">Nombre del Cine</Label>
          <Input
            required
            value={formData.name}
            onChange={(e) => setFormData((prev) => ({ ...prev, name: e.target.value }))}
            className="bg-gray-800 border-gray-700 focus:border-cyan-400 text-white rounded-lg"
          />
        </div>

        <div className="space-y-2">
          <Label className="text-cyan-300">Imagen del Cine</Label>
          <ImageUpload
            value={formData.imageUrl || ""}
            onChange={(url) => setFormData((prev) => ({ ...prev, imageUrl: url }))}
          />
        </div>

        <div className="space-y-2">
          <Label className="text-cyan-300">Dirección</Label>
          <Input
            required
            value={formData.address}
            onChange={(e) => setFormData((prev) => ({ ...prev, address: e.target.value }))}
            className="bg-gray-800 border-gray-700 focus:border-cyan-400 text-white rounded-lg"
          />
        </div>

        <div className="space-y-2">
          <Label className="text-cyan-300">Descripción</Label>
          <Textarea
            required
            value={formData.description}
            onChange={(e) => setFormData((prev) => ({ ...prev, description: e.target.value }))}
            className="bg-gray-800 border-gray-700 focus:border-cyan-400 text-white rounded-lg min-h-[100px]"
          />
        </div>

        <div className="space-y-2">
          <Label className="text-cyan-300">Crea un PIN de Acceso</Label>
          <Input
            type="password"
            required
            value={formData.pin}
            onChange={(e) => setFormData((prev) => ({ ...prev, pin: e.target.value }))}
            className="bg-gray-800 border-gray-700 focus:border-cyan-400 text-white rounded-lg"
          />
        </div>

        <Button
          type="submit"
          className="w-full bg-cyan-500 hover:bg-cyan-600 transition-all duration-300 rounded-lg"
        >
          Registrar Cine
        </Button>
      </motion.form>
    </motion.div>
  )
}
