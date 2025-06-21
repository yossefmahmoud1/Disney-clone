import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import GlobalApi from "../Services/GlobalApi";
import Header from "../Components/Header";
import LoadingSpinner from "../Components/LoadingSpinner";
import { useWatchlist } from "../context/WatchlistContext";
import { HiPlus, HiCheck, HiStar } from "react-icons/hi";
import { toast } from "react-toastify";

const IMAGE_BASE_URL = "https://image.tmdb.org/t/p/original";

const MovieDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [movie, setMovie] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { addToWatchlist, removeFromWatchlist, isInWatchlist } = useWatchlist();

  useEffect(() => {
    fetchMovieDetails();
  }, []);

  const fetchMovieDetails = () => {
    setLoading(true);
    setError(null);

    GlobalApi.getMovieDetails(id)
      .then((response) => {
        console.log("Movie details response:", response.data);
        setMovie(response.data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching movie details:", error);
        if (error.response && error.response.status === 404) {
          setError(
            "Movie not found. It may have been removed or doesn't exist."
          );
        } else {
          setError("Failed to load movie details. Please try again.");
        }
        setLoading(false);
      });
  };

  const handleWatchlistToggle = () => {
    if (isInWatchlist(movie.id)) {
      removeFromWatchlist(movie.id);
      toast.success(
        `🕷️ Removed "${movie.title || movie.name}" from your watchlist`,
        {
          icon: "🎬",
        }
      );
    } else {
      addToWatchlist(movie);
      toast.success(
        `🎬 Added "${movie.title || movie.name}" to your watchlist`,
        {
          icon: "🕷️",
        }
      );
    }
  };

  const formatRating = (rating) => {
    return (rating / 2).toFixed(1); // Convert 10-point scale to 5-point scale
  };

  const renderStars = (rating) => {
    const fullStars = Math.floor(rating / 2);
    const hasHalfStar = rating % 2 >= 1;
    const emptyStars = 5 - fullStars - (hasHalfStar ? 1 : 0);

    return (
      <div className="flex items-center gap-1">
        {[...Array(fullStars)].map((_, i) => (
          <HiStar
            key={`full-${i}`}
            className="text-yellow-400 w-5 h-5 fill-current"
          />
        ))}
        {hasHalfStar && (
          <div className="relative">
            <HiStar className="text-gray-400 w-5 h-5" />
            <HiStar
              className="text-yellow-400 w-5 h-5 fill-current absolute top-0 left-0 overflow-hidden"
              style={{ width: "50%" }}
            />
          </div>
        )}
        {[...Array(emptyStars)].map((_, i) => (
          <HiStar key={`empty-${i}`} className="text-gray-400 w-5 h-5" />
        ))}
      </div>
    );
  };

  // Placeholder component for cast members without images
  const CastPlaceholder = ({ name }) => {
    const initials = name
      .split(" ")
      .map((word) => word[0])
      .join("")
      .toUpperCase()
      .slice(0, 2);

    return (
      <div className="rounded-full w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24 mx-auto bg-gradient-to-br from-red-500 via-purple-500 to-blue-500 flex items-center justify-center text-white font-bold text-lg sm:text-xl md:text-2xl shadow-lg">
        {initials}
      </div>
    );
  };

  if (loading) {
    return (
      <div className="text-white min-h-screen flex items-center justify-center">
        <div className="flex flex-col items-center gap-4">
          <LoadingSpinner size="large" color="white" />
          <div className="text-white text-lg">Loading movie details...</div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-white min-h-screen">
        <Header />
        <div className="flex flex-col items-center justify-center h-[calc(100vh-80px)]">
          <div className="text-center">
            <div className="text-red-400 text-2xl mb-4">⚠️ {error}</div>
            <div className="text-gray-400 mb-6">
              The movie you&apos;re looking for might not exist or has been
              removed.
            </div>
            <button
              onClick={() => navigate("/")}
              className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-semibold transition-colors"
            >
              Go Back Home
            </button>
          </div>
        </div>
      </div>
    );
  }

  if (!movie) {
    return (
      <div className="text-white min-h-screen flex items-center justify-center">
        <div className="text-white text-lg">No movie data available.</div>
      </div>
    );
  }

  return (
    <div className="text-white">
      <Header />
      <div className="relative">
        <img
          src={IMAGE_BASE_URL + movie.backdrop_path}
          className="w-full h-[200px] sm:h-[300px] md:h-auto object-cover"
        />
        <div className="absolute inset-0 bg-black opacity-50"></div>
        <div className="absolute bottom-0 left-0 p-4 sm:p-6 md:p-8">
          <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold leading-tight">
            {movie.title || movie.name || "Untitled"}
          </h1>

          {/* Rating Section */}
          <div className="flex flex-col sm:flex-row sm:items-center gap-3 sm:gap-6 mt-3 sm:mt-4">
            <div className="flex items-center gap-2 sm:gap-3">
              {renderStars(movie.vote_average)}
              <div className="flex flex-col">
                <span className="text-lg sm:text-xl md:text-2xl font-bold text-yellow-400">
                  {formatRating(movie.vote_average)}
                </span>
                <span className="text-xs sm:text-sm text-gray-300">
                  {movie.vote_count?.toLocaleString()} votes
                </span>
              </div>
            </div>

            <div className="flex flex-wrap gap-2 sm:gap-4">
              {movie.genres &&
                movie.genres.map((genre) => (
                  <span
                    key={genre.id}
                    className="bg-gray-700 px-2 py-1 rounded text-xs sm:text-sm"
                  >
                    {genre.name}
                  </span>
                ))}
            </div>
          </div>

          <button
            onClick={handleWatchlistToggle}
            className={`mt-3 sm:mt-4 flex items-center gap-2 px-3 sm:px-4 py-2 rounded-lg font-semibold transition-colors text-sm sm:text-base ${
              isInWatchlist(movie.id)
                ? "bg-green-600 hover:bg-green-700"
                : "bg-blue-600 hover:bg-blue-700"
            }`}
          >
            {isInWatchlist(movie.id) ? (
              <>
                <HiCheck className="w-4 h-4 sm:w-5 sm:h-5" />
                In Watchlist
              </>
            ) : (
              <>
                <HiPlus className="w-4 h-4 sm:w-5 sm:h-5" />
                Add to Watchlist
              </>
            )}
          </button>
        </div>
      </div>

      <div className="p-4 sm:p-6 md:p-8">
        <h2 className="text-xl sm:text-2xl font-bold mb-3 sm:mb-4">Overview</h2>
        <p className="text-base sm:text-lg md:text-xl leading-relaxed bg-gradient-to-r from-red-500 via-yellow-400 to-blue-500 bg-clip-text text-transparent">
          {movie.overview || "No story available."}
        </p>

        <h2 className="text-xl sm:text-2xl font-bold mt-6 sm:mt-8 mb-3 sm:mb-4">
          Cast & Crew
        </h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3 sm:gap-4">
          {movie.credits &&
            movie.credits.cast &&
            movie.credits.cast.slice(0, 12).map((castMember) => (
              <div key={castMember.cast_id} className="text-center">
                {castMember.profile_path ? (
                  <img
                    src={IMAGE_BASE_URL + castMember.profile_path}
                    className="rounded-full w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24 object-cover mx-auto"
                    alt={castMember.name}
                    onError={(e) => {
                      e.target.style.display = "none";
                      e.target.nextSibling.style.display = "flex";
                    }}
                  />
                ) : null}
                {!castMember.profile_path && (
                  <CastPlaceholder name={castMember.name} />
                )}
                <p className="mt-2 text-xs sm:text-sm font-medium">
                  {castMember.name}
                </p>
                <p className="text-gray-400 text-xs">{castMember.character}</p>
              </div>
            ))}
        </div>
      </div>
    </div>
  );
};

export default MovieDetails;
