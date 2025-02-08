"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import type { Product, ProductCategory } from "@/types/tienda"
import { Edit, Search, Trash2 } from "lucide-react"
import { ProductDialog } from "./product-dialog"
import Image from "next/image"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog"
import { motion, AnimatePresence } from "framer-motion"

const CATEGORIES: { value: ProductCategory; label: string }[] = [
  { value: "combos", label: "Combos" },
  { value: "bebidas", label: "Bebidas" },
  { value: "individuales", label: "Individuales" },
  { value: "salsas", label: "Salsas" },
  { value: "dulces", label: "Dulces" },
  { value: "helados", label: "Helados" },
  { value: "promociones", label: "Promociones" },
]

// Agregamos un producto de cada categoría
const MOCK_PRODUCTS: Product[] = [
  {
    id: "1",
    name: "Combo Familiar",
    price: 25.99,
    category: "combos",
    description: "Palomitas grandes, 4 bebidas medianas y 2 snacks",
    imageUrl: "/img/tienda/combo-familiar.png",
    stock: 100,
    isPromotion: false,
  },
  {
    id: "2",
    name: "Coca-Cola",
    price: 2.99,
    category: "bebidas",
    description: "Bebida refrescante 500ml",
    imageUrl: "/img/tienda/coca-cola500ml.jpg",
    stock: 150,
    isPromotion: false,
  },
  {
    id: "3",
    name: "Nachos con Queso",
    price: 4.99,
    category: "individuales",
    description: "Crujientes nachos con queso derretido",
    imageUrl: "/img/tienda/nachos-con-queso.jpg",
    stock: 80,
    isPromotion: false,
  },
  {
    id: "4",
    name: "Salsa Barbacoa",
    price: 1.49,
    category: "salsas",
    description: "Deliciosa salsa barbacoa para acompañar",
    imageUrl: "/img/tienda/barbacoa.jpg",
    stock: 200,
    isPromotion: false,
  },
  {
    id: "5",
    name: "Gomitas de Fruta",
    price: 1.99,
    category: "dulces",
    description: "Gomitas variadas de sabores frutales",
    imageUrl: "/img/tienda/gomitas.jpg",
    stock: 120,
    isPromotion: false,
  },
  {
    id: "6",
    name: "Helado de Vainilla",
    price: 3.49,
    category: "helados",
    description: "Cremoso helado de vainilla premium",
    imageUrl: "/img/tienda/helado-vainilla.webp",
    stock: 60,
    isPromotion: false,
  },
  {
    id: "7",
    name: "Combo Promocional",
    price: 19.99,
    category: "promociones",
    description: "2 palomitas medianas y 2 bebidas por precio especial",
    imageUrl: "/img/tienda/promocion1.jpg",
    stock: 50,
    isPromotion: true,
    promotionPrice: 15.99,
  },{
    id: "8",
    name: "Combo 1",
    price: 10.99,
    category: "combos",
    description: "1 canguil mediano + 1 bebida 32oz + 1 hot dog",
    imageUrl: "/img/tienda/combo1.jpg",
    stock: 100
  },{
    id: "9",
    name: "Combo 2",
    price: 10.99,
    category: "combos",
    description: "1 canguil mediano + 1 bebida 32oz + 1 nacho",
    imageUrl: "/img/tienda/combo2.jpg",
    stock: 100
  },{
    id: "10",
    name: "Combo 3",
    price: 14.99,
    category: "combos",
    description: "1 canguil mediano + 2 bebidas 32oz + 2 snack",
    imageUrl: "/img/tienda/combo3.jpg",
    stock: 100
  },{
    id: "11",
    name: "agua con gas",
    price: 2.99,
    category: "bebidas",
    description: "Agua con gas 1.5L",
    imageUrl: "/img/tienda/agua-con-gas.jpg",
    stock: 100
  },{
    id: "12",
    name: "agua sin gas",
    price: 2.99,
    category: "bebidas",
    description: "Agua con gas 1.5L",
    imageUrl: "/img/tienda/agua-sin-gas.jpg",
    stock: 100
  },{
    id: "13",
    name: "Hot Dog",
    price: 4.99,
    category: "individuales",
    description: "Hot Dog con salchicha de pollo",
    imageUrl: "/img/tienda/hot-dog.jpg",
    stock:25
  },{
    id: "14",
    name: "Salsa de queso",
    price: 2.99,
    category: "salsas",
    description: "Salsa de queso para acompañar tus snacks",
    imageUrl: "/img/tienda/salsa-queso.jpg",
    stock: 24
  },{
    id: "15",
    name: "Galak",
    price: 3.99,
    category: "dulces",
    description: "Galak de vainilla",
    imageUrl: "/img/tienda/galak.jpg",
    stock: 100
  },{
    id: "16",
    name: "kitkat",
    price: 3.99,
    category: "dulces",
    description: "Kitkat de chocolate",
    imageUrl: "/img/tienda/kitkat.jpg",
    stock: 100
  },
  {
    id: "17",
    name: "Vaso Marvel",
    price: 4.99,
    category: "promociones",
    description: "Vaso Marvel",
    imageUrl: "/img/tienda/marvel.jpg",
    stock: 100
  }
]

