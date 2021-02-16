import {ChangeEvent, FormEvent} from 'react'
import searchImage from '../images/search-icon.png'

type SearchFormSubmitCallback = (event: FormEvent<HTMLFormElement>) => void
type SearchFormOnInputCallback = (event: ChangeEvent<HTMLInputElement>) => void

type SearchFormProps = {
  handleSearchButtonClicked: SearchFormSubmitCallback
  handleOnInput: SearchFormOnInputCallback
  searchTerm: string
  loading: boolean
}

const SearchForm = ({
  handleSearchButtonClicked,
  handleOnInput,
  searchTerm,
  loading
}: SearchFormProps): JSX.Element => {
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