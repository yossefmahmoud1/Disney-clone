import Header from "../Components/Header";
import GenraMovieslist from "../Components/GenraMovieslist";

const Series = () => {
  return (
    <div className="bg-[#0F0F23] min-h-screen w-full overflow-hidden">
      <Header />
      <div className="pt-16 sm:pt-18 md:pt-20">
        <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white text-center mb-6 sm:mb-8">
          Series
        </h1>
        <GenraMovieslist searchQuery="" />
      </div>
    </div>
  );
};

export default Series;
