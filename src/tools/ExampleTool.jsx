import React, { useState } from 'react';
import { askDeepseek } from '../utils/deepseeksApi'; 
import { useToast } from '../components/ToastContext';
import { useAnalytics } from '../analytics/AnalyticsContext';
import './ExampleToolStyles.scss';

export default function ExampleTool() {
  const [input, setInput] = useState('');
  const [result, setResult] = useState('');
  const { showToast } = useToast();
  const { trackEvent } = useAnalytics();

  const handleGenerate = async () => {
    if (!input.trim()) {
      showToast('Please enter some text!');
      return;
    }
    trackEvent('example_tool_generate_clicked', { input });

    try {
      const response = await askDeepseek(`Summarize: ${input}`);
      setResult(response);
      showToast('DeepSeek query finished!');
    } catch (error) {
      console.error('Error calling DeepSeek:', error);
      showToast('Error calling DeepSeek. Check console.');
    }
  };

  return (
    <div className="example-tool-container">
      <div className="example-tool-header">
        <button onClick={() => window.history.back()} className="btn-outline back-button">
          ← Back to Tools
        </button>
      </div>

      <h2 className="tool-title">Example Tool</h2>
      <p className="tool-description">
        This is a sample page to demonstrate user input, AI logic, 
        and a result area. Feel free to adapt it to your own use case!
      </p>

      <label htmlFor="userInput" className="tool-label">
        Enter Text to Summarize
      </label>
      <input
        id="userInput"
        className="tool-input"
        type="text"
        placeholder="Type something here..."
        value={input}
        onChange={(e) => setInput(e.target.value)}
      />

      <button className="btn mt-2" onClick={handleGenerate}>
        Generate
      </button>

      {result && (
        <div className="tool-result mt-2">
          <h4>Result:</h4>
          <p>{result}</p>
        </div>
      )}
    </div>
  );
}
