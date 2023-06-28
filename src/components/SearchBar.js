import {
  Box,
  Typography,
  TextField,
  Button,
  Select,
  MenuItem,
} from "@mui/material";
import { useState } from "react";

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
    <Box sx={{ marginBottom: 2, display: "flex", alignItems: "center" }}>
      <Typography variant="h4">Search</Typography>
      <form onSubmit={handleSubmit}>
        <TextField
          value={searchTerm}
          onChange={(event) => setSearchTerm(event.target.value)}
          variant="outlined"
          sx={{ marginRight: 2 }}
        />
        <Select
          value={selectedGenre}
          onChange={handleGenreChange}
          variant="outlined"
          sx={{ minWidth: 120 }}
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
  );
};

export default SearchBar;
