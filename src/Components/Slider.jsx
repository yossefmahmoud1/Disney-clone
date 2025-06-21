import { useEffect, useState } from "react";
import GlobalApi from "../Services/GlobalApi";
import { HiChevronLeft, HiChevronRight } from "react-icons/hi";
import { Link } from "react-router-dom";
import LoadingSpinner from "./LoadingSpinner";

const IMAGE_BASE_URL = "https://image.tmdb.org/t/p/original";

function Slider() {
  const [movieList, setMovieList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    fetchMovies();
  }, []);

  // Auto-slide every 2 seconds
  useEffect(() => {
    if (movieList.length > 0) {
      const interval = setInterval(() => {
        setCurrentIndex((prevIndex) =>
          prevIndex === movieList.length - 1 ? 0 : prevIndex + 1
        );
      }, 2000);

      return () => clearInterval(interval);
    }
  }, [movieList.length]);

  const sliderRight = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === movieList.length - 1 ? 0 : prevIndex + 1
    );
  };

  const sliderLeft = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? movieList.length - 1 : prevIndex - 1
    );
  };

  const fetchMovies = () => {
    setLoading(true);

    GlobalApi.getTrendingMovies()
      .then((response) => {
        const moviesWithBackdrop = response.data.results.filter(
          (movie) => movie.backdrop_path && movie.id > 0
        );

        if (moviesWithBackdrop.length > 0) {
          setMovieList(moviesWithBackdrop);
        } else {
          setError("No movies with backdrop images found");
        }
        setLoading(false);
      })
      .catch((error) => {
        setError(`Failed to load movies: ${error.message}`);
        setLoading(false);
      });
  };

  if (loading) {
    return (
      <div className="relative z-50 overflow-hidden scrollbar-hide h-[250px] sm:h-[300px] md:h-[400px] lg:h-[500px] flex items-center justify-center bg-gray-900">
        <LoadingSpinner size="large" color="white" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="relative z-50 overflow-hidden scrollbar-hide h-[250px] sm:h-[300px] md:h-[400px] lg:h-[500px] flex items-center justify-center bg-gray-900">
        <div className="text-white text-sm sm:text-base md:text-xl px-4 text-center">
          {error}
        </div>
      </div>
    );
  }

  if (movieList.length === 0) {
    return (
      <div className="relative z-50 overflow-hidden scrollbar-hide h-[250px] sm:h-[300px] md:h-[400px] lg:h-[500px] flex items-center justify-center bg-gray-900">
        <div className="text-white text-sm sm:text-base md:text-xl px-4 text-center">
          No featured movies available
        </div>
      </div>
    );
  }

  const currentMovie = movieList[currentIndex];

  return (
    <div className="relative z-40 overflow-hidden scrollbar-hide bg-gray-900">
      {/* Slider Container */}
      <div className="h-[250px] sm:h-[300px] md:h-[400px] lg:h-[500px] relative">
        {/* Desktop-only arrows */}
        <HiChevronLeft
          className="hidden md:block text-white text-[40px] absolute 
            left-2 sm:left-4 top-1/2 transform -translate-y-1/2 cursor-pointer z-50
            bg-black bg-opacity-50 p-1 sm:p-2 rounded-full hover:bg-opacity-70 transition-all
            touch-manipulation"
          onClick={sliderLeft}
        />

        <HiChevronRight
          className="hidden md:block text-white text-[40px] absolute 
            right-2 sm:right-4 top-1/2 transform -translate-y-1/2 cursor-pointer z-50
            bg-black bg-opacity-50 p-1 sm:p-2 rounded-full hover:bg-opacity-70 transition-all
            touch-manipulation"
          onClick={sliderRight}
        />

        {/* Image */}
        <div className="relative w-full h-full z-10 overflow-hidden">
          <Link to={`/movie/${currentMovie.id}`}>
            <img
              src={IMAGE_BASE_URL + currentMovie.backdrop_path}
              alt={currentMovie.title || currentMovie.name}
              className="w-full h-full object-cover z-10"
              style={{ border: "2px solid transparent" }}
            />
            {/* Gradient Overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent z-20"></div>
          </Link>
        </div>
      </div>

      {/* Dots positioned below the slider */}
      <div className="hidden sm:flex justify-center items-center py-1.5 sm:py-2 md:py-3 gap-1 sm:gap-1.5">
        {movieList.map((_, index) => (
          <button
            key={index}
            className={`w-[1.5px] h-[1.5px] sm:w-[2px] sm:h-[2px] md:w-[3px] md:h-[3px] lg:w-[4px] lg:h-[4px]
 rounded-full transition-all duration-300 touch-manipulation ${
   index === currentIndex
     ? "bg-white scale-110 sm:scale-125 md:scale-150"
     : "bg-white bg-opacity-50 hover:bg-opacity-75"
 }`}
            onClick={() => setCurrentIndex(index)}
          />
        ))}
      </div>
    </div>
  );
}

export default Slider;
