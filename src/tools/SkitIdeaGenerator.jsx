import React, { useState } from 'react';
import { askDeepseek } from '../utils/deepseeksApi';
import { useToast } from '../components/ToastContext';
import { useAnalytics } from '../analytics/AnalyticsContext';
import './SkitIdeaGenerator.scss';

export default function SkitIdeaGenerator() {
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
    trackEvent('skit_generator_used', { topic });

    try {
      const prompt = `Generate 3 creative skit ideas about ${topic}. For each idea include:
      1. A catchy title
      2. A brief plot outline
      3. Key moments or punchlines
      
      Format each idea clearly and make them engaging for social media.`;

      const response = await askDeepseek(prompt);
      setIdeas(response.split('\n').filter(line => line.trim()));
      showToast('Skit ideas generated!');
    } catch (err) {
      console.error(err);
      showToast('Error generating ideas. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="skit-generator">
      {/* Your component JSX here */}
    </div>
  );
}
