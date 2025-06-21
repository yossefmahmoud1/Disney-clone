import axios from "axios";

const movieBaseUrl = "https://api.themoviedb.org/3";
const api_key = "a631be1c3c673d45550392525bfc6ba1";

const movieByGenreBaseURL = `${movieBaseUrl}/discover/movie?api_key=${api_key}`;

const getTrendingMovies = () => {
  return axios.get(`${movieBaseUrl}/trending/all/day?api_key=${api_key}`);
};

const getMovieByGenreId = (id) => {
  return axios.get(`${movieByGenreBaseURL}&with_genres=${id}`);
};

const getDisneyMovies = () => {
  return axios.get(`${movieByGenreBaseURL}&with_companies=420`);
};

const getMovieDetails = (id) => {
  return axios.get(
    `${movieBaseUrl}/movie/${id}?api_key=${api_key}&append_to_response=credits`
  );
};

export default {
  getTrendingMovies,
  getMovieByGenreId,
  getDisneyMovies,
  getMovieDetails,
};
