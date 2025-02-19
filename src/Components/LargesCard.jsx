const IMAGE_BASE_URL= "https://image.tmdb.org/t/p/original";

const LargesCard = ({movie}) => {
  return (
    <div className="  transition-all duration-150 ease-in hover:scale-110">
      <img src={IMAGE_BASE_URL+movie.backdrop_path}
      className="w-[110px] md:w-[260px] rounded-lg hover:border-[3px]   border-gray-500 cursor-pointer "
      />
      <h2 className=" w-[110px] md:w-[260px] text-white mt-2 ">{movie.title}</h2>
    </div>
  )
}

export default LargesCard
