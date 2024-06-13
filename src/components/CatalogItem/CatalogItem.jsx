const CatalogItem = ({ car }) => {
  return (
    <li>
      <img src={car.img} alt="car" width={100} />
      <p>{car.id}</p>
    </li>
  );
};

export default CatalogItem;
