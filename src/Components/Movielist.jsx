import { useEffect, useState, useRef } from "react";
import GlobalApi from "../Services/GlobalApi";
import Card from "../Components/CARD";
import { HiChevronLeft, HiChevronRight } from "react-icons/hi";
import LargesCard from "./LargesCard";
const Movielist = ({ id , index_i}) => {
  const screenFullWidth = window.innerWidth;
  const elementRef = useRef();
  const [movielist, setMovieList] = useState([]);

  useEffect(() => {
    getMoviesById();
  }, []);

  const getMoviesById = () => {
    GlobalApi.getMovieByGenreId(id).then((response) => {
      setMovieList(response.data.results);
    });
  };

  const sliderRight = (element) => {
    element.scrollLeft += screenFullWidth - 110;
  };

  const sliderLeft = (element) => {
    element.scrollLeft -= screenFullWidth - 110;
  };

  return (
    <div className="relative"> 
      <HiChevronLeft
        className="hidden md:block text-white text-[40px] absolute 
                   left-[-40px] top-1/2 transform -translate-y-1/2 
                   cursor-pointer z-10 bg-gray-800/70 p-2 rounded-full"
        onClick={() => sliderLeft(elementRef.current)}
      />

      <HiChevronRight
        className="hidden md:block text-white text-[40px] absolute 
                   right-[-40px] top-1/2 transform -translate-y-1/2 
                   cursor-pointer z-10 bg-gray-800/70 p-2 rounded-full"
        onClick={() => sliderRight(elementRef.current)}
      />

      <div
        className="flex gap-8 overflow-x-auto scrollbar-hide pt-5 px-3 pb-10 scroll-smooth"
        ref={elementRef}
      >
        {movielist.map((ele, index) => (
        <>
        {index_i%3===0?<LargesCard movie={ele}/>:  <Card key={index} movie={ele} />}
        </>
        ))}
      </div>
    </div>
  );
};

export default Movielist;
