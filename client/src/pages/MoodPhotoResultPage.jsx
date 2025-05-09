import React, { useState } from "react";

const MoodPhotoResultPage = () => {
  const [result, setResult] = useState("happy");

  return (
    <div className="w-full h-full font-nunito mt-8 relative">
      <div className="flex flex-col justify-center items-center gap-6">
        <div className="w-full flex flex-col items-center relative">
          <h1 className="text-xl font-bold absolute -top-1">Today I feel</h1>
          <div className="mt-2 px-16 py-4 bg-gradient-to-b from-[#FFCE0066] to-white inline-block rounded-[30px] text-4xl font-bold uppercase text-[#E7BB00] shadow-lg">
            {result}
          </div>
        </div>

        {/* Wrapper gambar + button */}
        <div className="relative">
          <img
            src="/purba.png"
            alt=""
            className="object-cover w-[671px] max-h-[386px] border-red-100 border-2 rounded-4xl shadow-lg"
          />
          <button
            className="absolute left-1/2 -bottom-6 transform -translate-x-1/2 px-14 py-3 bg-[#FFE98A] text-black text-lg font-bold rounded-full shadow-md"
          >
            Write down your journal
          </button>
        </div>
      </div>

      <img
        src="/yellow.png"
        alt=""
        className="absolute -top-48 left-56 w-[320px]"
      />
      <img
        src="/cream.png"
        alt=""
        className="absolute right-0 -bottom-20 w-[180px]"
      />
      <img src="/blue.png" alt="" className="absolute -left-48 top-80" />
    </div>
  );
};

export default MoodPhotoResultPage;
