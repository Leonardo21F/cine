// InventoryManagement.tsx

"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import {
  Table,
  TableHeader,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
} from "@/components/ui/table"
import { InventoryDialog } from "@/components/inventory-dialog"
import { format } from "date-fns"
import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogCancel,
  AlertDialogAction,
} from "@/components/ui/alert-dialog"
import { motion } from "framer-motion"
import { Edit, Trash2 } from "lucide-react"

// Definición de la interfaz para los elementos del inventario
interface InventoryItem {
  id: string
  name: string
  quantity: number
  lastUpdated: Date
  categories: string[]
}

export default function InventoryManagement() {
  const [_inventory, setInventory] = useState<InventoryItem[]>([])
  const [_editItem, setEditItem] = useState<InventoryItem | null>(null)
  const [_itemToDelete, setItemToDelete] = useState<InventoryItem | null>(null)
  const [_lowStockItems, setLowStockItems] = useState<InventoryItem[]>([])

  useEffect(() => {
    // Cargar el inventario inicial (puede ser reemplazado por una llamada a una API)
    const _initialInventory = [
      {
        id: "1",
        name: "Papas Fritas",
        quantity: 10,
        lastUpdated: new Date(),
        categories: ["Snacks", "Salados"],
      },
      {
        id: "2",
        name: "Canguil",
        quantity: 4,
        lastUpdated: new Date(),
        categories: ["Snacks"],
      },
      {
        id: "3",
        name: "Gaseosa",
        quantity: 2,
        lastUpdated: new Date(),
        categories: ["Bebidas", "Snacks"],
      },
      {
        id: "4",
        name: "Helado",
        quantity: 1,
        lastUpdated: new Date(),
        categories: ["Helados", "Dulces"],
      },
      {
        id: "5",
        name: "Palomitas",
        quantity: 3,
        lastUpdated: new Date(),
        categories: ["Snacks"],
      },
      {
        id: "6",
        name: "Cerveza",
        quantity: 6,
        lastUpdated: new Date(),
        categories: ["Bebidas"],
      }
      // Agrega más productos según sea necesario
    ]
    setInventory(_initialInventory)
  }, [])

  useEffect(() => {
    // Actualizar la lista de productos con bajo stock
    const _lowStock = _inventory.filter((item) => item.quantity < 5)
    setLowStockItems(_lowStock)
  }, [_inventory])

  // Función para agregar un nuevo item al inventario
  const handleAddItem = (item: InventoryItem) => {
    // Validar el nombre del producto para evitar inyecciones de script
    const _sanitizedItemName = item.name.replace(/<[^>]*>/g, "");
    setInventory((prev) => [
      ...prev,
      { ...item, name: _sanitizedItemName, id: Math.random().toString(), lastUpdated: new Date() },
    ])
  }

  // Función para editar un item existente
  const handleEditItem = (item: InventoryItem) => {
    const _sanitizedItemName = item.name.replace(/<[^>]*>/g, "");
    setInventory((prev) =>
      prev.map((i) =>
        i.id === item.id ? { ...item, name: _sanitizedItemName, lastUpdated: new Date() } : i,
      ),
    )
    setEditItem(null)
  }

  // Función para eliminar un item
  const handleDeleteItem = () => {
    if (_itemToDelete) {
      setInventory((prev) => prev.filter((i) => i.id !== _itemToDelete.id))
      setItemToDelete(null)
    }
  }

  return (
    <div className="p-6 space-y-6">
      <motion.div
        className="flex items-center justify-between"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h1 className="text-3xl font-bold text-cyan-400">
          Control de Inventario
        </h1>
        <InventoryDialog onSave={handleAddItem} />
      </motion.div>

      {/* Alerta de productos con bajo stock */}
      {_lowStockItems.length > 0 && (
        <motion.div
          className="p-4 bg-red-500 bg-opacity-80 text-white rounded-md shadow-md backdrop-blur-md"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="font-bold">
            ¡Atención! Los siguientes productos tienen bajo stock:
          </h2>
          <ul className="list-disc list-inside">
            {_lowStockItems.map((item) => (
              <li key={item.id}>
                {item.name} - Quedan {item.quantity} unidades
              </li>
            ))}
          </ul>
        </motion.div>
      )}

      {/* Tabla de inventario */}
      <div className="overflow-auto rounded-lg bg-gray-800 bg-opacity-50 backdrop-blur-md shadow-lg">
        <Table className="min-w-full text-white">
          <TableHeader className="bg-gray-900 bg-opacity-70">
            <TableRow>
              <TableHead>Producto</TableHead>
              <TableHead>Categorías</TableHead>
              <TableHead>Cantidad</TableHead>
              <TableHead>Última Actualización</TableHead>
              <TableHead>Acciones</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {_inventory.map((item) => (
              <TableRow
                key={item.id}
                className={`${item.quantity < 5
                  ? "bg-red-700 bg-opacity-50"
                  : "bg-gray-800 bg-opacity-30"
                  }`}
              >
                <TableCell>{item.name}</TableCell>
                <TableCell>{item.categories.join(", ")}</TableCell>
                <TableCell>{item.quantity}</TableCell>
                <TableCell>
                  {format(new Date(item.lastUpdated), "dd/MM/yyyy HH:mm")}
                </TableCell>
                <TableCell>
                  <div className="flex gap-2">
                    <Button
                      variant="secondary"
                      size="icon"
                      onClick={() => setEditItem(item)}
                      className="bg-gray-700 hover:bg-cyan-500 transition-colors rounded-full"
                    >
                      <Edit className="h-4 w-4 text-white" />
                    </Button>
                    <Button
                      variant="destructive"
                      size="icon"
                      onClick={() => setItemToDelete(item)}
                      className="bg-gray-700 hover:bg-red-500 transition-colors rounded-full"
                    >
                      <Trash2 className="h-4 w-4 text-white" />
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      {/* Diálogo para editar un producto */}
      {_editItem && (
        <InventoryDialog
          item={_editItem}
          onSave={handleEditItem}
          open={!!_editItem}
          onOpenChange={() => setEditItem(null)}
        />
      )}

      {/* Confirmación para eliminar un producto */}
      <AlertDialog open={!!_itemToDelete} onOpenChange={() => setItemToDelete(null)}>
        <AlertDialogContent className="bg-gray-800 bg-opacity-80 text-white border border-gray-700 rounded-lg shadow-lg backdrop-blur-md">
          <AlertDialogHeader>
            <AlertDialogTitle className="text-2xl font-bold">
              Eliminar Producto
            </AlertDialogTitle>
            <AlertDialogDescription>
              ¿Estás seguro de que deseas eliminar ?
              Esta acción no se puede deshacer.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter className="mt-4">
            <AlertDialogCancel className="bg-gray-700 hover:bg-gray-600 rounded-full">
              Cancelar
            </AlertDialogCancel>
            <AlertDialogAction
              onClick={handleDeleteItem}
              className="bg-red-500 hover:bg-red-600 rounded-full"
            >
              Eliminar
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  )
}