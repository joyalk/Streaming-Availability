const BASE_URL = "https://streaming-availability.p.rapidapi.com/v2";

const options = {
  method: "GET",
  headers: {
    "X-RapidAPI-Key": "960a55839cmsha8e7513eb60fbb6p1e110ajsnbadf912bd0a7",
    "X-RapidAPI-Host": "streaming-availability.p.rapidapi.com",
  },
};

export const searchMoviesByTitle = async (searchTerm) => {
  try {
    const formattedSearchTerm = encodeURIComponent(searchTerm);
    const url = `${BASE_URL}/search/title?title=${formattedSearchTerm}&country=us&show_type=all&output_language=en`;

    const response = await fetch(url, options);
    const data = await response.json();
    return data.result;
  } catch (error) {
    throw new Error("Error searching movies:", error);
  }
};

export const getGenres = async () => {
  const url = `${BASE_URL}/genres`;

  try {
    const response = await fetch(url, options);
    const result = await response.json();
    return result;
  } catch (error) {
    console.error(error);
  }
};
