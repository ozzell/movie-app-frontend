import {render, screen} from '@testing-library/react'
import SearchResults from './SearchResults'
import {BrowserRouter as Router} from 'react-router-dom'

describe('SearchResults component', () => {
  it('Should render the array of movie titles provided in props', () => {
    const searchResult = [
      {
        imdbID: 0,
        Title: 'Test movie',
        Year: '2020'
      },
      {
        imdbID: 1,
        Title: 'Test movie 2',
        Year: '2021'
      }
    ]
    render(<Router><SearchResults searchResult={searchResult} /></Router>)
    expect(screen.getByText('Test movie (2020)')).toBeInTheDocument()
    expect(screen.getByText('Test movie 2 (2021)')).toBeInTheDocument()
  })

  it('Should render error string when it has a value', () => {
    const error = 'This is an error'
    render(<SearchResults error={error} />)
    expect(screen.getByText(error)).toBeInTheDocument()
  })
})
