"use client"

import { useState } from "react"
import type { Theater, Movie, Screening, Maintenance, TheaterType } from "@/types/sala"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Calendar } from "@/components/ui/calendar"
import { cn } from "@/lib/utils"
import { format, addMinutes, parse, isBefore, isAfter } from "date-fns"
import { es } from "date-fns/locale"
import { CalendarIcon } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"
import { TheaterCard } from "@/components/sala/theater-card"
import { MaintenanceCard } from "@/components/sala/maintenance-card"
import { ScreeningCard } from "@/components/sala/screening-card"

// Mock data (updated to include ticketsSold)
const MOCK_THEATERS: Theater[] = [
  {
    id: "1",
    name: "Sala 1",
    capacity: 100,
    type: "2D",
    amenities: ["Aire acondicionado", "Sonido Dolby"],
    status: "available",
    lastMaintenance: "2023-01-01",
    nextMaintenance: "2023-07-01",
  },
  {
    id: "2",
    name: "Sala 2",
    capacity: 150,
    type: "3D",
    amenities: ["Aire acondicionado", "Sonido Dolby", "Asientos reclinables"],
    status: "occupied",
    lastMaintenance: "2023-02-01",
    nextMaintenance: "2023-08-01",
  },
  {
    id: "3",
    name: "Sala IMAX",
    capacity: 200,
    type: "IMAX",
    amenities: ["Aire acondicionado", "Sonido IMAX", "Pantalla gigante"],
    status: "maintenance",
    lastMaintenance: "2023-03-01",
    nextMaintenance: "2023-09-01",
  },
]

const MOCK_MOVIES: Movie[] = [
  {
    id: "1",
    title: "Spider-man No Way Home",
    duration: 148,
    genre: "Sci-Fi",
    rating: "PG-13",
    posterUrl: "/placeholder.svg?height=400&width=300",
  },
  {
    id: "2",
    title: "Capitan Ameica",
    duration: 175,
    genre: "Drama",
    rating: "R",
    posterUrl: "/placeholder.svg?height=400&width=300",
  },
  {
    id: "3",
    title: "El Conjuro",
    duration: 81,
    genre: "Animation",
    rating: "G",
    posterUrl: "/placeholder.svg?height=400&width=300",
  },
]

const MOCK_SCREENINGS: Screening[] = [
  {
    id: "1",
    movieId: "1",
    theaterId: "1",
    startTime: "2023-06-01T10:00:00",
    endTime: "2023-06-01T12:28:00",
    ticketsSold: 75,
  },
  {
    id: "2",
    movieId: "2",
    theaterId: "2",
    startTime: "2023-06-01T14:00:00",
    endTime: "2023-06-01T16:55:00",
    ticketsSold: 120,
  },
  {
    id: "3",
    movieId: "3",
    theaterId: "3",
    startTime: "2023-06-01T18:00:00",
    endTime: "2023-06-01T19:21:00",
    ticketsSold: 180,
  },
]

const MOCK_MAINTENANCES: Maintenance[] = [
  {
    id: "1",
    theaterId: "1",
    scheduledDate: "2023-07-01T09:00:00",
    description: "Limpieza general y revisión de equipos",
  },
  { id: "2", theaterId: "2", scheduledDate: "2023-08-01T09:00:00", description: "Mantenimiento de proyector 3D" },
  {
    id: "3",
    theaterId: "3",
    scheduledDate: "2023-09-01T09:00:00",
    description: "Calibración de sistema de sonido IMAX",
  },
]

