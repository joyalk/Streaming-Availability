import React from "react";
import {
  Box,
  Typography,
  Button,
  Checkbox,
  FormControlLabel,
  List,
  ListItem,
} from "@mui/material";

const MovieList = ({
  movies,
  handleTrailerClick,
  handleStreamingInfo,
  favoriteMovies,
  toggleFavoriteMovie,
}) => {
  const platformPrices = {
    apple: 9.99,
    prime: 8.99,
    hulu: 7.99,
    netflix: 12.99,
    hbo: 11.99,
    disney: 10.99,
  };

  const isMovieFavorite = (movie) => favoriteMovies.includes(movie);

  function calculateMinimumCost(favoriteMovies) {
    let minCost = Infinity;
    let selectedPlatforms = [];
    let movieProviderMapping = {};

    const platformKeys = Object.keys(platformPrices);

    function generateCombinations(index, platforms, totalCost) {
      if (index === platformKeys.length) {
        if (
          totalCost < minCost
        ) {
          const moviesCovered = favoriteMovies.filter((movie) => {
            const streamingInfo = Object.values(movie.streamingInfo)[0];
            const platformKeys = Object.keys(streamingInfo);

            const isCovered = platformKeys.some((platformKey) => {
              return platforms.includes(platformKey);
            });
            return isCovered;
          });

          if (moviesCovered.length === favoriteMovies.length) {
            minCost = totalCost;
            selectedPlatforms = platforms;

            movieProviderMapping = {};

            moviesCovered.forEach((movie) => {
              const streamingInfo = Object.values(movie.streamingInfo)[0];
              const platformKey = Object.keys(streamingInfo).find((key) =>
                platforms.includes(key)
              );

              if (!movieProviderMapping[platformKey]) {
                movieProviderMapping[platformKey] = [];
              }

              movieProviderMapping[platformKey].push(movie.title);
            });
          }
        }
        return;
      }

      generateCombinations(index + 1, platforms, totalCost);

      generateCombinations(
        index + 1,
        [...platforms, platformKeys[index]],
        totalCost + platformPrices[platformKeys[index]]
      );
    }

    generateCombinations(0, [], 0);

    return { minCost, selectedPlatforms, movieProviderMapping };
  }

  const { minCost, movieProviderMapping } =
    calculateMinimumCost(favoriteMovies);

  return (
    <Box display="flex" justifyContent="center">
      <Box>
        {movies.map((movie) => (
          <Box key={movie.imdbId} my={4}>
            <Typography variant="h6" component="h2" gutterBottom>
              {movie.title}
            </Typography>
            <Typography variant="body2" component="p" gutterBottom>
              Genres: {movie.genres.map((x) => x.name).join(", ")}
            </Typography>
            <Button
              variant="contained"
              color="primary"
              onClick={() => handleTrailerClick(movie.youtubeTrailerVideoId)}
              sx={{ mr: 2 }}
            >
              Watch Trailer
            </Button>
            <Button
              variant="contained"
              color="primary"
              onClick={() => handleStreamingInfo(movie.streamingInfo)}
              sx={{ mr: 2 }}
            >
              Check Streaming Info
            </Button>
            <FormControlLabel
              control={
                <Checkbox
                  checked={isMovieFavorite(movie)}
                  onChange={() => toggleFavoriteMovie(movie)}
                />
              }
              label="Add to Favorites"
            />
          </Box>
        ))}
      </Box>
      {favoriteMovies.length > 0 && (
        <Box
          position="fixed"
          top={0}
          right={0}
          ml={8}
          minWidth="250px"
          maxWidth="250px"
          bgcolor="white"
          borderRadius={4}
          boxShadow={1}
          p={2}
        >
          <Typography variant="h6" component="h2" gutterBottom>
            Minimum cost: {minCost}
          </Typography>
          {Object.keys(movieProviderMapping).length > 0 && (
            <Box mt={4}>
              <Typography variant="h6" component="h2" gutterBottom>
                Streaming Providers:
              </Typography>
              {Object.keys(movieProviderMapping).map((provider) => (
                <Box key={provider} mb={4}>
                  <Typography variant="subtitle1" component="h3" gutterBottom>
                    {provider}
                  </Typography>
                  <List>
                    {movieProviderMapping[provider].map((movieTitle) => (
                      <ListItem key={movieTitle} sx={{ ml: 4 }}>
                        {movieTitle}
                      </ListItem>
                    ))}
                  </List>
                </Box>
              ))}
            </Box>
          )}
        </Box>
      )}
    </Box>
  );
};

export default MovieList;