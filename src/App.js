import "./App.css";
import TypingPractice          from "./TypingPractice.js";
import ProgressBar             from "./ProgressBar.js";
import { useState, useEffect } from "react";


function App() {
	const [text, setText] = useState("Lorem Ipsum");
	const [newTextRequired, setNewTextRequired] = useState(true);
	const [progress, setProgress] = useState(0);
	const [time, setTime] = useState();
	const [error, setError] = useState(false);


	useEffect(() => {
			// Prevent Multiple Requests
			if (!newTextRequired) {return;}
			setNewTextRequired(false);

			// Fetch & Set text
			fetch(
				"http://dinoipsum.herokuapp.com/api/?format=text&paragraphs=1&words=3")
				.then(response => response.text())
				.then(text => {
					setText(text.trim());
					setTime();
				})
				.catch(() => setError(true));
		}, [newTextRequired],
	);


	return (
		<div className="App">
			{error && <div id={"error"}>Oups! Please try again!</div>}
			<button id={"refresh"}
					onClick={(e) => {
						e.target.blur(); // Prevent triggering the button on keyboard input
						setNewTextRequired(true);
					}}
			>
				&#x21bb;
			</button>
			<TypingPractice
				text={text}
				setProgress={setProgress}
				setTime={setTime}
			/>
			<section id={"statistics"}>
				<ProgressBar percentage={progress}/>
				{Boolean(time) &&
				 <div id={"time"}>
					 {(time/1000).toFixed(2)} Seconds!
				 </div>}
			</section>
		</div>
	);
}

export default App;
