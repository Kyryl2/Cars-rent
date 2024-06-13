import clsx from "clsx";
import { NavLink } from "react-router-dom";
import css from "./Header.module.css";

const Header = () => {
  const buildLinkClass = ({ isActive }) => {
    return clsx(css.link, isActive && css.active);
  };
  return (
    <header className={css.header}>
      <NavLink className={(isActive) => buildLinkClass(isActive)} to="/">
        Home
      </NavLink>
      <NavLink className={(isActive) => buildLinkClass(isActive)} to="/catalog">
        Catalog
      </NavLink>
      <NavLink
        className={(isActive) => buildLinkClass(isActive)}
        to="/favorites"
      >
        Favorites
      </NavLink>
    </header>
  );
};

export default Header;
