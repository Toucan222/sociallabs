import React from 'react';
import './ToolCard.scss';

export default function ToolCard({
  title,
  description,
  icon,
  tags = [],
  rank,
  upvotes,
  onAction,
  onUpvote
}) {
  const handleUpvote = (e) => {
    e.stopPropagation();
    onUpvote();
  };

  return (
    <div className="tool-card" onClick={onAction}>
      <div className="rank-badge">#{rank}</div>
      
      <div className="tool-card-content">
        <div className="tool-header">
          <span className="tool-icon">{icon}</span>
        </div>
        
        <h3 className="tool-title">{title}</h3>
        <p className="tool-description">{description}</p>
        
        <div className="tool-tags">
          {tags.map((tag, index) => (
            <span key={index} className="tag">
              {tag.icon} {tag.name}
            </span>
          ))}
        </div>

        <div className="card-footer">
          <button className="upvote-button" onClick={handleUpvote}>
            ⬆️ {upvotes.toLocaleString()}
          </button>
          <span className="try-it">Try it →</span>
        </div>
      </div>
    </div>
  );
}
