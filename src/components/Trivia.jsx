export function Trivia(props) {
  console.log(props.allQuestions);

  const questionsEl = props.allQuestions.map((questionData) => {
    console.log(questionData);
    return <h2> {questionData.question} </h2>;
  });
  console.log("we are in Trivia component now");
  console.log(questionsEl);

  return <>{questionsEl}</>;
}
