import { SideNav } from "./side-nav"
import { TopBar } from "./top-bar"

const navigationItems = [
  {
    label: "Inicio",
    items: [
      { label: "Regresar a EvenTix", icon: "pi pi-home", routerLink: ["http://localhost:3001/admin"] },
      { label: "EvenTix-Cine", icon: "pi pi-plus", routerLink: ["/admin-cine"] },
    ],
  },
  {
    label: "Gestión de Cine",
    items: [
      { label: "salas", icon: "sliders", routerLink: ["/admin-cine/salas"] },
    ],
  },
  {
    label: "Gestión de Personal",
    items: [
      { label: "Roles", icon: "settings", routerLink: ["/admin-cine/personal/roles"] },
      { label: "personal", icon: "settings", routerLink: ["/admin-cine/personal"] },
      { label: "asignacion", icon: "archive", routerLink: ["/admin-cine/personal/asignacion"] },
    ]
  },
  {
    label: "Tienda",
    items: [
      { label: "Productos", icon: "shopping-cart", routerLink: ["/admin-cine/tienda"] }, 
      { label: "Inventario", icon: "shopping-cart", routerLink:["/admin-cine/tienda/inventario"] },
    ],
  },
  {
    label: "Boletos",
    items: [
      { label: "Venta de Boletos", icon: "ticket", routerLink: ["/admin/boletos"] },
      { label: "Historial de Compras", icon: "ticket", routerLink: ["/admin/historial-boletos"] },
    ],
  },
  {
    label: "Peliculas",
    items: [
      { label: "Gestion Peliculas", icon: "film", routerLink: ["/admin-cine/peliculas"] }
    ],
  },
  {
    label: "Sesión",
    items: [
      { label: "Cerrar sesión", icon: "log-out", routerLink: ["/auth"] },
    ],
  },
];

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="bg-gradient-to-br from-purple-900 via-[#1c1c25] to-blue-900  max-w mx-auto ">
      <div className="flex min-h-screen">
        <SideNav items={navigationItems} />
        <div className="flex-1">
          <TopBar />
          <main className="flex-1 p-3">{children}</main>
        </div>
      </div>
    </div>
  )
}
