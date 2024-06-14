import { useSelector } from "react-redux";
import { selectCars } from "../../redux/selectors";
import CatalogItem from "../CatalogItem/CatalogItem";
import css from "./CatalogList.module.css";
const CatalogList = () => {
  const cars = useSelector(selectCars);

  return (
    <ul className={css.list}>
      {cars.map((car) => (
        <CatalogItem key={car.id} car={car} />
      ))}
    </ul>
  );
};

export default CatalogList;
