import { useEffect, useState, useRef } from "react";
import Webcam from "react-webcam";
import * as faceapi from "face-api.js";

export default function WebcamProctor({ onViolation }) {
  const webcamRef = useRef(null);
  const [tabSwitches, setTabSwitches] = useState(0);
  const [faceMissCount, setFaceMissCount] = useState(0);
  const [modelsLoaded, setModelsLoaded] = useState(false);

  // 🧠 Load models
  useEffect(() => {
    const loadModels = async () => {
      try {
        const CDN_URL = "https://cdn.jsdelivr.net/gh/justadudewhohacks/face-api.js@master/weights";

        console.log("📦 Attempting to load models from:", CDN_URL);

        console.log("⏳ Loading tinyFaceDetector...");
        await faceapi.nets.tinyFaceDetector.loadFromUri(CDN_URL);
        console.log("✅ tinyFaceDetector loaded!");

        console.time("faceLandmark68Net");
        await faceapi.nets.faceLandmark68Net.loadFromUri(CDN_URL);
        console.timeEnd("faceLandmark68Net");
        console.log("✅ faceLandmark68Net loaded");

        setModelsLoaded(true);
        console.log("🎉 All models loaded successfully!");
        console.log("faceapi models:", Object.keys(faceapi.nets));
        console.log(
          "tinyFaceDetector loaded?",
          faceapi.nets.tinyFaceDetector.isLoaded
        );
        console.log(
          "faceLandmark68Net loaded?",
          faceapi.nets.faceLandmark68Net.isLoaded
        );

        console.log("🎉 All models loaded successfully!");
      } catch (error) {
        console.error("❌ Model load failed:", error);
      }
    };

    loadModels();
  }, []);

  // ⚠️ Detect tab switching
  useEffect(() => {
    const handleBlur = () => {
      setTabSwitches((prev) => {
        const newCount = prev + 1;
        console.log("⚠️ Tab switch detected:", newCount);

        if (newCount === 3) {
          alert(
            "⚠️ Warning: You switched tabs 3 times. One more and exam ends!"
          );
        } else if (newCount >= 4) {
          alert("❌ Exam ended due to excessive tab switching!");
          onViolation?.("tab");
        }

        return newCount;
      });
    };

    window.addEventListener("blur", handleBlur);
    return () => window.removeEventListener("blur", handleBlur);
  }, [onViolation]);

  // 🧍 Detect face presence
  useEffect(() => {
    if (!modelsLoaded) {
      console.log("⏳ Models not loaded yet — skipping detection loop");
      return;
    }

    console.log("🎥 Starting face detection loop...");

    const detectFace = async () => {
      const video = webcamRef.current?.video;
      if (!video) {
        console.warn("⚠️ No video element found yet");
        return;
      }

      if (video.readyState !== 4) {
        console.warn(
          "⚠️ Video not ready yet (readyState:",
          video.readyState,
          ")"
        );
        return;
      }

      const detections = await faceapi.detectAllFaces(
        video,
        new faceapi.TinyFaceDetectorOptions({
          inputSize: 224,
          scoreThreshold: 0.5,
        })
      );

      if (detections.length > 0) {
        console.log("✅ Face detected");
      } else {
        console.log("❌ No face detected");
        setFaceMissCount((prev) => {
          const newCount = prev + 1;

          if (newCount === 3) {
            alert("⚠️ Face not detected three times! One more and exam ends!");
          } else if (newCount >= 4) {
            alert("❌ Exam ended: You moved out of camera view too often!");
            onViolation?.("face");
          }

          return newCount;
        });
      }
    };

    const interval = setInterval(detectFace, 3000);
    return () => clearInterval(interval);
  }, [modelsLoaded, onViolation]);

  return (
    <div className="fixed top-4 right-4 bg-white shadow-lg p-2 rounded-lg border border-gray-300 z-50">
      <Webcam ref={webcamRef} width={150} height={100} mirrored />
      <p className="text-xs text-gray-700 mt-1">
        Tab Switches: <span className="font-semibold">{tabSwitches}</span>
        <br />
        Face Misses: <span className="font-semibold">{faceMissCount}</span>
      </p>
    </div>
  );
}
