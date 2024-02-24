import { useState, useEffect } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import { Start } from "./components/Start.jsx";
import { Trivia } from "./components/Trivia.jsx";
import tempData from "./tempData.js";
import { nanoid } from "nanoid";

function App() {
  const [startQuiz, setStartQuiz] = useState(false);
  const [questionData, setQuestionData] = useState([]);

  useEffect(() => {
    // fetch("https://opentdb.com/api.php?amount=5&type=multiple")
    //   .then((res) => res.json())
    //   .then((data) => setQuestions((prev) => data.results));
    const data = tempData;
    setQuestionData(data);
  }, []);

  // derive questions for the screen from the data
  const allQuestions =
    questionData?.results?.length > 0 &&
    questionData.results.map((obj, ix) => {
      const tmpArray = obj.incorrect_answers.concat(obj.correct_answer);
      return {
        question: obj.question,
        options: shuffleOrder(tmpArray),
        correctOption: tmpArray.indexOf(obj.correct_answer),
        id: nanoid(),
      };
    });

  function shuffleOrder(questionsArray) {
    for (let i = questionsArray.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [questionsArray[i], questionsArray[j]] = [
        questionsArray[j],
        questionsArray[i],
      ];
    }
    return questionsArray;
  }

  function toggleStart() {
    console.log("Start Button clicked");
    setStartQuiz(true);
  }

  return (
    <>
      {!startQuiz && <Start toggleStart={toggleStart} />}
      {startQuiz && <Trivia allQuestions={allQuestions} />}
      <div className="blob-top"></div>
      <div className="blob-bottom"></div>
    </>
  );
}

export default App;
