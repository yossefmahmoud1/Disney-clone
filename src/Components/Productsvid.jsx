import pixar from "../assets/images/pixar.png";
import starwar from "../assets/images/starwar.png";
import disney from "../assets/images/disney.png";
import marvel from "../assets/images/marvel.png";
import nationalG from "../assets/images/nationalG.png";

import starwarV from "../assets/Videos/star-wars.mp4";
import disneyV from "../assets/Videos/disney.mp4";
import marvelV from "../assets/Videos/marvel.mp4";
import nationalGeographicV from "../assets/Videos/national-geographic.mp4";
import pixarV from "../assets/Videos/pixar.mp4";

const Productsvid = () => {
  const assestslist = [
    {
      id: 1,
      image: disney,
      video: disneyV,
    },
    {
      id: 2,
      image: pixar,
      video: pixarV,
    },
    {
      id: 3,
      image: marvel,
      video: marvelV,
    },
    {
      id: 4,
      image: starwar,
      video: starwarV,
    },
    {
      id: 5,
      image: nationalG,
      video: nationalGeographicV,
    },
  ];

  return (
    <div className="py-6 sm:py-8 md:py-12">
      <h2 className="text-white text-lg sm:text-xl md:text-2xl font-bold mb-4 sm:mb-6 px-2 sm:px-4">
        Disney+ Originals
      </h2>
      <div className="flex gap-2 md:gap-5 p-2 px-5 md:px-16">
        {assestslist.map((asset, index) => (
          <div
            className="border-[2px] border-gray-600 rounded-lg hover:scale-110 transition-all duration-300 ease-in-out cursor-pointer shadow-xl shadow-gray-800 relative overflow-hidden group"
            key={index}
          >
            <video
              src={asset.video}
              autoPlay
              loop
              playsInline
              muted
              className="absolute top-0 left-0 w-full h-full rounded-md z-[0] opacity-0 group-hover:opacity-100 transition-opacity duration-300 object-cover"
            />
            <img
              src={asset.image}
              alt=""
              className="w-full h-full z-[1] opacity-100 group-hover:opacity-0 transition-opacity duration-300 relative"
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default Productsvid;
