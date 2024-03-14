import React, { useEffect } from "react";
import "./HomePage.css";
import { ProductCard } from "../../components/ProductCard/ProductCard";
import { Nav } from "../../components/Nav/Nav";
import { Sort } from "../../components/Sort/Sort";
import { useQuery } from "@tanstack/react-query";
import { getAllUniqueCategories } from "../../utils/uniqueCategory.js";
import { useDispatch, useSelector } from "react-redux";
import {
  setAllCategories,
  setAllProducts,
  setAllSort,
  setPriceRange,
} from "../../store/slices/productSlice.js";


const HomePage = () => {
  const dispatch = useDispatch();
  const productsArr = useSelector((state) => state.products.filteredProducts);


  const { isLoading, error, data } = useQuery({
    queryKey: ["repoData"],
    queryFn: async () => {
      try {
        const response = await fetch("https://store-wujf.onrender.com/getAll");
        //const response = await fetch("http://localhost:3000/getAll");
        const data = await response.json();
        dispatch(setAllProducts(data));
        dispatch(
          setAllCategories(["All Products", ...getAllUniqueCategories(data)])
        );
        dispatch(
          setAllSort(["A-Z", "Z-A", "Price: low to high", "Price: high to low"])
        );
        
       

        return data;
      } catch (error) {
        console.error("Error fetching data:", error);
        throw new Error(error.message);
      }
    },
  });

  useEffect(() => {
    // You can handle isLoading and error here if needed
  }, [isLoading, error]);

  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>{"Something went wrong..." + error.message}</p>;

  return (
    <>
      <Nav>
        <Sort />
      </Nav>

      <section className="products">
        {productsArr.map((product, index) => (
          <ProductCard product={product} key={index} />
        ))}
      </section>
    </>
  );
};

export default HomePage;
