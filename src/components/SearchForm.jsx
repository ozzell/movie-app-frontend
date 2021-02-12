const SearchForm = ({handleSearchButtonClicked, handleOnInput, searchTerm}) => {
  return (
    <form className="search-form" onSubmit={handleSearchButtonClicked}>
      <label htmlFor="search-field">Search for a movie</label>
      <input value={searchTerm} onInput={handleOnInput} id="search-field" name="search" type="text" />
      <input type="submit" value="Search" />
    </form>
  )
}

export default SearchForm