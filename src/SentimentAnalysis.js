import React, { useState } from 'react';
import axios from 'axios';

const SentimentAnalysis = () => {
  const [text, setText] = useState('');
  const [sentiment, setSentiment] = useState(null);

  const analyzeSentiment = async () => {
    try {
      const response = await axios.post(
        `https://language.googleapis.com/v1/documents:analyzeSentiment?key=${process.env.REACT_APP_GOOGLE_API_KEY}`,
        {
          document: {
            type: 'PLAIN_TEXT',
            content: text,
          },
        }
      );
      setSentiment(response.data.documentSentiment);
    } catch (error) {
      console.error('Error analyzing sentiment:', error);
    }
  };

  return (
    <div>
      <textarea
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Enter text for sentiment analysis..."
      />
      <button onClick={analyzeSentiment}>Analyze Sentiment</button>
      {sentiment && (
        <div>
          <h2>Sentiment Analysis Results:</h2>
          <p>Score: {sentiment.score}</p>
          <p>Magnitude: {sentiment.magnitude}</p>
        </div>
      )}
    </div>
  );
};

export default SentimentAnalysis;