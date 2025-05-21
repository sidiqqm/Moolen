import React from "react";

const MoodPhotoPage = () => {
  return (
    <div className="w-full h-full font-nunito mt-8 relative">
      <div className="flex flex-col justify-center items-center gap-4 pt-20">
        {/* Header */}
        <div>
          <h1 className="text-4xl font-bold -mb-2">Hello, Mehbub!</h1>
          <img src="/pink.png" alt="" className="w-72" />
        </div>

        {/* Canvas Camera (di tengah) */}
        <div className="w-full flex justify-center items-center">
          <canvas
            id="camera-canvas"
            width="840"
            height="680"
            className="border rounded-lg shadow-md"
          ></canvas>
        </div>

        {/* Button */}
        <div className="mt-6">
          <button className="px-28 py-3 bg-secondary text-white text-lg font-semibold rounded-full">
            Track Your Mood
          </button>
        </div>
      </div>

      {/* Background Images */}
      <img
        src="/yellow.png"
        alt=""
        className="absolute -top-32 left-56 w-[320px]"
      />
      <img
        src="/cream.png"
        alt=""
        className="absolute right-0 -bottom-14 w-[180px]"
      />
      <img
        src="/blue.png"
        alt=""
        className="absolute -left-48 top-80"
      />
    </div>
  );
};

export default MoodPhotoPage;