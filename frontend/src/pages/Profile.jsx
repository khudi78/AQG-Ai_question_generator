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
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-lg mx-auto bg-white p-6 rounded-lg shadow-md">
        <div className="flex items-center space-x-4">
           <div className="bg-amber-400 text-2xl ">{user.avatar}</div>
          <div>
            <h2 className="text-2xl font-bold text-gray-700">{user.name}</h2>
            <p className="text-gray-500">{user.email}</p>
          </div>
        </div>

        <h3 className="mt-6 font-semibold text-lg ">Past Exams</h3>
        {exams.length > 0 ? (
          <ul className="divide-y divide-gray-200">
            {exams.map((exam, idx) => (
              <li key={idx} className="py-3">
                <div className="flex justify-between">
                  <span className="font-medium text-gray-800">{exam.topic}</span>
                  <span className="text-gray-600">
                    Score: <strong>{exam.score ?? "N/A"}/{exam.questions.length}</strong>
                  </span>
                </div>
                <p className="text-sm text-gray-500">
                  Taken on {new Date(exam.createdAt).toLocaleString()}
                </p>
                <p className="text-gray-500">{exam.difficulty}</p>
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
