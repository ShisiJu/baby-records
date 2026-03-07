import { useEffect, useState } from 'react'
import './App.css'

function App() {
  const [apiStatus, setApiStatus] = useState('checking...')

  useEffect(() => {
    const apiBaseUrl = import.meta.env.VITE_API_BASE_URL ?? '/api'

    fetch(`${apiBaseUrl}/health`)
      .then((response) => {
        if (!response.ok) {
          throw new Error(`API returned ${response.status}`)
        }
        return response.json() as Promise<{ status?: string }>
      })
      .then((data) => {
        setApiStatus(data.status ?? 'unknown')
      })
      .catch(() => {
        setApiStatus('unreachable')
      })
  }, [])

  return (
    <main className="app">
      <h1>Baby Growth Records</h1>
      <p>Frontend: React + Vite + TypeScript</p>
      <div className="status-card">
        <h2>Backend API Status</h2>
        <p>{apiStatus}</p>
      </div>
    </main>
  )
}

export default App
