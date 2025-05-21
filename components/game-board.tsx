"use client"

import type React from "react"
import { useState, useEffect } from "react"
import Card from "@/components/card"

interface GameBoardProps {
  cardValues: number[]
  revealedCards: boolean[]
  setRevealedCards: React.Dispatch<React.SetStateAction<boolean[]>>
  isDistributing: boolean
}

export default function GameBoard({ cardValues, revealedCards, setRevealedCards, isDistributing }: GameBoardProps) {
  const [flippedIndex, setFlippedIndex] = useState<number | null>(null)
  const [disabledCards, setDisabledCards] = useState<boolean[]>(Array(18).fill(false))
  const [visibleCards, setVisibleCards] = useState<boolean[]>(Array(18).fill(false))
  const [countdown, setCountdown] = useState<number | null>(null)

  // Handle the card distribution animation
  useEffect(() => {
    if (isDistributing) {
      const newVisibleCards = [...visibleCards]

      // Animate cards appearing one by one
      for (let i = 0; i < 18; i++) {
        setTimeout(() => {
          newVisibleCards[i] = true
          setVisibleCards([...newVisibleCards])
        }, i * 100) // 100ms delay between each card
      }
    }
  }, [isDistributing])

  const handleCardClick = (index: number) => {
    // Prevent clicking if a card is already flipped or this card is disabled
    if (flippedIndex !== null || disabledCards[index] || revealedCards[index]) {
      return
    }

    // Flip the card
    setFlippedIndex(index)
    setCountdown(3)

    // Start the 3-second timer
    const timer = setInterval(() => {
      setCountdown((prev) => {
        if (prev === null || prev <= 1) {
          clearInterval(timer)
          return null
        }
        return prev - 1
      })
    }, 1000)

    // After 3 seconds, make the card unclickable
    setTimeout(() => {
      // Mark card as revealed and disabled
      const newRevealedCards = [...revealedCards]
      newRevealedCards[index] = true
      setRevealedCards(newRevealedCards)

      const newDisabledCards = [...disabledCards]
      newDisabledCards[index] = true
      setDisabledCards(newDisabledCards)

      // Reset flipped state
      setFlippedIndex(null)
      setCountdown(null)
    }, 3000)
  }

  // Count opened cards
  const openedCardsCount = revealedCards.filter(Boolean).length

  return (
    <div className="relative w-full h-full min-h-[600px] flex flex-col items-center justify-center">
      {/* HUD Counters */}
      <div className="absolute top-4 left-4 text-white font-medium z-10 bg-black/40 px-3 py-1 rounded-full">
        Opened Cards: {openedCardsCount}/18
      </div>

      {countdown !== null && (
        <div className="absolute top-4 right-4 text-white font-medium z-10 bg-[#ef4444] px-3 py-1 rounded-full">
          {countdown}s
        </div>
      )}

      {/* Cards Grid */}
      <div className="relative z-10 grid grid-cols-6 gap-2 p-8">
        {cardValues.map((value, index) => {
          // Calculate row and column for position-based animations
          const row = Math.floor(index / 6)
          const col = index % 6

          return (
            <div
              key={index}
              className={`transform transition-all duration-500 ${
                visibleCards[index] ? "scale-100 opacity-100" : "scale-0 opacity-0"
              }`}
              style={{
                transitionDelay: `${index * 100}ms`,
              }}
            >
              <Card
                value={value}
                isFlipped={flippedIndex === index}
                isRevealed={revealedCards[index]}
                isDisabled={disabledCards[index]}
                onClick={() => handleCardClick(index)}
                position={{ row, col }}
                anyCardFlipped={flippedIndex !== null}
              />
            </div>
          )
        })}
      </div>
    </div>
  )
}