export default function StorePage() {
  const [products, setProducts] = useState<Product[]>(MOCK_PRODUCTS)
  const [search, setSearch] = useState("")
  const [filterCategory, setFilterCategory] = useState<string>("all")
  const [productToDelete, setProductToDelete] = useState<Product | null>(null)
  const [editProduct, setEditProduct] = useState<Product | null>(null)

  const handleAddProduct = (product: Product) => {
    setProducts((prev) => [...prev, { ...product, id: Math.random().toString() }])
  }

  const handleEditProduct = (product: Product) => {
    setProducts((prev) => prev.map((p) => (p.id === product.id ? product : p)))
    setEditProduct(null)
  }

  const handleDeleteProduct = () => {
    if (productToDelete) {
      setProducts((prev) => prev.filter((p) => p.id !== productToDelete.id))
      setProductToDelete(null)
    }
  }

  const filteredProducts = products.filter((product) => {
    const matchesSearch = product.name.toLowerCase().includes(search.toLowerCase())
    const matchesCategory = filterCategory === "all" || product.category === filterCategory
    return matchesSearch && matchesCategory
  })

  // Agrupar productos por categoría
  const groupedProducts = CATEGORIES.reduce(
    (acc, category) => {
      const categoryProducts = filteredProducts.filter((p) => p.category === category.value)
      if (categoryProducts.length > 0) {
        acc[category.value] = categoryProducts
      }
      return acc
    },
    {} as Record<ProductCategory, Product[]>,
  )

  return (
    <div className="">
      <div className="p-6 space-y-8  mx-auto">
        <motion.div
          className="flex items-center justify-between"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h1 className="text-4xl font-bold text-cyan-400">Gestión de Tienda</h1>
          <ProductDialog onSave={handleAddProduct} />
        </motion.div>

        <motion.div
          className="flex flex-col md:flex-row gap-4"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-500" />
            <Input
              placeholder="Buscar productos..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="pl-10 bg-gray-800 border-gray-700 focus:border-cyan-500 text-white"
            />
          </div>
          <Select value={filterCategory} onValueChange={setFilterCategory}>
            <SelectTrigger className="w-full md:w-60 bg-gray-800 border-gray-700 text-white">
              <SelectValue placeholder="Categoría" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Todas</SelectItem>
              {CATEGORIES.map((category) => (
                <SelectItem key={category.value} value={category.value}>
                  {category.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </motion.div>

        <div className="space-y-12">
          <AnimatePresence>
            {Object.entries(groupedProducts).map(([category, products]) => (
              <motion.div
                key={category}
                className="space-y-6"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.5 }}
              >
                <h2 className="text-2xl font-semibold text-purple-400 border-b border-gray-700 pb-2">
                  {CATEGORIES.find((c) => c.value === category)?.label}
                </h2>
                <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
                  {products.map((product) => (
                    <motion.div
                      key={product.id}
                      className="group relative overflow-hidden rounded-lg bg-gray-800 shadow-lg transform transition-transform duration-300 hover:scale-105"
                      whileHover={{ scale: 1.02 }}
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.9 }}
                    >
                      <div className="absolute right-2 top-2 flex gap-2 opacity-0 transform translate-y-2 transition-all duration-300 group-hover:opacity-100 group-hover:translate-y-0 z-10">
                        <Button
                          variant="secondary"
                          size="icon"
                          onClick={() => setEditProduct(product)}
                          className="bg-gray-800 hover:bg-cyan-500 transition-colors"
                        >
                          <Edit className="h-5 w-5 text-white" />
                        </Button>
                        <Button
                          variant="destructive"
                          size="icon"
                          onClick={() => setProductToDelete(product)}
                          className="bg-gray-800 hover:bg-red-500 transition-colors"
                        >
                          <Trash2 className="h-5 w-5 text-white" />
                        </Button>
                      </div>
                      <div className="relative h-64 w-full">
                        <Image
                          src={product.imageUrl || "/placeholder.svg"}
                          alt={product.name}
                          fill
                          className="object-cover transition-transform duration-500 group-hover:scale-105"
                        />
                        {product.isPromotion && (
                          <div className="absolute top-2 left-2 bg-red-500 text-white px-3 py-1 rounded-full text-xs font-bold uppercase shadow-md">
                            Promoción
                          </div>
                        )}
                      </div>
                      <div className="p-5">
                        <h3 className="text-xl font-bold text-white group-hover:text-cyan-400 transition-colors">
                          {product.name}
                        </h3>
                        <div className="mt-2 text-gray-300 line-clamp-2">{product.description}</div>
                        <div className="mt-4 flex items-center justify-between">
                          <div className="space-y-1">
                            <span className="text-2xl font-bold text-cyan-400">
                              ${product.isPromotion && product.promotionPrice ? product.promotionPrice : product.price}
                            </span>
                            {product.isPromotion && product.promotionPrice && (
                              <span className="block text-sm text-gray-400 line-through">
                                ${product.price}
                              </span>
                            )}
                          </div>
                          <span className="text-sm text-gray-400">Stock: {product.stock}</span>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        <AlertDialog open={!!productToDelete} onOpenChange={() => setProductToDelete(null)}>
          <AlertDialogContent className="bg-gray-800 text-white border border-gray-700 backdrop-blur-md">
            <AlertDialogHeader>
              <AlertDialogTitle className="text-2xl font-bold">¿Estás seguro?</AlertDialogTitle>
              <AlertDialogDescription className="mt-2 text-gray-300">
                Esta acción no se puede deshacer. El producto será eliminado permanentemente.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter className="mt-4">
              <AlertDialogCancel className="bg-gray-700 hover:bg-gray-600">
                Cancelar
              </AlertDialogCancel>
              <AlertDialogAction onClick={handleDeleteProduct} className="bg-red-500 hover:bg-red-600">
                Eliminar
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>

        {editProduct && (
          <ProductDialog
            product={editProduct}
            onSave={handleEditProduct}
            open={!!editProduct}
            onOpenChange={() => setEditProduct(null)}
          />
        )}
      </div>
    </div>
  )
}
