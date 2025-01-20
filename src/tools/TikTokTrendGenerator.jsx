import React, { useState } from 'react';
import { askDeepseek } from '../utils/deepseeksApi';
import { useToast } from '../components/ToastContext';
import { useAnalytics } from '../analytics/AnalyticsContext';
import './TikTokTrendGeneratorStyles.scss';

export default function TikTokTrendGenerator() {
  const [topic, setTopic] = useState('');
  const [ideas, setIdeas] = useState([]);
  const [loading, setLoading] = useState(false);
  const { showToast } = useToast();
  const { trackEvent } = useAnalytics();

  const handleGenerate = async () => {
    if (!topic.trim()) {
      showToast('Please enter a topic first!');
      return;
    }

    setLoading(true);
    trackEvent('tiktok_generator_used', { topic });

    try {
      const prompt = `Generate 3 creative TikTok video ideas about ${topic}. For each idea include:
      1. A catchy hook/title
      2. A unique challenge or concept
      3. A brief description of how to execute it
      
      Format each idea clearly and make them trendy and engaging.`;

      const response = await askDeepseek(prompt);
      setIdeas(response.split('\n').filter(line => line.trim()));
      showToast('Ideas generated successfully!');
    } catch (err) {
      console.error(err);
      showToast('Error generating ideas. Please try again.');
      setIdeas([]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="tiktok-trend-generator">
      <div className="input-section">
        <label htmlFor="topic">What's your content topic?</label>
        <input 
          id="topic"
          type="text" 
          placeholder="Enter a topic (e.g., skincare, fitness, cooking)"
          value={topic}
          onChange={(e) => setTopic(e.target.value)}
          disabled={loading}
        />
        <button 
          className="btn generate-btn" 
          onClick={handleGenerate}
          disabled={loading}
        >
          {loading ? 'Generating...' : 'Generate Ideas 💡'}
        </button>
      </div>

      {ideas.length > 0 && (
        <div className="results-section">
          <h4>Your TikTok Ideas:</h4>
          <div className="ideas-list">
            {ideas.map((idea, idx) => (
              <div key={idx} className="idea-card">
                {idea}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
