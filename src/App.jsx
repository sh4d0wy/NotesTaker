import React from 'react'
import regeneratorRuntime from 'regenerator-runtime/runtime'
import SpeechRecognition, { useSpeechRecognition } from 'react-speech-recognition';
import './App.css'


function App() {
  const {
    transcript,
    listening,
    resetTranscript,
    browserSupportsSpeechRecognition
  } = useSpeechRecognition();

  if (!browserSupportsSpeechRecognition) {
    return <p>Your browser does not support it</p>;
  }
  console.log(transcript)
  const startListening = () => SpeechRecognition.startListening({ continuous: true, language:"en-IN" });

  return (
    <>
      <div className="heading">
      <h1>NotesTaker</h1>
      </div>
      <div className="content">
        <p>{listening?'listening':'not listening'}</p>
        <p> {transcript}</p>
      </div>
      <div className="btn">
        <button onClick={startListening} className="start">
          Start Listening
        </button>
        <button onClick = {SpeechRecognition.stopListening} className="stop">
          Stop Listening
        </button>
        <button onClick={resetTranscript} className="stop">
          Reset
        </button>
      </div>
    </>
  )
}

export default App
