// inventory-dialog.tsx

"use client"

import { useState } from "react"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { motion } from "framer-motion"
import { MultiSelect } from "@/components/ui/multi-select"

interface InventoryItem {
  id: string
  name: string
  quantity: number
  lastUpdated: Date
  categories: string[]
}

interface InventoryDialogProps {
  item?: InventoryItem
  onSave: (item: InventoryItem) => void
  open?: boolean
  onOpenChange?: (open: boolean) => void
}

const CATEGORY_OPTIONS = [
  { value: "bebidas", label: "Bebidas" },
  { value: "individuales", label: "Individuales" },
  { value: "salsas", label: "Salsas" },
  { value: "dulces", label: "Dulces" },
  { value: "helados", label: "Helados" },
  { value: "snacks", label: "Snacks" },
  { value: "combos", label: "Combos" },
  // Agrega más categorías según necesites
]

export function InventoryDialog({
  item,
  onSave,
  open,
  onOpenChange,
}: InventoryDialogProps) {
  const [formData, setFormData] = useState<Partial<InventoryItem>>(
    item || {
      name: "",
      quantity: 0,
      categories: [],
    },
  )

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onSave({ ...formData, lastUpdated: new Date() } as InventoryItem)
    if (!item) {
      setFormData({
        name: "",
        quantity: 0,
        categories: [],
      })
    }
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      {!open && (
        <DialogTrigger asChild>
          <Button className="bg-cyan-500 hover:bg-cyan-600 transition-all duration-300 hover:scale-105 text-white rounded-full">
            {item ? "Editar Producto" : "Agregar Producto"}
          </Button>
        </DialogTrigger>
      )}
      <DialogContent className="max-w-lg bg-gray-800 bg-opacity-80 text-white border border-gray-700 rounded-lg shadow-lg backdrop-blur-md">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold">
            {item ? "Editar Producto" : "Agregar Nuevo Producto"}
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
            <Label className="text-white">Nombre del Producto</Label>
            <Input
              required
              value={formData.name}
              onChange={(e) =>
                setFormData((prev) => ({ ...prev, name: e.target.value }))
              }
              className="bg-gray-700 bg-opacity-50 border-gray-600 focus:border-cyan-500 text-white rounded-full"
            />
          </div>

          <div className="space-y-2">
            <Label className="text-white">Categorías</Label>
            <MultiSelect
              options={CATEGORY_OPTIONS}
              value={formData.categories || []}
              onChange={(values) =>
                setFormData((prev) => ({ ...prev, categories: values }))
              }
              className="bg-gray-700 bg-opacity-50 border-gray-600 focus:border-cyan-500 text-white rounded-full"
              placeholder="Selecciona categorías"
            />
          </div>

          <div className="space-y-2">
            <Label className="text-white">Cantidad en Stock</Label>
            <Input
              type="number"
              required
              value={formData.quantity}
              onChange={(e) =>
                setFormData((prev) => ({
                  ...prev,
                  quantity: Number.parseInt(e.target.value),
                }))
              }
              className="bg-gray-700 bg-opacity-50 border-gray-600 focus:border-cyan-500 text-white rounded-full"
            />
          </div>

          <Button
            type="submit"
            className="w-full bg-cyan-500 hover:bg-cyan-600 transition-all duration-300 rounded-full"
          >
            {item ? "Guardar Cambios" : "Agregar Producto"}
          </Button>
        </motion.form>
      </DialogContent>
    </Dialog>
  )
}
