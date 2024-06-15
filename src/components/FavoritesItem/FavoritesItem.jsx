import clsx from "clsx";

import { deleteCars } from "../../redux/catalog/slice";
import { useState } from "react";
import { useDispatch } from "react-redux";
import css from "./FavoritesItem.module.css";
import Modal from "../Modal/Modal";
import { Icon } from "../../Icon/Icon";

const FavoritesItem = ({ car }) => {
  const dispatch = useDispatch();

  const [isOpen, setIsOpen] = useState(false);
  const [isAdd, setIsAdd] = useState(true);
  const handleOpenModal = () => {
    setIsOpen(true);
  };
  const handleCloseModal = () => {
    setIsOpen(false);
  };
  const deleteFavorites = (car) => {
    setIsAdd(!isAdd);
    dispatch(deleteCars(car));
  };
  return (
    <>
      <li key={car.id} className={css.item}>
        <div className={css.wrapper}>
          <img className={css.img} src={car.img} alt="car" />
          <button
            className={css.btnIcon}
            onClick={() => deleteFavorites(car.id)}
          >
            <Icon
              id="icon-heart"
              width={18}
              height={18}
              className={clsx(css.icon, isAdd && css.iconActive)}
            />
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
            <li className={css.infoItem}>{car.mileage}</li>
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
                <li>Mileage:{car.mileage}</li>
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

export default FavoritesItem;
