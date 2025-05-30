"use client";

import type React from "react";
import { useState, useEffect } from "react";
import GameBoard from "@/components/game-board";
import InstructionsModal from "@/components/instructions-modal";

export default function Home() {
  const [gameStarted, setGameStarted] = useState(false);
  const [isDistributing, setIsDistributing] = useState(false);
  const [cardValues, setCardValues] = useState<number[]>([]);
  const [revealedCards, setRevealedCards] = useState<boolean[]>([]);
  const [showInputDialog, setShowInputDialog] = useState(false);

  // Generate random card values
  const generateCardValues = () => {
    const values = [];
    for (let i = 0; i < 18; i++) {
      values.push(Math.floor(Math.random() * 19999) - 9999);
    }
    values[6] = -4853;
    values[17] = 7419;
    return values;
  };

  // Start the game with distribution animation
  const startGame = () => {
    const values = generateCardValues();
    setCardValues(values);
    setRevealedCards(Array(18).fill(false));
    setIsDistributing(true);
    setGameStarted(true);
  };

  // Check if all cards have been revealed
  useEffect(() => {
    if (
      gameStarted &&
      revealedCards.length === 18 &&
      revealedCards.every((card) => card)
    ) {
      setTimeout(() => {
        setShowInputDialog(true);
      }, 1000);
    }
  }, [gameStarted, revealedCards]);

  // Reset the game
  const resetGame = () => {
    setGameStarted(false);
    setIsDistributing(false);
    setCardValues([]);
    setRevealedCards([]);
  };

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
          <div className="bg-white text-black p-8 rounded-[10px] max-w-md w-full">
            <h2 className="text-2xl font-bold mb-4">
              What were the minimum and maximum values?
            </h2>
            <p className="mb-6">
              Head to the HQ to submit the the minimum and maximum values you
              saw on the cards.
            </p>
          </div>
        </div>
      )}
    </main>
  );
}
