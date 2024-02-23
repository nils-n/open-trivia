import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import { Start } from "./components/Start.jsx";

function App() {
  const [count, setCount] = useState(0);

  function startQuiz() {
    console.log("Start Button clicked");
  }

  return (
    <>
      <Start startQuiz={startQuiz} />
    </>
  );
}

export default App;
