"use client" // Asegúrate de que el archivo sea tratado como un componente de cliente

import Link from "next/link"
import { usePathname } from "next/navigation"
import { JSX, useState } from "react"
import { ChevronDown, Menu, X } from "lucide-react"
import { Sliders, Settings, Archive, Home, Ticket, LogOut, ShoppingCart, Film } from "lucide-react" // Asegúrate de importar todos los iconos necesarios

// Definición de interfaces
interface NavItem {
  label: string
  routerLink: string[]
}

interface NavGroup {
  label: string
  items: NavItem[]
}

// Utility function para unir clases CSS
const cn = (...classes: string[]) => classes.filter(Boolean).join(' ')

// Mapeo de iconos
const iconMap: Record<string, JSX.Element> = {
  "Regresar a EvenTix": <Home className="h-5 w-5 bg-gradient-to-r from-purple-600 to-blue-800 text-white p-1 rounded-full" />,
  "EvenTix-Cine": <Film className="h-5 w-5 bg-gradient-to-r from-purple-600 to-blue-800 text-white p-1 rounded-full" />,
  "salas": <Sliders className="h-5 w-5 bg-gradient-to-r from-purple-600 to-blue-800 text-white p-1 rounded-full" />, // Cambiado a Sliders
  "Roles": <Settings className="h-5 w-5 bg-gradient-to-r from-purple-600 to-blue-800 text-white p-1 rounded-full" />,
  "personal": <Settings className="h-5 w-5 bg-gradient-to-r from-purple-600 to-blue-800 text-white p-1 rounded-full" />, // Cambiado a Settings
  "asignacion": <Archive className="h-5 w-5 bg-gradient-to-r from-purple-600 to-blue-800 text-white p-1 rounded-full" />, // Cambiado a Archive
  "Productos": <ShoppingCart className="h-5 w-5 bg-gradient-to-r from-purple-600 to-blue-800 text-white p-1 rounded-full" />,
  "Inventario": <ShoppingCart className="h-5 w-5 bg-gradient-to-r from-purple-600 to-blue-800 text-white p-1 rounded-full" />,
  "Venta de Boletos": <Ticket className="h-5 w-5 bg-gradient-to-r from-purple-600 to-blue-800 text-white p-1 rounded-full" />,
  "Historial de Compras": <Ticket className="h-5 w-5 bg-gradient-to-r from-purple-600 to-blue-800 text-white p-1 rounded-full" />,
  "Gestion Peliculas": <Film className="h-5 w-5 bg-gradient-to-r from-purple-600 to-blue-800 text-white p-1 rounded-full" />,
  "Cerrar sesión": <LogOut className="h-5 w-5 bg-gradient-to-r from-purple-600 to-blue-800 text-white p-1 rounded-full" />
}

export function SideNav({ items }: { className?: string; items: NavGroup[] }) {
  const pathname = usePathname()
  const [openSections, setOpenSections] = useState<string[]>([])
  const [isSidebarOpen, setIsSidebarOpen] = useState(false)

  const toggleSection = (sectionId: string) => {
    setOpenSections(prev =>
      prev.includes(sectionId) ? prev.filter(id => id !== sectionId) : [...prev, sectionId]
    )
  }

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen)
  }

  return (
    <>
      {/* Botón hamburguesa para móviles */}
      <button
        onClick={toggleSidebar}
        className={`fixed top-4 left-2 z-50 p-2 bg-[#1D1E2C] rounded-lg md:hidden transition-all duration-300 
        ${isSidebarOpen ? "translate-x-60" : "translate-x-0"}`}
      >
        <span className="transition-transform duration-300 ease-in-out" style={{ transform: isSidebarOpen ? "rotate(180deg)" : "rotate(0deg)" }}>
          {isSidebarOpen ? <X className="h-6 w-6 text-white" /> : <Menu className="h-6 w-6 text-white" />}
        </span>
      </button>

      {/* Sidebar */}
      <div
        className={cn(
          "fixed inset-y-0 left-0 w-64 bg-[#1D1E2C]/90 backdrop-blur-lg border border-white/20 shadow-xl shadow-white/10 transition-transform duration-300 ease-in-out transform z-50",          
          isSidebarOpen ? "translate-x-0" : "-translate-x-full",
          "md:translate-x-0 md:relative md:bg-opacity-100"
        )}
      >
        <div className="space-y-4 py-4">
          <div className="px-6 text-gray-400">
            {items.map((group, index) => {
              const sectionId = `item-${index}`
              const isOpen = openSections.includes(sectionId)

              return (
                <div key={index}>
                  <div className="border-b border-[#2A2B3C] mb-2">
                    <button
                      onClick={() => toggleSection(sectionId)}
                      className="flex items-center justify-between w-full py-4 text-sm font-medium hover:text-[#E59D23] transition-colors"
                    >
                      {group.label}
                      <ChevronDown
                        className={cn(
                          "h-4 w-4 transition-transform duration-200",
                          isOpen ? "transform rotate-180" : ""
                        )}
                      />
                    </button>
                  </div>

                  <div className={cn(
                      "overflow-hidden transition-all duration-200 ease-in-out",
                      isOpen ? "max-h-96 opacity-100 mb-4" : "max-h-0 opacity-0"
                    )}>
                      <div className="relative flex flex-col space-y-2 pt-2 border-l-2 border-purple-500 shadow-[0_0_10px_rgba(128,0,128,0.7)] ml-4 pl-4">
                        {group.items.map((item, itemIndex) => (
                          <Link
                            key={itemIndex}
                            href={item.routerLink[0]}
                            className={cn(
                              "flex items-center gap-3 rounded-lg px-3 py-2 text-sm relative transition-all hover:text-[#E59D23]",
                              pathname === item.routerLink[0] ? "bg-[#2A2B3C] text-[#E59D23]" : "transparent"
                            )}
                          >
                            {/* Línea horizontal para conectar con la rama */}
                            <span className="absolute left-[-16px] top-1/2 h-0.5 w-4 bg-purple-500"></span>
                            
                            {/* Aquí cargamos el icono correspondiente */}
                            {iconMap[item.label]}
                            {item.label}
                          </Link>
                        ))}
                      </div>
                    </div>
                </div>
              )
            })}
          </div>
        </div>
      </div>
    </>
  )
}
