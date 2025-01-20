import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';

/**
 * AnalyticsContext & AnalyticsProvider
 *
 * Basic system to track events (e.g., "Tool used", "DeepSeek call").
 * - By default, stores events in local state + localStorage.
 * - Could be expanded to send events to a server or analytics endpoint.
 *
 * Usage:
 *   1. Wrap <App> in <AnalyticsProvider>.
 *   2. In any component/card, call:
 *        const { trackEvent, events } = useAnalytics();
 *        trackEvent("tool_used", { toolId: 5 });
 *   3. "events" is an array of all tracked events (optional).
 */

const AnalyticsContext = createContext(null);

export function AnalyticsProvider({ children }) {
  const [events, setEvents] = useState([]);

  useEffect(() => {
    const stored = localStorage.getItem('analytics_events');
    if (stored) {
      try {
        setEvents(JSON.parse(stored));
      } catch {
        setEvents([]);
      }
    }
  }, []);

  const saveEventsToStorage = (updatedEvents) => {
    localStorage.setItem('analytics_events', JSON.stringify(updatedEvents));
  };

  const trackEvent = useCallback((name, details = {}) => {
    const newEvent = {
      name,
      details,
      timestamp: new Date().toISOString(),
    };
    setEvents((prev) => {
      const updated = [...prev, newEvent];
      saveEventsToStorage(updated);
      return updated;
    });
  }, []);

  const clearEvents = () => {
    setEvents([]);
    localStorage.removeItem('analytics_events');
  };

  return (
    <AnalyticsContext.Provider value={{ events, trackEvent, clearEvents }}>
      {children}
    </AnalyticsContext.Provider>
  );
}

export function useAnalytics() {
  return useContext(AnalyticsContext);
}
