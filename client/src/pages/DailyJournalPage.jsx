import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Calendar from "../components/Calendar";
import JournalEntries from "../components/JournalEntries";
import MarqueeText from "../components/MarqueeText";
import Footer from "../components/Footer";

import AOS from "aos";
import "aos/dist/aos.css";

function DailyJournalPage() {
useEffect(() => {
  AOS.init({
    duration: 1000,
    once: false,
    mirror: true,
  });
}, []);

  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    title: "",
    mood: "",
    date: new Date().toISOString().split("T")[0],
    jurnal: "",
  });
  const [entries, setEntries] = useState([]);
  const [selectedDate, setSelectedDate] = useState(new Date());

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const newEntry = {
      id: Date.now(),
      mood: formData.mood,
      title:
        formData.title ||
        `${formData.mood.charAt(0).toUpperCase() + formData.mood.slice(1)} Day`,
      emote: `/${formData.mood}.png`,
      jurnal: formData.jurnal,
      date: formData.date,
      color: getColorByMood(formData.mood),
    };

    setEntries((prevEntries) => [...prevEntries, newEntry]);
    setFormData({
      title: "",
      mood: "",
      date: new Date().toISOString().split("T")[0],
      jurnal: "",
    });
    setShowForm(false);
  };

  const handleEditEntry = (updatedEntry) => {
    setEntries((prevEntries) =>
      prevEntries.map((entry) =>
        entry.id === updatedEntry.id ? updatedEntry : entry
      )
    );
  };

  const handleDeleteEntry = (id) => {
    setEntries((prevEntries) => prevEntries.filter((entry) => entry.id !== id));
  };

  const getColorByMood = (mood) => {
    const moodColors = {
      happy: "bg-gradient-to-br from-[#e6e296] to-[#e6db00]",
      sad: "bg-gradient-to-br from-[#0093cf] to-[#e6bfe5]", 
      angry: "bg-gradient-to-br from-[#e54b4b] to-[#e6a3a3]", 
      fear: "bg-gradient-to-br from-[#0093cf] to-[#e6e6e6]",
      surprise: "bg-gradient-to-br from-[#e6c0e6] to-[#cf6fd9]",
      disgust: "bg-gradient-to-br from-[#9c9c9c] to-[#d1cbcb]", 
      neutral: "bg-gradient-to-br from-[#3fca72] to-[#a3dfb3]",
    };
    return moodColors[mood] || "bg-gradient-to-br from-[#4ADE80] to-[#BBF7D0]";
  };

  const handleDateSelect = (date) => {
    setSelectedDate(date);
  };

  const filteredEntries = entries.filter((entry) => {
    return new Date(entry.date).toDateString() === selectedDate.toDateString();
  });

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-b from-[#AADAFB] to-[#fff] pt-18 font-nunito">
      {/* Hero Section */}
      <section className="container mx-auto px-4 py-16 text-center">
        <h1 className="text-5xl font-bold mb-12 relative">
          <span className="relative z-10 inline-flex flex-wrap justify-center">
            {"Find Peace in Every Page".split(" ").map((word, index) => (
              <span
                key={index}
                data-aos="fade-up"
                data-aos-delay={index * 200}
                className="inline-block"
              >
                {word}&nbsp;
              </span>
            ))}
          </span>
          <div className="absolute -left-8 top-1/2 transform -translate-y-1/2 z-0">
            <div className="w-16 h-16 rounded-full border-4 border-sky-200 opacity-70"></div>
          </div>
          <div className="absolute -right-4 bottom-0 z-0">
            <div className="w-20 h-8 rounded-full border-2 border-pink-200 opacity-70"></div>
          </div>
        </h1>

        <button
          onClick={() => setShowForm(true)}
          className="bg-indigo-900 text-white font-medium py-3 px-8 rounded-full hover:bg-indigo-800 transition-colors transition-transform duration-300 hover:scale-105"
        >
          Pen Down Your Day
        </button>
      </section>

      {/* Journal Entry Form Modal */}
      {showForm && (
        <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg p-6 w-full max-w-md">
            <h2 className="text-2xl font-bold mb-4">New Journal Entry</h2>
            <form onSubmit={handleSubmit}>
              <div className="mb-4">
                <label className="block text-gray-700 mb-2" htmlFor="title">
                  Title
                </label>
                <input
                  type="text"
                  id="title"
                  name="title"
                  value={formData.title}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  required
                />
              </div>

              <div className="mb-4">
                <label className="block text-gray-700 mb-2" htmlFor="mood">
                  Mood
                </label>
                <select
                  id="mood"
                  name="mood"
                  value={formData.mood}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  required
                >
                  <option value="">Select your mood</option>
                  <option value="happy">😊 Happy</option>
                  <option value="disgust">🤢 Disgust</option>
                  <option value="neutral">😌 Neutral</option>
                  <option value="sad">😢 Sad</option>
                  <option value="angry">😠 Angry</option>
                  <option value="surprise">😲 Surprise</option>
                  <option value="fear">😨 Fear</option>
                </select>
              </div>

              <div className="mb-4">
                <label className="block text-gray-700 mb-2" htmlFor="date">
                  Date
                </label>
                <input
                  type="date"
                  id="date"
                  name="date"
                  value={formData.date}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  required
                />
              </div>

              <div className="mb-6">
                <label className="block text-gray-700 mb-2" htmlFor="jurnal">
                  Your Journal
                </label>
                <textarea
                  id="jurnal"
                  name="jurnal"
                  value={formData.jurnal}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 min-h-[150px]"
                  placeholder="Write about your day..."
                  required
                />
              </div>

              <div className="flex justify-end space-x-3">
                <button
                  type="button"
                  onClick={() => setShowForm(false)}
                  className="px-4 py-2 text-gray-600 rounded-lg hover:bg-gray-100"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-indigo-900 text-white rounded-lg hover:bg-indigo-800"
                >
                  Save Entry
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Marquee Banner */}
      <MarqueeText />

      {/* Diary Section */}
      <section className="container mx-auto px-4 pt-24">
        <div className="text-center mb-8 relative">
          <span className="relative inline-block min-w-[16rem] min-h-[4rem] font-bold font-nunito text-4xl" data-aos="fade-up">
            Your Diary
            <img
              src="/circle.png"
              alt="Circle decoration"
              className="absolute -top-9 left-0 w-64 rounded-full"
            />
          </span>
          <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-48 h-12 border border-amber-200 rounded-full -z-10"></div>
          <div className="absolute -top-4 right-[40%] text-amber-500 text-3xl">
            ✦
          </div>
          <div className="absolute top-2 left-[40%] text-indigo-500 text-3xl">
            ✦
          </div>
        </div>

        {/* <div className="flex justify-between items-center mb-10">
          <button
            onClick={() => {
              const now = new Date();
              setSelectedDate(now);
            }}
            className="bg-white text-gray-800 px-4 py-1 rounded-full border border-gray-200 text-sm"
          >
            Today
          </button>
          <button
            onClick={() => {
              const now = new Date();
              setSelectedDate(now);
              // Optionally reset the calendar view to current month
            }}
            className="text-gray-600 cursor-pointer"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="lucide lucide-calendar"
            >
              <rect width="18" height="18" x="3" y="4" rx="2" ry="2" />
              <line x1="16" x2="16" y1="2" y2="6" />
              <line x1="8" x2="8" y1="2" y2="6" />
              <line x1="3" x2="21" y1="10" y2="10" />
            </svg>
          </button>
        </div> */}

        <div className="">
          <Calendar
            selectedDate={selectedDate}
            onDateSelect={handleDateSelect}
            entries={entries}
          />
          <JournalEntries
            entries={filteredEntries}
            onDeleteEntry={handleDeleteEntry}
            onEditEntry={handleEditEntry}
          />
        </div>
      </section>

      {/* Pelangi bergelombang fullscreen */}
      <div className="relative w-full h-screen overflow-hidden mt-0">
        <img
          src="/pelangi.png"
          alt="Pelangi"
          className="absolute top-24 left-0 w-full h-full object-cover z-10" data-aos="fade-up"
        />
      </div>

      <Footer />
    </div>
  );
}

export default DailyJournalPage;