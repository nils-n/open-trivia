import { decode } from "html-entities";

export function Trivia(props) {
  const questionsEl = props.allQuestions.map((questionData) => {
    const options = questionData.options.map((option, ix) => {
      console.log(option);
      return (
        <li
          className="trivia--option"
          key={ix}
        >
          {decode(option)}{" "}
        </li>
      );
    });

    console.log(options);

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

  return <>{questionsEl}</>;
}
