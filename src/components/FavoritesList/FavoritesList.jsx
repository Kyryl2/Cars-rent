import { useSelector } from "react-redux";
import { selectFavorites } from "../../redux/catalog/selectors";

import css from "./FavoritesList.module.css";
import FavoritesItem from "../FavoritesItem/FavoritesItem";

const FavoritesList = () => {
  const favorites = useSelector(selectFavorites);
  console.log(favorites);

  return (
    <>
      <ul className={css.list}>
        {favorites.map((car) => (
          <FavoritesItem key={car.id} car={car} />
        ))}
      </ul>
    </>
  );
};

export default FavoritesList;
