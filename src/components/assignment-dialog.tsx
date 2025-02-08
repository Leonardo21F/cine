"use client"

import { useState } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { motion } from "framer-motion"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Input } from "@/components/ui/input"
import { StaffMember, RoleAssignment } from "@/types/staff"

interface AssignmentDialogProps {
    isOpen: boolean
    onClose: () => void
    onSave: (assignment: RoleAssignment) => void
    assignment?: RoleAssignment
    staffList: StaffMember[]
    roleList: { id: string; name: string }[]
}

export function AssignmentDialog({
    isOpen,
    onClose,
    onSave,
    assignment,
    staffList,
    roleList,
}: AssignmentDialogProps) {
    const [formData, setFormData] = useState<{
        staffId: string
        roleId: string
        startTime: string
        endTime: string
    }>({
        staffId: assignment?.staffId || "",
        roleId: assignment?.roleId || "",
        startTime: assignment?.startTime || "09:00",
        endTime: assignment?.endTime || "17:00",
    })

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault()

        // Validate required fields
        if (!formData.staffId || !formData.roleId) {
            alert("Por favor complete todos los campos")
            return
        }

        const staffMember = staffList.find((s) => s.id === formData.staffId)
        const role = roleList.find((r) => r.id === formData.roleId)

        if (!staffMember || !role) {
            alert("Selección inválida")
            return
        }

        // Validate time range
        const [startHours, startMinutes] = formData.startTime.split(":").map(Number)
        const [endHours, endMinutes] = formData.endTime.split(":").map(Number)

        const startDate = new Date(0, 0, 0, startHours, startMinutes)
        const endDate = new Date(0, 0, 0, endHours, endMinutes)

        if (startDate >= endDate) {
            alert("La hora de inicio debe ser anterior a la hora de fin")
            return
        }

        const completeAssignment: RoleAssignment = {
            id: assignment?.id || crypto.randomUUID(),
            staffId: staffMember.id,
            staffName: staffMember.name,
            roleId: role.id,
            roleName: role.name,
            startTime: formData.startTime,
            endTime: formData.endTime,
        }

        onSave(completeAssignment)
        onClose()
    }

    return (
        <Dialog open={isOpen} onOpenChange={onClose}>
            <DialogContent className="max-w-lg bg-gray-800 bg-opacity-80 text-white border border-gray-700 rounded-lg shadow-lg backdrop-blur-md">
                <DialogHeader>
                    <DialogTitle className="text-2xl font-bold">
                        {assignment ? "Editar Asignación" : "Nueva Asignación"}
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
                        <Label className="text-white">Personal</Label>
                        <Select
                            value={formData.staffId}
                            onValueChange={(value) => setFormData((prev) => ({ ...prev, staffId: value }))}
                        >
                            <SelectTrigger className="w-full bg-gray-700 bg-opacity-50 border-gray-600 focus:border-cyan-500 text-white rounded-full">
                                <SelectValue placeholder="Selecciona personal" />
                            </SelectTrigger>
                            <SelectContent>
                                {staffList.map((staff) => (
                                    <SelectItem key={staff.id} value={staff.id}>
                                        {staff.name}
                                    </SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                    </div>

                    <div className="space-y-2">
                        <Label className="text-white">Rol</Label>
                        <Select
                            value={formData.roleId}
                            onValueChange={(value) => setFormData((prev) => ({ ...prev, roleId: value }))}
                        >
                            <SelectTrigger className="w-full bg-gray-700 bg-opacity-50 border-gray-600 focus:border-cyan-500 text-white rounded-full">
                                <SelectValue placeholder="Selecciona un rol" />
                            </SelectTrigger>
                            <SelectContent>
                                {roleList.map((role) => (
                                    <SelectItem key={role.id} value={role.id}>
                                        {role.name}
                                    </SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                            <Label className="text-white">Hora de Inicio</Label>
                            <Input
                                type="time"
                                required
                                value={formData.startTime}
                                onChange={(e) => setFormData((prev) => ({ ...prev, startTime: e.target.value }))}
                                className="bg-gray-700 bg-opacity-50 border-gray-600 focus:border-cyan-500 text-white rounded-full"
                            />
                        </div>
                        <div className="space-y-2">
                            <Label className="text-white">Hora de Fin</Label>
                            <Input
                                type="time"
                                required
                                value={formData.endTime}
                                onChange={(e) => setFormData((prev) => ({ ...prev, endTime: e.target.value }))}
                                className="bg-gray-700 bg-opacity-50 border-gray-600 focus:border-cyan-500 text-white rounded-full"
                            />
                        </div>
                    </div>

                    <Button
                        type="submit"
                        className="w-full bg-cyan-500 hover:bg-cyan-600 transition-all duration-300 rounded-full"
                    >
                        {assignment ? "Guardar Cambios" : "Asignar Actividad"}
                    </Button>
                </motion.form>
            </DialogContent>
        </Dialog>
    )
}