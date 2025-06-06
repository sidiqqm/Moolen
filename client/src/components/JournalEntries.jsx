import { useState } from "react";

function JournalEntries({ entries }) {
  const [activeDropdown, setActiveDropdown] = useState(null);

  const toggleDropdown = (id) => {
    setActiveDropdown(activeDropdown === id ? null : id);
  };

  if (entries.length === 0) {
    return (
      <div className="text-center py-10">
        <div className="inline-block p-6 bg-white rounded-lg shadow-md">
          <p className="text-gray-600">
            Anda tidak ada membuat jurnal hari ini
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-6">
      {entries.map((entry) => (
        <div
          key={entry.id}
          className={`${entry.color} p-6 rounded-lg shadow-2xl relative flex flex-col h-full lg:h-[505px] border border-gray-500 hover:shadow-lg transition-shadow duration-300`}
        >
          {/* Header Section */}
          <div className="flex justify-between items-center mb-2">
            <h3 className="font-semibold text-xl">{entry.title}</h3>
            <div className="relative">
              <button
                onClick={() => toggleDropdown(entry.id)}
                className="p-2 hover:bg-black/10 rounded-full"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="18"
                  height="18"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <circle cx="12" cy="12" r="1" />
                  <circle cx="12" cy="5" r="1" />
                  <circle cx="12" cy="19" r="1" />
                </svg>
              </button>
              {activeDropdown === entry.id && (
                <div className="absolute right-0 mt-2 w-40 bg-white rounded-md shadow-lg z-10">
                  <div className="py-1">
                    <button className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                      Edit
                    </button>
                    <button className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                      Share
                    </button>
                    <button className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                      Delete
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Journal Section */}
          <div className="flex flex-col flex-grow gap-2">
            {/* Image Container */}
            <div className="flex justify-center items-center min-h-[180px]">
              {entry.emote && (
                <img
                  src={entry.emote}
                  alt="Emote"
                  className="max-w-full max-h-[280px]"
                />
              )}
            </div>

            {/* Text Journal */}
            <div className="flex flex-col flex-grow gap-4">
              <p className="text-md line-clamp-6 flex-grow">
                {entry.jurnal || "No journal entry yet..."}
              </p>
              <div className="text-sm text-right font-medium">
                {entry.date || "No date"}
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

export default JournalEntries;
