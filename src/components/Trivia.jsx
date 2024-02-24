import { decode } from "html-entities";

export function Trivia(props) {
  const questionsEl = props.allQuestions.map((questionData) => {
    // create JSX for the option
    const options = questionData.options.map((option, ix) => {
      return (
        <li key={`${questionData.id}_option-${ix}`}>
          <input
            type="radio"
            id={`${questionData.id}_option-${ix}`}
            name={`${questionData.id}`}
            value={decode(option)}
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
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="trivia--form"
    >
      {questionsEl}
      <button className="btn trivia--btn">Check Answers</button>
    </form>
  );
}
