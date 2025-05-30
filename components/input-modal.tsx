"use client";

import type React from "react";

interface InputModalProps {
  userInput: { min: string; max: string };
  setUserInput: React.Dispatch<
    React.SetStateAction<{ min: string; max: string }>
  >;
  onSubmit: () => void;
}

export default function InputModal({
  userInput,
  setUserInput,
  onSubmit,
}: InputModalProps) {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit();
  };

  return (
    <div className="bg-gray-800 p-8 rounded-[10px] max-w-md w-full">
      <h2 className="text-2xl font-bold mb-4">What Do You Remember?</h2>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="min" className="block mb-1">
            Minimum Value:
          </label>
          <input
            id="min"
            type="number"
            value={userInput.min}
            onChange={(e) =>
              setUserInput({ ...userInput, min: e.target.value })
            }
            className="w-full p-2 rounded bg-gray-700 text-white border border-gray-600"
            required
          />
        </div>

        <div>
          <label htmlFor="max" className="block mb-1">
            Maximum Value:
          </label>
          <input
            id="max"
            type="number"
            value={userInput.max}
            onChange={(e) =>
              setUserInput({ ...userInput, max: e.target.value })
            }
            className="w-full p-2 rounded bg-gray-700 text-white border border-gray-600"
            required
          />
        </div>

        <div className="flex justify-center pt-4">
          <button
            type="submit"
            className="bg-white text-black font-bold py-2 px-6 rounded-[10px] hover:bg-gray-200 transition-colors"
          >
            Submit
          </button>
        </div>
      </form>
    </div>
  );
}
