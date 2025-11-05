import React from 'react'
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from '../api/api';

function Home() {
  const [topic, setTopic] = useState("");
  const [difficulty, setDifficulty] = useState("easy");
  const [num_questions, setNumQuestions] = useState(5);
  const [question_type, setQuestionType] = useState("mix");
   const [loading, setLoading] = useState(false);
   const[load,setLoad]=useState(false);
   const navigate = useNavigate();
  const handleGenerate = async () => {
    if (!topic.trim()) {
      alert("Please enter a topic!");
      return;
    }

    try {
      setLoading(true);
      const data = await api.generatePaper({ topic, difficulty, num_questions, question_type });
      navigate("/exam", { state: { questions: data.questions, topic, difficulty } });
    } catch (err) {
      console.error(err);
      alert("Failed to generate questions. Please try again.");
    } finally {
      setLoading(false);
    }
  };

   const handleGenerateStudy = async () => {
    if (!topic.trim()) {
      alert("Please enter a topic!");
      return;
    }

    try {
      setLoad(true);
      const data = await api.generatePaper({ topic, difficulty, num_questions, question_type });
      navigate("/studypaper", { state: { questions: data.questions, topic } });
    } catch (err) {
      console.error(err);
      alert("Failed to generate questions. Please try again.");
    } finally {
      setLoading(false);
    }
  };
  
  
  return (
    <div className='flex flex-col gap-5'>
      
      <div className=" text-5xl font-bold text-center mt-5 mb-6 text-[#255F38]">
           AI Question Paper Generator
      </div>
      <div className='mt-5'>
      <label className="text-lg block mb-1 text-gray-700 font-medium">
          Enter Topic:
      </label>
      <input 
          type="text"
          placeholder="e.g., Machine Learning"
          className=" text-[#4b872b] font-semibold border border-gray-400 rounded-md p-2 w-[500px] text-center mb-4 focus:ring-2 focus:ring-indigo-400 outline-none"
          value={topic}
          onChange={(e) => setTopic(e.target.value)}
        />

        <label className="text-lg block mb-1 text-gray-700 font-medium">
          Select Difficulty:
        </label>
        <select
          className="border font-semibold text-[#4b872b] border-gray-400 rounded-md p-2 w-[500px] text-center mb-6 focus:ring-2 focus:ring-indigo-400 outline-none"
          value={difficulty}
          onChange={(e) => setDifficulty(e.target.value)}
        >
          <option value="easy">Easy</option>
          <option value="medium">Medium</option>
          <option value="hard">Hard</option>
        </select>

        <label className="text-lg block mb-1 text-gray-700 font-medium">
          No of question:
        </label>
        <select
          className="border font-semibold text-[#4b872b] border-gray-400 rounded-md p-2 w-[500px] text-center mb-6 focus:ring-2 focus:ring-indigo-400 outline-none"
          value={num_questions}
          onChange={(e) => setNumQuestions(e.target.value)}
        >
          <option value={5}>5</option>
          <option value={7}>7</option>
          <option value={10}>10</option>
        </select>

        <label className="text-lg block mb-1 text-gray-700 font-medium">
          Select Question Type:
        </label>
        <select
          className="border font-semibold border-gray-400 text-[#4b872b] rounded-md p-2 w-[500px] text-center mb-18 focus:ring-2 focus:ring-indigo-400 outline-none"
          value={question_type}
          onChange={(e) => setQuestionType(e.target.value)}
        >
          <option value="mix">Mix</option>
          <option value="subjective">Subjective</option>
          <option value="objective">Objective</option>
        </select>

         <div
          onClick={handleGenerate}
          disabled={loading}
          className="mb-4 bg-emerald-700 cursor-pointer hover:bg-emerald-900 text-white font-semibold px-5 hover:shadow-md hover:shadow-emerald-800 hover:text-[16px] py-2 rounded-md w-[600px] ml-[470px] transition-all disabled:opacity-70"
        >
          {loading ? "Generating..." : "Generate Paper for Exam"}
        </div>

        <div
          onClick={handleGenerateStudy}
          disabled={load}
          className="bg-emerald-700 cursor-pointer hover:bg-emerald-900 text-white font-semibold px-5 py-2 rounded-md hover:shadow-md hover:text-[16px] hover:shadow-emerald-800  w-[600px] ml-[470px] transition-all disabled:opacity-70"
        >
          {load ? "Generating..." : "Generate Paper for Studying"}
        </div>
        </div>
    </div>
  )
}

export default Home

// import React from 'react'

// function Home() {
//   return (
//     <div>Home</div>
//   )
// }

// export default Home