import React, { useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";

// Landing Page SelfAssessment
export const SelfAssessment = () => {
  return (
    <section className="bg-gradient-to-b from-sky-200 to-white min-h-screen flex flex-col items-center justify-center px-4 py-10">
      <div className="bg-[#1A2442] rounded-3xl p-20 h-[500px] md:h-[700px] max-w-[1850px] w-full flex flex-col md:flex-row justify-between items-center shadow-lg">
        <div className="relative text-white max-w-xl">
        <img
            src="/y.png"
            alt="abstract decoration"
            className="absolute -top-20 -left-10 z-0 w-72 opacity-40"
        />
        <h1 className="relative z-10 text-6xl md:text-7xl font-extrabold mb-4 leading-tight">
            Stop guessing. <br />
            <span className="text-blue-300">Start assessing.</span>
        </h1>
        <p className="italic text-gray-300 mb-10 relative z-10">
            "Knowing yourself is the beginning of all wisdom." – Aristotle
        </p>
        <Link to="/self-assessment/start">
            <button className="relative z-10 bg-sky-300 hover:bg-sky-400 text-black px-10 py-3 mt-10 rounded-full font-semibold shadow-md transition">
            Start Reflection
            </button>
        </Link>
        </div>

        <div className="mt-10 md:mt-0 md:ml-10">
          <img
            src="/sa1.png"
            alt="Meditation Illustration"
            className="max-w-xs md:max-w-2xl"
          />
        </div>
      </div>
    </section>
  );
};

// Halaman AssessmentStart
export const AssessmentStart = () => {
  return (
    <section className="min-h-screen bg-gradient-to-b from-sky-200 to-white flex flex-col items-center justify-center text-center px-6 py-10">

      <h1 className="text-4xl md:text-5xl font-bold text-[#1A2442] mb-10">Self Assessment</h1>

      <div className="relative w-[300px] md:w-[400px] mb-10">
        <img src="/sawal.png" alt="MoodLens Diagram" className="w-full" />
      </div>

      <h2 className="text-2xl font-bold text-[#1A2442] mb-2">
        MooLens<span className="text-yellow-400">✦</span>
      </h2>

      <p className="text-gray-700 text-sm md:text-base mb-10">
        How are you feeling today? <br />
        Let's explore together through the following questions.
      </p>

      <Link to="/self-assessment/form">
        <button className="bg-[#1A2442] text-white px-50 py-3 rounded-full text-lg font-semibold shadow-md hover:bg-[#2B3560]">
          Start
        </button>
      </Link>
    </section>
  );
};

//Halaman Assessment Form
const questions = [
  "Do you often feel panicked?",
  "Do you experience excessive sweating (without physical cause)?",
  "Do you have difficulty concentrating?",
  "Are you having trouble with work or daily activities?",
  "Have you felt hopeless lately?",
  "Do you often feel angry without a clear reason?",
  "Do you feel your reactions to situations are overly exaggerated?",
  "Has your eating pattern changed unusually?",
  "Have you ever had thoughts of suicide?",
  "Do you feel constantly fatigued without a physical reason?",
  "Has your weight increased significantly without an apparent cause?",
  "Do you feel like withdrawing or becoming very introverted?",
  "Do you often experience nightmares?",
  "Do you avoid people or social activities you used to enjoy?",
  "Do you frequently feel negative about yourself?",
  "Do you often blame yourself for small things?",
  "Have you ever experienced hallucinations (seeing or hearing things that aren't real)?",
  "Do you engage in repetitive behaviors that are hard to control?",
  "Do you feel unusually energetic (hyperactive)?",
];

export const AssessmentForm = () => {
  const navigate = useNavigate();
  const [step, setStep] = useState("age");
  const [birthDate, setBirthDate] = useState("");
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState([]);
  const [selectedAnswer, setSelectedAnswer] = useState(null);

  const calculateAge = (dob) => {
    const birth = new Date(dob);
    const today = new Date();
    let age = today.getFullYear() - birth.getFullYear();
    const m = today.getMonth() - birth.getMonth();
    if (m < 0 || (m === 0 && today.getDate() < birth.getDate())) {
      age--;
    }
    return age;
  };

  const handleStart = () => {
    if (!birthDate) {
      alert("Please select your birth date.");
      return;
    }
    
    if (new Date(birthDate) > new Date()) {
      alert("Birth date cannot be in the future.");
      return;
    }

    const age = calculateAge(birthDate);
    setAnswers([age]);
    setStep("questions");
  };

  const handleSelectAnswer = (answer) => {
    setSelectedAnswer(answer);
  };

  const handleNext = () => {
    if (selectedAnswer === null) {
      alert("Please select an answer before continuing.");
      return;
    }

    const updatedAnswers = [...answers];
    updatedAnswers[currentQuestion + 1] = selectedAnswer;
    setAnswers(updatedAnswers);
    setSelectedAnswer(null);

    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion((prev) => prev + 1);
    } else {
      navigate("/self-assessment/summary", { 
        state: { answers: updatedAnswers } 
      });
    }
  };

  const handleBackQuestion = () => {
    if (currentQuestion === 0) {
      setStep("age");
    } else {
      const updatedAnswers = [...answers];
      updatedAnswers.splice(currentQuestion + 1, 1);
      setAnswers(updatedAnswers);
      setCurrentQuestion(currentQuestion - 1);
      setSelectedAnswer(answers[currentQuestion]);
    }
  };

  const progressPercent = ((currentQuestion + 1) / questions.length) * 100;

  return (
    <section className="min-h-screen flex flex-col items-center justify-center px-4 py-10 bg-gradient-to-b from-[#DFF1FF] to-[#B9E3FF] relative">
      <img
        src="/neural.png"
        alt="abstract decoration"
        className="absolute bottom-0 left-20 z-0 w-72 opacity-40 mb-4 ml-4"
      />
      <img
        src="/neural.png"
        alt="abstract decoration"
        className="absolute top-60 right-20 z-0 w-72 opacity-40 mb-4 ml-4"
      />

      {step === "questions" ? (
        <button
          onClick={handleBackQuestion}
          className="absolute left-40 top-42 text-2xl text-[#1A2442]"
        >
          ← Back
        </button>
      ) : (
        <Link
          to="/self-assessment/start"
          className="absolute left-40 top-42 text-2xl text-[#1A2442]"
        >
          ← Back
        </Link>
      )}

      <h1 className="text-4xl md:text-5xl font-bold text-[#1A2442] -mt-10 mb-32 text-center">
        Self Assessment
      </h1>

      {step === "age" ? (
        <>
          <p className="text-xl mb-8">Please enter your date of birth:</p>
          <input
            type="date"
            value={birthDate}
            onChange={(e) => setBirthDate(e.target.value)}
            className="bg-white w-full max-w-md text-xl px-4 py-3 rounded-lg border border-gray-300 shadow-sm focus:outline-none focus:ring-2 focus:ring-[#3A53BF] mb-8"
          />
          <button
            onClick={handleStart}
            className="bg-[#1E2347] text-white text-xl font-semibold w-full max-w-md py-4 rounded-full shadow-md hover:opacity-90 transition"
          >
            Next
          </button>
        </>
      ) : (
        <>
          {/* Progress Bar */}
          <div className="w-full max-w-7xl mb-14 relative">
            <div className="h-6 bg-transparent border-4 border-[#1A2442] rounded-full overflow-hidden">
              <div
                className="h-full bg-[#3A53BF]"
                style={{ width: `${progressPercent}%` }}
              />
            </div>
            <img
              src="/brain-progress.png"
              alt="progress icon"
              className="absolute top-[-20px]"
              style={{ left: `calc(${progressPercent}% - 18px)` }}
            />
          </div>

          {/* Question */}
          <div className="w-full max-w-2xl bg-white text-left text-xl text-black rounded-xl p-6 mb-10 shadow-md">
            {questions[currentQuestion]}
          </div>

          {/* Answer Buttons */}
          <div className="flex gap-6 mb-10 justify-center flex-wrap w-full max-w-2xl">
            <button
              onClick={() => handleSelectAnswer("Yes")}
              className={`w-full max-w-[calc(50%-1.5rem)] text-xl font-semibold py-4 rounded-full 
                outline outline-4 outline-white 
                hover:outline-[#3A53BF] hover:bg-white hover:text-[#3A53BF] transition duration-200
                ${
                  selectedAnswer === "Yes"
                    ? "bg-[#3A53BF] text-white outline-[#3A53BF]"
                    : "bg-[#D4E6F1] text-[#1A2442]"
                }`}
            >
              Yes
            </button>
            <button
              onClick={() => handleSelectAnswer("No")}
              className={`w-full max-w-[calc(50%-1.5rem)] text-xl font-semibold py-4 rounded-full 
                outline outline-4 outline-white 
                hover:outline-[#3A53BF] hover:bg-white hover:text-[#3A53BF] transition duration-200
                ${
                  selectedAnswer === "No"
                    ? "bg-[#3A53BF] text-white outline-[#3A53BF]"
                    : "bg-[#D4E6F1] text-[#1A2442]"
                }`}
            >
              No
            </button>
          </div>

          {/* Next Button */}
          <button
            onClick={handleNext}
            disabled={selectedAnswer === null}
            className={`bg-[#1E2347] text-white text-xl font-semibold w-full max-w-2xl py-4 rounded-full shadow-md hover:opacity-90 transition
              ${selectedAnswer === null ? "opacity-50 cursor-not-allowed" : ""}`}
          >
            {currentQuestion === questions.length - 1 ? "Finish" : "Next"}
          </button>
        </>
      )}
    </section>
  );
};


