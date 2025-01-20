import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import { ToastProvider } from './components/ToastContext'
import { UserAuthProvider } from './auth/UserAuthContext'
import { AnalyticsProvider } from './analytics/AnalyticsContext'
import { ThemeProvider } from './theme/ThemeContext'
import './styles/global.scss'

const root = document.getElementById('root')

if (root) {
  ReactDOM.createRoot(root).render(
    <React.StrictMode>
      <ThemeProvider>
        <ToastProvider>
          <UserAuthProvider>
            <AnalyticsProvider>
              <App />
            </AnalyticsProvider>
          </UserAuthProvider>
        </ToastProvider>
      </ThemeProvider>
    </React.StrictMode>
  )
}
