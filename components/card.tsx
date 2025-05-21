import { useState } from "react"
import Image from "next/image"

interface CardProps {
  value: number
  isFlipped: boolean
  isRevealed: boolean
  isDisabled: boolean
  onClick: () => void
  position: { col: number; row: number }
  anyCardFlipped: boolean
}

export default function Card({
  value,
  isFlipped,
  isRevealed,
  isDisabled,
  onClick,
  position,
  anyCardFlipped,
}: CardProps) {
  const [isHovered, setIsHovered] = useState(false)
  const [isClicked, setIsClicked] = useState(false)

  // Determine elevation direction based on card position
  const getElevationClass = () => {
    const isLeftSide = position.col < 3
    return isLeftSide ? "translate-x-2 -translate-y-3" : "-translate-x-2 -translate-y-3"
  }

  const handleClick = () => {
    if (!isDisabled && !isRevealed && !isFlipped && !anyCardFlipped) {
      setIsClicked(true)
      setTimeout(() => setIsClicked(false), 300)
      onClick()
    }
  }

  // Determine cursor style based on card state
  const getCursorClass = () => {
    if (isDisabled || isRevealed || anyCardFlipped) {
      return "cursor-not-allowed"
    }
    return "cursor-pointer"
  }

  return (
    <div
      className={`relative h-40 w-28 perspective-1000 ${getCursorClass()}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={handleClick}
    >
      {/* flip-container: holds inner card */}
      <div
        className={`flip-inner relative w-full h-full transform-style-preserve-3d transition-transform duration-500 rounded-lg border-2 border-[#ef4444]
          ${isFlipped ? 'rotate-y-180' : ''}
          ${isHovered && !isDisabled && !isRevealed && !anyCardFlipped ? '-translate-y-2 shadow-lg shadow-[#ef4444]/30' : ''}
          ${isDisabled && !isFlipped ? 'opacity-60' : ''}
          ${isClicked ? getElevationClass() : ''}`}
      >
        {/* Back face */}
        <div className="flip-back absolute w-full h-full backface-hidden bg-white rounded-lg flex items-center justify-center overflow-hidden">
          <div className="absolute top-2 left-2 text-[#ef4444] text-xs">♠</div>
          <div className="absolute top-2 right-2 text-[#ef4444] text-xs">♦</div>
          <div className="absolute bottom-2 left-2 text-[#ef4444] text-xs">♣</div>
          <div className="absolute bottom-2 right-2 text-[#ef4444] text-xs">♥</div>
          <div className="relative w-20 h-20">
            <Image src="/club-logo.png" alt="Club Logo" fill className="object-contain" />
          </div>
        </div>

        {/* Front face */}
        <div className="flip-front absolute w-full h-full backface-hidden transform rotate-y-180 bg-white text-black flex flex-col items-center justify-center border-2 border-[#ef4444] rounded-lg">
          <span className="text-2xl font-bold">{value}</span>
        </div>

        {/* Disabled overlay */}
        {isDisabled && !isFlipped && (
          <div className="absolute w-full h-full bg-white/60 flex items-center justify-center overflow-hidden rounded-lg">
            <div className="absolute top-2 left-2 text-[#ef4444]/60 text-xs">♠</div>
            <div className="absolute top-2 right-2 text-[#ef4444]/60 text-xs">♦</div>
            <div className="absolute bottom-2 left-2 text-[#ef4444]/60 text-xs">♣</div>
            <div className="absolute bottom-2 right-2 text-[#ef4444]/60 text-xs">♥</div>
            <div className="relative w-20 h-20">
              <Image src="/club-logo.png" alt="Club Logo" fill className="object-contain opacity-70" />
            </div>
          </div>
        )}
      </div>

      {/* Tailwind CSS Custom Utilities */}
      <style jsx global>{`
        .perspective-1000 {
          perspective: 1000px;
        }
        .transform-style-preserve-3d {
          transform-style: preserve-3d;
        }
        .backface-hidden {
          backface-visibility: hidden;
        }
        .rotate-y-180 {
          transform: rotateY(180deg);
        }
      `}</style>
    </div>
  )
}
