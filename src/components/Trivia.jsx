import { decode } from "html-entities";
import { useState } from "react";
import Confetti from "react-confetti";

export function Trivia(props) {
  // save form input in a state
  const [formData, setFormData] = useState(
    props.allQuestions.map((question) => {
      return {
        id: question.id,
        selectedOption: null,
        correctOption: question.correctOption,
        isCorrect: false,
        isSelected: false,
      };
    })
  );
  const [showResults, setShowResults] = useState(false);

  const allCorrect =
    formData.filter((question) => (question.isCorrect ? true : false)).length ==
    5;

  // check if the form is complete
  const isCompleted = formData.every((question) => question.isSelected);
  let resultsMessage = createResultMessage();

  function createResultMessage() {
    const numCorrectAnswers = formData.filter((question) =>
      question.isCorrect ? true : false
    ).length;
    const successMessage = `You have ${numCorrectAnswers} / 5  correct answers`;
    const incompleteMessage = `You need to select all answers`;

    return isCompleted ? successMessage : incompleteMessage;
  }

  function getBackgroundColor(ix, questionData) {
    const selectedOption = getSelectedOption(questionData.id);
    let style = {
      backgroundColor: "#F5F7FB",
      border: "1px solid #4d5b9e",
    };
    if (ix === selectedOption && !showResults) {
      style = { backgroundColor: "#D6DBF5", color: "#293264", border: "none" };
    }
    if (ix === selectedOption && showResults) {
      style = { backgroundColor: "#F8BCBC", color: "#293264", border: "none" };
    }
    if (ix === questionData.correctOption && showResults) {
      style = { backgroundColor: "#94d7a2", color: "#293264", border: "none" };
    }

    return style;
  }

  function getSelectedOption(questionId) {
    const question = formData.filter((question) => question.id === questionId);
    return question[0].selectedOption;
  }

  // create JSX for the option
  const questionsEl = props.allQuestions.map((questionData) => {
    const options = questionData.options.map((option, ix) => {
      return (
        <li key={`${questionData.id}_option-${ix}`}>
          <input
            type="radio"
            id={`${questionData.id}_option-${ix}`}
            name={`${questionData.id}`}
            value={decode(option)}
            onChange={(e) => handleChange(e, ix, questionData.id)}
          />
          <label
            htmlFor={`${questionData.id}_option-${ix}`}
            style={getBackgroundColor(ix, questionData)}
          >
            {decode(option)}
          </label>
        </li>
      );
    });

    return (
      <div
        className="trivia--item"
        key={questionData.id}
      >
        <h2 className="trivia--question"> {decode(questionData.question)} </h2>
        <ul className="trivia--answers">{options}</ul>
      </div>
    );
  });

  function handleSubmit(e) {
    console.log("form submitted");
    e.preventDefault();
    setShowResults((prev) => true);
  }

  function handleChange(e, idx, questionId) {
    console.log("change detected", idx, questionId);
    setShowResults((prev) => false);

    setFormData((prev) => {
      return prev.map((question) => {
        return question.id === questionId
          ? {
              ...question,
              selectedOption: idx,
              correctOption: question.correctOption,
              isSelected: true,
              isCorrect: idx === question.correctOption,
            }
          : question;
      });
    });
  }
  return (
    <form
      onSubmit={handleSubmit}
      className="trivia--form"
    >
      {questionsEl}
      <div className="trivia--results">
        {showResults && <p> {resultsMessage}</p>}
        <button className="btn trivia--btn">Check Answers</button>
      </div>
      {showResults && allCorrect && <Confetti />}
    </form>
  );
}
