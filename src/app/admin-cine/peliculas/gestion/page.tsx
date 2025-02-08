"use client";

import { useState } from "react";
import { Edit, Trash2 } from "lucide-react"; // Importa los íconos desde lucide-react

export default function GestionPeliculasPage() {
  const [peliculas, setPeliculas] = useState([
    {
      id: 1,
      titulo: "Captain Marvel",
      anio: 2019,
      rating: 1,
      genero: "Acción",
      actor: "Live Jhons",
      restriccion: "Mayores de 13 años",
      duracion: "2h 3m",
      sinopsis: "Carol Danvers se convierte.....",
      trailer: "https://www.youtube.com/watch?v=Z1BCujX3pw8",
      imagen: "https://prod-ripcut-delivery.disney-plus.net/v1/variant/disney/A99A31E369F78255973F980994294354C8E80C49E3484A3F329D62B94D0A6AE1/scale?width=1200&aspectRatio=1.78&format=webp",
    },
    {
      id: 2,
      titulo: "Spider-Man",
      anio: 2021,
      rating: 5,
      genero: "Acción",
      actor: "Tom Holland",
      restriccion: "Mayores de 13 años",
      duracion: "2h 30m",
      sinopsis: "Spider-Man enfrenta villanos....",
      trailer: "https://www.youtube.com/watch?v=Z1BCujX3pw8",
      imagen: "https://img.asmedia.epimg.net/resizer/v2/I4WT6Y6NTROVRMT44WZUUK2WZY.jpg?auth=d2cb60ac0b29c21c61ee1c92e09cccc7b2664de4355c5cd0e883d3a11bb0c056&width=1472&height=828&smart=true",
    },
    {
      id: 3,
      titulo: "In the multiverse ",
      anio: 2021,
      rating: 5,
      genero: "Acción",
      actor: "Henry lopez",
      restriccion: "Mayores de 13 años",
      duracion: "2h 30m",
      sinopsis: "doctor-strange-in-the....",
      trailer: "https://www.youtube.com/watch?v=Z1BCujX3pw8",
      imagen: "https://ceritafilm.com/wp-content/uploads/2022/07/doctor-strange-in-the-multiverse-of-madness.webp",
    },
  ]);

  interface Pelicula {
    id: number;
    titulo: string;
    descripcionCorta?: string;
    descripcionLarga?: string;
    rating?: number;
    genero?: string;
    actor?: string;
    restriccion?: string;
    destacado?: string;
    anio?: number;
    precio?: string;
    imagen?: string;
    duracion?: string;
    sinopsis?: string;
    trailer?: string;
  }
  

  const [nuevaPelicula, setNuevaPelicula] = useState({
    titulo: "",
    descripcionCorta: "",
    descripcionLarga: "",
    rating: 0,
    genero: "",
    actor: "",
    restriccion: "",
    destacado: "",
    anio: 0,
    precio: "",
    imagen: "",
    duracion: "",
    sinopsis: "",
    trailer: "",
  });

  const [mostrarModal, setMostrarModal] = useState(false);
  const [editarPelicula, setEditarPelicula] = useState(false);
  const [peliculaSeleccionada, setPeliculaSeleccionada] = useState<Pelicula | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    setNuevaPelicula({ ...nuevaPelicula, [e.target.name]: e.target.value });
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setNuevaPelicula({ ...nuevaPelicula, imagen: URL.createObjectURL(e.target.files[0]) });
    }
  };

  const handleGuardarPelicula = () => {
    if (editarPelicula && peliculaSeleccionada) {
      const updatedPeliculas = peliculas.map(pelicula => 
        pelicula.id === peliculaSeleccionada.id ? { ...pelicula, ...nuevaPelicula } : pelicula
      );
      setPeliculas(updatedPeliculas);
      setEditarPelicula(false);
      setPeliculaSeleccionada(null);
    } else {
      const nuevaPeliculaConId = {
        ...nuevaPelicula,
        id: peliculas.length + 1,
        rating: Number(nuevaPelicula.rating),
        anio: Number(nuevaPelicula.anio),
      };
      setPeliculas([...peliculas, nuevaPeliculaConId]);
    }
    setMostrarModal(false);
  };

  const handleEliminarPelicula = (id: number) => {
    const updatedPeliculas = peliculas.filter(pelicula => pelicula.id !== id);
    setPeliculas(updatedPeliculas);
  };

  const handleEditarPelicula = (pelicula: Pelicula) => {
    setEditarPelicula(true);
    setPeliculaSeleccionada(pelicula);
    setNuevaPelicula({
      titulo: pelicula.titulo || "",
      descripcionCorta: pelicula.descripcionCorta || "",
      descripcionLarga: pelicula.descripcionLarga || "",
      rating: pelicula.rating || 0,
      genero: pelicula.genero || "",
      actor: pelicula.actor || "",
      restriccion: pelicula.restriccion || "",
      destacado: pelicula.destacado || "",
      anio: pelicula.anio || 0,
      precio: pelicula.precio || "",
      imagen: pelicula.imagen || "",
      duracion: pelicula.duracion || "",
      sinopsis: pelicula.sinopsis || "",
      trailer: pelicula.trailer || "",
    });
    setMostrarModal(true);
  };

  return (
    <div className="p-4 relative max-w-screen-2xl mx-auto">
      {/* Encabezado */}
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-[#22D3EE]">
          Gestión Películas
        </h1>
        <button
          onClick={() => setMostrarModal(true)}
          className="bg-[#22D3EE] text-white px-4 sm:px-6 py-2 rounded hover:bg-opacity-80 transition"
        >
          + Nueva Película
        </button>
      </div>

      {/* Tabla de películas */}
      <div className="overflow-x-auto max-w-full p-4">
        <table className="w-full text-white border-collapse rounded-lg overflow-hidden">
          <thead>
            <tr className="bg-gray-900 text-white">
              <th className="px-3 py-2 text-left">IMG</th>
              <th className="px-3 py-2 text-left">Título</th>
              <th className="px-3 py-2 text-left hidden sm:table-cell">Año</th>
              <th className="px-3 py-2 text-left hidden sm:table-cell">Rating</th>
              <th className="px-3 py-2 text-left hidden sm:table-cell">Género</th>
              <th className="px-3 py-2 text-left hidden sm:table-cell">Actor</th>
              <th className="px-3 py-2 text-left hidden sm:table-cell">Restricción</th>
              <th className="px-3 py-2 text-left hidden sm:table-cell">Duración</th>
              <th className="px-3 py-2 text-left hidden sm:table-cell">Sinopsis</th>
              <th className="px-3 py-2 text-left hidden sm:table-cell">Tráiler</th>
              <th className="px-3 py-2 text-left">Acciones</th>
            </tr>
          </thead>
          <tbody>
            {peliculas.map((pelicula, index) => (
              <tr
                key={pelicula.id}
                className={`bg-gray-800 hover:bg-gray-700 transition duration-200 ${
                  index === peliculas.length - 1 ? 'rounded-b-lg' : ''
                }`}
              >
                <td className="p-2">
                  <img
                    src={pelicula.imagen}
                    alt={pelicula.titulo}
                    className="w-12 h-12 rounded-lg"
                  />
                </td>
                <td className="p-2">{pelicula.titulo}</td>
                <td className="p-2 hidden sm:table-cell">{pelicula.anio}</td>
                <td className="p-2 hidden sm:table-cell">{pelicula.rating}</td>
                <td className="p-2 hidden sm:table-cell">{pelicula.genero}</td>
                <td className="p-2 hidden sm:table-cell">{pelicula.actor}</td>
                <td className="p-2 hidden sm:table-cell">{pelicula.restriccion}</td>
                <td className="p-2 hidden sm:table-cell">{pelicula.duracion}</td>
                <td className="p-2 hidden sm:table-cell truncate max-w-[150px]">
                  {pelicula.sinopsis}
                </td>
                <td className="p-2 hidden sm:table-cell">
                  <a
                    href={pelicula.trailer}
                    target="_blank"
                    className="text-blue-400 hover:underline"
                  >
                    Ver
                  </a>
                </td>
                <td className="p-2 flex gap-2">
                  <button
                    onClick={() => handleEditarPelicula(pelicula)}
                    className="bg-gray-700 p-2 rounded-full hover:bg-cyan-500 transition"
                  >
                    <Edit className="h-5 w-5 text-white" />
                  </button>
                  <button
                    onClick={() => handleEliminarPelicula(pelicula.id)}
                    className="bg-gray-700 p-2 rounded-full hover:bg-red-500 transition"
                  >
                    <Trash2 className="h-5 w-5 text-white" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Tarjetas de películas */}
      <div className="bg-gray-900 bg-opacity-90 p-6 rounded-lg shadow-lg w-full mx-auto mt-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {peliculas.map((pelicula) => (
            <div
              key={pelicula.id}
              className="bg-[#1a1a2e] p-4 rounded-lg shadow-md w-full text-white transition-transform transform hover:-translate-y-2 hover:shadow-xl"
            >
              <div className="flex flex-col items-center">
                <img
                  src={pelicula.imagen}
                  alt={pelicula.titulo}
                  className="w-full h-40 object-cover rounded-lg"
                />
                <div className="mt-3 text-center w-full">
                  <h3 className="text-lg font-semibold">{pelicula.titulo}</h3>
                  <p className="text-sm text-gray-400">{pelicula.genero}</p>
                  <p className="text-sm text-gray-400">{pelicula.anio}</p>
                  <p className="text-sm text-gray-400">{pelicula.duracion}</p>
                  <p className="text-sm text-gray-400 truncate">{pelicula.sinopsis}</p>
                  <a
                    href={pelicula.trailer}
                    target="_blank"
                    className="mt-2 inline-block bg-teal-500 hover:bg-teal-600 text-white font-semibold py-2 px-4 rounded-lg"
                  >
                    Ver tráiler
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Modal para agregar o editar película */}
      {mostrarModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 backdrop-blur-md flex justify-center items-center">
          <div className="bg-gray-800 p-6 rounded-lg shadow-xl w-11/12 md:w-2/3 lg:w-1/2 xl:w-1/3 relative max-h-[90vh] overflow-y-auto">
            <button
              onClick={() => setMostrarModal(false)}
              className="absolute top-4 right-4 text-gray-400 hover:text-white text-2xl transition-colors"
            >
              ×
            </button>
            <h2 className="text-2xl font-bold text-white mb-6">
              {editarPelicula ? "Editar Película" : "Agregar Nueva Película"}
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Título */}
              <div className="col-span-2">
                <label className="block text-sm font-medium text-gray-300 mb-1">Título</label>
                <input
                  type="text"
                  name="titulo"
                  value={nuevaPelicula.titulo}
                  onChange={handleChange}
                  className="w-full px-4 py-2 bg-gray-700 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                  placeholder="Ingrese el título"
                />
              </div>

              {/* Descripción Corta */}
              <div className="col-span-2">
                <label className="block text-sm font-medium text-gray-300 mb-1">Descripción Corta</label>
                <input
                  type="text"
                  name="descripcionCorta"
                  value={nuevaPelicula.descripcionCorta}
                  onChange={handleChange}
                  className="w-full px-4 py-2 bg-gray-700 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                  placeholder="Ingrese la descripción corta"
                />
              </div>

              {/* Descripción Larga */}
              <div className="col-span-2">
                <label className="block text-sm font-medium text-gray-300 mb-1">Descripción Larga</label>
                <input
                  type="text"
                  name="descripcionLarga"
                  value={nuevaPelicula.descripcionLarga}
                  onChange={handleChange}
                  className="w-full px-4 py-2 bg-gray-700 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                  placeholder="Ingrese la descripción larga"
                />
              </div>

              {/* Año */}
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-1">Año</label>
                <input
                  type="number"
                  name="anio"
                  value={nuevaPelicula.anio}
                  onChange={handleChange}
                  className="w-full px-4 py-2 bg-gray-700 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                  placeholder="Ingrese el año"
                />
              </div>

              {/* Rating */}
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-1">Rating</label>
                <select
                  name="rating"
                  value={nuevaPelicula.rating}
                  onChange={handleChange}
                  className="w-full px-4 py-2 bg-gray-700 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                >
                  <option value="0">Seleccionar Rating</option>
                  <option value="1">1 - Malo</option>
                  <option value="2">2</option>
                  <option value="3">3</option>
                  <option value="4">4</option>
                  <option value="5">5 - Excelente</option>
                </select>
              </div>

              {/* Género */}
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-1">Género</label>
                <input
                  type="text"
                  name="genero"
                  value={nuevaPelicula.genero}
                  onChange={handleChange}
                  className="w-full px-4 py-2 bg-gray-700 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                  placeholder="Ingrese el género"
                />
              </div>

              {/* Actor */}
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-1">Actor</label>
                <input
                  type="text"
                  name="actor"
                  value={nuevaPelicula.actor}
                  onChange={handleChange}
                  className="w-full px-4 py-2 bg-gray-700 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                  placeholder="Ingrese el actor"
                />
              </div>

              {/* Restricción */}
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-1">Restricción</label>
                <input
                  type="text"
                  name="restriccion"
                  value={nuevaPelicula.restriccion}
                  onChange={handleChange}
                  className="w-full px-4 py-2 bg-gray-700 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                  placeholder="Ingrese la restricción"
                />
              </div>

              {/* Duración */}
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-1">Duración</label>
                <input
                  type="text"
                  name="duracion"
                  value={nuevaPelicula.duracion}
                  onChange={handleChange}
                  className="w-full px-4 py-2 bg-gray-700 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                  placeholder="Ingrese la duración"
                />
              </div>

              {/* Sinopsis */}
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-1">Sinopsis</label>
                <textarea
                  name="sinopsis"
                  value={nuevaPelicula.sinopsis}
                  onChange={handleChange}
                  className="w-full px-4 py-2 bg-gray-700 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                  placeholder="Ingrese la sinopsis"
                  rows={4}
                />
              </div>

              {/* Tráiler */}
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-1">Tráiler</label>
                <input
                  type="text"
                  name="trailer"
                  value={nuevaPelicula.trailer}
                  onChange={handleChange}
                  className="w-full px-4 py-2 bg-gray-700 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                  placeholder="Ingrese el enlace del tráiler"
                />
              </div>

              {/* Imagen */}
              <div className="col-span-2">
                <label className="block text-sm font-medium text-gray-300 mb-1">Imagen</label>
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImageChange}
                  className="w-full px-4 py-2 bg-gray-700 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                />
                {nuevaPelicula.imagen && (
                  <img src={nuevaPelicula.imagen} alt="Imagen Previa" className="mt-4 rounded-md" />
                )}
              </div>

              <div className="col-span-2 flex justify-center">
                <button
                  onClick={handleGuardarPelicula}
                  className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-2 rounded-lg transition"
                >
                  {editarPelicula ? "Guardar Cambios" : "Agregar Película"}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
