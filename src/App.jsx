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
  const [questionData, setQuestionData] = useState(tempData);

  useEffect(() => {
    console.log("calling the API");
    fetch("https://opentdb.com/api.php?amount=5&difficulty=easy&type=multiple")
      .then((res) => res.json())
      .then((data) => {
        if (data.response_code == 0) {
          setQuestionData((prev) => data.results);
        } else {
          console.log("API call unsuccessful. Using backup data.");
          setQuestionData((prev) => tempData.results);
        }
      });
  }, []);

  // derive questions for the screen from the data
  let allQuestions =
    questionData?.length > 0 &&
    questionData.map((obj, ix) => {
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
