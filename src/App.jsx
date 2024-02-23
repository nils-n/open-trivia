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
  }, []);

  // map the questions into an array used to display on the canvas
  const allQuestions =
    questionData?.results?.length > 0 &&
    questionData?.results?.map((questions) => {
      let tmpArray = questions.incorrect_answers;
      tmpArray.push(questions.correct_answer);
      return {
        options: shuffleOrder(tmpArray),
        correct_option: tmpArray.indexOf(questions.correct_answer),
      };
    });

  function shuffleOrder(questionsArray) {
    console.log("shuffle the order");
    return questionsArray.sort(() => Math.random() - 0.5);
  }

  console.log(allQuestions);

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
