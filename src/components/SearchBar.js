import {
  Box,
  TextField,
  Button,
  Select,
  MenuItem,
} from "@mui/material";
import { useState } from "react";
import '../App.css'
import stream from './stream.png'

const SearchBar = ({
  handleSearch,
  genres,
  selectedGenre,
  setSelectedGenre,
}) => {
  const [searchTerm, setSearchTerm] = useState("");

  const handleGenreChange = (event) => {
    setSelectedGenre(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    handleSearch(searchTerm, selectedGenre);
  };

  return (
    <div class="container">
      <h1>
        <img src={stream} alt="description" width="50" height="50" />
        <span className="streamsearch">Stream Search </span>
      </h1>
      <div class="boxContainer">
        <Box sx={{ marginBottom: 5, display: "flex", alignItems: "center" }}>
          <form onSubmit={handleSubmit}>
            <TextField
              value={searchTerm}
              onChange={(event) => setSearchTerm(event.target.value)}
              variant="outlined"
              placeholder="Movie title"
              sx={{ marginRight: 2, backgroundColor: 'white' }}
            />
            <Select
              value={selectedGenre}
              onChange={handleGenreChange}
              variant="outlined"
              sx={{ minWidth: 120, backgroundColor: 'white' }}
            >
              <MenuItem value="">All Genres</MenuItem>
              {Object.entries(genres).map(([genreId, genreName]) => (
                <MenuItem key={genreId} value={genreName}>
                  {genreName}
                </MenuItem>
              ))}
            </Select>
            <Button
              type="submit"
              variant="contained"
              color="primary"
              sx={{ marginLeft: 2 }}
            >
              Search
            </Button>
          </form>
        </Box>
      </div>
    </div>
  );
};

export default SearchBar;