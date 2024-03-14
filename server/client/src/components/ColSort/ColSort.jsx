import React from "react"; // Import React to use JSX
import { useDispatch, useSelector } from "react-redux";
import { setChosenSort, setChosenCategory } from "../../store/slices/productSlice";
import "./ColSort.css";

export const ColSort = ({ label }) => {
  const filterOptions = useSelector((state) => state.products.categories);
  const sortOptions=useSelector ((state)=>state.products.sorting)
  const dispatch = useDispatch();

  return (
    <>
      {label === "Filter by" && (
        <>
          <label>{label}</label>
          <select onChange={(e) => dispatch(setChosenCategory(e.target.value))}>
            {filterOptions.map((val, index) => (
              <option key={index}>{val}</option>
            ))}
          </select>
        </>
      )}
      {label === "Sort by" && (
        <>
          <label>{label}</label>
          <select onChange={(e) => dispatch(setChosenSort(e.target.value))}>
            {sortOptions.map((val, index) => (
              <option key={index}>{val}</option>
            ))}
          </select>
        </>
      )}
    </>
  );
};
