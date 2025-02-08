// types/staff.ts
export interface StaffMember {
    id: string
    name: string
    email: string
    phone: string
    isActive: boolean
}

export interface RoleAssignment {
    id: string
    staffId: string
    staffName: string
    roleId: string
    roleName: string
    startTime: string  // Keep as formatted time string
    endTime: string    // Keep as formatted time string
}