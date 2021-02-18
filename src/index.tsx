import React from 'react'
import ReactDOM from 'react-dom'
import {
  BrowserRouter as Router,
  Switch,
  Route
} from 'react-router-dom';
import {createStore, applyMiddleware} from 'redux'
import {Provider} from 'react-redux'
import thunk from 'redux-thunk'
import './index.css'
import App from './App'
import MovieSearchContainer from './containers/MovieSearchContainer'
import MovieInfoContainer from './containers/MovieInfoContainer'
import moviesReducer from './reducers/moviesReducer'

const store = createStore(moviesReducer, applyMiddleware(thunk))

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <Router>
        <App>
          <Switch>
          <Route path="/movies/:id">
              <MovieInfoContainer />
            </Route>
            <Route path={["/", "/search"]}>
              <MovieSearchContainer />
            </Route>
        </Switch>
        </App>
      </Router>
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
)
