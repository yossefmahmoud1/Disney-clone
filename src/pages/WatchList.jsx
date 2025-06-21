import Header from "../Components/Header";
import { useWatchlist } from "../context/WatchlistContext";
import { HiTrash } from "react-icons/hi";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";

const IMAGE_BASE_URL = "https://image.tmdb.org/t/p/original";

const WatchList = () => {
  const { watchlist, removeFromWatchlist } = useWatchlist();

  const handleRemove = (movieId, movieTitle) => {
    removeFromWatchlist(movieId);
    toast.success(`🕷️ Removed "${movieTitle}" from your watchlist`, {
      icon: "🎬",
    });
  };

  return (
    <div className="bg-[#0F0F23] min-h-screen w-full overflow-hidden">
      <Header />
      <div className="pt-16 sm:pt-18 md:pt-20 px-4 sm:px-6 md:px-8">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white text-center mb-6 sm:mb-8">
            My Watchlist
          </h1>

          {watchlist.length === 0 ? (
            <div className="text-center py-12 sm:py-16">
              <div className="text-gray-400 text-lg sm:text-xl mb-4">
                Your watchlist is empty
              </div>
              <p className="text-gray-500 text-sm sm:text-base mb-6">
                Start adding movies to your watchlist to see them here.
              </p>
              <Link
                to="/"
                className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-semibold transition-colors inline-block"
              >
                Browse Movies
              </Link>
            </div>
          ) : (
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-3 sm:gap-4 md:gap-6">
              {watchlist.map((movie) => (
                <div key={movie.id} className="group relative">
                  <Link to={`/movie/${movie.id}`}>
                    <div className="relative overflow-hidden rounded-lg shadow-lg">
                      <img
                        src={IMAGE_BASE_URL + movie.poster_path}
                        alt={movie.title || movie.name}
                        className="w-full h-[200px] sm:h-[250px] md:h-[300px] object-cover transition-transform duration-300 group-hover:scale-105"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                    </div>
                  </Link>

                  <div className="mt-2 sm:mt-3">
                    <h3 className="text-white font-semibold text-xs sm:text-sm line-clamp-2 group-hover:text-blue-400 transition-colors leading-tight">
                      {movie.title || movie.name}
                    </h3>
                    <p className="text-gray-400 text-xs mt-1">
                      {movie.release_date?.split("-")[0] || "N/A"}
                    </p>
                    {movie.vote_average && (
                      <div className="flex items-center gap-1 mt-1">
                        <span className="text-yellow-400 text-xs">★</span>
                        <span className="text-gray-300 text-xs">
                          {(movie.vote_average / 2).toFixed(1)}
                        </span>
                      </div>
                    )}
                  </div>

                  <button
                    onClick={() =>
                      handleRemove(movie.id, movie.title || movie.name)
                    }
                    className="absolute top-1 right-1 sm:top-2 sm:right-2 bg-red-600 hover:bg-red-700 text-white 
             p-1 sm:p-2 rounded-full transition-colors opacity-0 group-hover:opacity-100 
             flex items-center justify-center"
                    title="Remove from watchlist"
                  >
                    <HiTrash className="w-3 h-3 sm:w-4 sm:h-4" />
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default WatchList;
