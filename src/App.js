import './App.scss'

function App({children}) {
  return (
      <div className="movie-app">
        <header className="header">
            <h1>Movie App</h1>
        </header>
        <main>
          {children}
        </main>
      </div>
  )
}

export default App
