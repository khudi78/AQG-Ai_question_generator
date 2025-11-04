import React from "react";

/**
 * QuestionCard
 * Props:
 *  - q: the question object { question, answer, options? }
 *  - idx: index number
 *  - answers: array of current answers
 *  - setAnswers: setter for answers array
 *
 * Supports either multiple-choice questions (q.options = array of strings)
 * or free-text answers.
 */
export default function StudyQuestionCard({ q, idx, answers, setAnswers }) {


  return (
    <div className="border rounded-md p-4 mb-4 bg-[#96A78D] shadow-sm">
      <div className="flex items-start justify-between">
        <h3 className="font-medium text-lg">Q{idx + 1}.</h3>
      </div>

      <p className="pl-[50px] pr-[20px] text-gray-800 whitespace-pre-wrap text-lg font-semibold">{q.question}</p>

      {/* If options are present, render radios */}
      {Array.isArray(q.options) && q.options.length > 0 ? (
        <div className="mt-3 space-y-2  pl-[60px] pr-[50px]">
          {q.options.map((opt, i) => (
            <label
              key={i}
              className="flex items-center gap-3 p-2 border rounded hover:bg-gray-50 cursor-pointer"
            >
              <input
                type="radio"
                name={`q-${idx}`}
                value={opt}
                checked={answers[idx] === opt}
                className="form-radio"
              />
              <span className="text-gray-700">{opt}</span>
            </label>
          ))}
          <div className="text-black text-left"><span className="text-gray-800 font-semibold">Answer:</span> {q.answer}</div>
        </div>
      ) : (
        // Otherwise free text input
        <div className="text-black text-left pl-[60px] pr-[50px]"><span className="text-gray-800 font-semibold">Answer:</span> {q.answer}</div>
      )}

      {/* Optional: show correct answer toggle for debugging (comment out in production) */}
      {/* <div className="mt-2 text-xs text-gray-500">Answer: {q.answer}</div> */}
    </div>
  );
}
