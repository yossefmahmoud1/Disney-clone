const IMAGE_BASE_URL= "https://image.tmdb.org/t/p/original";

const CARD = ({movie}) => {
  return (
    <>
      <img src={IMAGE_BASE_URL+movie.poster_path}
      className="w-[110px] md:w-[200px] rounded-lg hover:border-[3px] border-gray-500 transition-all cursor-pointer duration-150 ease-in hover:scale-110"
      />
    </>
  )
}

export default CARD
