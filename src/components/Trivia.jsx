import { decode } from "html-entities";

export function Trivia(props) {
  const questionsEl = props.allQuestions.map((questionData) => {
    return (
      <div
        className="trivia--item"
        key={questionData.id}
      >
        <h2 className="trivia--question"> {decode(questionData.question)} </h2>
        <p className="trivia--option"> {decode(questionData.options[0])} </p>
        <p className="trivia--option"> {decode(questionData.options[1])} </p>
        <p className="trivia--option"> {decode(questionData.options[2])} </p>
        <p className="trivia--option"> {decode(questionData.options[3])} </p>
      </div>
    );
  });

  return <>{questionsEl}</>;
}
