import React, { useState } from 'react';
import { askDeepseek } from '../utils/deepseeksApi';
import { useToast } from '../components/ToastContext';
import { useAnalytics } from '../analytics/AnalyticsContext';
import './HashtagMixerStyles.scss';

export default function HashtagMixer() {
  const [keywords, setKeywords] = useState('');
  const [hashtags, setHashtags] = useState([]);
  const [loading, setLoading] = useState(false);
  const { showToast } = useToast();
  const { trackEvent } = useAnalytics();

  const handleMix = async () => {
    if (!keywords.trim()) {
      showToast('Please enter some keywords first!');
      return;
    }

    setLoading(true);
    trackEvent('hashtag_mixer_used', { keywords });

    try {
      const prompt = `Given the keywords: ${keywords}, create 10 creative hashtag combinations and short trending variants. Format each hashtag on a new line and ensure they're optimized for social media reach.`;
      
      const response = await askDeepseek(prompt);
      const cleanedHashtags = response
        .split('\n')
        .filter(tag => tag.trim())
        .map(tag => tag.trim());
      
      setHashtags(cleanedHashtags);
      showToast('Hashtags generated successfully! 🎯');
    } catch (err) {
      console.error(err);
      showToast('Error generating hashtags. Please try again.');
      setHashtags(["Error generating hashtags."]);
    } finally {
      setLoading(false);
    }
  };

  const copyToClipboard = (text) => {
    navigator.clipboard.writeText(text);
    showToast('Hashtag copied! 📋');
    trackEvent('hashtag_copied');
  };

  return (
    <div className="hashtag-mixer">
      <div className="input-section">
        <label htmlFor="keywords">Enter Keywords (separated by commas)</label>
        <textarea
          id="keywords"
          rows="2"
          placeholder="e.g., fitness, motivation, workout"
          value={keywords}
          onChange={(e) => setKeywords(e.target.value)}
          disabled={loading}
        />
        <button 
          className="mix-button" 
          onClick={handleMix}
          disabled={loading}
        >
          {loading ? 'Mixing... 🔄' : 'Mix Hashtags 🎯'}
        </button>
      </div>

      {hashtags.length > 0 && (
        <div className="results-section">
          <h4>Your Hashtag Mix:</h4>
          <div className="hashtags-list">
            {hashtags.map((tag, idx) => (
              <div 
                key={idx} 
                className="hashtag-item"
                onClick={() => copyToClipboard(tag)}
              >
                {tag}
                <span className="copy-hint">Click to copy</span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
