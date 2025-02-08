"use client"

import { motion } from "framer-motion"

export function LoadingAnimation() {
  return (
    <div className="w-32 h-32 relative flex items-center justify-center">
      <motion.div
        className="absolute inset-0 rounded-xl bg-blue-500/20"
        animate={{ opacity: [0.2, 0.5, 0.2] }}
        transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
      />
      <div className="w-full h-full relative flex items-center justify-center">
        <motion.div
          className="absolute inset-0 rounded-xl bg-gradient-to-r from-cyan-500 via-blue-500 to-purple-500"
          animate={{ rotate: 360 }}
          transition={{ duration: 3, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
          style={{ filter: "blur(4px)" }}
        />
        <div className="absolute inset-1 bg-gray-900 rounded-lg flex items-center justify-center overflow-hidden">
          <div className="flex gap-1 items-center">
            {[0, 0.1, 0.2, 0.3].map((delay, i) => (
              <motion.div
                key={i}
                className="w-1.5 h-12 rounded-full"
                style={{
                  backgroundColor: ["#06b6d4", "#3b82f6", "#6366f1", "#a855f7"][i],
                }}
                animate={{ y: [-20, 0, -20] }}
                transition={{
                  duration: 1,
                  repeat: Number.POSITIVE_INFINITY,
                  delay,
                  ease: "easeInOut",
                }}
              />
            ))}
          </div>
          <motion.div
            className="absolute inset-0 bg-gradient-to-t from-transparent via-blue-500/10 to-transparent"
            animate={{ opacity: [0, 1, 0] }}
            transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
          />
        </div>
      </div>
      {["-top-1 -left-1", "-top-1 -right-1", "-bottom-1 -left-1", "-bottom-1 -right-1"].map((position, i) => (
        <motion.div
          key={i}
          className={`absolute ${position} w-2 h-2 rounded-full`}
          style={{
            backgroundColor: ["#06b6d4", "#a855f7", "#06b6d4", "#3b82f6"][i],
          }}
          animate={{ scale: [1, 1.5, 1] }}
          transition={{
            duration: 2,
            repeat: Number.POSITIVE_INFINITY,
            delay: i * 0.1,
          }}
        />
      ))}
    </div>
  )
}

