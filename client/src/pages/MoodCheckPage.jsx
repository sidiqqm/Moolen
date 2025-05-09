import React, { useState } from 'react';
import QuestionCard from '../components/QuestionCard';

const questions = [
  { id: 1, text: 'How connected did you feel to others today?' },
  { id: 2, text: 'How much energy did you have throughout the day?' },
];

export default function MoodCheckPage() {
  const [currentStep, setCurrentStep] = useState(0);
  const [answers, setAnswers] = useState(Array(questions.length).fill(null));

  const handleAnswer = (value) => {
    const newAnswers = [...answers];
    newAnswers[currentStep] = value;
    setAnswers(newAnswers);
  };

  const handleNext = () => {
    if (currentStep < questions.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      alert('Assessment complete!');
    }
  };

  const progress = ((currentStep + 1) / questions.length) * 100;

  return (
    <div className="min-h-screen bg-white flex flex-col items-center justify-center px-4">
      <h2 className="text-2xl font-bold text-center mb-4">Self Assessment</h2>

      {/* Progress Bar */}
      <div className="w-full max-w-xl bg-gray-200 rounded-full h-3 mb-8 relative">
        <div
          className="bg-blue-600 h-3 rounded-full transition-all duration-300"
          style={{ width: `${progress}%` }}
        />
        <div
          className="absolute top-[-15px] left-[calc(50%-5px)] text-2xl"
          style={{ left: `calc(${progress}% - 25px)` }}
        >
          🧠
        </div>
      </div>

      {/* Question Card */}
      <QuestionCard
        question={questions[currentStep]}
        value={answers[currentStep]}
        onAnswer={handleAnswer}
      />

      <button
        onClick={handleNext}
        className="mt-6 bg-blue-800 text-white px-6 py-2 rounded-full hover:bg-blue-700 transition"
      >
        Next
      </button>
    </div>
  );
}
