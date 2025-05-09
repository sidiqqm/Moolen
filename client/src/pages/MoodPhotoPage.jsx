import React from "react";

const MoodPhotoPage = () => {
  return (
    <div className="w-full h-full font-nunito mt-8 relative">
      <div className="flex flex-col justify-center items-center gap-6">
        <div className="">
          <h1 className="text-4xl font-bold">Hello, Mehbub!</h1>
          <img src="/pink.png" alt="" className="w-72" />
        </div>
        <img
          src="/purba.png"
          alt=""
          className="object-cover w-[671px] max-h-[386px] border-red-100 border-2 rounded-4xl shadow-lg"
        />
        <div className="">
          <button className="px-28 py-3 bg-secondary text-white text-lg font-semibold rounded-full">
            Track Your Mood
          </button>
        </div>
      </div>
      
        <img src="/yellow.png" alt="" className="absolute -top-48 left-56 w-[320px]" />
        <img src="/cream.png" alt="" className="absolute right-0 -bottom-20 w-[180px]" />
        <img src="/blue.png" alt="" className="absolute -left-48 top-80" />
    </div>
  );
};

export default MoodPhotoPage;
