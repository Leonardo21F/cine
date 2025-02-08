"use client";

import { useRef, useState, useEffect } from "react";
import { useRouter } from "next/navigation"; // Usa `next/navigation` en lugar de `next/router` en Next.js 13

const images = [
  {
    src: "https://img.asmedia.epimg.net/resizer/v2/I4WT6Y6NTROVRMT44WZUUK2WZY.jpg?auth=d2cb60ac0b29c21c61ee1c92e09cccc7b2664de4355c5cd0e883d3a11bb0c056&width=1472&height=828&smart=true",
    title: "Spider man no way home",
  },
  {
    src: "https://images.thedirect.com/media/article_full/every-marvel-character-who-appears-in-thor-love-and-thunder__18au6hj_9PAhRCd.jpg",
    title: "Thor love and thunder",
  },
  {
    src: "https://m.media-amazon.com/images/S/pv-target-images/43b9eb0d584719bb98e3148f8ae178bd4678280d4f519ce4fccedf4b821db01c.jpg",
    title: "Venom let there be carnage",
  },
  {
    src: "https://figni-tut.net/wp-content/uploads/2023/09/kraven-the-hunter-lion-king.jpeg",
    title: "Kraven the hunter",
  },
  {
    src: "https://depor.com/resizer/v2/EUZZ74VTNNFJRIITNRSLOQJ2MQ.jpg?auth=88d27e7bae05ecc65adf443ee3d04d49b10a3f1b8acd6ad5b2d3e0547263b583&width=980&height=528&quality=75&smart=true",
    title: "Thunderbolts",
  },
  {
    src: "https://ceritafilm.com/wp-content/uploads/2022/07/doctor-strange-in-the-multiverse-of-madness.webp",
    title: "Doctor strange in the multiverse of madness",
  },
];

