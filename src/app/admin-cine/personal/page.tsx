// StaffManagement.tsx

"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import {
  Table,
  TableHeader,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
} from "@/components/ui/table"
import { Edit, Trash2 } from "lucide-react"
import { StaffDialog } from "@/components/staff-dialog"
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle as AlertDialogTitleComponent } from "@/components/ui/alert-dialog"

interface StaffMember {
  id: string
  name: string
  email: string
  phone: string
  isActive: boolean
}

export default function StaffManagement() {
  const [staff, setStaff] = useState<StaffMember[]>([
    { id: "1", name: "Juan Pérez", email: "juan@example.com", phone: "555-1234", isActive: true },
    { id: "2", name: "María Gómez", email: "maria@example.com", phone: "555-5678", isActive: true },
    { id: "3", name: "Carlos López", email: "carlos@example.com", phone: "555-8765", isActive: true },
    { id: "4", name: "Ana Martínez", email: "ana@example.com", phone: "555-4321", isActive: true },
    { id: "5", name: "Luis Torres", email: "luis@example.com", phone: "555-6789", isActive: true },
    { id: "6", name: "Sofía Ramírez", email: "sofia@example.com", phone: "555-3456", isActive: true },
    { id: "7", name: "Pedro Sánchez", email: "pedro@example.com", phone: "555-9876", isActive: true },
    { id: "8", name: "Lucía Fernández", email: "lucia@example.com", phone: "555-2468", isActive: true },
    { id: "9", name: "Diego Herrera", email: "diego@example.com", phone: "555-1357", isActive: true },
    { id: "10", name: "Gabriela Castro", email: "gabriela@example.com", phone: "555-8642", isActive: true },
    // Agrega más personal según necesites
  ])
  const [openDialog, setOpenDialog] = useState(false)
  const [editStaff, setEditStaff] = useState<StaffMember | null>(null)
  const [staffToDelete, setStaffToDelete] = useState<StaffMember | null>(null)

  const handleAddStaff = (member: StaffMember) => {
    setStaff((prev) => [...prev, { ...member, id: Math.random().toString(), isActive: true }])
    setOpenDialog(false)
  }

  const handleEditStaff = (updatedMember: StaffMember) => {
    setStaff((prev) => prev.map((member) => (member.id === updatedMember.id ? updatedMember : member)))
    setEditStaff(null)
  }

  const handleDeleteStaff = () => {
    if (staffToDelete) {
      setStaff((prev) =>
        prev.map((member) =>
          member.id === staffToDelete.id ? { ...member, isActive: false } : member,
        ),
      )
      setStaffToDelete(null)
    }
  }

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold text-cyan-400">Gestión de Personal</h1>
        <Button onClick={() => setOpenDialog(true)} className="bg-cyan-500 hover:bg-cyan-600 text-white rounded-full">
          Agregar Personal
        </Button>
      </div>

      {/* Tabla de personal */}
      <div className="overflow-auto rounded-lg bg-gray-800 bg-opacity-50 backdrop-blur-md shadow-lg">
        <Table className="min-w-full text-white">
          <TableHeader className="bg-gray-900 bg-opacity-70">
            <TableRow>
              <TableHead>Nombre</TableHead>
              <TableHead>Email</TableHead>
              <TableHead>Teléfono</TableHead>
              <TableHead>Estatus</TableHead>
              <TableHead>Acciones</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {staff.map((member) => (
              <TableRow
                key={member.id}
                className={`${!member.isActive ? "bg-red-700 bg-opacity-50" : "bg-gray-800 bg-opacity-30"}`}
              >
                <TableCell>{member.name}</TableCell>
                <TableCell>{member.email}</TableCell>
                <TableCell>{member.phone}</TableCell>
                <TableCell>{member.isActive ? "Activo" : "Inactivo"}</TableCell>
                <TableCell>
                  <div className="flex gap-2">
                    <Button
                      variant="secondary"
                      size="icon"
                      onClick={() => setEditStaff(member)}
                      className="bg-gray-700 hover:bg-cyan-500 transition-colors rounded-full"
                    >
                      <Edit className="h-4 w-4 text-white" />
                    </Button>
                    <Button
                      variant="destructive"
                      size="icon"
                      onClick={() => setStaffToDelete(member)}
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

      {/* Diálogo para agregar/editar personal */}
      {(openDialog || editStaff) && (
        <StaffDialog
          isOpen={openDialog || !!editStaff}
          onClose={() => {
            setOpenDialog(false)
            setEditStaff(null)
          }}
          onSave={editStaff ? handleEditStaff : handleAddStaff}
          staffMember={editStaff || undefined}
        />
      )}

      {/* Confirmación para eliminar personal */}
      <AlertDialog open={!!staffToDelete} onOpenChange={() => setStaffToDelete(null)}>
        <AlertDialogContent className="bg-gray-800 bg-opacity-80 text-white border border-gray-700 rounded-lg shadow-lg backdrop-blur-md">
          <AlertDialogHeader>
            <AlertDialogTitleComponent className="text-2xl font-bold">Eliminar Personal</AlertDialogTitleComponent>
            <AlertDialogDescription>
              ¿Estás seguro de que deseas marcar como inactivo a este personal? Podrás activarlo nuevamente en cualquier momento.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter className="mt-4">
            <AlertDialogCancel className="bg-gray-700 hover:bg-gray-600 rounded-full">Cancelar</AlertDialogCancel>
            <AlertDialogAction
              onClick={handleDeleteStaff}
              className="bg-red-500 hover:bg-red-600 rounded-full"
            >
              Marcar como Inactivo
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  )
}
