import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import { Start } from "./components/Start.jsx";

function App() {
  const [startQuiz, setStartQuiz] = useState(false);

  function toggleStart() {
    console.log("Start Button clicked");
    setStartQuiz(true);
  }

  return <>{!startQuiz && <Start toggleStart={toggleStart} />}</>;
}

export default App;
