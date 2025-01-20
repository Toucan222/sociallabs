import React, { createContext, useContext, useState, useEffect } from 'react';

/**
 * UserAuthContext & UserAuthProvider
 *
 * Provides a minimal login system with localStorage.
 * Not secure or production-grade, but enough to store
 * user identity or preferences for small features.
 *
 * Usage:
 *   1. Wrap <App> in <UserAuthProvider>.
 *   2. In any component or tool, call:
 *       const { user, isLoggedIn, login, logout } = useUserAuth();
 *   3. "login" and "logout" update localStorage and the context state.
 */

const UserAuthContext = createContext(null);

export function UserAuthProvider({ children }) {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const storedUser = localStorage.getItem('socialplug_user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  const saveUserToStorage = (userData) => {
    localStorage.setItem('socialplug_user', JSON.stringify(userData));
  };

  function login(username) {
    const newUser = { username };
    setUser(newUser);
    saveUserToStorage(newUser);
  }

  function logout() {
    setUser(null);
    localStorage.removeItem('socialplug_user');
  }

  const isLoggedIn = Boolean(user);

  return (
    <UserAuthContext.Provider value={{ user, isLoggedIn, login, logout }}>
      {children}
    </UserAuthContext.Provider>
  );
}

export function useUserAuth() {
  return useContext(UserAuthContext);
}
