import { useParams, useNavigate, useLocation } from "react-router-dom";
import { useState, useEffect } from "react";
import { questions as directorQuestions } from "../../data/question";
import { questions as executiveQuestions } from "../../data/executiveQuestions";
import { questions as employeeQuestions } from "../../data/employeeQuestions";
import { useAuth } from "../../contexts/AuthContext";

export default function QuestionPage() {
  const { step } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const { user, updateUser } = useAuth();

  const [role, setRole] = useState(
    location.state?.role ||
      sessionStorage.getItem("role") ||
      user?.role ||
      "staff"
  );

  useEffect(() => {
    sessionStorage.setItem("role", role);
  }, [role]);

  let questions = directorQuestions;
  if (role === "leadership") questions = executiveQuestions;
  else if (role === "employee") questions = employeeQuestions;

  const index = step ? parseInt(step, 10) - 1 : 0;

  const [answers, setAnswers] = useState(
    JSON.parse(sessionStorage.getItem("answers") || "{}")
  );

  useEffect(() => {
    sessionStorage.setItem("answers", JSON.stringify(answers));
  }, [answers]);

  const q = questions[index];
  if (!q) return <p className="text-center mt-10">Question not found.</p>;

  const handleChange = (value) =>
    setAnswers((prev) => ({ ...prev, [q.id]: value }));

  const toggleMulti = (option) => {
    const current = answers[q.id] || [];
    const newArr = current.includes(option)
      ? current.filter((o) => o !== option)
      : [...current, option];
    handleChange(newArr);
  };

  const next = async (e) => {
    e.preventDefault();

    if (index < questions.length - 1) {
      navigate(`/questions/${index + 2}`, { state: { role } });
    } else {
      try {
        const userId = user?.id || user?.email || "unknown";

        // ✅ Save answers to backend
        const response = await fetch(
          "http://localhost:5000/api/save-questions",
          {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ userId, answers }),
          }
        );

        const data = await response.json();
        if (!data.success) throw new Error(data.message || "Failed to save");

        localStorage.setItem("userAnswers", JSON.stringify(answers));
        updateUser({ hasCompletedQuestions: true });

        // ✅ Get the main area to determine homepage
        const areaMain = answers["area"]?.main || answers["2"]?.main || "";
        let htmlFile = "";
        switch (areaMain.toLowerCase()) {
          case "education":
            htmlFile = "education-home.html";
            break;
          case "health":
            htmlFile = "healthcare-home.html";
            break;
          case "environment":
            htmlFile = "environment-home.html";
            break;
          case "women empowerment":
            htmlFile = "women-empowerment-home.html";
            break;
          default:
            htmlFile = "default-home.html";
        }

        // ✅ Fetch ngoName from current answers (like ngoAnswers.json)
        let ngoName = answers["ngoName"] || answers["1"] || null;

        console.log(
          "🧩 [Redirect Debug] Extracted ngoName from answers:",
          ngoName
        );

        if (!ngoName) {
          // fallback to stored user data if not found
          ngoName =
            user?.ngoName ||
            (() => {
              try {
                return JSON.parse(localStorage.getItem("user") || "{}").ngoName;
              } catch {
                return null;
              }
            })() ||
            "default";
        }

        // ✅ Clean ngoName
        ngoName = ngoName
          ? ngoName.toString().trim().replace(/\s+/g, "_").toLowerCase()
          : "default";

        console.log("🎯 [Redirect Debug] Final ngoName:", ngoName);

        // ✅ Build redirect target
        // ✅ Correct final redirect
        const targetUrl = `/${htmlFile}?ngo=${ngoName}`;
        console.log("🚀 [Redirect Debug] Redirecting to:", targetUrl);
        // ✅ Save correct homepage path for logout redirection
        updateUser({ homePage: `${htmlFile}?ngo=${ngoName}` });

        // ✅ Redirect now
        window.location.href = `/${htmlFile}?ngo=${ngoName}`;
      } catch (err) {
        console.error(err);
        alert("Failed to save your answers. Please try again.");
      }
    }
  };

  return (
    <div className="min-h-screen grid grid-cols-1 md:grid-cols-2">
      <div className="flex flex-col justify-start px-6 md:px-16 py-10 bg-white relative">
        <form
          onSubmit={next}
          className="max-w-md mx-auto w-full space-y-6 mt-16"
        >
          <h1 className="text-2xl md:text-3xl font-semibold text-gray-900">
            {q.text}
          </h1>

          {q.type === "text" && (
            <input
              type="text"
              value={answers[q.id] || ""}
              onChange={(e) => handleChange(e.target.value)}
              className="w-full p-3 rounded-xl border text-gray-900"
              required
            />
          )}

          {q.type === "select" && !q.multiSelect && (
            <div className="space-y-2">
              {q.options.map((opt) => {
                const active = answers[q.id] === opt;
                return (
                  <button
                    type="button"
                    key={opt}
                    onClick={() => handleChange(opt)}
                    className={`px-5 py-2 rounded-full border transition ${
                      active
                        ? "bg-orange-600 text-white border-orange-600"
                        : "bg-white text-gray-800 border-gray-300 hover:border-orange-400"
                    }`}
                  >
                    {opt}
                  </button>
                );
              })}
            </div>
          )}

          {q.type === "select" && q.multiSelect && (
            <div className="space-y-2">
              {q.options.map((opt) => {
                const active = (answers[q.id] || []).includes(opt);
                return (
                  <button
                    type="button"
                    key={opt}
                    onClick={() => toggleMulti(opt)}
                    className={`px-5 py-2 rounded-full border transition ${
                      active
                        ? "bg-orange-600 text-white border-orange-600"
                        : "bg-white text-gray-800 border-gray-300 hover:border-orange-400"
                    }`}
                  >
                    {opt}
                  </button>
                );
              })}
            </div>
          )}

          {q.type === "selectWithOther" && (
            <>
              <div className="space-y-2">
                {q.options.map((opt) => {
                  const active = answers[q.id]?.main === opt;
                  return (
                    <button
                      type="button"
                      key={opt}
                      onClick={() => handleChange({ main: opt, other: "" })}
                      className={`px-5 py-2 rounded-full border transition ${
                        active
                          ? "bg-orange-600 text-white border-orange-600"
                          : "bg-white text-gray-800 border-gray-300 hover:border-orange-400"
                      }`}
                    >
                      {opt}
                    </button>
                  );
                })}
              </div>

              {answers[q.id]?.main === "Others" && (
                <input
                  type="text"
                  className="w-full p-3 rounded-xl border text-gray-900 mt-3"
                  placeholder="Please specify"
                  value={answers[q.id]?.other || ""}
                  onChange={(e) =>
                    handleChange({ ...answers[q.id], other: e.target.value })
                  }
                  required
                />
              )}
            </>
          )}

          <button
            type="submit"
            className="px-6 py-2 bg-orange-600 text-white rounded-full hover:bg-orange-700 transition"
          >
            {index < questions.length - 1 ? "Continue" : "Finish"}
          </button>
        </form>
      </div>

      <div className="hidden md:flex flex-col bg-orange-500">
        <div className="flex flex-col justify-center items-center h-[70%] w-full px-6 text-center">
          <img
            src="/ngo-india-logo.png"
            alt="NGO India Logo"
            className="max-h-[70%] max-w-[60%] object-contain mx-auto"
          />
        </div>
      </div>
    </div>
  );
}
