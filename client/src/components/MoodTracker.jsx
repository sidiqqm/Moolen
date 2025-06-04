import React, { useRef, useState } from "react";
import apiRequest from "../lib/apiRequest";

const MoodTracker = () => {
  const videoRef = useRef(null);
  const canvasRef = useRef(null);
  const streamRef = useRef(null);

  const [error, setError] = useState("");
  const [successMsg, setSuccessMsg] = useState("");
  const [capturedImageUrl, setCapturedImageUrl] = useState(null);
  const [moodData, setMoodData] = useState(null);
  const [loading, setLoading] = useState(false);

  const startCamera = async () => {
    setError("");
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: true });
      streamRef.current = stream;
      videoRef.current.srcObject = stream;
    } catch (err) {
      setError("Tidak dapat mengakses kamera");
    }
  };

  const stopCamera = () => {
    if (streamRef.current) {
      streamRef.current.getTracks().forEach((track) => track.stop());
      streamRef.current = null;
    }
  };

  const resetCapture = () => {
    setCapturedImageUrl(null);
    setMoodData(null);
    setSuccessMsg("");
    startCamera();
  };

  const captureMood = () => {
    const video = videoRef.current;
    const canvas = canvasRef.current;
    if (!video || !canvas) return;

    const context = canvas.getContext("2d");
    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;
    context.drawImage(video, 0, 0, canvas.width, canvas.height);

    const imageUrl = canvas.toDataURL("image/jpeg");
    setCapturedImageUrl(imageUrl);

    canvas.toBlob(
      async (blob) => {
        if (!blob) return;

        if (blob.size > 10 * 1024 * 1024) {
          setError("Ukuran gambar melebihi 10MB");
          return;
        }

        stopCamera();
        setLoading(true);
        setError("");
        setSuccessMsg("");

        // Dummy mood prediction
        const dummyMoods = ["Happy", "Sad", "Neutral", "Angry", "Excited"];
        const mood = dummyMoods[Math.floor(Math.random() * dummyMoods.length)];
        const confidence = `${(Math.random() * (100 - 70) + 70).toFixed(2)}%`;
        const createdAt = new Date().toLocaleDateString("en-CA");
        setMoodData({ mood, confidence });

        console.log("[DEBUG] Data yang akan dikirim:");
        console.log("Tanggal:", createdAt);
        console.log("Mood:", mood);
        console.log("Confidence:", confidence);
        console.log("Blob:", blob);

        const formData = new FormData();
        formData.append("image", blob, `capture-${createdAt}.jpg`);
        formData.append("createdAt", createdAt);
        formData.append("mood", mood);
        formData.append("confidence", confidence);

        // Jika tidak menggunakan dummy data, ganti dengan request ke server
        // const createdAt = new Date().toISOString();

        // const formData = new FormData();
        // formData.append("image", blob, `capture-${createdAt}.jpg`);
        // formData.append("createdAt", createdAt);

        // try {
        //   const response = await fetch("http://localhost:3000/api/moods", {
        //     method: "POST",
        //     body: formData,
        //   });

        //   if (!response.ok) throw new Error("Gagal mengirim data ke server");

        //   const result = await response.json();
        //   const { mood, confidence } = result;

        //   setMoodData({ mood, confidence });

        //   console.log("[BACKEND RESULT]", result);
        //   setSuccessMsg(
        //     `Mood "${mood}" dikirim dengan confidence ${confidence}`
        //   );
        // } catch (err) {
        //   setError(`Error: ${err.message}`);
        // } finally {
        //   setLoading(false);
        // }

        try {
          const response = await apiRequest.post("/moods", formData);
          setSuccessMsg(
            `Mood "${mood}" dikirim dengan confidence ${confidence}`
          );
        } catch (error) {
          console.error("Error:", error);
          setError("Gagal mengirim data ke server");
        } finally {
          setLoading(false);
        }
      },
      "image/jpeg",
      0.9
    );
  };

  return (
    <div className="p-4 max-w-md mx-auto bg-white shadow rounded-xl space-y-4">
      <h2 className="text-xl font-bold">Mood Tracker with Camera</h2>

      {!capturedImageUrl && (
        <video ref={videoRef} autoPlay className="w-full rounded" />
      )}

      {capturedImageUrl && (
        <img
          src={capturedImageUrl}
          alt="Hasil capture"
          className="w-full rounded"
        />
      )}

      <canvas ref={canvasRef} className="hidden" />

      <div className="flex gap-2 flex-wrap">
        {!capturedImageUrl && (
          <>
            <button
              onClick={startCamera}
              className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
            >
              Start Camera
            </button>
            <button
              onClick={captureMood}
              className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
              disabled={loading}
            >
              {loading ? "Processing..." : "Capture"}
            </button>
          </>
        )}

        {capturedImageUrl && (
          <button
            onClick={resetCapture}
            className="bg-yellow-500 text-white px-4 py-2 rounded hover:bg-yellow-600"
          >
            Ulangi
          </button>
        )}
      </div>

      {loading && (
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 border-2 border-gray-400 border-t-transparent rounded-full animate-spin"></div>
          <span className="text-sm text-gray-600">Mengirim data...</span>
        </div>
      )}

      {moodData && (
        <div className="text-sm text-gray-700">
          <p>
            Prediksi Mood: <strong>{moodData.mood}</strong>
          </p>
          <p>
            Confidence: <strong>{moodData.confidence}</strong>
          </p>
        </div>
      )}

      {error && <p className="text-red-500 text-sm">{error}</p>}
      {successMsg && <p className="text-green-600 text-sm">{successMsg}</p>}
    </div>
  );
};

export default MoodTracker;
