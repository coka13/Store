import { ColSort } from "../ColSort/ColSort";
import "./Sort.css";
import CustomSlider from "../CustomSlider/CustomSlider";
import { useDispatch, useSelector } from "react-redux";
import { setPriceRange } from "../../store/slices/productSlice";
import { useEffect, useState } from "react";

export const Sort = () => {
  const dispatch = useDispatch();
  const {maxPrice} = useSelector((state) => state.products);
  const [value,setValue]= useState([0,maxPrice])
  const handleChange = (_,newValue) => {
    setValue(newValue)
  };
  useEffect(()=>{
    dispatch(setPriceRange(value));
  },[value])
  return (
    <div className="sort">
      <div className="collection-sort">
        <ColSort label={"Filter by"} />
      </div>
      <div className="rangePrice">
      <label>Filter by price range</label>
      <CustomSlider maxPrice={maxPrice} value={value} onChange={handleChange} sign={'$'} />
      </div>

      <div className="collection-sort">
        <ColSort label={"Sort by"} />
      </div>
     
    </div>
  );
};


