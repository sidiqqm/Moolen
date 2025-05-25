import React from "react";

const MoodPhotoPage = () => {
  return (
    <div className="w-full h-full font-nunito mt-8 relative">
      <div className="flex flex-col justify-center items-center gap-4 pt-20">
        {/* Header */}
        <div className="z-10">
          <h1 className="text-4xl font-bold -mb-2">Hello, Mehbub!</h1>
          <img src="/pink.png" alt="" className="w-72" />
        </div>

        {/* Canvas Camera (di tengah) */}
        <div className="w-full flex justify-center items-center z-10">
          <canvas
            id="camera-canvas"
            className="border rounded-lg shadow-md lg:w-[640px] lg:h-[360px] md:w-[480px] md:h-[300px] w-[360px] h-[420px] bg-gray-200"
          ></canvas>
        </div>

        {/* Button */}
        <div className="mt-6 z-10">
          <button className="px-28 py-3 bg-secondary text-white text-lg font-semibold rounded-full">
            Track Your Mood
          </button>
        </div>
      </div>

      {/* Background Images */}
      <img
        src="/yellow.png"
        alt=""
        className="absolute -right-1/6 -top-1/5 md:-right-1/6 md:-top-1/12  lg:-top-32 lg:left-56 w-[320px]"
      />
      <img
        src="/cream.png"
        alt=""
        className="absolute -right-16 bottom-0 md:-right-0 md:-bottom-18 lg:right-0 lg:-bottom-14 w-[140px] md:w-[180px] lg:w-[220px]"
      />
      <img
        src="/blue.png"
        alt=""
        className="absolute -left-1/5 -bottom-1/6 md:-left-1/4 md:-bottom-1/4 lg:-left-48 lg:top-80 w-[320px] md:w-[420px]"
      />
    </div>
  );
};

export default MoodPhotoPage;