import React, { useState, useEffect } from 'react';
import './MobileLayoutStyles.scss';
import CoolCard from '../tools/CoolCard';
import { tools } from '../tools';
import { useAnalytics } from '../analytics/AnalyticsContext';

export default function MobileLayout({ onToolSelect }) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [touchStart, setTouchStart] = useState(null);
  const { trackEvent } = useAnalytics();

  const goNext = () => {
    trackEvent('mobile_navigation', { action: 'next' });
    setActiveIndex((prev) => (prev + 1) % tools.length);
  };

  const goPrev = () => {
    trackEvent('mobile_navigation', { action: 'previous' });
    setActiveIndex((prev) => (prev - 1 + tools.length) % tools.length);
  };

  // Touch handlers for swipe
  const handleTouchStart = (e) => {
    setTouchStart(e.touches[0].clientX);
  };

  const handleTouchEnd = (e) => {
    if (!touchStart) return;

    const touchEnd = e.changedTouches[0].clientX;
    const diff = touchStart - touchEnd;

    // Require at least 50px swipe
    if (Math.abs(diff) > 50) {
      if (diff > 0) {
        goNext();
      } else {
        goPrev();
      }
    }
    setTouchStart(null);
  };

  const currentTool = tools[activeIndex];

  return (
    <div className="mobile-layout-container">
      <div 
        className="card-wrapper"
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
      >
        <CoolCard
          key={currentTool.id}
          title={currentTool.title}
          description={currentTool.description}
          icon={currentTool.icon}
          onAction={() => onToolSelect(currentTool.id)}
        />
      </div>

      <div className="controls-row">
        <button className="btn btn-outline" onClick={goPrev}>← Previous</button>
        <span className="page-indicator">{activeIndex + 1} / {tools.length}</span>
        <button className="btn btn-outline" onClick={goNext}>Next →</button>
      </div>
    </div>
  );
}
