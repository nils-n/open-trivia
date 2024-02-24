import { decode } from "html-entities";

export function Trivia(props) {
  console.log(props.allQuestions);
  const questionsEl = props.allQuestions.map((questionData) => {
    // create JSX for the option
    console.log("questionData is ;", questionData);
    const options = questionData.options.map((option, ix) => {
      console.log("option is ;", option);

      return (
        <li>
          <input
            type="radio"
            id={`${questionData.id}_option-${ix}`}
            name={`${questionData.id}`}
            key={`${questionData.id}_option-${ix}`}
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

  return (
    <form className="trivia--form">
      {questionsEl}
      <button className="btn trivia--btn">Check Answers</button>
    </form>
  );
}
