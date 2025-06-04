import React, { useRef, useEffect, useState } from "react";
import MoodTracker from "../components/MoodTracker";

// const CameraCaptureCanvas = () => {
//   const videoRef = useRef(null);
//   const canvasRef = useRef(null);
//   const [hasCaptured, setHasCaptured] = useState(false);

//   useEffect(() => {
//     const startCamera = async () => {
//       try {
//         const stream = await navigator.mediaDevices.getUserMedia({
//           video: true,
//         });
//         if (videoRef.current) {
//           videoRef.current.srcObject = stream;
//         }
//       } catch (error) {
//         console.error("Error accessing camera:", error);
//       }
//     };

//     startCamera();

//     return () => {
//       if (videoRef.current && videoRef.current.srcObject) {
//         const tracks = videoRef.current.srcObject.getTracks();
//         tracks.forEach((track) => track.stop());
//       }
//     };
//   }, []);

//   const handleCapture = () => {
//     if (!videoRef.current || !canvasRef.current) return;
//     const context = canvasRef.current.getContext("2d");
//     const { videoWidth, videoHeight } = videoRef.current;

//     canvasRef.current.width = videoWidth;
//     canvasRef.current.height = videoHeight;

//     context.drawImage(videoRef.current, 0, 0, videoWidth, videoHeight);
//     setHasCaptured(true);
//   };

//   const handleRetake = () => {
//     setHasCaptured(false);
//   };

//   const handleSave = () => {
//     if (!canvasRef.current) return;
//     const image = canvasRef.current.toDataURL("image/jpeg");
//     const link = document.createElement("a");
//     link.href = image;
//     link.download = `mood-photo-${Date.now()}.jpg`;
//     link.click();
//   };

//   return (
//     <div className="flex flex-col items-center gap-3 w-full max-w-md">
//       <div className="relative w-full aspect-video rounded-xl overflow-hidden border border-gray-300 shadow-md">
//         {!hasCaptured ? (
//           <video
//             ref={videoRef}
//             autoPlay
//             playsInline
//             className="w-full h-full object-cover"
//           />
//         ) : (
//           <canvas ref={canvasRef} className="w-full h-full object-cover" />
//         )}
//       </div>

//       <div className="flex gap-3">
//         {!hasCaptured ? (
//           <button
//             onClick={handleCapture}
//             className="px-4 py-2 bg-pink-500 text-white rounded-full shadow hover:bg-pink-600 transition"
//           >
//             Capture
//           </button>
//         ) : (
//           <>
//             <button
//               onClick={handleRetake}
//               className="px-4 py-2 bg-gray-400 text-white rounded-full shadow hover:bg-gray-500 transition"
//             >
//               Retake
//             </button>
//             <button
//               onClick={handleSave}
//               className="px-4 py-2 bg-green-500 text-white rounded-full shadow hover:bg-green-600 transition"
//             >
//               Save
//             </button>
//           </>
//         )}
//       </div>
//     </div>
//   );
// };

const MoodPhotoPage = () => {
  return (
    <div className="w-screen h-screen overflow-hidden font-nunito relative">
      <div className="flex flex-col justify-center items-center gap-4 pt-12 h-full px-4">
        {/* Header */}
        <div className="z-10 text-center">
          <h1 className="text-4xl font-bold -mb-2">Hello, Mehbub!</h1>
          <img src="/pink.png" alt="" className="w-72 mx-auto" />
        </div>

        {/* Canvas Camera */}
        <MoodTracker />
      </div>

      {/* Background Images */}
      <img
        src="/yellow.png"
        alt=""
        className="absolute -right-1/6 -top-1/5 md:-right-1/6 md:-top-1/12 lg:-top-32 lg:left-56 w-[320px]"
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
