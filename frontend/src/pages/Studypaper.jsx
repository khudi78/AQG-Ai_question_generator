import { useLocation, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import api from "../api/api";
import QuestionCard from "../components/QuestionCard";
import StudyQuestionCard from "../components/StudyQuestionCard";

export default function Studypaper() {
  const location = useLocation();
  const navigate = useNavigate();

  // ✅ Safely extract data from navigation state
  const { questions = [], topic = "" } = location.state || {};

  // ✅ Redirect back if questions are missing
  useEffect(() => {
    if (!Array.isArray(questions) || questions.length === 0) {
      alert("No questions found! Please generate a paper first.");
      navigate("/");
    }
  }, [questions, navigate]);

  const [answers, setAnswers] = useState(
    Array.isArray(questions) ? Array(questions.length).fill("") : []
  );



  return (
    <div className="w-[1200px] mx-auto  p-6">
      <div className=" items-center mb-10">
        <div className="text-6xl font-bold text-[#255F38]">
          {topic}
        </div>
      </div>
    <div>
      {/* ✅ Render questions safely */}
      {Array.isArray(questions) && questions.length > 0 ? (
        questions.map((q, i) => (
          <StudyQuestionCard
            key={i}
            q={q}
            idx={i}
            answers={answers}
            setAnswers={setAnswers}
          />
        ))
      ) : (
        <p className="text-center text-gray-500">No questions available.</p>
      )}

      </div>

   
    </div>
  );
}
