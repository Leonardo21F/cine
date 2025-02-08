"use client";

import { useState, useMemo } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableHeader,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
} from "@/components/ui/table";
import { AssignmentDialog } from "@/components/assignment-dialog";
import { Trash2, Edit, Search } from "lucide-react";
import { StaffMember, RoleAssignment } from "@/types/staff";

export default function RoleAssignmentManagement() {
  const [searchTerm, setSearchTerm] = useState<string>("");

  const [staff] = useState<StaffMember[]>([
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
  ]);

  const roles = [
    { id: "1", name: "Cajero de Boletos" },
    { id: "2", name: "Cajero de Comida" },
    { id: "3", name: "Limpieza de Sala" },
    { id: "4", name: "Limpieza de Baños" },
    { id: "5", name: "Proyección de Películas" },
    { id: "6", name: "Control de Entrada" },
    { id: "7", name: "Mantenimiento" },
    { id: "8", name: "Seguridad" },
    { id: "9", name: "Venta de Snacks" },
    { id: "10", name: "Coordinador" },
  ];


  const [assignments, setAssignments] = useState<RoleAssignment[]>(
    staff.map((member, index) => ({
      id: crypto.randomUUID(),
      staffId: member.id,
      staffName: member.name,
      roleId: roles[index % roles.length].id,
      roleName: roles[index % roles.length].name,
      startTime: `0${9 + index}:00`,
      endTime: `${17 + (index % 2)}:00`,
    }))
  );

  const [selectedAssignment, setSelectedAssignment] = useState<RoleAssignment | null>(null);

  const filteredAssignments = useMemo(() => {
    return assignments.filter(
      (assignment) =>
        assignment.staffName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        assignment.roleName.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [assignments, searchTerm]);

  const handleSaveAssignment = (assignment: RoleAssignment) => {
    setAssignments((prev) =>
      assignment.id
        ? prev.map((a) => (a.id === assignment.id ? assignment : a))
        : [...prev, { ...assignment, id: crypto.randomUUID() }]
    );
    setSelectedAssignment(null);
  };

  const handleDeleteAssignment = (assignmentId: string) => {
    setAssignments((prev) => prev.filter((a) => a.id !== assignmentId));
  };

  return (
    <div className="p-6 space-y-6  min-h-screen">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-4xl font-bold text-cyan-300 tracking-tight">
          Gestión de Roles y Actividades
        </h1>
        <Button
          onClick={() => setSelectedAssignment({} as RoleAssignment)}
          className="bg-cyan-500 hover:bg-cyan-600 text-white rounded-full shadow-lg transition-all"
        >
          Nueva Asignación
        </Button>
      </div>

      <div className="flex items-center space-x-4 mb-4">
        <div className="relative flex-grow">
          <Input
            type="text"
            placeholder="Buscar por nombre o rol..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10 bg-gray-800 text-white border-gray-700 focus:border-cyan-500"
          />
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
        </div>
      </div>

      <div className="overflow-hidden rounded-xl bg-gray-800 bg-opacity-60 backdrop-blur-md shadow-2xl">
        <Table className="w-full text-white">
          <TableHeader className="bg-gray-900 bg-opacity-70">
            <TableRow>
              <TableHead>Personal</TableHead>
              <TableHead>Rol</TableHead>
              <TableHead>Horario</TableHead>
              <TableHead className="text-right">Acciones</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredAssignments.map((assignment) => (
              <TableRow key={assignment.id} className="hover:bg-gray-700/50 transition-colors">
                <TableCell>{assignment.staffName}</TableCell>
                <TableCell>{assignment.roleName}</TableCell>
                <TableCell>
                  {assignment.startTime && assignment.endTime
                    ? `${assignment.startTime} - ${assignment.endTime}`
                    : "Sin horario"}
                </TableCell>
                <TableCell className="text-right">
                  <div className="flex justify-end space-x-2">
                    <Button
                      variant="secondary"
                      size="icon"
                      onClick={() => setSelectedAssignment(assignment)}
                      className="bg-gray-700 hover:bg-cyan-500 transition-colors rounded-full"
                    >
                      <Edit className="h-4 w-4 text-white" />
                    </Button>
                    <Button
                      variant="destructive"
                      size="icon"
                      onClick={() => handleDeleteAssignment(assignment.id)}
                      className="bg-red-700 hover:bg-red-600 transition-colors rounded-full"
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

      {selectedAssignment && (
        <AssignmentDialog
          isOpen={!!selectedAssignment}
          onClose={() => setSelectedAssignment(null)}
          onSave={handleSaveAssignment}
          assignment={selectedAssignment.id ? selectedAssignment : undefined}
          staffList={staff}
          roleList={roles}
        />
      )}
    </div>
  );
}