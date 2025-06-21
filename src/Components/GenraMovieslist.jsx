import Genralist from "../Constatnt/GenralList";
import Movielist from "./Movielist";
import PropTypes from "prop-types";

const GenraMovieslist = ({ searchQuery }) => {
  return (
    <div className="w-full overflow-hidden">
      {Genralist.genere.map(
        (genra, index) =>
          index <= 4 && (
            <div
              key={`genre-${genra.id}-${index}`}
              className="p-4 sm:p-6 md:p-8 w-full overflow-hidden"
            >
              <h2 className="text-[20px] text-white font-bold mb-4">
                {genra.name}
              </h2>
              <Movielist
                key={`movielist-${genra.id}-${index}`}
                index_i={index}
                id={genra.id}
                searchQuery={searchQuery}
              />
            </div>
          )
      )}
    </div>
  );
};

GenraMovieslist.propTypes = {
  searchQuery: PropTypes.string.isRequired,
};

export default GenraMovieslist;
