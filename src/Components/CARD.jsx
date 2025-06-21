import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { HiStar, HiPlus, HiCheck } from "react-icons/hi";
import { useWatchlist } from "../context/WatchlistContext";
import { toast } from "react-toastify";

const IMAGE_BASE_URL = "https://image.tmdb.org/t/p/original";

function CARD({ movie }) {
  const { addToWatchlist, removeFromWatchlist, isInWatchlist } = useWatchlist();

  const formatRating = (rating) => {
    return (rating / 2).toFixed(1); // Convert 10-point scale to 5-point scale
  };

  const handleWatchlistToggle = (e) => {
    e.preventDefault(); // Prevent navigation
    if (isInWatchlist(movie.id)) {
      removeFromWatchlist(movie.id);
      toast.success(
        `🕷️ Removed "${movie.title || movie.name}" from your watchlist`
      );
    } else {
      addToWatchlist(movie);
      toast.success(
        `🎬 Added "${movie.title || movie.name}" to your watchlist`
      );
    }
  };

  return (
    <Link
      to={`/movie/${movie.id}`}
      className="cursor-pointer hover:scale-105 transition-all duration-300 ease-in-out group"
    >
      <div className="relative">
        <img
          src={IMAGE_BASE_URL + movie.poster_path}
          className="w-[140px] sm:w-[160px] md:w-[260px] lg:w-[320px] xl:w-[360px] h-[210px] sm:h-[240px] md:h-[380px] object-cover rounded-xl shadow-lg hover:border-[4px] border-blue-400 transition-all cursor-pointer duration-200 ease-in hover:scale-105"
          alt={movie.title || movie.name}
        />

        {/* Rating overlay */}
        <div className="absolute top-1 right-1 sm:top-2 sm:right-2 bg-black bg-opacity-70 rounded-lg px-1.5 py-0.5 sm:px-2 sm:py-1 flex items-center gap-0.5 sm:gap-1">
          <HiStar className="text-yellow-400 w-3 h-3 sm:w-4 sm:h-4" />
          <span className="text-white text-[10px] sm:text-xs font-semibold">
            {formatRating(movie.vote_average)}
          </span>
        </div>

        {/* Watchlist button */}
        <button
          onClick={handleWatchlistToggle}
          className={`absolute top-1 left-1 sm:top-2 sm:left-2 bg-black bg-opacity-70 hover:bg-opacity-90 text-white p-1.5 sm:p-2 rounded-full transition-all duration-200 opacity-0 group-hover:opacity-100 ${
            isInWatchlist(movie.id) ? "text-green-400" : "text-white"
          }`}
          title={
            isInWatchlist(movie.id)
              ? "Remove from watchlist"
              : "Add to watchlist"
          }
        >
          {isInWatchlist(movie.id) ? (
            <HiCheck className="w-3 h-3 sm:w-4 sm:h-4" />
          ) : (
            <HiPlus className="w-3 h-3 sm:w-4 sm:h-4" />
          )}
        </button>
      </div>
      <h2 className="text-white text-[11px] sm:text-xs md:text-sm lg:text-base font-semibold mt-1.5 sm:mt-2 px-1 line-clamp-2 leading-tight">
        {movie.title || movie.name}
      </h2>
    </Link>
  );
}

CARD.propTypes = {
  movie: PropTypes.shape({
    id: PropTypes.number.isRequired,
    title: PropTypes.string,
    name: PropTypes.string,
    poster_path: PropTypes.string.isRequired,
    vote_average: PropTypes.number,
  }).isRequired,
};

export default CARD;
