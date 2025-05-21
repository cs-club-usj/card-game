"use client"

import type React from "react"
import { useState, useEffect } from "react"
import GameBoard from "@/components/game-board"
import InstructionsModal from "@/components/instructions-modal"

export default function Home() {
  const [gameStarted, setGameStarted] = useState(false)
  const [isDistributing, setIsDistributing] = useState(false)
  const [cardValues, setCardValues] = useState<number[]>([])
  const [revealedCards, setRevealedCards] = useState<boolean[]>([])
  const [showInputDialog, setShowInputDialog] = useState(false)
  const [showResultDialog, setShowResultDialog] = useState(false)
  const [minGuess, setMinGuess] = useState("")
  const [maxGuess, setMaxGuess] = useState("")
  const [result, setResult] = useState({ message: "", isCorrect: false })
  const [showInstructions, setShowInstructions] = useState(true)

  // Generate random card values
  const generateCardValues = () => {
    const values = []
    for (let i = 0; i < 18; i++) {
      values.push(Math.floor(Math.random() * 19999) - 9999)
    }
    return values
  }

  // Start the game with distribution animation
  const startGame = () => {
    const values = generateCardValues()
    setCardValues(values)
    setRevealedCards(Array(18).fill(false))
    setIsDistributing(true)
    setGameStarted(true)
    setShowInstructions(false)
  }

  // Check if all cards have been revealed
  useEffect(() => {
    if (gameStarted && revealedCards.length === 18 && revealedCards.every((card) => card)) {
      setTimeout(() => {
        setShowInputDialog(true)
      }, 1000)
    }
  }, [gameStarted, revealedCards])

  // Handle form submission
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    const minValue = Number.parseInt(minGuess)
    const maxValue = Number.parseInt(maxGuess)

    const actualMin = Math.min(...cardValues)
    const actualMax = Math.max(...cardValues)

    let message = ""
    let isCorrect = false

    if (minValue === actualMin && maxValue === actualMax) {
      message = "Correct! You remembered both the minimum and maximum values."
      isCorrect = true
    } else if (minValue === actualMin) {
      message = `Correct Minimum But Incorrect Maximum! — the correct max is ${actualMax}`
    } else if (maxValue === actualMax) {
      message = `Correct Maximum But Incorrect Minimum! — the correct min is ${actualMin}`
    } else {
      message = `Incorrect! The correct min is ${actualMin} and the correct max is ${actualMax}`
    }

    setResult({ message, isCorrect })
    setShowInputDialog(false)
    setShowResultDialog(true)
  }

  // Reset the game
  const resetGame = () => {
    setGameStarted(false)
    setIsDistributing(false)
    setCardValues([])
    setRevealedCards([])
    setShowResultDialog(false)
    setMinGuess("")
    setMaxGuess("")
    setShowInstructions(true)
  }

  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-4 select-none relative overflow-hidden">
      {/* Animated Background */}
      <div className="fixed inset-0 bg-black z-0">
        {/* Gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-br from-gray-900 to-black"></div>

        {/* Animated card suits */}
        <div className="absolute inset-0 overflow-hidden">
          {Array(30)
            .fill(0)
            .map((_, i) => (
              <div
                key={i}
                className="absolute text-white/20 text-5xl animate-float"
                style={{
                  left: `${Math.random() * 100}%`,
                  top: `${Math.random() * 100}%`,
                  animationDelay: `${Math.random() * 10}s`,
                  animationDuration: `${15 + Math.random() * 20}s`,
                  opacity: 0.1 + Math.random() * 0.2,
                  fontSize: `${2 + Math.random() * 3}rem`,
                }}
              >
                {["♠", "♥", "♦", "♣"][Math.floor(Math.random() * 4)]}
              </div>
            ))}
        </div>

        {/* Grid pattern */}
        <div className="absolute inset-0 bg-grid-pattern"></div>

        {/* Light effects */}
        <div className="absolute top-1/4 left-1/4 w-1/2 h-1/2 bg-white/10 rounded-full blur-3xl animate-pulse-slow"></div>
        <div className="absolute top-1/3 right-1/3 w-1/3 h-1/3 bg-[#ef4444]/10 rounded-full blur-3xl animate-pulse-slower"></div>
      </div>

      {/* Game Content */}
      <div className="relative z-10 w-full flex flex-col items-center justify-center">
        {!gameStarted ? (
          <InstructionsModal onStart={startGame} />
        ) : (
          <GameBoard
            cardValues={cardValues}
            revealedCards={revealedCards}
            setRevealedCards={setRevealedCards}
            isDistributing={isDistributing}
          />
        )}
      </div>

      {/* Input Dialog */}
      {showInputDialog && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white text-black p-8 rounded-lg max-w-md w-full">
            <h2 className="text-2xl font-bold mb-4">What were the minimum and maximum values?</h2>
            <p className="mb-6">Enter the minimum and maximum values you saw on the cards.</p>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <label htmlFor="min" className="block font-medium">
                  Minimum
                </label>
                <input
                  id="min"
                  type="number"
                  value={minGuess}
                  onChange={(e) => setMinGuess(e.target.value)}
                  className="w-full p-2 border border-gray-300 rounded"
                  required
                />
              </div>

              <div className="space-y-2">
                <label htmlFor="max" className="block font-medium">
                  Maximum
                </label>
                <input
                  id="max"
                  type="number"
                  value={maxGuess}
                  onChange={(e) => setMaxGuess(e.target.value)}
                  className="w-full p-2 border border-gray-300 rounded"
                  required
                />
              </div>

              <div className="flex justify-center pt-4">
                <button
                  type="submit"
                  className="bg-[#ef4444] text-white font-bold py-2 px-6 rounded-lg hover:bg-[#f87171] active:bg-[#f87171] transition-colors"
                >
                  Submit
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Result Dialog */}
      {showResultDialog && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white text-black p-8 rounded-lg max-w-md w-full">
            <h2 className="text-2xl font-bold mb-4">{result.isCorrect ? "Congratulations!" : "Results"}</h2>
            <p className="mb-6">{result.message}</p>

            <div className="flex justify-center">
              <button
                onClick={resetGame}
                className="bg-[#ef4444] text-white font-bold py-2 px-6 rounded-lg hover:bg-[#f87171] active:bg-[#f87171] transition-colors"
              >
                Play Again
              </button>
            </div>
          </div>
        </div>
      )}
    </main>
  )
}
