import { Analytics } from '@vercel/analytics/react'
import './App.css'

function App() {
  return (
    <>
      <div className="app">
        <header className="app-header">
          <h1>Dakia Events App</h1>
          <p>Welcome to the Dakia Events Application</p>
        </header>
        <main className="app-main">
          <section className="hero">
            <h2>Discover and Manage Your Events</h2>
            <p>Your all-in-one platform for event management</p>
          </section>
        </main>
      </div>
      <Analytics />
    </>
  )
}

export default App
