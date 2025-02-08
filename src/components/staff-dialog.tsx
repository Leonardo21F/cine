// staff-dialog.tsx

"use client"

import { useState } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { motion } from "framer-motion"

interface StaffMember {
  id: string
  name: string
  email: string
  phone: string
  isActive: boolean
}

interface StaffDialogProps {
  isOpen: boolean
  onClose: () => void
  onSave: (member: StaffMember) => void
  staffMember?: StaffMember
}

export function StaffDialog({ isOpen, onClose, onSave, staffMember }: StaffDialogProps) {
  const [formData, setFormData] = useState<Partial<StaffMember>>(
    staffMember || { name: "", email: "", phone: "" },
  )

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (formData.name && formData.email && formData.phone) {
      onSave({ ...formData, id: staffMember?.id || Math.random().toString(), isActive: true } as StaffMember)
      onClose()
    }
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-lg bg-gray-800 bg-opacity-80 text-white border border-gray-700 rounded-lg shadow-lg backdrop-blur-md">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold">
            {staffMember ? "Editar Personal" : "Agregar Nuevo Personal"}
          </DialogTitle>
        </DialogHeader>
        <motion.form
          onSubmit={handleSubmit}
          className="space-y-6 mt-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          <div className="space-y-2">
            <Label className="text-white">Nombre</Label>
            <Input
              required
              value={formData.name}
              onChange={(e) => setFormData((prev) => ({ ...prev, name: e.target.value }))}
              className="bg-gray-700 bg-opacity-50 border-gray-600 focus:border-cyan-500 text-white rounded-full"
            />
          </div>

          <div className="space-y-2">
            <Label className="text-white">Email</Label>
            <Input
              type="email"
              required
              value={formData.email}
              onChange={(e) => setFormData((prev) => ({ ...prev, email: e.target.value }))}
              className="bg-gray-700 bg-opacity-50 border-gray-600 focus:border-cyan-500 text-white rounded-full"
            />
          </div>

          <div className="space-y-2">
            <Label className="text-white">Teléfono</Label>
            <Input
              required
              value={formData.phone}
              onChange={(e) => setFormData((prev) => ({ ...prev, phone: e.target.value }))}
              className="bg-gray-700 bg-opacity-50 border-gray-600 focus:border-cyan-500 text-white rounded-full"
            />
          </div>

          <Button
            type="submit"
            className="w-full bg-cyan-500 hover:bg-cyan-600 transition-all duration-300 rounded-full"
          >
            {staffMember ? "Guardar Cambios" : "Agregar Personal"}
          </Button>
        </motion.form>
      </DialogContent>
    </Dialog>
  )
}
