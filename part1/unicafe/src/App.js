import { useState } from "react";

const Button = ({ text, feedback, setFeedback }) => {
  return (
    <button
      onClick={() => {
        setFeedback(feedback + 1);
      }}
    >
      {text}
    </button>
  );
};

const StatisticLine = ({ text, value }) => {
  return (
    <tr>
      <td>{text}</td>
      <td> {value}</td>
    </tr>
  );
};

const Statistics = ({ good, neutral, bad }) => {
  if (!good && !neutral & !bad) {
    return (
      <div>
        <p>No feedback given</p>
      </div>
    );
  }

  const all = good + neutral + bad;
  const average = (good - bad) / all;
  const positive = (good / all) * 100;

  return (
    <div>
      <table>
        <tbody>
          <StatisticLine text={"good"} value={good} />
          <StatisticLine text={"neutral"} value={neutral} />
          <StatisticLine text={"bad"} value={bad} />
          <StatisticLine text={"all"} value={all} />
          <StatisticLine text={"average"} value={average} />
          <StatisticLine text={"positive"} value={positive} />
        </tbody>
      </table>
    </div>
  );
};

const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0);
  const [neutral, setNeutral] = useState(0);
  const [bad, setBad] = useState(0);

  return (
    <div>
      <h1>give feedback</h1>
      <Button text={"good"} feedback={good} setFeedback={setGood} />
      <Button text={"neutral"} feedback={neutral} setFeedback={setNeutral} />
      <Button text={"bad"} feedback={bad} setFeedback={setBad} />
      <h1>statistics</h1>
      <Statistics good={good} neutral={neutral} bad={bad} />
    </div>
  );
};

export default App;
