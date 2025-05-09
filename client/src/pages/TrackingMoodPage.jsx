import React from "react";

function TrackingMoodPage() {
  return (
    <div className="w-full h-screen font-nunito flex overflow-hidden">
      <div className="w-1/2 flex flex-col justify-center items-center -ml-8 gap-48">
        <div className="flex flex-col items-center">
          <h1 className="text-5xl font-bold">Hello Mehbub!</h1>
          <img src="/pink.png" alt=""/>
          <h3 className="text-3xl font-semibold">How are you feeling today?</h3>
        </div>
        <div className="">
          <button className="px-24 py-4 bg-secondary text-lg text-white font-semibold rounded-full">
            Track Your Mood
          </button>
        </div>
      </div>

      <div className="w-1/2 relative">
        <img
          src="/yellow.png"
          alt=""
          className="w-[280px] absolute top-8 right-[120px] z-10"
        />
        <img
          src="/blue.png"
          alt=""
          className="w-[320px] absolute bottom-52 left-20 z-0"
        />
        <img
          src="/cream.png"
          alt=""
          className="w-[180px] absolute bottom-10 -right-18 z-20"
        />
      </div>
    </div>
  );
}

export default TrackingMoodPage;
