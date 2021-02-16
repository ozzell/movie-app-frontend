import {ChangeEvent, FormEvent} from 'react'
import {useDispatch} from 'react-redux'
import {useHistory} from 'react-router-dom'
import {setSearchTerm, setLoading} from '../reducers/moviesReducer'
import searchImage from '../images/search-icon.png'

type SearchFormProps = {
  searchTerm: string
  loading: boolean
}

const SearchForm = ({searchTerm, loading}: SearchFormProps): JSX.Element => {
  const dispatch = useDispatch()
  const history = useHistory()

  const handleSearchButtonClicked = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    if (!searchTerm) {
      return
    }
    history.push(`/search?q=${searchTerm}`)
    dispatch(setLoading(true))
  }

  const handleOnInput = (event: ChangeEvent<HTMLInputElement>) => {
    dispatch(setSearchTerm(event.target.value))
  }

  return (
    <form className="search-form" onSubmit={handleSearchButtonClicked}>
      <label htmlFor="search-field">Search for a movie</label>
      <div className="search-controls">
        <input value={searchTerm} onInput={handleOnInput} id="search-field" name="search" type="text" className="search-box" />
        <button disabled={loading} type="submit" className="submit-button" aria-label="Search">
          <img src={searchImage} width="24" alt="Search" />
        </button>
      </div>
    </form>
  )
}

export default SearchForm