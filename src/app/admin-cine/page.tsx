"use client"

import { motion } from "framer-motion";
import Image from "next/image";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";

export default function DashboardPage() {
  const router = useRouter();

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <Card className="bg-black/40 backdrop-blur-xl border-cyan-500/20">
        <CardHeader>
          <CardTitle className="bg-gradient-to-r from-cyan-500 to-blue-500 bg-clip-text text-transparent text-xl">
            Administración de Cine
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-gray-300">Administra cines, personal y la tienda de snacks desde un solo lugar.</div>
        </CardContent>
      </Card>

      {/* Stats Grid */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        {[
          { title: "Ventas Totales", value: "$25,678", change: "+15%", gradient: "from-cyan-500 to-blue-500" },
          { title: "Empleados", value: "30", change: "+3", gradient: "from-green-500 to-emerald-500" },
          { title: "Snacks Vendidos", value: "1,500", change: "+20%", gradient: "from-yellow-500 to-orange-500" },
          { title: "Salas Ocupadas", value: "8/10", change: "-1", gradient: "from-purple-500 to-pink-500" },
        ].map((stat, i) => (
          <motion.div key={stat.title} initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: i * 0.1 }} whileHover={{ scale: 1.05 }}>
            <Card className="border-cyan-500/20 bg-black/40 backdrop-blur-xl overflow-hidden">
              <div className={`h-1 w-full bg-gradient-to-r ${stat.gradient}`} />
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium text-gray-200">{stat.title}</CardTitle>
                <motion.span className="text-xs text-green-500" initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ delay: i * 0.1 + 0.3 }}>
                  {stat.change}
                </motion.span>
              </CardHeader>
              <CardContent>
                <div className={`text-2xl font-bold bg-gradient-to-r ${stat.gradient} bg-clip-text text-transparent`}>{stat.value}</div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>

      {/* Management Sections */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {[
          { title: "Administrar Cines", route: "/admin/peliculas", image: "/img/peliculas.png" },
          { title: "Gestionar Empleados", route: "/admin/empleados", image: "/img/personal.png" },
          { title: "Tienda de Snacks", route: "/admin/snacks", image: "/img/snacks.png" },
        ].map((section, i) => (
          <motion.div key={section.title} initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: i * 0.2 }} whileHover={{ scale: 1.05 }}>
            <Card className="border-cyan-500/20 bg-black/40 backdrop-blur-xl overflow-hidden">
              <div className="relative w-full h-40">
                <Image src={section.image} alt={section.title} fill className="object-cover" />
              </div>
              <CardHeader>
                <CardTitle className="text-gray-200 text-lg">{section.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <Button onClick={() => router.push(section.route)} className="w-full bg-cyan-500 hover:bg-cyan-600 transition-all duration-300">
                  Ir a {section.title}
                </Button>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
