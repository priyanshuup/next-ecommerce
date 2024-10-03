import axios from "axios";
import { useRouter } from "next/router";
import React, { useState } from "react";

const ProductForm = ({
    _id,
    title : existingTitle,
    description : existingDescription,
    price : existingPrice,
}) => {
    const [title, setTitle] = useState(existingTitle || "");
    const [description, setDescription] = useState(existingDescription || "");
    const [price, setPrice] = useState(existingPrice || "");
    const [goToProducts, setGoToProducts] = useState(false);
  
    const router = useRouter();
  
    const createProduct = async (ev) => {
      ev.preventDefault();
      const data = { title, description, price };
      try {
        if(_id){
            //Update Product
            await axios.put("/api/products",{...data, _id})
        }else{
            await axios.post("/api/products", data);
        }
        setGoToProducts(true);
      } catch (error) {
        console.error("Error creating product:", error);
      }
    };
  
    if (goToProducts) {
      router.push("/products");
    }
  
    return (
      <div>
          <form onSubmit={createProduct}>
            <label>Product Name</label>
            <input
              type="text"
              placeholder="Product Name"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
            <label>Description</label>
            <textarea
              placeholder="Description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            ></textarea>
            <label>Price</label>
            <input
              type="number"
              placeholder="Price"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
            />
            <button type="submit" className="btn-primary">
              Save
            </button>
          </form>
      </div>
    );
};

export default ProductForm;
