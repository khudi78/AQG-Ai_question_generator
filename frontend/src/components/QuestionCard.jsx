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
export default function QuestionCard({ q, idx, answers, setAnswers }) {
  const handleTextChange = (val) => {
    const copy = [...answers];
    copy[idx] = val;
    setAnswers(copy);
  };

  const handleOptionSelect = (option) => {
    const copy = [...answers];
    copy[idx] = option;
    setAnswers(copy);
  };

  return (
    <div className="border rounded-md p-4 mb-4 bg-[#96A78D] shadow-sm">
      <div className="flex items-start justify-between">
        <h3 className="font-medium text-lg">Q{idx + 1}.</h3>
        <span className="text-sm text-gray-500">{q.difficulty ?? ""}</span>
      </div>

      <p className="pl-[50px] pr-[50px] text-gray-800 whitespace-pre-wrap text-lg font-semibold">{q.question}</p>

      {/* If options are present, render radios */}
      {Array.isArray(q.options) && q.options.length > 0 ? (
        <div className="mt-3 space-y-2 w-[1050px] mx-12">
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
                onChange={() => handleOptionSelect(opt)}
                className="form-radio"
              />
              <span className="text-gray-700">{opt}</span>
            </label>
          ))}
        </div>
      ) : (
        // Otherwise free text input
        <textarea
          className="w-[1050px] border border-white rounded mt-3  p-2 text-gray-800"
          rows={3}
          value={answers[idx] ?? ""}
          onChange={(e) => handleTextChange(e.target.value)}
          placeholder="Type your answer here..."
        />
      )}

      {/* Optional: show correct answer toggle for debugging (comment out in production) */}
      {/* <div className="mt-2 text-xs text-gray-500">Answer: {q.answer}</div> */}
    </div>
  );
}
