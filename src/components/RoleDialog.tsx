// RoleDialog.tsx

"use client"

import { useState } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { motion } from "framer-motion"

interface Role {
  id: string
  name: string
  description: string
}

interface RoleDialogProps {
  isOpen: boolean
  onClose: () => void
  onSave: (role: Role) => void
  role?: Role
}

export function RoleDialog({ isOpen, onClose, onSave, role }: RoleDialogProps) {
  const [formData, setFormData] = useState<Partial<Role>>(role || { name: "", description: "" })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (formData.name && formData.description) {
      onSave({ ...formData, id: role?.id || Math.random().toString() } as Role)
      onClose()
    }
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-lg bg-gray-800 bg-opacity-80 text-white border border-gray-700 rounded-lg shadow-lg backdrop-blur-md">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold">
            {role ? "Editar Rol" : "Agregar Nuevo Rol"}
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
            <Label className="text-white">Nombre del Rol</Label>
            <Input
              required
              value={formData.name}
              onChange={(e) => setFormData((prev) => ({ ...prev, name: e.target.value }))}
              className="bg-gray-700 bg-opacity-50 border-gray-600 focus:border-cyan-500 text-white rounded-full"
            />
          </div>

          <div className="space-y-2">
            <Label className="text-white">Descripción</Label>
            <Input
              required
              value={formData.description}
              onChange={(e) => setFormData((prev) => ({ ...prev, description: e.target.value }))}
              className="bg-gray-700 bg-opacity-50 border-gray-600 focus:border-cyan-500 text-white rounded-full"
            />
          </div>

          <Button
            type="submit"
            className="w-full bg-cyan-500 hover:bg-cyan-600 transition-all duration-300 rounded-full"
          >
            {role ? "Guardar Cambios" : "Agregar Rol"}
          </Button>
        </motion.form>
      </DialogContent>
    </Dialog>
  )
}
