"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
import { ImageUpload } from "@/components/image-upload"
import { motion } from "framer-motion"
import type { Product, ProductCategory } from "@/types/tienda"

const CATEGORIES: { value: ProductCategory; label: string }[] = [
  { value: "combos", label: "Combos" },
  { value: "bebidas", label: "Bebidas" },
  { value: "individuales", label: "Individuales" },
  { value: "salsas", label: "Salsas" },
  { value: "dulces", label: "Dulces" },
  { value: "helados", label: "Helados" },
  { value: "promociones", label: "Promociones" },
]

interface ProductDialogProps {
  product?: Product
  onSave: (product: Product) => void
  open?: boolean
  onOpenChange?: (open: boolean) => void
}

export function ProductDialog({ product, onSave, open, onOpenChange }: ProductDialogProps) {
  const [formData, setFormData] = useState<Partial<Product>>(
    product || {
      name: "",
      price: 0,
      category: "individuales",
      description: "",
      imageUrl: "",
      stock: 0,
      isPromotion: false,
    },
  )

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onSave(formData as Product)
    if (!product) {
      setFormData({
        name: "",
        price: 0,
        category: "individuales",
        description: "",
        imageUrl: "",
        stock: 0,
        isPromotion: false,
      })
    }
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogTrigger asChild>
        <Button className="bg-cyan-500 hover:bg-cyan-600 transition-all duration-300 hover:scale-105 text-white">
          {product ? "Editar Producto" : "Agregar Producto"}
        </Button>
      </DialogTrigger>
      <DialogContent className="max-h-[90vh] overflow-y-auto bg-gray-800/95 backdrop-blur-md border-gray-700">
        <DialogHeader>
          <DialogTitle className="text-cyan-400 text-white">
            {product ? "Editar Producto" : "Agregar Nuevo Producto"}
          </DialogTitle>
        </DialogHeader>
        <motion.form
          onSubmit={handleSubmit}
          className="space-y-6"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className="space-y-4">
            <Label className="text-white">Imagen del Producto</Label>
            <ImageUpload
              value={formData.imageUrl || ""}
              onChange={(url) => setFormData((prev) => ({ ...prev, imageUrl: url }))}
            />
          </div>

          <div className="space-y-4">
            <Label className="text-white">Nombre</Label>
            <Input
              required
              value={formData.name}
              onChange={(e) => setFormData((prev) => ({ ...prev, name: e.target.value }))}
              className="bg-gray-700 border-gray-600 focus:border-cyan-500 text-white"
            />
          </div>

          <div className="grid gap-6 sm:grid-cols-2">
            <div className="space-y-4">
              <Label className="text-white">Precio</Label>
              <Input
                type="number"
                step="0.01"
                required
                value={formData.price}
                onChange={(e) => setFormData((prev) => ({ ...prev, price: Number.parseFloat(e.target.value) }))}
                className="bg-gray-700 border-gray-600 focus:border-cyan-500 text-white"
              />
            </div>

            <div className="space-y-4">
              <Label className="text-white">Stock</Label>
              <Input
                type="number"
                required
                value={formData.stock}
                onChange={(e) => setFormData((prev) => ({ ...prev, stock: Number.parseInt(e.target.value) }))}
                className="bg-gray-700 border-gray-600 focus:border-cyan-500 text-white"
              />
            </div>
          </div>

          <div className="space-y-4">
            <Label className="text-white">Categoría</Label>
            <Select
              value={formData.category}
              onValueChange={(value: ProductCategory) => setFormData((prev) => ({ ...prev, category: value }))}
            >
              <SelectTrigger className="bg-gray-700 border-gray-600 text-white">
                <SelectValue placeholder="Seleccionar categoría" />
              </SelectTrigger>
              <SelectContent>
                {CATEGORIES.map((category) => (
                  <SelectItem key={category.value} value={category.value}>
                    {category.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-4">
            <Label className="text-white">Descripción</Label>
            <Textarea
              required
              value={formData.description}
              onChange={(e) => setFormData((prev) => ({ ...prev, description: e.target.value }))}
              className="bg-gray-700 border-gray-600 focus:border-cyan-500 text-white min-h-[120px]"
            />
          </div>

          <div className="flex items-center space-x-4">
            <Switch
              id="promotion"
              checked={formData.isPromotion}
              onCheckedChange={(checked) => setFormData((prev) => ({ ...prev, isPromotion: checked }))}
            />
            <Label htmlFor="promotion" className="text-white">
              ¿Es una promoción?
            </Label>
          </div>

          {formData.isPromotion && (
            <motion.div
              className="space-y-4"
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              transition={{ duration: 0.3 }}
            >
              <Label className="text-white">Precio de promoción</Label>
              <Input
                type="number"
                step="0.01"
                required
                value={formData.promotionPrice}
                onChange={(e) =>
                  setFormData((prev) => ({
                    ...prev,
                    promotionPrice: Number.parseFloat(e.target.value),
                  }))
                }
                className="bg-gray-700 border-gray-600 focus:border-cyan-500 text-white"
              />
            </motion.div>
          )}

          <Button
            type="submit"
            className="w-full bg-cyan-500 hover:bg-cyan-600 transition-all duration-300 hover:scale-105 text-white"
          >
            {product ? "Guardar Cambios" : "Agregar Producto"}
          </Button>
        </motion.form>
      </DialogContent>
    </Dialog>
  )
}
