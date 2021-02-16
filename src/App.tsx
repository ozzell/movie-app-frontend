import {Link} from 'react-router-dom'
import './App.scss'

type AppProps = {
  children?: React.ReactNode
}
function App({children}: AppProps): JSX.Element {
  return (
      <div className="movie-app">
        <header className="header">
          <h1 className="header-title">
            <Link to="/">Movie App</Link>
          </h1>
        </header>
        <main>
          {children}
        </main>
      </div>
  )
}

export default App
