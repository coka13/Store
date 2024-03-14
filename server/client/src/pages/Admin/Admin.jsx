import React, { useEffect } from "react";
import CustomTable from "../../components/CustomTable/CustomTable";
import { useDispatch, useSelector } from "react-redux";
import { useQuery } from "@tanstack/react-query";
import { setAllProducts, setEditedItem, setNewItem } from "../../store/slices/productSlice";
import { Nav } from "../../components/Nav/Nav";
import AddIcon from '@mui/icons-material/Add';
import CustomModal from "../../components/CustomModal/CustomModal";
import './Admin.css'
export const Admin = () => {
  const allProducts = useSelector((state) => state.products.products);
  const dispatch = useDispatch();

  const { isLoading, error, data } = useQuery({
    queryKey: ["repoData"],
    queryFn: async () => {
      try {
        const response = await fetch("http://localhost:3000");
        const data = await response.json();
        dispatch(setAllProducts(data));
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

  const handleDelete = async (itemID) => {
    try {
      const response = await fetch(
        `http://localhost:3000/deleteItem/${itemID}`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (response.ok) {
        console.log("Item deleted successfully");
        // Fetch updated list of products and dispatch the action to set all products

        dispatch(setAllProducts(allProducts.filter((p) => p._id != itemID)));
      } else {
        console.error("Failed to delete item:", response.statusText);
      }
    } catch (error) {
      console.error("An error occurred while deleting item:", error.message);
    }
  };

  const handleEdit = async (formData, itemID) => {
    try {
      const response = await fetch(
        `http://localhost:3000/updateItem/${itemID}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        }
      );

      if (response.ok) {
        const data = await response.json();
        console.log("Product updated successfully");

        dispatch(setEditedItem(data));
      } else {
        console.error("Failed to update product:", response.statusText);
        // Handle failure, if needed
      }
    } catch (error) {
      console.error("An error occurred while updating product:", error.message);
      // Handle error, if needed
    }
  };

  const handleNewProduct = async (formData) => {

    try {
      const response = await fetch('http://localhost:3000/AddProduct', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          // Add any other headers if required
        },
        body: JSON.stringify(formData),
      });
  
      if (!response.ok) {
        throw new Error('Failed to add new product');
      }
  
      const data = await response.json();
      // Handle the response data as needed
      dispatch(setNewItem(data))
      console.log('New product added:', data);
    } catch (error) {
      // Handle any errors that occur during the request
      console.error('Error adding new product:', error.message);
    }
  };
  

  return (
    <>
      <Nav></Nav>
      <div className="newProduct">
        <div>
          <CustomModal
            title={"Add new product"}
            fields={["title", "description", "price", "category", "image"]}
            handleAction={handleNewProduct}
            endIcon={<AddIcon />}
          />
        </div>
      </div>
      <CustomTable
        items={allProducts}
        labels={["_id", "title", "price", "description", "image"]}
        handleDelete={handleDelete}
        handleEdit={handleEdit}
        handleAction={handleEdit}
        fields={["title", "description", "price", "category", "image"]}
      />
    </>
  );
};

export default Admin;
