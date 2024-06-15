import { useEffect, useState, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchCars } from "../../redux/catalog/operations";
import { selectCars, selectIsLoading } from "../../redux/catalog/selectors";
import CatalogItem from "../CatalogItem/CatalogItem";
import css from "./CatalogList.module.css";
import { Hearts } from "react-loader-spinner";

const CatalogList = () => {
  const [page, setPage] = useState(2);
  const dispatch = useDispatch();
  const cars = useSelector(selectCars);
  const loading = useSelector(selectIsLoading);
  const listRef = useRef(null);

  // useEffect(() => {
  //   dispatch(fetchCars(page));
  // }, [dispatch, page]);

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
    dispatch(fetchCars(page));
    setPage((prevPage) => prevPage + 1);
  };

  return (
    <>
      {" "}
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
          {cars?.map((car, index) => (
            <CatalogItem key={`${car.id}-${index}`} car={car} />
          ))}
        </ul>
      )}
      <button onClick={loadMore} className={css.loadMoreButton}>
        Load More
      </button>
    </>
  );
};

export default CatalogList;
