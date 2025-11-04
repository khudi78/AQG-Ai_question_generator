import { useLocation } from "react-router-dom";

export default function Analysis() {
  const { state } = useLocation();

  if (!state) {
    return (
      <div className="flex flex-col items-center justify-center h-screen">
        <h1 className="text-2xl font-bold text-red-600">❌ No exam data found</h1>
      </div>
    );
  }

  const { details = [], score, total, behaviorReport, message } = state;

  return (
    <div className="min-h-screen  p-6">
      <div className="text-6xl font-bold text-[#255F38] mb-6 text-center">
        Exam Analysis
      </div>

      {message && (
        <p className="text-center text-yellow-700 font-semibold mb-4">
          {message}
        </p>
      )}

      <div className="text-center mb-8">
        <p className="text-lg text-emerald-800">
          <span className="font-semibold ">Score:</span> {score} / {total}
        </p>
       
       
      </div>

      <div className="space-y-6 w-[1000px] mx-auto ">
        {details.map((item, index) => (
          <div
            key={index}
            className={`p-4 rounded-lg border ${
              item.isCorrect
                ? "border-green-400 bg-green-50"
                : "border-red-400 bg-red-50"
            }`}
          >
            <h3 className="font-semibold text-gray-800 mx-[20px] mb-4">
              Q{index + 1}. {item.question}
            </h3>

            {item.options && item.options.length > 0 && (
              <ul className="ml-[70px] mt-2 text-left list-disc text-gray-600 text-sm mt-1">
                {item.options.map((opt, i) => (
                  <li key={i}>{opt}</li>
                ))}
              </ul>
            )}

            <p className="mt-4 text-sm text-left text-balance mx-[35px] w-[950px]">
              <span className="font-semibold text-gray-700">Your Answer:</span>{" "}
              <span
                className={`${
                  item.isCorrect ? "text-green-600" : "text-red-600"
                }`}
              >
                {item.userAnswer || "—"}
              </span>
            </p>

            <p className="text-sm text-left text-balance mx-[35px] w-[950px] mt-2">
              <span className="font-semibold text-gray-700
              ">Correct Answer:</span>{" "}
              <span className=" text-gray-500">{item.correctAnswer}</span>
            </p>


            
              <p className="text-sm mt-4 text-black">
                <span className="font-semibold ">Similarity Score:</span>{" "}
                {item.similarity.toFixed(2)}
              </p>
            
          </div>
        ))}
      </div>
    </div>
  );
}