export default function TheatersPage() {
  const [theaters, setTheaters] = useState<Theater[]>(MOCK_THEATERS)
  const [screenings, setScreenings] = useState<Screening[]>(MOCK_SCREENINGS)
  const [maintenances, setMaintenances] = useState<Maintenance[]>(MOCK_MAINTENANCES)
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(new Date())
  const [selectedTheater, setSelectedTheater] = useState<string | undefined>(undefined)
  const [selectedMovie, setSelectedMovie] = useState<string | undefined>(undefined)
  const [selectedTime, setSelectedTime] = useState<string>("")
  const [showAddTheaterDialog, setShowAddTheaterDialog] = useState(false)
  const [showEditTheaterDialog, setShowEditTheaterDialog] = useState(false)
  const [showAddMaintenanceDialog, setShowAddMaintenanceDialog] = useState(false)
  const [editingTheater, setEditingTheater] = useState<Theater | null>(null)
  const [newTheater, setNewTheater] = useState<Partial<Theater>>({})
  const [newMaintenance, setNewMaintenance] = useState<Partial<Maintenance>>({})

  const handleAddTheater = () => {
    if (newTheater.name && newTheater.capacity && newTheater.type) {
      const theater: Theater = {
        id: Date.now().toString(),
        name: newTheater.name,
        capacity: Number(newTheater.capacity),
        type: newTheater.type as TheaterType,
        amenities: newTheater.amenities || [],
        status: "available",
        lastMaintenance: format(new Date(), "yyyy-MM-dd"),
        nextMaintenance: format(addMinutes(new Date(), 60 * 24 * 30), "yyyy-MM-dd"), // Next maintenance in 30 days
      }
      setTheaters([...theaters, theater])
      setShowAddTheaterDialog(false)
      setNewTheater({})
    }
  }

  const handleEditTheater = () => {
    if (editingTheater) {
      setTheaters(theaters.map((t) => (t.id === editingTheater.id ? editingTheater : t)))
      setShowEditTheaterDialog(false)
      setEditingTheater(null)
    }
  }

  const handleDeleteTheater = (id: string) => {
    setTheaters(theaters.filter((t) => t.id !== id))
    setScreenings(screenings.filter((s) => s.theaterId !== id))
    setMaintenances(maintenances.filter((m) => m.theaterId !== id))
  }

  const handleAddScreening = () => {
    if (selectedDate && selectedTheater && selectedMovie && selectedTime) {
      const movie = MOCK_MOVIES.find((m) => m.id === selectedMovie)
      const startTime = format(parse(selectedTime, "HH:mm", selectedDate), "yyyy-MM-dd'T'HH:mm:ss")
      const endTime = format(
        addMinutes(parse(startTime, "yyyy-MM-dd'T'HH:mm:ss", new Date()), movie?.duration || 0),
        "yyyy-MM-dd'T'HH:mm:ss",
      )

      // Check for conflicts
      const hasConflict = screenings.some(
        (screening) =>
          screening.theaterId === selectedTheater &&
          isBefore(
            parse(screening.startTime, "yyyy-MM-dd'T'HH:mm:ss", new Date()),
            parse(endTime, "yyyy-MM-dd'T'HH:mm:ss", new Date()),
          ) &&
          isAfter(
            parse(screening.endTime, "yyyy-MM-dd'T'HH:mm:ss", new Date()),
            parse(startTime, "yyyy-MM-dd'T'HH:mm:ss", new Date()),
          ),
      )

      if (hasConflict) {
        alert("Hay un conflicto de horarios. Por favor, elige un horario o sala diferente.")
        return
      }

      const newScreening: Screening = {
        id: Date.now().toString(),
        movieId: selectedMovie,
        theaterId: selectedTheater,
        startTime,
        endTime,
        ticketsSold: 0,
      }
      setScreenings([...screenings, newScreening])
      setSelectedTime("")
    }
  }

  const handleDeleteScreening = (id: string) => {
    setScreenings(screenings.filter((s) => s.id !== id))
  }

  const handleAddMaintenance = () => {
    if (newMaintenance.theaterId && newMaintenance.scheduledDate && newMaintenance.description) {
      const maintenance: Maintenance = {
        ...(newMaintenance as Maintenance),
        id: Date.now().toString(),
      }
      setMaintenances([...maintenances, maintenance])
      setShowAddMaintenanceDialog(false)
      setNewMaintenance({})
    }
  }

  const handleDeleteMaintenance = (id: string) => {
    setMaintenances(maintenances.filter((m) => m.id !== id))
  }

  const filteredScreenings = screenings.filter(
    (screening) =>
      (!selectedDate || screening.startTime.startsWith(format(selectedDate, "yyyy-MM-dd"))) &&
      (!selectedTheater || screening.theaterId === selectedTheater),
  )

  const getTheaterStatus = (theaterId: string): { status: string; movieTitle?: string } => {
    const currentTime = new Date()
    const currentScreening = screenings.find(
      (s) =>
        s.theaterId === theaterId &&
        isBefore(parse(s.startTime, "yyyy-MM-dd'T'HH:mm:ss", new Date()), currentTime) &&
        isAfter(parse(s.endTime, "yyyy-MM-dd'T'HH:mm:ss", new Date()), currentTime),
    )

    if (currentScreening) {
      const movie = MOCK_MOVIES.find((m) => m.id === currentScreening.movieId)
      return { status: "En función", movieTitle: movie?.title }
    }

    const currentMaintenance = maintenances.find(
      (m) =>
        m.theaterId === theaterId &&
        isBefore(parse(m.scheduledDate, "yyyy-MM-dd'T'HH:mm:ss", new Date()), currentTime) &&
        isAfter(addMinutes(parse(m.scheduledDate, "yyyy-MM-dd'T'HH:mm:ss", new Date()), 60), currentTime),
    )

    if (currentMaintenance) {
      return { status: "En limpieza" }
    }

    return { status: "Disponible" }
  }

  const theaterStatuses = theaters.reduce<Record<string, { status: string; movieTitle?: string }>>((acc, theater) => {
    acc[theater.id] = getTheaterStatus(theater.id)
    return acc
  }, {})

  return (
    <div className=" p-6">
      <motion.div
        className="mb-6 flex justify-between items-center"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h1 className="text-3xl font-bold text-cyan-400">Gestión de Salas</h1>
        <div className="space-x-2">
          <Button onClick={() => setShowAddTheaterDialog(true)} className="bg-cyan-500 hover:bg-cyan-600">
            Agregar Sala
          </Button>
        </div>
      </motion.div>

      <Tabs defaultValue="inventory" className="space-y-4">
        <TabsList className="bg-gray-800/50 border-gray-700">
          <TabsTrigger value="inventory" className="data-[state=active]:bg-cyan-500 text-white">
            Inventario de Salas
          </TabsTrigger>
          <TabsTrigger value="maintenance" className="data-[state=active]:bg-cyan-500 text-white">
            Mantenimiento
          </TabsTrigger>
          <TabsTrigger value="scheduling" className="data-[state=active]:bg-cyan-500 text-white">
            Programación
          </TabsTrigger>
        </TabsList>

        <TabsContent value="inventory" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            <AnimatePresence>
              {theaters.map((theater, index) => {
                const { status, movieTitle } = theaterStatuses[theater.id]
                return (
                  <motion.div
                    key={theater.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ duration: 0.3, delay: index * 0.1 }}
                  >
                    <TheaterCard
                      theater={theater}
                      status={status}
                      movieTitle={movieTitle}
                      onEdit={() => {
                        setEditingTheater(theater)
                        setShowEditTheaterDialog(true)
                      }}
                      onDelete={() => handleDeleteTheater(theater.id)}
                      index={index}
                    />
                  </motion.div>
                )
              })}
            </AnimatePresence>
          </div>
        </TabsContent>

        <TabsContent value="maintenance" className="space-y-4">
          <Button onClick={() => setShowAddMaintenanceDialog(true)} className="mb-4 bg-cyan-500 hover:bg-cyan-600">
            Programar Mantenimiento
          </Button>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {maintenances.map((maintenance, index) => {
              const theater = theaters.find((t) => t.id === maintenance.theaterId)
              return (
                <MaintenanceCard
                  key={maintenance.id}
                  maintenance={maintenance}
                  theater={theater}
                  onDelete={() => handleDeleteMaintenance(maintenance.id)}
                  index={index}
                />
              )
            })}
          </div>
        </TabsContent>

        <TabsContent value="scheduling" className="space-y-4">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
            <Card className="bg-gray-800/50 border-gray-700 lg:col-span-2">
              <CardHeader>
                <CardTitle className="text-white">Programación de funciones</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex flex-col space-y-4 md:flex-row md:space-x-4 md:space-y-0">
                    <div className="flex-1 space-y-2">
                      <Label className="text-white">Fecha</Label>
                      <Popover>
                        <PopoverTrigger asChild>
                          <Button
                            variant={"outline"}
                            className={cn(
                              "w-full justify-start text-left font-normal",
                              !selectedDate && "text-muted-foreground",
                            )}
                          >
                            <CalendarIcon className="mr-2 h-4 w-4" />
                            {selectedDate ? ( 
                              format(selectedDate, "PPP", { locale: es })
                            ) : (
                              <span>Selecciona una fecha</span>
                            )}
                          </Button>
                        </PopoverTrigger>
                        <PopoverContent className="w-auto p-0" align="start">
                          <Calendar mode="single" selected={selectedDate} onSelect={setSelectedDate} initialFocus />
                        </PopoverContent>
                      </Popover>
                    </div>
                    <div className="flex-1 space-y-2">
                      <Label htmlFor="theater" className="text-white">
                        Sala
                      </Label>
                      <Select value={selectedTheater} onValueChange={setSelectedTheater}>
                        <SelectTrigger id="theater" className="bg-gray-800/50 border-gray-700 text-white">
                          <SelectValue placeholder="Seleccionar sala" />
                        </SelectTrigger>
                        <SelectContent>
                          {theaters.map((theater) => (
                            <SelectItem key={theater.id} value={theater.id}>
                              {theater.name}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="flex-1 space-y-2">
                      <Label htmlFor="movie" className="text-white">
                        Película
                      </Label>
                      <Select value={selectedMovie} onValueChange={setSelectedMovie}>
                        <SelectTrigger id="movie" className="bg-gray-800/50 border-gray-700 text-white">
                          <SelectValue placeholder="Seleccionar película" />
                        </SelectTrigger>
                        <SelectContent>
                          {MOCK_MOVIES.map((movie) => (
                            <SelectItem key={movie.id} value={movie.id}>
                              {movie.title}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="time" className="text-white">
                      Hora
                    </Label>
                    <Input
                      id="time"
                      type="time"
                      value={selectedTime}
                      onChange={(e) => setSelectedTime(e.target.value)}
                      className="bg-gray-800/50 border-gray-700 text-white"
                    />
                  </div>
                  <Button onClick={handleAddScreening} className="w-full bg-cyan-500 hover:bg-cyan-600">
                    Agregar función
                  </Button>
                </div>
              </CardContent>
            </Card>
            <Card className="bg-gray-800/50 border-gray-700">
              <CardHeader>
                <CardTitle className="text-white">Funciones programadas</CardTitle>
              </CardHeader>
              <CardContent>
                <ScrollArea className="h-[300px]">
                  {filteredScreenings.map((screening) => {
                    const movie = MOCK_MOVIES.find((m) => m.id === screening.movieId)
                    const theater = theaters.find((t) => t.id === screening.theaterId)
                    return (
                      <ScreeningCard
                        key={screening.id}
                        screening={screening}
                        movie={movie}
                        theater={theater}
                        onDelete={() => handleDeleteScreening(screening.id)}
                      />
                    )
                  })}
                </ScrollArea>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>

      <AnimatePresence>
        {showAddTheaterDialog && (
          <Dialog open={showAddTheaterDialog} onOpenChange={setShowAddTheaterDialog}>
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.2 }}
            >
              <DialogContent className="bg-gray-900/95 backdrop-blur-sm border-gray-800">
                <DialogHeader>
                  <DialogTitle className="text-white">Agregar nueva sala</DialogTitle>
                </DialogHeader>
                <div className="space-y-4">
                  <div>
                    <Label htmlFor="theater-name" className="text-white">
                      Nombre
                    </Label>
                    <Input
                      id="theater-name"
                      value={newTheater.name || ""}
                      onChange={(e) => setNewTheater({ ...newTheater, name: e.target.value })}
                      className="bg-gray-800/50 border-gray-700 text-white"
                    />
                  </div>
                  <div>
                    <Label htmlFor="theater-capacity" className="text-white">
                      Capacidad
                    </Label>
                    <Input
                      id="theater-capacity"
                      type="number"
                      value={newTheater.capacity || ""}
                      onChange={(e) => setNewTheater({ ...newTheater, capacity: Number.parseInt(e.target.value) })}
                      className="bg-gray-800/50 border-gray-700 text-white"
                    />
                  </div>
                  <div>
                    <Label htmlFor="theater-type" className="text-white">
                      Tipo
                    </Label>
                    <Select
                      value={newTheater.type}
                      onValueChange={(value: TheaterType) => setNewTheater({ ...newTheater, type: value })}
                    >
                      <SelectTrigger id="theater-type" className="bg-gray-800/50 border-gray-700 text-white">
                        <SelectValue className="text-white" placeholder="Seleccionar tipo" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="2D">2D</SelectItem>
                        <SelectItem value="3D">3D</SelectItem>
                        <SelectItem value="IMAX">IMAX</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label className="text-white">Comodidades</Label>
                    <div className="space-y-2">
                      {["Aire acondicionado", "Sonido Dolby", "Asientos reclinables", "Pantalla gigante"].map(
                        (amenity) => (
                          <div key={amenity} className="flex items-center space-x-2">
                            <Checkbox
                              id={`amenity-${amenity}`}
                              checked={(newTheater.amenities || []).includes(amenity)}
                              onCheckedChange={(checked) => {
                                if (checked) {
                                  setNewTheater({
                                    ...newTheater,
                                    amenities: [...(newTheater.amenities || []), amenity],
                                  })
                                } else {
                                  setNewTheater({
                                    ...newTheater,
                                    amenities: (newTheater.amenities || []).filter((a) => a !== amenity),
                                  })
                                }
                              }}
                            />
                            <Label htmlFor={`amenity-${amenity}`} className="text-white">
                              {amenity}
                            </Label>
                          </div>
                        ),
                      )}
                    </div>
                  </div>
                  <Button onClick={handleAddTheater} className="w-full bg-cyan-500 hover:bg-cyan-600">
                    Agregar sala
                  </Button>
                </div>
              </DialogContent>
            </motion.div>
          </Dialog>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {showEditTheaterDialog && (
          <Dialog open={showEditTheaterDialog} onOpenChange={setShowEditTheaterDialog}>
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.2 }}
            >
              <DialogContent className="bg-gray-900/95 backdrop-blur-sm border-gray-800">
                <DialogHeader>
                  <DialogTitle className="text-white">Editar sala</DialogTitle>
                </DialogHeader>
                <div className="space-y-4">
                  <div>
                    <Label htmlFor="edit-theater-name" className="text-white">
                      Nombre
                    </Label>
                    <Input
                      id="edit-theater-name"
                      value={editingTheater?.name || ""}
                      onChange={(e) => setEditingTheater((prev) => (prev ? { ...prev, name: e.target.value } : null))}
                      className="bg-gray-800/50 border-gray-700 text-white"
                    />
                  </div>
                  <div>
                    <Label htmlFor="edit-theater-capacity" className="text-white">
                      Capacidad
                    </Label>
                    <Input
                      id="edit-theater-capacity"
                      type="number"
                      value={editingTheater?.capacity || ""}
                      onChange={(e) =>
                        setEditingTheater((prev) =>
                          prev ? { ...prev, capacity: Number.parseInt(e.target.value) } : null,
                        )
                      }
                      className="bg-gray-800/50 border-gray-700 text-white"
                    />
                  </div>
                  <div>
                    <Label htmlFor="edit-theater-type" className="text-white">
                      Tipo
                    </Label>
                    <Select
                      value={editingTheater?.type}
                      onValueChange={(value: TheaterType) =>
                        setEditingTheater((prev) => (prev ? { ...prev, type: value } : null))
                      }
                    >
                      <SelectTrigger id="edit-theater-type" className="bg-gray-800/50 border-gray-700">
                        <SelectValue placeholder="Seleccionar tipo" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="2D">2D</SelectItem>
                        <SelectItem value="3D">3D</SelectItem>
                        <SelectItem value="IMAX">IMAX</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label className="text-white">Comodidades</Label>
                    <div className="space-y-2">
                      {["Aire acondicionado", "Sonido Dolby", "Asientos reclinables", "Pantalla gigante"].map(
                        (amenity) => (
                          <div key={amenity} className="flex items-center space-x-2">
                            <Checkbox
                              id={`edit-amenity-${amenity}`}
                              checked={(editingTheater?.amenities || []).includes(amenity)}
                              onCheckedChange={(checked) => {
                                if (checked) {
                                  setEditingTheater((prev) =>
                                    prev ? { ...prev, amenities: [...prev.amenities, amenity] } : null,
                                  )
                                } else {
                                  setEditingTheater((prev) =>
                                    prev ? { ...prev, amenities: prev.amenities.filter((a) => a !== amenity) } : null,
                                  )
                                }
                              }}
                            />
                            <Label htmlFor={`edit-amenity-${amenity}`} className="text-white">
                              {amenity}
                            </Label>
                          </div>
                        ),
                      )}
                    </div>
                  </div>
                  <Button onClick={handleEditTheater} className="w-full bg-cyan-500 hover:bg-cyan-600">
                    Guardar cambios
                  </Button>
                </div>
              </DialogContent>
            </motion.div>
          </Dialog>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {showAddMaintenanceDialog && (
          <Dialog open={showAddMaintenanceDialog} onOpenChange={setShowAddMaintenanceDialog}>
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.2 }}
            >
              <DialogContent className="bg-gray-900/95 backdrop-blur-sm border-gray-800">
                <DialogHeader>
                  <DialogTitle className="text-white">Programar mantenimiento</DialogTitle>
                </DialogHeader>
                <div className="space-y-4">
                  <div>
                    <Label htmlFor="maintenance-theater" className="text-white">
                      Sala
                    </Label>
                    <Select
                      value={newMaintenance.theaterId}
                      onValueChange={(value: string) => setNewMaintenance({ ...newMaintenance, theaterId: value })}
                    >
                      <SelectTrigger id="maintenance-theater" className="bg-gray-800/50 border-gray-700">
                        <SelectValue placeholder="Seleccionar sala" />
                      </SelectTrigger>
                      <SelectContent>
                        {theaters.map((theater) => (
                          <SelectItem key={theater.id} value={theater.id}>
                            {theater.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label htmlFor="maintenance-date" className="text-white">
                      Fecha y hora
                    </Label>
                    <Input
                      id="maintenance-date"
                      type="datetime-local"
                      value={newMaintenance.scheduledDate || ""}
                      onChange={(e) => setNewMaintenance({ ...newMaintenance, scheduledDate: e.target.value })}
                      className="bg-gray-800/50 border-gray-700 text-white"
                    />
                  </div>
                  <div>
                    <Label htmlFor="maintenance-description" className="text-white">
                      Descripción
                    </Label>
                    <Input
                      id="maintenance-description"
                      value={newMaintenance.description || ""}
                      onChange={(e) => setNewMaintenance({ ...newMaintenance, description: e.target.value })}
                      className="bg-gray-800/50 border-gray-700 text-white"
                    />
                  </div>
                  <Button onClick={handleAddMaintenance} className="w-full bg-cyan-500 hover:bg-cyan-600">
                    Programar mantenimiento
                  </Button>
                </div>
              </DialogContent>
            </motion.div>
          </Dialog>
        )}
      </AnimatePresence>
    </div>
  )
}

