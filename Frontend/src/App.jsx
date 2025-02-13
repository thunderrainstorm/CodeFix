import { useState, useEffect } from 'react';
import "prismjs/themes/prism-tomorrow.css";
import Editor from "react-simple-code-editor";
import prism from "prismjs";
import Markdown from "react-markdown";
import rehypeHighlight from "rehype-highlight";
import "highlight.js/styles/github-dark.css";
import axios from 'axios';
import './App.css';

const API_URL = process.env.NODE_ENV === 'production' 
  ? 'https://codefix-3.onrender.com'  
  : 'http://localhost:3000';
export default API_URL;

function App() {
  // Load DRAFT from localStorage
  const [code, setCode] = useState(() => localStorage.getItem("code") || `function sum() {
    return 1 + 1
  }`);
  const [review, setReview] = useState(() => localStorage.getItem("review") || '');
  
  // History always from MongoDB
  const [history, setHistory] = useState([]);

  useEffect(() => {
    prism.highlightAll();
    fetchHistory(); // Initial load from DB
  }, []);

  // Save only DRAFT (code + review) locally
  useEffect(() => {
    localStorage.setItem("code", code);
    localStorage.setItem("review", review);
  }, [code, review]);

  async function fetchHistory() {
    try {
      const response = await axios.get('http://localhost:3000/ai/history');
      setHistory(response.data);
    } catch (error) {
      console.error('Error fetching history:', error);
    }
  }

  async function reviewCode() {
    try {
      const response = await axios.post('http://localhost:3000/ai/get-review', { code });
      setReview(response.data);
      fetchHistory(); // Refresh cloud history after submission
    } catch (error) {
      console.error('Error getting review:', error);
    }
  }

  return (
    <main>
      <div className="left">
        <div className="code">
          <Editor
            value={code}
            onValueChange={setCode}
            highlight={code => prism.highlight(code, prism.languages.javascript, "javascript")}
            padding={10}
            style={{
              fontFamily: '"Fira code", "Fira Mono", monospace',
              fontSize: 16,
              border: "1px solid #ddd",
              borderRadius: "5px",
              height: "100%",
              width: "100%"
            }}
          />
        </div>
        <div onClick={reviewCode} className="review">Review</div>
      </div>

      <div className="right">
        <Markdown rehypePlugins={[rehypeHighlight]}>{review}</Markdown>
        
        {history.length > 0 && (
          <div className="history">
            <h2>Code Review History</h2>
            {history.map((item, index) => (
              <div
                key={index}
                className="history-item"
                onClick={() => {
                  setCode(item.code);
                  setReview(item.review);
                }}
              >
                <pre>{item.code.substring(0, 50)}...</pre>
                <small>
                  {new Date(item.timestamp).toLocaleString()}
                  {item.code === code && " (Current Draft)"}
                </small>
              </div>
            ))}
          </div>
        )}
      </div>
    </main>
  );
}

export default App;
