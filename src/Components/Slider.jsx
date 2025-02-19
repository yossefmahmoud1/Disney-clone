import { useEffect, useRef, useState } from "react";
import GlobalApi from "../Services/GlobalApi";
import { HiChevronLeft,HiChevronRight  } from "react-icons/hi";
const IMAGE_BASE_URL= "https://image.tmdb.org/t/p/original";


function Slider() {
const screenfullwidth=window.innerWidth
const [Movielist,setMovielist]=useState([])
const element_refrennce=useRef()
    
useEffect(() => {
    fetchDisneyMovies();
}, []);

const sliderRight=(element)=>{
    element.scrollLeft+=screenfullwidth-110
}
const sliderleft=(element)=>{
    element.scrollLeft-=screenfullwidth-110

}

const fetchDisneyMovies = () => {
    GlobalApi.getDisneyMovies()
        .then(response => {
            setMovielist(response.data.results);
        })
        .catch(error => {
            console.error("Error fetching Disney movies:", error);
        });
};

 


    return (
        <div>
        <HiChevronLeft className="hidden md:block text-white text-[30px] absolute
        mx-8 mt-[150px] cursor-pointer " onClick={()=>sliderleft(element_refrennce.current)}
        />
        <HiChevronRight className='hidden md:block text-white text-[30px] absolute
        mx-8 mt-[150px] cursor-pointer right-0' onClick={()=>sliderRight(element_refrennce.current) }
        />

   
    <div className='flex overflow-x-auto w-full px-16 py-4
    scrollbar-hide scroll-smooth 'ref={element_refrennce} > 
        {Movielist.map((movie,index)=>(
            <img key={index} src={IMAGE_BASE_URL + movie.backdrop_path}
            className='min-w-full  md:h-[310px] aspect-ratio 
            object-left-top mr-5 rounded-md hover:border-[4px]
            border-gray-400 transition-all duration-100 ease-in'/>
        ))}
    </div>
    </div>
    );
    
}

export default Slider;
