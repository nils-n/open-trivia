export function Start(props) {
  return (
    <div className="start-container">
      <h1>Quizzical</h1>
      <h2>Test your knowledge with our little Quiz!</h2>
      <button onClick={props.startQuiz} className="btn">
        Start quiz
      </button>
      <div className="blob-top"></div>
      <div className="blob-bottom"></div>
    </div>
  );
}
