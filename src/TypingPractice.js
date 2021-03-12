import "./TypingPractice.css";
import { useState, useEffect, useCallback } from "react";


function TypingPractice({ text, setProgress, setTime }) {
	const [startTime, setStartTime] = useState();
	const [correctIndex, setCorrectIndex] = useState(0);
	const [textClassName, setTextClassName] = useState("");
	const characters = text.split("");


	const handleKeyDown = useCallback((e) => {
		if (!startTime) { // Start
			setStartTime(Date.now());
		}
		if (correctIndex === characters.length) { // Already finished:
			return;
		}

		if (e.key === characters[correctIndex]) {
			setCorrectIndex(prevCorrectlyTypedCharacters => ++prevCorrectlyTypedCharacters);
			if (correctIndex === characters.length - 1) { // Last Character typed
				setTime(Date.now() - startTime);
			}
		} else if (e.key.length === 1) { // Ignore Modifier Keys
			// Blink in red:
			setTextClassName("error");
			setTimeout(() => setTextClassName(""), 200);
		}
	}, [characters, correctIndex, setTime, startTime]);


	// Initialize:
	useEffect(() => {
		setStartTime();
		setCorrectIndex(0);
	}, [text]);

	// Add key event listener:
	useEffect(() => {
		document.addEventListener("keydown", handleKeyDown);
		return () => document.removeEventListener("keydown", handleKeyDown);
	}, [handleKeyDown]);

	// Update progress
	useEffect(() => {
		setProgress(correctIndex/characters.length*100);
	}, [setProgress, correctIndex, characters]);


	return <>
		<section id={"typing-practice"}
				 className={textClassName}
				 onKeyDown={handleKeyDown}
		>
			{characters.map((character, index) =>
				<span
					key={index}
					className={index < correctIndex ?
							   "character correct" :
							   "character"}
				>
				{character}
            </span>)}
		</section>
	</>;
}


export default TypingPractice;
