import { useState } from "react";
import Modal from "../Modal/Modal";
import css from "./CatalogItem.module.css";
import icons from "../icon.svg";

import clsx from "clsx";
import { useDispatch, useSelector } from "react-redux";
import { addCars, deleteCars } from "../../redux/catalog/slice";
import { selectFavorites } from "../../redux/catalog/selectors";

const CatalogItem = ({ car }) => {
  const dispatch = useDispatch();
  const favorites = useSelector(selectFavorites);

  const [isOpen, setIsOpen] = useState(false);

  const [isFavorite, setIsFavorite] = useState(
    favorites.some((item) => item.id === car.id)
  );

  const handleOpenModal = () => {
    setIsOpen(true);
  };

  const handleCloseModal = () => {
    setIsOpen(false);
  };

  const addFavorites = (car) => {
    if (isFavorite) {
      dispatch(deleteCars(car.id));
    } else {
      dispatch(addCars(car));
    }
    setIsFavorite(!isFavorite);
  };

  return (
    <>
      <li key={car.id} className={css.item}>
        <div className={css.wrapper}>
          <img className={css.img} src={car.img} alt="car" />
          <button className={css.btnIcon} onClick={() => addFavorites(car)}>
            {/* <svg
              width="18"
              height="16"
              viewBox="0 0 18 16"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M15.63 2.4575C15.2469 2.07425 14.7921 1.77023 14.2915 1.56281C13.7909 1.35539 13.2543 1.24863 12.7125 1.24863C12.1706 1.24863 11.634 1.35539 11.1334 1.56281C10.6329 1.77023 10.178 2.07425 9.79497 2.4575L8.99997 3.2525L8.20497 2.4575C7.4312 1.68373 6.38174 1.24903 5.28747 1.24903C4.19319 1.24903 3.14374 1.68373 2.36997 2.4575C1.5962 3.23127 1.1615 4.28072 1.1615 5.375C1.1615 6.46927 1.5962 7.51873 2.36997 8.2925L3.16497 9.0875L8.99997 14.9225L14.835 9.0875L15.63 8.2925C16.0132 7.90943 16.3172 7.45461 16.5247 6.95401C16.7321 6.45342 16.8388 5.91686 16.8388 5.375C16.8388 4.83313 16.7321 4.29657 16.5247 3.79598C16.3172 3.29539 16.0132 2.84056 15.63 2.4575Z"
                className={clsx(css.icon, isFavorite && css.iconActive)}
              />
            </svg> */}
            <svg
              className={clsx(css.icon, isFavorite && css.iconActive)}
              width="18"
              height="16"
            >
              <use href={`${icons}#icon-heart`}></use>
            </svg>
          </button>
        </div>
        <div className={css.text}>
          <div className={css.titleContainer}>
            <div>
              {car.make},{car.year}
            </div>
            <div>{car.rentalPrice}</div>
          </div>
          <p className={css.address}>{car.address}</p>

          <ul className={css.description}>
            <li className={css.infoItem}>{car.rentalCompany}</li>
            <li className={css.infoItem}>{car.type}</li>
            <li className={css.infoItem}>{car.model}</li>
            <li className={css.infoItem}>{car.id}</li>
          </ul>
        </div>
        <button className={css.btnLearnMore} onClick={handleOpenModal}>
          Learn More
        </button>
      </li>
      {isOpen && (
        <Modal onClose={handleCloseModal}>
          <div className={css.modalWrapper}>
            <img src={car.img} alt="car" className={css.modalImage} />
          </div>
          <div className={css.modalDescription}>
            <div>
              <h2>
                {car.make}
                <span className={css.span}>{car.model}</span>, {car.year}
              </h2>
            </div>
            <div>
              <p className={css.address}>{car.address}</p>
              <ul className={css.description}>
                <li className={css.infoItem}>Id:{car.id}</li>
                <li className={css.infoItem}>Year:{car.year}</li>
                <li className={css.infoItem}>Type:{car.type}</li>
                <li className={css.infoItem}>
                  Fuel Consumption:{car.fuelConsumption}
                </li>
                <li className={css.infoItem}>Engine Size:{car.engineSize}</li>
              </ul>
              <p>{car.description}</p>
            </div>
            <div>
              <p>Accessories and functionalities:</p>
              <ul className={css.description}>
                {car.accessories.map((item) => (
                  <li className={css.infoItem} key={item.id}>
                    {item}
                  </li>
                ))}
                {car.functionalities.map((item) => (
                  <li className={css.infoItem} key={item.id}>
                    {item}
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <p>Rental Conditions: </p>
              <ul>
                <li>{car.rentalConditions}</li>
                <li>Mileage:{car.mileage / 1000}</li>
                <li>Price:{car.rentalPrice}</li>
              </ul>
            </div>
            <a href="tel:+380730000000" className={css.call}>
              <button className={css.rentBtn}>Rental car</button>
            </a>
          </div>
        </Modal>
      )}
    </>
  );
};

export default CatalogItem;
