import { useEffect, useState } from "react";
import { Box, Container } from "@mui/material";
import SearchBar from "./components/SearchBar";
import MovieList from "./components/MovieList";
import { getGenres, searchMoviesByTitle } from "./services/rapidapiService";
import StreamingInfoModal from "./components/StreamingInfoModal";

const App = () => {
  const [movies, setMovies] = useState([]);
  const [selectedGenre, setSelectedGenre] = useState(null);
  const [genres, setGenres] = useState([]);
  const [streamingInfoModalOpen, setStreamingInfoModalOpen] = useState(false);
  const [streamingInfo, setStreamingInfo] = useState(null);
  const [favoriteMovies, setFavoriteMovies] = useState([]);

  useEffect(() => {
    const fetchGenres = async () => {
      try {
        const genresResponse = await getGenres();
        setGenres(Object.values(genresResponse.result));
      } catch (error) {
        console.error("Error fetching genres:", error);
      }
    };

    fetchGenres();
  }, []);

  const toggleFavoriteMovie = (movie) => {
    if (favoriteMovies.includes(movie)) {
      setFavoriteMovies(favoriteMovies.filter((m) => m !== movie));
    } else {
      if (favoriteMovies.length < 5) {
        setFavoriteMovies([...favoriteMovies, movie]);
      } else {
        console.log("Maximum limit of favorite movies reached.");
      }
    }
  };

  const handleStreamingInfo = (streamingInfo) => {
    const platforms = Object.values(streamingInfo)[0];

    if (!platforms) {
      console.error("No streaming info");
      return;
    }

    setStreamingInfo(platforms);
    setStreamingInfoModalOpen(true);
  };

  const handleSearch = async (searchTerm) => {
    try {
      let movies = await searchMoviesByTitle(searchTerm);

      movies = movies.filter(
        (movie) => Object.keys(movie.streamingInfo).length > 0
      );

      if (selectedGenre) {
        movies = movies.filter((movie) => {
          return movie.genres.some((genre) => genre.name === selectedGenre);
        });
      }

      setMovies(movies.slice(0, 5));
    } catch (error) {
      console.error("Error fetching movies:", error);
    }
  };

  const handleTrailerClick = (youtubeTrailerVideoId) => {
    try {
      if (!youtubeTrailerVideoId) throw new Error();
      const youtubeUrl = `https://www.youtube.com/watch?v=${youtubeTrailerVideoId}`;
      window.open(youtubeUrl, "_blank");
    } catch (error) {
      console.log("Trailer not available");
    }
  };
  

  const closeModal = () => {
    setStreamingInfoModalOpen(false);
  };

  return (
    <Box sx={{ display: "flex", justifyContent: "center" }}>
      <Container maxWidth="md">
        <SearchBar
          handleSearch={handleSearch}
          setSelectedGenre={setSelectedGenre}
          genres={genres}
        />
        <MovieList
          movies={movies}
          handleTrailerClick={handleTrailerClick}
          handleStreamingInfo={handleStreamingInfo}
          favoriteMovies={favoriteMovies}
          toggleFavoriteMovie={toggleFavoriteMovie}
        />
      </Container>
      
      <StreamingInfoModal
        isOpen={streamingInfoModalOpen}
        onRequestClose={closeModal}
        streamingInfo={streamingInfo}
      />
    </Box>
  );
};

export default App;