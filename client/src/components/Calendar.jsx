import { useState, useEffect } from "react";

// Utility function for classnames
const cn = (...classes) => {
  return classes.filter(Boolean).join(" ");
};

function RealCalendar() {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [calendarDays, setCalendarDays] = useState([]);

  // Function to get day name in English
  const getDayName = (date) => {
    const days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
    return days[date.getDay()];
  };

  // Function to get all dates to display in the calendar
  const generateCalendarDays = () => {
    const today = new Date();
    const daysToShow = 18; // Number of days to display
    const result = [];

    // Add some days before today
    for (let i = -3; i < daysToShow - 3; i++) {
      const date = new Date(today);
      date.setDate(today.getDate() + i);

      result.push({
        date: date,
        dayNumber: date.getDate(),
        dayName: getDayName(date),
        isToday: date.toDateString() === today.toDateString(),
        isSelected: date.toDateString() === selectedDate.toDateString(),
      });
    }

    setCalendarDays(result);
  };

  // Generate calendar days when component mounts and when selectedDate changes
  useEffect(() => {
    generateCalendarDays();
  }, [selectedDate]);

  // Function to select a date
  const handleDateSelect = (date) => {
    setSelectedDate(date);
  };

  return (
    <div className="mb-8">
      <div className="flex overflow-x-auto pb-4 gap-2 scrollbar-hide">
        {calendarDays.map((day, index) => (
          <div
            key={index}
            className={cn(
              "flex flex-col items-center justify-center min-w-[60px] h-[80px] rounded-full p-2 cursor-pointer transition-colors",
              day.isSelected
                ? "bg-indigo-600 text-white"
                : "bg-white/80 text-gray-800 hover:bg-gray-100",
              day.isToday && !day.isSelected && "border-2 border-indigo-400"
            )}
            onClick={() => handleDateSelect(day.date)}
          >
            <span className="text-lg font-medium">{day.dayNumber}</span>
            <span className="text-xs">{day.dayName}</span>
          </div>
        ))}
      </div>
      <div className="h-1 bg-gray-200 rounded-full w-full mt-2">
        <div className="h-1 bg-indigo-600 rounded-full w-1/3"></div>
      </div>
    </div>
  );
}

export default RealCalendar;
