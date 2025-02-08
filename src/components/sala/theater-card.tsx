import { useState } from "react"
import type { Theater } from "@/types/sala"
import { AnimatedCard } from "@/components/ui/animated-card"
import { CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Settings, Edit, Trash2, Eye, ChevronDown } from "lucide-react"
import Link from "next/link"
import { motion, AnimatePresence } from "framer-motion"
import { cn } from "@/lib/utils"

interface TheaterCardProps {
  theater: Theater
  status: string
  movieTitle?: string 
  onEdit: () => void
  onDelete: () => void
  index: number
}

export function TheaterCard({ theater, status, movieTitle, onEdit, onDelete, index }: TheaterCardProps) {
  const [isExpanded, setIsExpanded] = useState(false)

  return (
    <AnimatedCard
      className={cn(
        "h-full flex flex-col justify-between transition-all duration-300",
        isExpanded ? "ring-2 ring-cyan-400" : "",
      )}
      delay={index * 0.1}
    >
      <CardHeader className="pb-2">
        <CardTitle className="flex justify-between items-center text-white">
          <motion.span initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}>
            {theater.name}
          </motion.span>
          <motion.span
            className={cn(
              "text-sm px-2 py-1 rounded-full",
              status === "Disponible"
                ? "bg-green-500/20 text-green-400"
                : status === "En función"
                  ? "bg-yellow-500/20 text-yellow-400"
                  : "bg-red-500/20 text-red-400",
            )}
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: "spring", stiffness: 500, damping: 30 }}
          >
            {status}
          </motion.span>
        </CardTitle>
        <CardDescription className="text-gray-300">
          <motion.div initial={{ opacity: 0, y: -5 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}>
            Capacidad: {theater.capacity} | Tipo: {theater.type}
          </motion.div>
          {status === "En función" && (
            <motion.div
              className="text-cyan-400 mt-1"
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
            >
              Película: {movieTitle}
            </motion.div>
          )}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <motion.div className="space-y-2" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.3 }}>
          <div className="flex items-center justify-between cursor-pointer" onClick={() => setIsExpanded(!isExpanded)}>
            <div className="flex items-center space-x-2">
              <Settings className="w-4 h-4 text-cyan-400" />
              <span className="text-sm text-gray-400">Comodidades:</span>
            </div>
            <ChevronDown
              className={cn(
                "w-4 h-4 text-gray-400 transition-transform duration-300",
                isExpanded ? "transform rotate-180" : "",
              )}
            />
          </div>
          <AnimatePresence>
            {isExpanded && (
              <motion.ul
                className="list-disc list-inside text-sm text-gray-300 mt-2"
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.3 }}
              >
                {theater.amenities.map((amenity, index) => (
                  <motion.li
                    key={index}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                  >
                    {amenity}
                  </motion.li>
                ))}
              </motion.ul>
            )}
          </AnimatePresence>
        </motion.div>
      </CardContent>
      <CardFooter className="flex justify-between mt-auto pt-4">
        <Button variant="outline" size="sm" asChild>
          <Link href="/admin-cine/salas/mapeo" className="flex items-center">
            <Eye className="mr-2 h-4 w-4" />
            Ver sala
          </Link>
        </Button>
        <div className="space-x-2">
          <Button
            variant="ghost"
            size="sm"
            onClick={onEdit}
            className="bg-blue-500 text-white hover:bg-blue-600 transition-all duration-300"
          >
            <Edit className="h-4 w-4" />
          </Button>
          <Button
            variant="ghost"
            size="sm"
            onClick={onDelete}
            className="bg-red-500 text-white hover:bg-red-600 transition-all duration-300"
          >
            <Trash2 className="h-4 w-4" />
          </Button>
        </div>
      </CardFooter>
    </AnimatedCard>
  )
}

