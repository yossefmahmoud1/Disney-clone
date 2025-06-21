import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import Header from "../Components/Header";
import LoadingSpinner from "../Components/LoadingSpinner";
import { HiMagnifyingGlass } from "react-icons/hi2";
import { Link } from "react-router-dom";

const IMAGE_BASE_URL = "https://image.tmdb.org/t/p/original";

const SearchResults = () => {
  const [searchParams] = useSearchParams();
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const query = searchParams.get("q");

  useEffect(() => {
    if (query) {
      searchMovies(query);
    }
  }, [query]);

  const searchMovies = async (searchQuery) => {
    setLoading(true);
    setError(null);

    try {
      // Search in multiple movie lists to get comprehensive results
      const response = await fetch(
        `https://api.themoviedb.org/3/search/movie?api_key=a631be1c3c673d45550392525bfc6ba1&query=${encodeURIComponent(searchQuery)}&page=1`
      );

      if (!response.ok) {
        throw new Error("Failed to fetch search results");
      }

      const data = await response.json();
      console.log("Search results:", data);

      if (data.results && data.results.length > 0) {
        // Filter movies with poster images
        const moviesWithPosters = data.results.filter(
          (movie) => movie.poster_path
        );
        setResults(moviesWithPosters);
      } else {
        setResults([]);
      }
    } catch (err) {
      console.error("Search error:", err);
      setError("Failed to search for movies. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="bg-[#0F0F23] min-h-screen">
        <Header />
        <div className="pt-20 flex items-center justify-center">
          <div className="flex flex-col items-center gap-4">
            <LoadingSpinner size="large" color="white" />
            <div className="text-white text-lg">Searching for movies...</div>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-[#0F0F23] min-h-screen">
        <Header />
        <div className="pt-20 flex items-center justify-center">
          <div className="text-center">
            <div className="text-red-400 text-xl mb-4">{error}</div>
            <button
              onClick={() => searchMovies(query)}
              className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded"
            >
              Try Again
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-[#0F0F23] min-h-screen w-full overflow-hidden">
      <Header />
      <div className="pt-16 sm:pt-18 md:pt-20 px-4 sm:px-6 md:px-8">
        <div className="max-w-7xl mx-auto">
          {/* Search Header */}
          <div className="mb-6 sm:mb-8">
            <div className="flex items-center gap-2 sm:gap-3 mb-3 sm:mb-4">
              <HiMagnifyingGlass className="text-white text-xl sm:text-2xl" />
              <h1 className="text-2xl sm:text-3xl font-bold text-white">
                Search Results
              </h1>
            </div>
            <p className="text-gray-300 text-sm sm:text-base">
              {results.length > 0
                ? `Found ${results.length} movie${results.length === 1 ? "" : "s"} for "${query}"`
                : `No movies found for "${query}"`}
            </p>
          </div>

          {/* Results Grid */}
          {results.length > 0 ? (
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-3 sm:gap-4 md:gap-6">
              {results.map((movie) => (
                <Link key={movie.id} to={`/movie/${movie.id}`}>
                  <div className="group cursor-pointer">
                    <div className="relative overflow-hidden rounded-lg shadow-lg">
                      <img
                        src={IMAGE_BASE_URL + movie.poster_path}
                        alt={movie.title}
                        className="w-full h-[200px] sm:h-[250px] md:h-[300px] object-cover transition-transform duration-300 group-hover:scale-105"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                    </div>
                    <div className="mt-2 sm:mt-3">
                      <h3 className="text-white font-semibold text-xs sm:text-sm line-clamp-2 group-hover:text-blue-400 transition-colors leading-tight">
                        {movie.title}
                      </h3>
                      <p className="text-gray-400 text-xs mt-1">
                        {movie.release_date?.split("-")[0] || "N/A"}
                      </p>
                      {movie.vote_average && (
                        <div className="flex items-center gap-1 mt-1">
                          <span className="text-yellow-400 text-xs">★</span>
                          <span className="text-gray-300 text-xs">
                            {movie.vote_average.toFixed(1)}
                          </span>
                        </div>
                      )}
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          ) : (
            <div className="text-center py-12 sm:py-16">
              <div className="text-gray-400 text-lg sm:text-xl mb-4">
                No movies found for &quot;{query}&quot;
              </div>
              <p className="text-gray-500 text-sm sm:text-base">
                Try searching for a different movie or check your spelling.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default SearchResults;
