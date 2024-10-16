import axios from "axios";
import { useRouter } from "next/router";
import React, { useState } from "react";

const ProductForm = ({
  _id,
  title: existingTitle,
  description: existingDescription,
  price: existingPrice,
  images: existingImages,
}) => {
  const [title, setTitle] = useState(existingTitle || "");
  const [description, setDescription] = useState(existingDescription || "");
  const [price, setPrice] = useState(existingPrice || "");
  const [goToProducts, setGoToProducts] = useState(false);
  const [images, setImages] = useState(existingImages || []);

  const router = useRouter();

  const createProduct = async (ev) => {
    ev.preventDefault();
    const data = { title, description, price , images};
    try {
      if (_id) {
        //Update Product
        await axios.put("/api/products", { ...data, _id });
      } else {
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

  const handleImagesUpload = async (ev) => {
    const files = ev.target?.files;
    if (files?.length > 0) {
      const data = new FormData();
      for(const file of files){
        data?.append('file', file)
      }
      const res = await axios.post('/api/upload', data);
      console.log('res', res.data);
      setImages(oldImages => {
        return [...oldImages, ...res.data.links];
      })
    }
  };

  

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
        <div className="flex flex-wrap gap-2">
          <label htmlFor="">Photos</label>
          {!!images?.length && images?.map(link => (
            <div key={link} className="h-24">
              <img src={link} alt="" className="rounded-lg" />
            </div>
          ))}
          <label className="w-24 h-24 flex items-center justify-center text-sm text-gray-500 bg-gray-300 cursor-pointer">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke-width="1.5"
              stroke="currentColor"
              class="size-6"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M3 16.5v2.25A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75V16.5m-13.5-9L12 3m0 0 4.5 4.5M12 3v13.5"
              />
            </svg>
            Upload
            <input type="file" className="hidden" onChange={handleImagesUpload}/>
          </label>
          {!images && <div className="mt-2">No Images Found</div>}
        </div>
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
