import React from 'react'
import ReactDOM from 'react-dom'
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";
import './index.css'
import App from './App'
import MovieSearchContainer from "./containers/MovieSearchContainer"

ReactDOM.render(
  <React.StrictMode>
    <Router>
      <App>
        <Switch>
          <Route path="/">
            <MovieSearchContainer />
          </Route>
      </Switch>
      </App>
    </Router>
  </React.StrictMode>,
  document.getElementById('root')
)
