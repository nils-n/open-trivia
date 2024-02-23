import { useState, useEffect } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import { Start } from "./components/Start.jsx";
import { Trivia } from "./components/Trivia.jsx";
import tempData from "./tempData.js";

function App() {
  const [startQuiz, setStartQuiz] = useState(false);
  const [questionData, setQuestions] = useState([]);

  useEffect(() => {
    // fetch("https://opentdb.com/api.php?amount=5&type=multiple")
    //   .then((res) => res.json())
    //   .then((data) => setQuestions((prev) => data.results));
    const data = tempData;
    setQuestions(data);
    console.log(data);
  }, []);

  // console.log(questions);

  function toggleStart() {
    console.log("Start Button clicked");
    setStartQuiz(true);
  }

  return (
    <>
      {!startQuiz && <Start toggleStart={toggleStart} />}
      {startQuiz && <Trivia />}
      <div className="blob-top"></div>
      <div className="blob-bottom"></div>
    </>
  );
}

export default App;
