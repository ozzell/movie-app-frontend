import {ChangeEvent, FormEvent} from 'react'

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
      <input value={searchTerm} onInput={handleOnInput} id="search-field" name="search" type="text" />
      <input disabled={loading} type="submit" value="Search" />
    </form>
  )
}

export default SearchForm