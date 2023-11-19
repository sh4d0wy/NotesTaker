import React, { useState } from "react";
import regeneratorRuntime from "regenerator-runtime/runtime";
import SpeechRecognition, {
  useSpeechRecognition,
} from "react-speech-recognition";
import "./App.css";
import Openai from "./Components/Openai";
import Markdown from "markdown-to-jsx";
import FlowChart from "./Components/Flowchart";
import 'reactflow/dist/style.css';

function App() {
  const {
    transcript,
    listening,
    resetTranscript,
    browserSupportsSpeechRecognition,
  } = useSpeechRecognition();

  const [sentence, setSentence] = useState("");
  const [active, setActive] = useState(false);

  async function handleClick() {
      var t = transcript;
      console.log(t)
    try {
      const completedSentence = await Openai(t);
      setSentence(completedSentence);
      setActive(true);
    } catch (error) {
      console.error(error);
    }
  }
  if (!browserSupportsSpeechRecognition) {
    return <p>Your browser does not support it</p>;
  }
  const startListening = () =>
    SpeechRecognition.startListening({ continuous: true, language: "en-IN" });

  return (
    <>
      <section>
        <div className="heading">
          <h1>NotesTaker</h1>
        </div>
      </section>
      <section>
        <div className="content">
          <p>{listening ? "listening" : "not listening"}</p>
          <p> {transcript}</p>
        </div>
      </section>
      <section>
        <div className="btn">
          <button onClick={startListening} className="start">
            Start Listening
          </button>
          <button onClick={SpeechRecognition.stopListening} className="stop">
            Stop Listening
          </button>
          <button onClick={handleClick} className="stop">
            Generate Summary
          </button>
        </div>
      </section>
      <section className={active ? "flex" : "none"}>
        <div className="heading">
          <h1>Summary</h1>
        </div>
        <div className="content">
          <Markdown>{sentence}</Markdown>
        </div>
      </section>
      <section className={active ? "flex" : "none"}>
        <div className="heading">
          <h1>Flowchart</h1>
        </div>
        <div className="content">
          <FlowChart summary={sentence} />
        </div>
      </section>
    </>
  );
}

export default App;
