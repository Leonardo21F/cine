"use client"

import { useState } from "react"
import type { Maintenance, Theater } from "@/types/sala"
import { AnimatedCard } from "@/components/ui/animated-card"
import { CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Trash2, Calendar, PenToolIcon as Tool, Clock } from "lucide-react"
import { format, parse, isAfter } from "date-fns"
import { es } from "date-fns/locale"
import { motion, AnimatePresence } from "framer-motion"
import { cn } from "@/lib/utils"

interface MaintenanceCardProps {
  maintenance: Maintenance
  theater: Theater | undefined
  onDelete: () => void
  index: number
}

export function MaintenanceCard({ maintenance, theater, onDelete, index }: MaintenanceCardProps) {
  const [isHovered, setIsHovered] = useState(false)

  const scheduledDate = parse(maintenance.scheduledDate, "yyyy-MM-dd'T'HH:mm:ss", new Date())
  const isPastMaintenance = isAfter(new Date(), scheduledDate)

  return (
    <AnimatedCard
      className={cn(
        "h-full flex flex-col justify-between transition-all duration-300",
        isHovered ? "shadow-lg ring-2 ring-cyan-400" : "",
        isPastMaintenance ? "opacity-70" : "",
      )}
      delay={index * 0.1}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <CardHeader className="pb-2">
        <CardTitle className="text-white flex items-center justify-between">
          <motion.span initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}>
            {theater?.name || "Sala desconocida"}
          </motion.span>
          <motion.span
            className={cn(
              "text-sm px-2 py-1 rounded-full",
              isPastMaintenance ? "bg-gray-500/20 text-gray-400" : "bg-green-500/20 text-green-400",
            )}
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: "spring", stiffness: 500, damping: 30 }}
          >
            {isPastMaintenance ? "Completado" : "Programado"}
          </motion.span>
        </CardTitle>
        <CardDescription className="text-gray-300 flex items-center mt-2">
          <Calendar className="h-4 w-4 mr-2 text-cyan-400" />
          {format(scheduledDate, "dd/MM/yyyy HH:mm", { locale: es })}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <motion.div className="space-y-2" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.2 }}>
          <div className="flex items-center text-sm text-gray-400">
            <Tool className="h-4 w-4 mr-2 text-cyan-400" />
            <span>Descripción:</span>
          </div>
          <motion.p
            className="text-sm text-gray-300 pl-6"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            {maintenance.description}
          </motion.p>
        </motion.div>
      </CardContent>
      <CardFooter className="pt-4 flex justify-between items-center">
        <div className="text-sm text-gray-400 flex items-center">
          <Clock className="h-4 w-4 mr-2 text-cyan-400" />
          {isPastMaintenance ? "Realizado hace" : "Programado para"}{" "}
          {format(scheduledDate, "dd 'días'", { locale: es })}
        </div>
        <AnimatePresence>
          {isHovered && (
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              transition={{ duration: 0.2 }}
            >
              <Button
                variant="ghost"
                size="sm"
                onClick={onDelete}
                className="bg-red-500/10 text-red-400 hover:bg-red-500/20 hover:text-red-300 transition-all duration-300"
              >
                <Trash2 className="h-4 w-4" />
              </Button>
            </motion.div>
          )}
        </AnimatePresence>
      </CardFooter>
    </AnimatedCard>
  )
}

