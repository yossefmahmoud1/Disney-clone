import Slider from "../Components/Slider";
import "../App.css";
import "../index.css";
import Productsvid from "../Components/Productsvid";
import Header from "../Components/Header";
import GenraMovieslist from "../Components/GenraMovieslist";

function Home() {
  return (
    <div className="w-full overflow-hidden">
      <Header />
      <Slider />
      <Productsvid />
      <GenraMovieslist searchQuery="" />
    </div>
  );
}

export default Home;
