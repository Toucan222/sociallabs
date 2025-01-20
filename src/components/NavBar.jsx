import React from 'react';
import './NavBar.scss';

export default function NavBar() {
  const handleShare = (platform) => {
    const shareText = "🚀 Check out these viral AI tools for content creators @SocialPlugLabs";
    const shareUrl = "https://socialplug-labs.netlify.app";

    const shareLinks = {
      twitter: `https://twitter.com/intent/tweet?text=${encodeURIComponent(shareText)}&url=${encodeURIComponent(shareUrl)}`,
      instagram: `https://www.instagram.com/`,
      tiktok: `https://www.tiktok.com/`
    };

    if (shareLinks[platform]) {
      window.open(shareLinks[platform], '_blank');
    }
  };

  return (
    <nav className="navbar">
      <div className="navbar-content">
        <h1 className="site-logo">⚡ SocialPlug Labs</h1>
        
        <div className="social-links">
          <button onClick={() => handleShare('tiktok')} className="social-button">
            <span className="icon">🎵</span> TikTok
          </button>
          <button onClick={() => handleShare('instagram')} className="social-button">
            <span className="icon">📸</span> Instagram
          </button>
          <button onClick={() => handleShare('twitter')} className="social-button">
            <span className="icon">𝕏</span> Twitter
          </button>
        </div>
      </div>
    </nav>
  );
}
