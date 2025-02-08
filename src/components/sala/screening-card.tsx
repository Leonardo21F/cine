"use client"

import { useState } from "react"
import type { Screening, Movie, Theater } from "@/types/sala"
import { Button } from "@/components/ui/button"
import { Trash2, Clock, Users, Film } from "lucide-react"
import { format, parse } from "date-fns"
import { es } from "date-fns/locale"
import { motion, AnimatePresence } from "framer-motion"
import { cn } from "@/lib/utils"

interface ScreeningCardProps {
  screening: Screening
  movie: Movie | undefined
  theater: Theater | undefined
  onDelete: () => void
}

export function ScreeningCard({ screening, movie, theater, onDelete }: ScreeningCardProps) {
  const [isHovered, setIsHovered] = useState(false)

  const startTime = parse(screening.startTime, "yyyy-MM-dd'T'HH:mm:ss", new Date())
  const endTime = parse(screening.endTime, "yyyy-MM-dd'T'HH:mm:ss", new Date())

  const ticketsSoldPercentage = theater ? (screening.ticketsSold / theater.capacity) * 100 : 0

  return (
    <motion.div
      className={cn(
        "mb-4 p-4 bg-gray-800 rounded-lg shadow-md transition-all duration-300",
        isHovered ? "shadow-lg ring-2 ring-cyan-400" : "",
      )}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="flex justify-between items-start mb-2">
        <div>
          <motion.span
            className="font-semibold text-lg text-cyan-400"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
          >
            {movie?.title}
          </motion.span>
          <motion.div
            className="text-sm text-gray-400 mt-1"
            initial={{ opacity: 0, y: -5 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            {theater?.name}
          </motion.div>
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
                className="text-red-400 hover:text-red-300 hover:bg-red-400/10"
                onClick={onDelete}
              >
                <Trash2 className="h-4 w-4" />
              </Button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
      <div className="space-y-2">
        <motion.div
          className="flex items-center text-sm text-gray-300"
          initial={{ opacity: 0, x: -10 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.3 }}
        >
          <Clock className="h-4 w-4 mr-2 text-cyan-400" />
          {format(startTime, "dd/MM/yyyy HH:mm", { locale: es })} - {format(endTime, "HH:mm", { locale: es })}
        </motion.div>
        <motion.div
          className="flex items-center text-sm text-gray-300"
          initial={{ opacity: 0, x: -10 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.4 }}
        >
          <Users className="h-4 w-4 mr-2 text-cyan-400" />
          Boletos vendidos: {screening.ticketsSold} / {theater?.capacity}
        </motion.div>
        <motion.div
          className="relative pt-1"
          initial={{ opacity: 0, scaleX: 0 }}
          animate={{ opacity: 1, scaleX: 1 }}
          transition={{ delay: 0.5, duration: 0.5 }}
        >
          <div className="overflow-hidden h-2 text-xs flex rounded bg-cyan-200">
            <div
              style={{ width: `${ticketsSoldPercentage}%` }}
              className="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-cyan-500"
            ></div>
          </div>
        </motion.div>
      </div>
      <AnimatePresence>
        {isHovered && (
          <motion.div
            className="mt-3 text-sm text-gray-400"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
            transition={{ duration: 0.2 }}
          >
            <div className="flex items-center">
              <Film className="h-4 w-4 mr-2 text-cyan-400" />
              {movie?.genre} | {movie?.duration} min | {movie?.rating}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  )
}

