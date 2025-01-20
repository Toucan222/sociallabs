import React, { useState } from 'react';
import { useUserAuth } from './UserAuthContext';

export default function Login() {
  const [username, setUsername] = useState('');
  const { login, isLoggedIn, user } = useUserAuth();

  if (isLoggedIn) {
    return (
      <div className="mb-2" style={{ textAlign: 'center' }}>
        <h3>You are logged in as {user?.username}</h3>
      </div>
    );
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    if (username.trim()) {
      login(username.trim());
      setUsername('');
    }
  };

  return (
    <form onSubmit={handleSubmit} style={{ maxWidth: '300px', margin: '0 auto' }}>
      <label htmlFor="username" className="mb-1" style={{ display: 'block' }}>
        👤 Enter Username
      </label>
      <input
        id="username"
        type="text"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        style={{
          width: '100%',
          padding: '0.75rem',
          marginBottom: '1rem',
          border: '1px solid #ccc',
          borderRadius: '6px',
          fontSize: '1rem',
        }}
      />
      <button type="submit" className="btn">
        Login
      </button>
    </form>
  );
}
