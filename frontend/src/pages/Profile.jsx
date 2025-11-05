import { useEffect, useState } from "react";
import axios from "axios";
import api from "../api/api.jsx";

export default function Profile() {
  const [user, setUser] = useState(null);
    const [exams, setExams] = useState([]);

  useEffect(() => {
    const stored = localStorage.getItem("user");
    if (stored) {
      const parsed = JSON.parse(stored);
      setUser(parsed);

      // ✅ Fetch exams for this user
      api.fetchUserExams(parsed._id)
        .then((data) => setExams(data))
        .catch((err) => console.error("Error fetching exams:", err));
    }
  }, []);

  if (!user) return <p className="text-center mt-10">Please sign in.</p>;

  return (
    <div className=" p-6">
      <div className="w-[700px] mx-auto p-6 rounded-lg shadow-md">
        <div className="flex space-x-4">
           <div className="bg-[#B99470] text-4xl  rounded-full font-bold p-2 w-[60px] h-[60px]">{user.avatar}</div>
          <div className="flex flex-col">
            <div className="text-2xl font-bold text-gray-700 ml-[-80px]">{user.name}</div>
            <div className="text-gray-500 ">{user.email}</div>
          </div>
        </div>

        <h3 className="mt-8 font-semibold text-left mb-4  ml-2 text-3xl text-[#255F38] ">Past Exams :</h3>
        {exams.length > 0 ? (
          <ul className="divide-y divide-gray-200">
            {exams.map((exam, idx) => (
              <li key={idx} className="py-3 border rounded-md p-4 mb-4 bg-[#96A78D] shadow-sm">
                <div className="flex justify-between">
                  <span className="font-medium text-gray-800 flex gap-2"><div className="font-bold">Topic : </div>{exam.topic}</span>
                  <span className="text-gray-600">
                    Score: <strong>{exam.score ?? "N/A"}/{exam.questions.length}</strong>
                  </span>
                </div>
                <p className="text-sm text-gray-800 flex gap-2">
                  <p className="font-bold">Taken on : </p> {new Date(exam.createdAt).toLocaleString()}
                </p>
                <p className="text-gray-800 flex gap-2 text-sm"><p className="font-bold">Difficulty : </p>{exam.difficulty}</p>
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-gray-500">No exams yet.</p>
        )}
      </div>
    </div>
  );
}
