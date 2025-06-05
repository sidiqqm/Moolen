import React, { useRef, useState } from "react";

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
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
      }
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

    context.translate(canvas.width, 0);
    context.scale(-1, 1);
    context.drawImage(video, 0, 0, canvas.width, canvas.height);
    context.setTransform(1, 0, 0, 1, 0, 0);

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

        try {
          const formData = new FormData();
          formData.append("image", blob, "capture.jpg");

          const response = await fetch("http://127.0.0.1:5000/predict", {
            method: "POST",
            body: formData,
          });

          if (!response.ok) throw new Error("Gagal memproses gambar");

          const { mood, confidence } = await response.json();
          setMoodData({ mood, confidence });
          setSuccessMsg(`Mood "${mood}" dikirim dengan confidence ${confidence}`);

          await fetch("http://127.0.0.1:5000/save-mood", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              mood,
              confidence,
              timestamp: new Date().toISOString().slice(0, 19).replace("T", " "),
            }),
          });
        } catch (err) {
          setError(`Error: ${err.message}`);
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

      {!capturedImageUrl ? (
        <video
          ref={videoRef}
          autoPlay
          className="w-full rounded"
          style={{ transform: "scaleX(-1)" }}
        />
      ) : (
        <img
          src={capturedImageUrl}
          alt="Hasil capture"
          className="w-full rounded"
        />
      )}

      <canvas ref={canvasRef} className="hidden" />

      <div className="flex gap-2 flex-wrap">
        {!capturedImageUrl ? (
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
        ) : (
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