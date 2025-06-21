import { Link } from "react-router-dom";
import PropTypes from "prop-types";

function HeaderItem({ name, Icon }) {
  const route = name ? `/${name.replace(/\s+/g, "").toLowerCase()}` : null;
  return name ? (
    <Link
      to={route}
      className="text-white flex items-center gap-2 sm:gap-3
      text-[13px] sm:text-[15px] font-semibold cursor-pointer hover:underline
      underline-offset-8 mb-1 sm:mb-2 px-2 py-1 rounded transition-colors hover:bg-white/10"
    >
      <Icon className="w-4 h-4 sm:w-5 sm:h-5" />
      <h2 className="hidden sm:block">{name}</h2>
    </Link>
  ) : (
    <div
      className="text-white flex items-center gap-2 sm:gap-3
      text-[13px] sm:text-[15px] font-semibold cursor-pointer hover:underline
      underline-offset-8 mb-1 sm:mb-2 px-2 py-1 rounded transition-colors hover:bg-white/10"
    >
      <Icon className="w-4 h-4 sm:w-5 sm:h-5" />
    </div>
  );
}

HeaderItem.propTypes = {
  name: PropTypes.string,
  Icon: PropTypes.elementType.isRequired,
};

export default HeaderItem;
