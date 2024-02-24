import { decode } from "html-entities";
import { useState } from "react";

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
          <label htmlFor={`${questionData.id}_option-${ix}`}>
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
    if (isCompleted) {
      console.log("setting showResults to true now");
      console.log("--> showResults", showResults);
      setShowResults((prev) => true);
      console.log("--> showResults", showResults);
    }
  }

  function handleChange(e, idx, questionId) {
    console.log("change detected", idx, questionId);

    setFormData((prev) => {
      return prev.map((question) => {
        const returnValue =
          question.id === questionId
            ? {
                ...question,
                selectedOption: idx,
                isSelected: true,
                isCorrect: idx === question.correctOption,
              }
            : question;
        if (question.id === questionId) {
          console.log("returnValue", returnValue);
        }

        return returnValue;
      });
    });
  }
  console.log(`showResults`, showResults);
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
    </form>
  );
}
