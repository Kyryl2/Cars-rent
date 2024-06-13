import { useSelector } from "react-redux";
import { selectCars } from "../../redux/selectors";
import CatalogItem from "../CatalogItem/CatalogItem";

const CatalogList = () => {
  const cars = useSelector(selectCars);

  return (
    <ul>
      {cars.map((car) => (
        <CatalogItem key={car.id} car={car} />
      ))}
    </ul>
  );
};

export default CatalogList;
