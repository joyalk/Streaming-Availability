import React, { useState } from 'react'

const SearchForm = () => {
  const [genre, setGenre] = useState('')
  const [title, setTitle] = useState('')
  const [searchResults, setSearchResults] = useState([])
  const handleSearch = async (event) => {
    event.preventDefault()

    const url = `https://streaming-availability.p.rapidapi.com/v2/search/title?title=${title}&country=au&show_type=all&output_language=en`

    const options = {
      method: 'GET',
      headers: {
        'X-RapidAPI-Key': '960a55839cmsha8e7513eb60fbb6p1e110ajsnbadf912bd0a7',
        'X-RapidAPI-Host': 'streaming-availability.p.rapidapi.com',
      },
    }

    try {
      const response = await fetch(url, options)
      const data = await response.json()
      console.log(data)
      setSearchResults(data)
    } catch (error) {
      console.error(error)
    }
  }

  const renderSearchResults = () => {
    if (!Array.isArray(searchResults)) {
      return null
    }
    return (
      <ul>
        {searchResults.map((result) => (
          <li key={result.id}>{result.title}</li>
        ))}
      </ul>
    )
  }

  return (
    <div>
      <h2>Search Form</h2>
      <form onSubmit={handleSearch}>
        <label>
          Genre:
          <input type="text" value={genre} onChange={(event) => setGenre(event.target.value)} />
        </label>
        <label>
          Title:
          <input type="text" value={title} onChange={(event) => setTitle(event.target.value)} />
        </label>
        <button type="submit">Search</button>
      </form>
      <ul>
        <h3>Search Results:</h3>
        {renderSearchResults()}
      </ul>
    </div>
  )
}

export default SearchForm