
import "./App.css"
import SpeechRecognition, { useSpeechRecognition } from 'react-speech-recognition';
import useClipboard from "react-use-clipboard";


const App = () => {
    const { transcript, browserSupportsSpeechRecognition, resetTranscript, listening  } = useSpeechRecognition();
    const [isCopied, setCopied] = useClipboard(transcript, {
        successDuration:1000
    });

    //subscribe to thapa technical for more awesome videos

    const startListening = () => SpeechRecognition.startListening({ continuous: true, language: 'en-IN' });
    const stopListening = () => SpeechRecognition.stopListening();

    const handleSaveTranscript = () => {
        const textBlob = new Blob([transcript], { type: 'text/plain' });
        const downloadLink = URL.createObjectURL(textBlob);
        const a = document.createElement('a');
        a.href = downloadLink;
        a.download = 'transcript.txt';
        a.click();
      };

    if (!browserSupportsSpeechRecognition) {
        return null
    }

    return (
        <>
            <div className="container">
                <h2>Speech to Text Converter</h2>
                <br/>
                <p>A React hook that converts speech from the microphone to text and makes it available to your React
                    components.</p>

                <div className="main-content" >
                    {transcript}
                </div>

                <div className="btn-style">

                    <button onClick={setCopied}>
                        {isCopied ? 'Copied!' : 'Copy to clipboard'}
                    </button>
                    <button onClick={listening ? stopListening : startListening}>{ listening ? "Stop Listening" : "Start Listening"}</button>
                    <button onClick={handleSaveTranscript}>Save</button>
                    <button onClick={resetTranscript}>Reset</button>

                </div>

            </div>

        </>
    );
};

export default App;