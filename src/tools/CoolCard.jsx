import React, { useEffect, useState } from 'react';
import { useToast } from '../components/ToastContext';
import { useAnalytics } from '../analytics/AnalyticsContext';
import './CoolCardStyles.scss';

export default function CoolCard({
  title = 'Untitled Tool',
  description = 'No description available.',
  icon = '🔧',
  onAction = () => {},
  onShare = () => {}
}) {
  const { showToast } = useToast();
  const { trackEvent } = useAnalytics();
  const [isMounted, setIsMounted] = useState(false);

  // Ensure mounted state is set after initial render
  useEffect(() => {
    // Small delay to ensure animation triggers
    const timer = setTimeout(() => {
      setIsMounted(true);
    }, 100);
    return () => clearTimeout(timer);
  }, []);

  const handleShare = () => {
    onShare();
    navigator.clipboard.writeText('https://sp8.netlify.app');
    showToast('Link copied!');
    trackEvent('share_clicked', { cardTitle: title });
  };

  return (
    <div className={`cool-card ${isMounted ? 'mounted' : ''}`}>
      <div className="card-header">
        <span className="card-icon" role="img" aria-label="tool icon">
          {icon}
        </span>
        <h3 className="card-title">{title}</h3>
      </div>

      <p className="card-description">{description}</p>

      <div className="button-row">
        <button className="card-button" onClick={onAction}>
          Try It
        </button>
        <button className="card-button share-button" onClick={handleShare}>
          📤 Share
        </button>
      </div>
    </div>
  );
}
