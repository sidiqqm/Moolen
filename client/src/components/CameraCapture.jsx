import React, {
  useRef,
  useEffect,
  useState,
  forwardRef,
  useImperativeHandle,
} from "react";

// Gunakan forwardRef agar parent bisa akses fungsi capture
const CameraCapture = forwardRef((props, ref) => {
  const videoRef = useRef(null);
  const canvasRef = useRef(null);
  const [stream, setStream] = useState(null);

  useEffect(() => {
    const initCamera = async () => {
      try {
        const mediaStream = await navigator.mediaDevices.getUserMedia({
          video: true,
        });
        videoRef.current.srcObject = mediaStream;
        setStream(mediaStream);
      } catch (err) {
        console.error("Tidak dapat mengakses kamera:", err);
      }
    };
    initCamera();

    return () => {
      if (stream) {
        stream.getTracks().forEach((track) => track.stop());
      }
    };
  }, [stream]);

  // Fungsi capture yang bisa dipanggil dari luar (parent)
  useImperativeHandle(ref, () => ({
    capture: () => {
      const video = videoRef.current;
      const canvas = canvasRef.current;

      if (!video || !canvas) return null;

      canvas.width = video.videoWidth;
      canvas.height = video.videoHeight;
      const ctx = canvas.getContext("2d");
      ctx.drawImage(video, 0, 0, canvas.width, canvas.height);

      // Kembalikan data gambar (misalnya base64)
      return canvas.toDataURL("image/png");
    },
  }));

  return (
    <div className="w-full flex flex-col items-center gap-4">
      <video
        ref={videoRef}
        autoPlay
        playsInline
        className="border rounded-lg shadow-md lg:w-[640px] lg:h-[360px] md:w-[480px] md:h-[300px] w-[360px] h-[420px] object-cover"
      />
      <canvas ref={canvasRef} className="border rounded-lg shadow-md hidden" />
    </div>
  );
});

export default CameraCapture;
