"use client";

interface ResultsModalProps {
  results: {
    correctMin: boolean;
    correctMax: boolean;
    actualMin: number;
    actualMax: number;
  };
  onRestart: () => void;
}

export default function ResultsModal({
  results,
  onRestart,
}: ResultsModalProps) {
  const { correctMin, correctMax, actualMin, actualMax } = results;

  const getMessage = () => {
    if (correctMin && correctMax) {
      return "Correct!";
    } else if (correctMin && !correctMax) {
      return `Correct Minimum But Incorrect Maximum! — the correct max is ${actualMax}`;
    } else if (!correctMin && correctMax) {
      return `Correct Maximum But Incorrect Minimum! — the correct min is ${actualMin}`;
    } else {
      return `Incorrect! The correct min is ${actualMin} and the correct max is ${actualMax}`;
    }
  };

  return (
    <div className="bg-gray-800 p-8 rounded-[10px] max-w-md w-full">
      <h2 className="text-2xl font-bold mb-4">Results</h2>

      <div className="mb-6 text-center">
        <p
          className={`text-xl ${
            correctMin && correctMax ? "text-green-400" : "text-red-400"
          }`}
        >
          {getMessage()}
        </p>
      </div>

      <div className="flex justify-center">
        <button
          onClick={onRestart}
          className="bg-white text-black font-bold py-2 px-6 rounded-[10px] hover:bg-gray-200 transition-colors"
        >
          Play Again
        </button>
      </div>
    </div>
  );
}
