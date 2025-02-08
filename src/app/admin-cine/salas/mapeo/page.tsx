"use client"

import React, { useState } from 'react'
import { Edit2, Trash2, X, Check, RotateCw } from 'lucide-react'

interface Seat {
  id: string
  row: string
  number: number
  status: 'available' | 'occupied' | 'selected' | 'editing'
  customerInfo?: {
    name: string
    email: string
    purchaseDate: string
  }
}

export default function CinemaAdminPage() {
  const [seats, setSeats] = useState<Seat[]>(generateInitialSeats())
  const [editingSeat, setEditingSeat] = useState<Seat | null>(null)
  const [editForm, setEditForm] = useState({
    name: '',
    email: '',
  })

  function generateInitialSeats(): Seat[] {
    const rows = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K']
    const seatsPerRow = [14, 16, 18, 18, 20, 20, 20, 18, 18, 16, 14]
    const allSeats: Seat[] = []
    const occupiedSeats = ['A5', 'A6', 'B10', 'C15', 'D8', 'E12', 'F14']

    rows.forEach((row, rowIndex) => {
      const numberOfSeats = seatsPerRow[rowIndex]

      for (let i = 1; i <= numberOfSeats; i++) {
        const seatId = `${row}${i}`
        const isOccupied = occupiedSeats.includes(seatId)

        allSeats.push({
          id: seatId,
          row: row,
          number: i,
          status: isOccupied ? 'occupied' : 'available',
          ...(isOccupied && {
            customerInfo: {
              name: `Cliente ${seatId}`,
              email: `cliente${seatId}@ejemplo.com`,
              purchaseDate: new Date().toISOString(),
            },
          }),
        })
      }
    })

    return allSeats
  }

  const handleSeatClick = (seat: Seat) => {
    setEditingSeat(seat)
    setEditForm({
      name: seat.customerInfo?.name || '',
      email: seat.customerInfo?.email || '',
    })
  }

  const handleDeleteReservation = (seatId: string) => {
    setSeats(seats.map(seat => 
      seat.id === seatId 
        ? { ...seat, status: 'available', customerInfo: undefined }
        : seat
    ))
    setEditingSeat(null)
  }

  const handleUpdateReservation = () => {
    if (!editingSeat) return

    setSeats(seats.map(seat =>
      seat.id === editingSeat.id
        ? {
            ...seat,
            customerInfo: {
              ...seat.customerInfo!,
              name: editForm.name,
              email: editForm.email,
            },
          }
        : seat
    ))
    setEditingSeat(null)
  }

  const handleMarkAsOccupied = (seatId: string) => {
    setSeats(seats.map(seat => 
      seat.id === seatId
        ? {
            ...seat,
            status: 'occupied',
            customerInfo: {
              name: editForm.name || '',
              email: editForm.email || '',
              purchaseDate: new Date().toISOString(),
            },
          }
        : seat
    ))
    setEditingSeat(null)
  }

  const handleMarkAsAvailable = (seatId: string) => {
    setSeats(seats.map(seat => 
      seat.id === seatId
        ? { ...seat, status: 'available', customerInfo: undefined }
        : seat
    ))
    setEditingSeat(null)
  }

  const rows = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K']
  const seatsPerRow = [14, 16, 18, 18, 20, 20, 20, 18, 18, 16, 14]

  return (
    <div className=" p-6">
      {/* Header */}
      <div className="flex-1">
        <div className="flex justify-between items-center mb-7">
          <h1 className="text-2xl font-bold text-white">Administración de Sala</h1>
          <div className="flex gap-4">
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 bg-green-500 rounded"></div>
              <span className="text-white">Disponible</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 bg-red-500 rounded"></div>
              <span className="text-white">Ocupado</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 bg-yellow-500 rounded"></div>
              <span className="text-white">Reservado</span>
            </div>
          </div>
        </div>

        {/* Pantalla */}
        <div className="relative mb-12">
          <div className="h-2 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 rounded-full mb-4"></div>
          <div className="text-gray-400 text-center">Pantalla</div>
        </div>

        {/* Grid de asientos */}
        <div className="overflow-x-auto">
          <div className="flex flex-col items-center">
            {rows.map((row, rowIndex) => (
              <div key={row} className="flex justify-center mb-3">
                {seats
                  .filter((seat) => seat.row === row)
                  .map((seat) => {
                    const isAisle = (seat.number === Math.ceil(seatsPerRow[rowIndex] / 2))
                    return (
                      <React.Fragment key={seat.id}>
                        {isAisle && (
                          <div className="w-4 h-4 mx-2"></div> // Espacio para el pasillo central
                        )}
                        <button
                          onClick={() => handleSeatClick(seat)}
                          className={`w-10 h-10 rounded flex items-center justify-center text-xs font-medium transition-colors
                            bg-blue-25 border-2 
                            ${seat.status === 'available' 
                              ? 'border-green-500 hover:bg-blue-700' 
                              : seat.status === 'occupied'
                                ? 'border-red-500 hover:bg-red-600'
                                : 'border-yellow-500 hover:bg-yellow-600'
                            } 
                            text-white m-0.5 shadow-lg`}
                          title={
                            seat.status === 'occupied'
                              ? `${seat.customerInfo?.name} (${seat.customerInfo?.email})`
                              : 'Disponible'
                          }
                        >
                          {seat.row}{seat.number}
                        </button>
                      </React.Fragment>
                    )
                  })}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Modal de edición */}
      {editingSeat && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
          <div className="bg-gray-800 rounded-lg p-6 max-w-md w-full">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-bold text-white">
                Editar Asiento {editingSeat.id}
              </h2>
              <button
                onClick={() => setEditingSeat(null)}
                className="text-gray-400 hover:text-white"
              >
                <X size={24} />
              </button>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-gray-400 mb-2">Nombre</label>
                <input
                  type="text"
                  value={editForm.name}
                  onChange={(e) => setEditForm({ ...editForm, name: e.target.value })}
                  className="w-full bg-gray-700 rounded px-3 py-2 text-white"
                />
              </div>
              <div>
                <label className="block text-gray-400 mb-2">Email</label>
                <input
                  type="email"
                  value={editForm.email}
                  onChange={(e) => setEditForm({ ...editForm, email: e.target.value })}
                  className="w-full bg-gray-700 rounded px-3 py-2 text-white"
                />
              </div>

              <div className="flex flex-wrap gap-2 mt-6">
                <button
                  onClick={() => handleDeleteReservation(editingSeat.id)}
                  className="flex items-center gap-2 px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
                >
                  <Trash2 size={16} />
                  Eliminar Reserva
                </button>
                <button
                  onClick={handleUpdateReservation}
                  className="flex items-center gap-2 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
                >
                  <Check size={16} />
                  Actualizar
                </button>
                {editingSeat.status === 'available' ? (
                  <button
                    onClick={() => handleMarkAsOccupied(editingSeat.id)}
                    className="flex items-center gap-2 px-4 py-2 bg-yellow-500 text-white rounded hover:bg-yellow-600"
                  >
                    <Edit2 size={16} />
                    Marcar como Ocupado
                  </button>
                ) : (
                  <button
                    onClick={() => handleMarkAsAvailable(editingSeat.id)}
                    className="flex items-center gap-2 px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
                  >
                    <RotateCw size={16} />
                    Marcar como Disponible
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}