export default function Page() {
  const carouselRef = useRef(null);
  const [index, setIndex] = useState(0);
  const router = useRouter(); // Usamos `useRouter` desde `next/navigation`

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  const goToImage = (idx: number) => {
    setIndex(idx);
  };

  const handleAdminClick = () => {
    router.push("/admin-cine/peliculas/gestion"); // Ruta de Gestión de Películas
  };

  return (
    <div className="w-full px-4 overflow-hidden">
      <div className="flex justify-between items-center flex-wrap">
        <h1 className="text-3xl sm:text-4xl font-bold text-[#22D3EE] mb-4">Películas destacadas</h1>
        <button
          className="flex items-center bg-[#22D3EE] text-white px-4 sm:px-6 py-2 rounded-lg hover:bg-opacity-80 transition-all text-left"
          onClick={handleAdminClick}
        >
          <i className="fas fa-user-shield mr-2"></i> Administrador
        </button>
      </div>

      {/* Carrusel */}
      <div className="relative w-full max-w-full mx-auto overflow-hidden rounded-lg shadow-2xl border-4 border-gray-800">
        <div
          ref={carouselRef}
          className="flex transition-transform duration-1000 ease-in-out"
          style={{ transform: `translateX(-${index * 100}%)` }}
        >
          {images.map((image, idx) => (
            <div key={idx} className="relative w-full flex-shrink-0 group">
              <img
                src={image.src}
                alt={image.title}
                className="w-full h-auto max-h-[500px] object-cover rounded-lg transform transition-transform duration-300 group-hover:scale-105"
              />
              {/* Fondo semitransparente y nombre de la película más grande al pasar el mouse */}
              <div className="absolute bottom-0 left-0 w-full h-[35%] bg-black bg-opacity-70 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                <h2 className="text-3xl font-bold text-white transform transition-all duration-300 group-hover:text-4xl group-hover:text-gray-300">
                  {image.title}
                </h2>
              </div>
            </div>
          ))}
        </div>

        {/* Puntos de navegación dentro del carrusel */}
        <div className="absolute bottom-4 left-0 right-0 flex justify-center space-x-2">
          {images.map((_, idx) => (
            <button
              key={idx}
              onClick={() => goToImage(idx)}
              className={`h-2 w-2 rounded-full transition-all duration-300 ${index === idx ? 'bg-[#22D3EE]' : 'bg-gray-400'}`}
            ></button>
          ))}
        </div>
      </div>

      {/* Sección de Detalles */}
      <div className="bg-[#1a1a2e] text-white p-6 mt-6 rounded-lg shadow-lg max-w-4xl mx-auto flex flex-col md:flex-row items-center">
        <img
          src="https://m.media-amazon.com/images/I/613ofT+1xXL.jpg"
          alt="Deadpool 2"
          className="w-1/3 rounded-lg mb-6 md:mb-0 md:mr-6"
        />
        <div className="w-full md:w-2/3">
          {/* Título de la película destacada, centrado y con margen a la izquierda */}
          <h2 className="text-3xl font-bold text-center md:text-left mb-4 md:ml-8">🎬 El éxito de la semana</h2>

          <h2 className="text-2xl font-bold">DEADPOOL 2</h2>
          <p className="text-sm text-blue-500 text-purple-500">1h 59min | Acción, Aventura, Comedia | May 18, 2018 (USA)</p>

          {/* Calificación con estrellas */}
          <div className="flex items-center mt-2">
            {[...Array(5)].map((_, index) => (
              <svg key={index} xmlns="http://www.w3.org/2000/svg" fill="yellow" viewBox="0 0 24 24" width="20" height="20">
                <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z"/>
              </svg>
            ))}
          </div>

          <p className="mt-2 text-gray-300">
            Después de perder a Vanessa (Morena Baccarin), el amor de su vida, el mercenario que rompe la cuarta pared, Wade Wilson, también conocido como Deadpool (Ryan Reynolds).
          </p>
          <p className="mt-2"><strong>Director:</strong> David Leitch</p>
          <p><strong>Writers:</strong> Rhett Reese, Paul Wernick</p>
          <p><strong>Stars:</strong> Ryan Reynolds, Josh Brolin, Morena Baccarin</p>
          <button className="mt-4 bg-[#22D3EE] hover:bg-opacity-80 text-white py-2 px-4 rounded-lg font-bold">
            Ver detalles
          </button>
        </div>
      </div>

      {/* Sección de Cartelera */}
      <div className="mt-10 text-center bg-[#281E41] bg-opacity-70 w-full max-w-full mx-auto p-6 rounded-lg">
        <h2 className="text-3xl font-bold mb-6 text-white">🎥 Cartelera</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {[
            { title: "Capitana Marvel", price: "S/ 17.00", img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS1pfYPtZuf1Mf6DiUg_Gmi7RCcqgIBN5yGOw&s" },
            { title: "Avengers End Game", price: "S/ 12.00", img: "https://upload.wikimedia.org/wikipedia/en/0/0d/Avengers_Endgame_poster.jpg" },
            { title: "Superman vs Batman", price: "S/ 12.00", img: "https://i.pinimg.com/736x/e5/71/41/e571414587e53559bdeba51ba1724445.jpg" }
          ].map((movie, idx) => (
            <div 
              key={idx} 
              className="flex flex-col items-center bg-[#201E36] bg-opacity-80 p-4 rounded-lg shadow-lg transform transition-all hover:scale-105 hover:shadow-xl hover:border-4 hover:border-[#22D3EE] hover:bg-[#2A2B3B] relative"
            >
              <div className="absolute inset-0 border-2 border-[#22D3EE] opacity-0 hover:opacity-100 transition-all duration-500 rounded-lg"></div>
              <img src={movie.img} alt={movie.title} className="w-full sm:w-1/2 rounded-lg mb-4" />
              <h3 className="text-xl font-bold text-white">{movie.title}</h3>
              <p className="text-lg text-yellow-400">★★★★★</p>
              <p className="text-red-400 font-bold">{movie.price}</p>
              <button className="mt-2 bg-[#1C3C56] hover:bg-[#1C3C56] text-[#33B6C0] py-1 px-3 rounded-lg font-bold">
                Ver detalles
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
