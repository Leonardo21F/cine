"use client"

import { CameraIcon, Loader2, X } from "lucide-react"
import Image from "next/image"
import { useCallback, useState } from "react"
import { useDropzone } from "react-dropzone"
import { Button } from "./ui/button"

interface ImageUploadProps {
  value: string
  onChange: (value: string) => void
  disabled?: boolean
}

export function ImageUpload({ value, onChange, disabled }: ImageUploadProps) {
  const [isLoading, setIsLoading] = useState(false)

  const onDrop = useCallback(
    async (acceptedFiles: File[]) => {
      try {
        setIsLoading(true)
        const file = acceptedFiles[0]

        // Simular carga de imagen - En un caso real, subirías a un servicio de almacenamiento
        await new Promise((resolve) => setTimeout(resolve, 1000))

        // Crear URL temporal para la imagen
        const url = URL.createObjectURL(file)
        onChange(url)
      } catch (error) {
        console.error("Error uploading image:", error)
      } finally {
        setIsLoading(false)
      }
    },
    [onChange],
  )

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      "image/*": [".png", ".jpg", ".jpeg", ".gif"],
    },
    disabled: disabled || isLoading,
    maxFiles: 1,
  })

  return (
    <div className="space-y-4 w-full">
      <div
        {...getRootProps()}
        className={`
          relative 
          flex 
          flex-col 
          items-center 
          justify-center 
          gap-4 
          p-6 
          border-2 
          border-dashed 
          rounded-lg 
          hover:bg-gray-800/50 
          transition 
          cursor-pointer
          ${isDragActive ? "border-cyan-500 bg-gray-800/50" : "border-gray-600"}
        `}
      >
        <input {...getInputProps()} />
        {value ? (
          <div className="relative aspect-video w-full overflow-hidden rounded-lg">
            <Image src={value || "/placeholder.svg"} alt="Upload" fill className="object-cover" />
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center gap-2">
            <CameraIcon className="h-10 w-10 text-gray-400" />
            <p className="text-sm text-gray-400">Arrastra una imagen o haz clic para seleccionar</p>
          </div>
        )}
        {isLoading && (
          <div className="absolute inset-0 flex items-center justify-center bg-black/50 rounded-lg">
            <Loader2 className="h-6 w-6 animate-spin text-cyan-500" />
          </div>
        )}
      </div>
      {value && !disabled && (
        <Button type="button" variant="destructive" size="sm" className="mt-2" onClick={() => onChange("")}>
          <X className="h-4 w-4 mr-2" />
          Eliminar imagen
        </Button>
      )}
    </div>
  )
}

