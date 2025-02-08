"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";

const fadeIn = {
  initial: { opacity: 0, y: 10 },
  animate: { opacity: 1, y: 0, transition: { duration: 0.5 } },
  exit: { opacity: 0, y: -10, transition: { duration: 0.3 } },
};

const welcomeMessages = [
  "Bienvenido a EvenTix-Cine 🎬",
  "Administra funciones 📅",
  "Gestiona personal y taquilla 🎟️",
  "Optimiza la tienda de snacks 🍿",
];

export function TopBar() {
  const [welcomeIndex, setWelcomeIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setWelcomeIndex((prev) => (prev + 1) % welcomeMessages.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="top-bar">
      <header className="border-b border-yellow-500/40 bg-black/60 backdrop-blur-xl px-6 py-4 flex justify-center shadow-md">
        <div className="relative w-full max-w-lg min-h-[20px] flex items-center justify-center px-4">
          <AnimatePresence mode="wait">
            <motion.h1
              key={welcomeIndex}
              variants={fadeIn}
              initial="initial"
              animate="animate"
              exit="exit"
              className="absolute text-center font-bold bg-gradient-to-r from-purple-400 to-blue-500 bg-clip-text text-transparent 
              text-base sm:text-lg md:text-xl lg:text-2xl xl:text-3xl 
              max-w-full whitespace-nowrap overflow-hidden text-ellipsis px-2"
            >
              {welcomeMessages[welcomeIndex]}
            </motion.h1>
          </AnimatePresence>
        </div>
      </header>
    </div>
  );
}
