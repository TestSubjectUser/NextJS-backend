import { useRef, useState } from "react";

export default function Home() {
  const [feedbackItems, setFeedbackItems] = useState([]);
  const emailInputRef = useRef();
  const feedbackInputRef = useRef();

  function handleSubmit(event) {
    event.preventDefault();

    const enteredEmail = emailInputRef.current.value;
    const enteredFeedback = feedbackInputRef.current.value;
    const reqBody = { email: enteredEmail, feedbackText: enteredFeedback };

    // because of using '/' in front treated as absolute path, and it will be treated as http://localhost:3000/api/feedback, domain will be added auto.
    fetch("/api/feedback", {
      method: "POST",
      body: JSON.stringify(reqBody),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => response.json())
      .then((data) => console.log("Frontend-data", data));
  }

  function loadFeedbackHandler() {
    fetch("/api/feedback")
      .then((response) => response.json())
      .then((data) => setFeedbackItems(data.feedback));
  }

  return (
    <div>
      <h1>Home</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="email">Email</label>
          <input type="email" name="email" id="email" ref={emailInputRef} />
        </div>
        <div>
          <label htmlFor="feedback">Your Feedback</label>
          <textarea
            name="feedback"
            id="feedback"
            rows="4"
            ref={feedbackInputRef}
          />
        </div>
        <button type="submit">Send!</button>
      </form>
      <hr />
      <button onClick={loadFeedbackHandler}>Load Feedback.</button>
      <ul>
        {feedbackItems.map((item) => (
          <li key={item.id}>{item.feedbackText}</li>
        ))}
      </ul>
    </div>
  );
}
