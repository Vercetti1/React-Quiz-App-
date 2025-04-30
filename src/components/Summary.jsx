import quizCompleteImg from '../assets/quiz-complete.png';
import QUESTIONS from '../questions.js';

export default function Summary({ userAnswers }) {
  const failedAnswers = userAnswers.filter((answer) => answer === null || answer === 'failed');

  const correctAnswers = userAnswers.filter(
    (answer, index) => answer === QUESTIONS[index].answers[0]
  );

  const failedAnswersShare = Math.round(
    ((userAnswers.length - correctAnswers.length) / userAnswers.length) * 100
  );
  const correctAnswersShare = 100 - failedAnswersShare;

  return (
    <div id="summary">
      <img src={quizCompleteImg} alt="Trophy icon" />
      <h2>Quiz Completed!</h2>
      <div id="summary-stats">
        <p>
          <span className="number">{correctAnswersShare}%</span>
          <span className="text">correct</span>
        </p>
        <p>
          <span className="number">{failedAnswersShare}%</span>
          <span className="text">failed</span>
        </p>
      </div>
      <ol>
        {userAnswers.map((answer, index) => {
          let cssClass = 'user-answer';

          if (answer === null || answer === 'failed') {
            cssClass += ' skipped';
          } else if (answer === QUESTIONS[index].answers[0]) {
            cssClass += ' correct';
          } else {
            cssClass += ' wrong';
          }

          return (
            <li key={index}>
              <h3>{index + 1}</h3>
              <p className="question">{QUESTIONS[index].text}</p>
              <p className="answer-line">
                <span className="answer-label">Your answer: </span>
                <span className={cssClass}>
                  {answer === null || answer === 'failed' ? 'N/A' : answer}
                </span>
               
              </p>
              {(answer === null || answer === 'failed' || QUESTIONS[index].answers[0]) &&(
              <p className="answer-line">
                <span className="answer-label">Right answer: </span>
                <span className="right-answer">
                  {QUESTIONS[index].answers[0]}
                </span>
              </p>
              )}
            </li>
          );
        })}
      </ol>
    </div>
  );
}