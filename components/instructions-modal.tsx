"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"

interface InstructionsModalProps {
  onStart: () => void
}

export default function InstructionsModal({ onStart }: InstructionsModalProps) {
  const [showHowToPlay, setShowHowToPlay] = useState(false)

  const variants = {
    enter: (direction: number) => {
      return {
        x: direction > 0 ? 1000 : -1000,
        opacity: 0,
      }
    },
    center: {
      zIndex: 1,
      x: 0,
      opacity: 1,
    },
    exit: (direction: number) => {
      return {
        zIndex: 0,
        x: direction < 0 ? 1000 : -1000,
        opacity: 0,
      }
    },
  }

  return (
    <div className="flex items-center justify-center w-full max-w-3xl mx-auto">
      <AnimatePresence initial={false} custom={1}>
        {!showHowToPlay ? (
          <motion.div
            key="overview"
            custom={1}
            variants={variants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{
              x: { type: "spring", stiffness: 300, damping: 30 },
              opacity: { duration: 0.2 },
            }}
            className="bg-white text-black p-8 rounded-lg max-w-2xl w-full absolute"
          >
            <h2 className="text-2xl font-bold mb-4 text-center">Overview</h2>
            <p className="mb-6 text-center">
              Get ready to think like a computer! In this game, you will "search" through a hidden list of numbers, just
              like a simple program does, by flipping cards one at a time and keeping track of the smallest and largest
              values you have seen. By the end, you will have experienced the essence of Linear Search without ever
              writing a line of code.
            </p>

            <div className="flex justify-center">
              <button
                onClick={() => setShowHowToPlay(true)}
                className="bg-[#ef4444] text-white font-bold py-2 px-6 rounded-lg hover:bg-[#f87171] active:bg-[#f87171] transition-colors"
              >
                Next
              </button>
            </div>
          </motion.div>
        ) : (
          <motion.div
            key="howtoplay"
            custom={1}
            variants={variants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{
              x: { type: "spring", stiffness: 300, damping: 30 },
              opacity: { duration: 0.2 },
            }}
            className="bg-white text-black p-8 rounded-lg max-w-2xl w-full absolute"
          >
            <h2 className="text-2xl font-bold mb-4 text-center">How to Play</h2>

            <ul className="space-y-3 mb-6">
              <li className="flex items-center">
                <span className="text-[#ef4444] mr-2 font-bold text-xl w-6 flex justify-center">→</span>
                <span className="bg-white p-2 rounded w-full">You will see a grid of 18 cards, all face down.</span>
              </li>
              <li className="flex items-center">
                <span className="text-[#ef4444] mr-2 font-bold text-xl w-6 flex justify-center">→</span>
                <span className="bg-white p-2 rounded w-full">
                  Click on a card to reveal its value (a random number between -9,999 and 9,999).
                </span>
              </li>
              <li className="flex items-center">
                <span className="text-[#ef4444] mr-2 font-bold text-xl w-6 flex justify-center">→</span>
                <span className="bg-white p-2 rounded w-full">
                  Each card will remain visible for exactly 3 seconds, then become unclickable.
                </span>
              </li>
              <li className="flex items-center">
                <span className="text-[#ef4444] mr-2 font-bold text-xl w-6 flex justify-center">→</span>
                <span className="bg-white p-2 rounded w-full">
                  Your goal is to remember the minimum and maximum values among all cards.
                </span>
              </li>
              <li className="flex items-center">
                <span className="text-[#ef4444] mr-2 font-bold text-xl w-6 flex justify-center">→</span>
                <span className="bg-white p-2 rounded w-full">
                  After all cards have been revealed, you'll be asked to enter what you think were the minimum and
                  maximum values.
                </span>
              </li>
            </ul>

            <div className="flex justify-center">
              <button
                onClick={onStart}
                className="bg-[#ef4444] text-white font-bold py-2 px-6 rounded-lg hover:bg-[#f87171] active:bg-[#f87171] transition-colors"
              >
                Start Game
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
