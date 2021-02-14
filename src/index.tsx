import React from 'react'
import ReactDOM from 'react-dom'
import {
  BrowserRouter as Router,
  Switch,
  Route
} from 'react-router-dom';
import {createStore} from 'redux'
import {Provider} from 'react-redux'
import './index.css'
import App from './App'
import MovieSearchContainer from './containers/MovieSearchContainer'
import MovieInfoContainer from './containers/MovieInfoContainer'
import moviesReducer from './reducers/moviesReducer'

const store = createStore(moviesReducer)

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <Router>
        <App>
          <Switch>
          <Route path="/movie/:id">
              <MovieInfoContainer />
            </Route>
            <Route path="/">
              <MovieSearchContainer />
            </Route>
        </Switch>
        </App>
      </Router>
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
)
