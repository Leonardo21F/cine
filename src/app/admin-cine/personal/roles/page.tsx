// RolesManagement.tsx

"use client"

import { useState } from "react"
import { RoleDialog } from "@/components/RoleDialog"
import { Button } from "@/components/ui/button"
import {
    Table,
    TableHeader,
    TableRow,
    TableHead,
    TableBody,
    TableCell,
} from "@/components/ui/table"
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle as AlertDialogTitleComponent } from "@/components/ui/alert-dialog"
import { Edit, Trash2 } from "lucide-react"

interface Role {
    id: string
    name: string
    description: string
}

export default function RolesManagement() {
    const [roles, setRoles] = useState<Role[]>([
        { id: "1", name: "Administrador", description: "Gestiona el cine y el personal" },
        { id: "2", name: "Cajero", description: "Vende boletos y alimentos" },
        { id: "3", name: "Limpieza", description: "Mantiene las salas y áreas limpias" },
    ])
    const [openDialog, setOpenDialog] = useState(false)
    const [editRole, setEditRole] = useState<Role | null>(null)
    const [roleToDelete, setRoleToDelete] = useState<Role | null>(null)

    const handleAddRole = (role: Role) => {
        setRoles((prev) => [...prev, { ...role, id: Math.random().toString() }])
        setOpenDialog(false)
    }

    const handleEditRole = (updatedRole: Role) => {
        setRoles((prev) => prev.map((role) => (role.id === updatedRole.id ? updatedRole : role)))
        setEditRole(null)
    }

    const handleDeleteRole = () => {
        if (roleToDelete) {
            setRoles((prev) => prev.filter((role) => role.id !== roleToDelete.id))
            setRoleToDelete(null)
        }
    }

    return (
        <div className="p-6 space-y-6">
            <div className="flex items-center justify-between">
                <h1 className="text-3xl font-bold text-cyan-400">Gestión de Roles</h1>
                <Button onClick={() => setOpenDialog(true)} className="bg-cyan-500 hover:bg-cyan-600 text-white rounded-full">
                    Agregar Rol
                </Button>
            </div>

            {/* Tabla de roles */}
            <div className="overflow-auto rounded-lg bg-gray-800 bg-opacity-50 backdrop-blur-md shadow-lg">
                <Table className="min-w-full text-white">
                    <TableHeader className="bg-gray-900 bg-opacity-70">
                        <TableRow>
                            <TableHead>Nombre del Rol</TableHead>
                            <TableHead>Descripción</TableHead>
                            <TableHead>Acciones</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {roles.map((role) => (
                            <TableRow key={role.id} className="bg-gray-800 bg-opacity-30">
                                <TableCell>{role.name}</TableCell>
                                <TableCell>{role.description}</TableCell>
                                <TableCell>
                                    <div className="flex gap-2">
                                        <Button
                                            variant="secondary"
                                            size="icon"
                                            onClick={() => setEditRole(role)}
                                            className="bg-gray-700 hover:bg-cyan-500 transition-colors rounded-full"
                                        >
                                            <Edit className="h-4 w-4 text-white" />
                                        </Button>
                                        <Button
                                            variant="destructive"
                                            size="icon"
                                            onClick={() => setRoleToDelete(role)}
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

            {/* Diálogo para agregar/editar rol */}
            {(openDialog || editRole) && (
                <RoleDialog
                    isOpen={openDialog || !!editRole}
                    onClose={() => {
                        setOpenDialog(false)
                        setEditRole(null)
                    }}
                    onSave={editRole ? handleEditRole : handleAddRole}
                    role={editRole || undefined}
                />
            )}

            {/* Confirmación para eliminar un rol */}
            <AlertDialog open={!!roleToDelete} onOpenChange={() => setRoleToDelete(null)}>
                <AlertDialogContent className="bg-gray-800 bg-opacity-80 text-white border border-gray-700 rounded-lg shadow-lg backdrop-blur-md">
                    <AlertDialogHeader>
                        <AlertDialogTitleComponent className="text-2xl font-bold">Eliminar Rol</AlertDialogTitleComponent>
                        <AlertDialogDescription>
                            ¿Estás seguro de que deseas eliminar el rol? Esta acción no se puede deshacer.
                        </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter className="mt-4">
                        <AlertDialogCancel className="bg-gray-700 hover:bg-gray-600 rounded-full">Cancelar</AlertDialogCancel>
                        <AlertDialogAction
                            onClick={handleDeleteRole}
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
