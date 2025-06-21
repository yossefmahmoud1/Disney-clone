import { useEffect, useState, useRef } from "react";
import GlobalApi from "../Services/GlobalApi";
import Card from "../Components/CARD";
import { HiChevronLeft, HiChevronRight } from "react-icons/hi";
import LargesCard from "./LargesCard";
import PropTypes from "prop-types";

const Movielist = ({ id, index_i, searchQuery }) => {
  const screenFullWidth = window.innerWidth;
  const elementRef = useRef();
  const [movielist, setMovieList] = useState([]);
  const [filteredMovieList, setFilteredMovieList] = useState([]);

  useEffect(() => {
    getMoviesById();
  }, [id]);

  useEffect(() => {
    if (searchQuery) {
      const filtered = movielist.filter((movie) =>
        movie.title.toLowerCase().includes(searchQuery.toLowerCase())
      );
      setFilteredMovieList(filtered);
    } else {
      setFilteredMovieList(movielist);
    }
  }, [searchQuery, movielist]);

  const getMoviesById = () => {
    GlobalApi.getMovieByGenreId(id).then((response) => {
      setMovieList(response.data.results);
      setFilteredMovieList(response.data.results);
    });
  };

  const sliderRight = (element) => {
    element.scrollLeft += screenFullWidth - 110;
  };

  const sliderLeft = (element) => {
    element.scrollLeft -= screenFullWidth - 110;
  };

  return (
    <div className="relative w-full overflow-hidden">
      <HiChevronLeft
        className="hidden md:block text-white text-[40px] absolute 
                   left-2 top-1/2 transform -translate-y-1/2 
                   cursor-pointer z-10 bg-gray-800/70 p-2 rounded-full hover:bg-gray-700/70"
        onClick={() => sliderLeft(elementRef.current)}
      />

      <HiChevronRight
        className="hidden md:block text-white text-[40px] absolute 
                   right-2 top-1/2 transform -translate-y-1/2 
                   cursor-pointer z-10 bg-gray-800/70 p-2 rounded-full hover:bg-gray-700/70"
        onClick={() => sliderRight(elementRef.current)}
      />

      <div
        className="flex gap-3 sm:gap-4 md:gap-6 overflow-x-auto scrollbar-hide movie-list-scroll pt-3 sm:pt-4 md:pt-5 px-8 md:px-12 pb-6 sm:pb-8 md:pb-10 scroll-smooth max-w-full"
        ref={elementRef}
      >
        {filteredMovieList.map((movie, index) => (
          <div key={index} className="flex-shrink-0">
            {index_i % 3 === 0 ? (
              <LargesCard movie={movie} />
            ) : (
              <Card movie={movie} />
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

Movielist.propTypes = {
  id: PropTypes.number.isRequired,
  index_i: PropTypes.number.isRequired,
  searchQuery: PropTypes.string,
};

Movielist.defaultProps = {
  searchQuery: "",
};

export default Movielist;
