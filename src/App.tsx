import './App.scss'

type AppProps = {
  children?: React.ReactNode
}
function App({children}: AppProps): JSX.Element {
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
