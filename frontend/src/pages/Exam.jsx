import { useLocation, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import api from "../api/api";
import WebcamProctor from "../components/WebcamProctor";
import QuestionCard from "../components/QuestionCard";

export default function Exam() {
  const { state } = useLocation();
  const navigate = useNavigate();

  const [answers, setAnswers] = useState(Array(state.questions.length).fill(""));
  const [submitting, setSubmitting] = useState(false);
  const [tabSwitches, setTabSwitches] = useState(0);
  const [faceDetected, setFaceDetected] = useState(true);

  // 🕒 Timer state
  const [timeLeft, setTimeLeft] = useState(state.questions.length * 60); // 1 min per question

  // 🧩 Timer effect
  useEffect(() => {
    if (timeLeft <= 0) {
      handleSubmit(true, "Time’s up! Exam auto-submitted.");
      return;
    }

    const timer = setInterval(() => {
      setTimeLeft((prev) => prev - 1);
    }, 1000);

    return () => clearInterval(timer);
  }, [timeLeft]);

  // Format timer as MM:SS
  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`;
  };

  // ✅ Handle submission
  const handleSubmit = async (autoEnd = false, message = "") => {
    try {
      setSubmitting(true);
      const behaviorReport = { tabSwitches, faceDetected };
      const currentUser = JSON.parse(localStorage.getItem("user"));

      const result = await api.submitExam({
        user: currentUser._id,
        topic: state.topic,
        questions: state.questions,
        difficulty: state.difficulty,
        answers,
        behaviorReport,
      });

      if (autoEnd) result.message = message;
      navigate("/analysis", { state: result });
    } catch (error) {
      console.error("❌ Exam submission error:", error);
      alert("Failed to submit exam. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  // Called when WebcamProctor detects violation
  const handleViolation = (reason) => {
    if (reason === "tab") {
      handleSubmit(true, "Exam ended automatically due to tab switching.");
    } else if (reason === "face") {
      handleSubmit(true, "Exam ended automatically due to moving out of camera view.");
    }
  };

  return (
    <div className="w-[1200px] mx-auto p-6">
      <div className="flex justify-between items-center mb-10">
        <div className="text-4xl  font-bold text-[#255F38]">
          Exam: {state.topic}
        </div>

        {/* ⏱️ Timer display */}
        <div className="text-2xl font-bold text-red-600">
          Time Left: {formatTime(timeLeft)}
        </div>
      </div>

      {/* Webcam Proctor */}
      <WebcamProctor onViolation={handleViolation} />
      

      {/* Questions */}
      {state.questions.map((q, i) => (
        <QuestionCard
          key={i}
          q={q}
          idx={i}
          answers={answers}
          setAnswers={setAnswers}
        />
      ))}

      {/* Submit button */}
      <div className="text-center mt-8">
        <button
          onClick={() => handleSubmit(false)}
          disabled={submitting}
          className="bg-green-600 hover:bg-green-700 text-white font-semibold px-6 py-2 rounded-lg transition-all disabled:opacity-70"
        >
          {submitting ? "Submitting..." : "Submit Exam"}
        </button>
      </div>
    </div>
  );
}
