import {useState, useEffect} from 'react'
import SearchForm from "../components/SearchForm"
import {getMoviesByName} from '../services/movies'

const MovieSearchContainer = () => {
  const [searchResult, setSearchResult] = useState([])
  const [searchTerm, setSearchTerm] = useState('')
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    const doGetMovies = async () => {
      const response = await getMoviesByName(searchTerm)
      setSearchResult(response.Search)
      setLoading(false)
    }
    loading && doGetMovies()
  }, [loading, searchTerm])

  const handleSearchButtonClicked = async event => {
    event.preventDefault()
    setLoading(true)
  }

const handleOnInput = event => {
  setSearchTerm(event.target.value)
}

  return (
    <>
      <SearchForm 
        handleSearchButtonClicked={handleSearchButtonClicked}
        handleOnInput={handleOnInput}
        searchTerm={searchTerm}
      />
      <ul>
        {searchResult.map(item => (
          <li key={item.imdbID}><img src={item.Poster} alt={`A poster for ${item.Title}`} />{item.Title}</li>
        ))}
      </ul>
    </> 
  )
}

export default MovieSearchContainer