// Halaman Summary Form
const calculateMoodScore = (answers) => {
  if (!answers || answers.length < 2) return 50;
  
  const responses = answers.slice(1);
  const noCount = responses.filter(answer => answer === "No").length;
  
  const moodScore = Math.round((noCount / responses.length) * 100);
  return moodScore;
};

const getMoodAnalysis = (score) => {
  if (score >= 80) {
    return {
      description: "You seem very positive and energetic",
      emojis: "😊😄💪"
    };
  } else if (score >= 60) {
    return {
      description: "You seem calm with a touch of tiredness",
      emojis: "😊😌💪"
    };
  } else if (score >= 40) {
    return {
      description: "You seem to be experiencing some challenges",
      emojis: "😐😔🤗"
    };
  } else {
    return {
      description: "You might be going through a difficult time",
      emojis: "😔😰🫂"
    };
  }
};

const getRecommendation = (score) => {
  if (score >= 80) {
    return "Keep up the positive energy with regular exercise!";
  } else if (score >= 60) {
    return "Try a short breathing exercise today!";
  } else if (score >= 40) {
    return "Consider talking to someone you trust or practicing mindfulness.";
  } else {
    return "Please consider reaching out to a mental health professional for support.";
  }
};

export const SummaryForm = () => {
  const location = useLocation();
  const answers = location.state?.answers || [];
  
  const moodScore = calculateMoodScore(answers);
  const { description, emojis } = getMoodAnalysis(moodScore);
  const recommendation = getRecommendation(moodScore);

  return (
    <section className="min-h-screen flex flex-col items-center justify-center px-4 py-10 bg-gradient-to-b from-[#DFF1FF] to-[#B9E3FF] relative">
      <h1 className="text-4xl md:text-5xl font-bold text-[#1A2442] mb-16 text-center">
        Summary Result
      </h1>

      {/* Main Result Card */}
      <div className="bg-gradient-to-br from-[#4A67C8] to-[#3A53BF] rounded-3xl p-8 md:p-12 max-w-4xl w-full mx-4 text-white shadow-2xl">
        {/* Mood Description */}
        <div className="text-center mb-8">
          <h2 className="text-2xl md:text-3xl font-medium mb-6 leading-relaxed">
            {description}
          </h2>
          <div className="text-6xl md:text-7xl mb-8">
            {emojis}
          </div>
        </div>

        {/* Mood Score Section */}
        <div className="mb-8">
          <div className="flex justify-between items-center mb-4">
            <span className="text-xl md:text-2xl font-medium">Mood Score</span>
            <span className="text-2xl md:text-3xl font-bold">{moodScore}%</span>
          </div>
          
          {/* Progress Bar */}
          <div className="relative">
            <div className="h-4 md:h-6 bg-white bg-opacity-30 rounded-full overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-yellow-400 to-yellow-300 rounded-full transition-all duration-1000 ease-out"
                style={{ width: `${moodScore}%` }}
              />
            </div>
          </div>
        </div>

        {/* Recommendation */}
        <div className="text-center mb-8">
          <p className="text-lg md:text-xl font-light leading-relaxed">
            {recommendation}
          </p>
        </div>

        {/* Save Button */}
        <div className="text-center">
          <button className="bg-white bg-opacity-20 hover:bg-opacity-30 text-black px-6 md:px-10 py-3 md:py-4 rounded-full text-lg md:text-xl font-semibold border border-white border-opacity-30 transition duration-200 backdrop-blur-sm">
            Save My Reflection
          </button>
        </div>
      </div>

      <div className="mt-8 flex gap-4 flex-wrap justify-center">
        <Link to="/self-assessment/start">
          <button className="bg-white text-[#3A53BF] px-6 py-3 rounded-full font-semibold shadow-md hover:bg-gray-50 transition">
            Take Assessment Again
          </button>
        </Link>
        <Link to="/">
          <button className="bg-[#1A2442] text-white px-6 py-3 rounded-full font-semibold shadow-md hover:bg-[#2B3560] transition">
            Back to Home
          </button>
        </Link>
      </div>
    </section>
  );
};