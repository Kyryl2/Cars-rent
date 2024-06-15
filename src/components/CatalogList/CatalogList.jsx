import { useEffect, useState, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchCars } from "../../redux/catalog/operations";
import { selectCars, selectIsLoading } from "../../redux/catalog/selectors";
import CatalogItem from "../CatalogItem/CatalogItem";
import css from "./CatalogList.module.css";
import { Hearts } from "react-loader-spinner";

const CatalogList = () => {
  const [page, setPage] = useState(() => {
    const savedPage = localStorage.getItem("page");
    return savedPage ? Number(savedPage) : 1;
  });

  const [selectedMake, setSelectedMake] = useState("");
  const [selectedPriceRange, setSelectedPriceRange] = useState([0, 1000]);
  const [mileageRange, setMileageRange] = useState([0, 10000]);
  const [filteredCars, setFilteredCars] = useState([]);

  const dispatch = useDispatch();
  const cars = useSelector(selectCars);
  const loading = useSelector(selectIsLoading);
  const listRef = useRef(null);

  useEffect(() => {
    if (page === 1) {
      dispatch(fetchCars(page));
    }
  }, [dispatch]);

  useEffect(() => {
    if (page > 1) {
      const currentHeight = listRef.current.scrollHeight;
      window.scrollTo({
        top: currentHeight,
        behavior: "smooth",
      });
    }
  }, [cars]);

  const loadMore = () => {
    const newPage = page + 1;
    setPage(newPage);
    dispatch(fetchCars(newPage));
  };

  useEffect(() => {
    localStorage.setItem("page", page);
  }, [page]);

  const handleMakeChange = (e) => {
    setSelectedMake(e.target.value);
  };

  const handlePriceRangeChange = (e) => {
    const [min, max] = e.target.value.split("-").map(Number);
    setSelectedPriceRange([min, max]);
  };

  const handleMileageRangeChange = (e) => {
    const { value, dataset } = e.target;
    setMileageRange((prev) => {
      const newRange = [...prev];
      newRange[dataset.index] = Number(value);
      return newRange;
    });
  };

  const handleSearch = () => {
    const filtered = cars.filter((car) => {
      const carPrice = parseInt(car.rentalPrice.replace("$", ""), 10);
      return (
        (!selectedMake || car.make === selectedMake) &&
        carPrice >= selectedPriceRange[0] &&
        carPrice <= selectedPriceRange[1] &&
        car.mileage >= mileageRange[0] &&
        car.mileage <= mileageRange[1]
      );
    });
    setFilteredCars(filtered);
  };

  const uniqueMakes = [...new Set(cars?.map((car) => car.make))];

  return (
    <>
      <div className={css.filters}>
        <div className={css.lable}>
          <label className={css.label}>Car brand</label>
          <select
            value={selectedMake}
            onChange={handleMakeChange}
            className={css.selectMake}
          >
            <option value="">All Makes</option>
            {uniqueMakes.map((make) => (
              <option key={make} value={make}>
                {make}
              </option>
            ))}
          </select>
        </div>

        <div className={css.priceFilter}>
          <div className={css.lable}>
            <label className={css.label}>Price/ 1 hour</label>
            <select onChange={handlePriceRangeChange} className={css.select}>
              <option value="">To $</option>
              <option value="0-1000">$All</option>
              <option value="0-10">$0 - $10</option>
              <option value="10-20">$10 - $20</option>
              <option value="20-30">$20 - $30</option>
              <option value="30-40">$30 - $40</option>
              <option value="40-50">$40 - $50</option>
              <option value="50-60">$50 - $60</option>
              <option value="60-70">$60 - $70</option>
              <option value="70-80">$70 - $80</option>
              <option value="80-90">$80 - $90</option>
              <option value="90-100">$90 - $100</option>
              <option value="100-1000">$100+</option>
            </select>
          </div>
        </div>

        <div>
          <div className={css.lable}>
            <label className={css.label}>Сar mileage / km</label>
            <div className={css.mileageFilter}>
              <input
                type="number"
                className={css.inputFrom}
                data-index="0"
                value={mileageRange[0]}
                onChange={handleMileageRangeChange}
                min="0"
                step="1000"
              />

              <input
                type="number"
                data-index="1"
                className={css.inputTo}
                value={mileageRange[1]}
                onChange={handleMileageRangeChange}
                min="0"
                step="1000"
              />
            </div>
          </div>
        </div>

        <button onClick={handleSearch} className={css.searchButton}>
          Search
        </button>
      </div>

      {loading ? (
        <Hearts
          height="80"
          width="80"
          color="#4fa94d"
          ariaLabel="hearts-loading"
          wrapperStyle={{}}
          wrapperClass=""
          visible={true}
        />
      ) : (
        <ul ref={listRef} className={css.list}>
          {(filteredCars.length > 0 ? filteredCars : cars)?.map(
            (car, index) => (
              <CatalogItem key={`${car.id}-${index}`} car={car} />
            )
          )}
        </ul>
      )}

      {page < 3 && (
        <button onClick={loadMore} className={css.loadMoreButton}>
          Load More
        </button>
      )}
    </>
  );
};

export default CatalogList;
