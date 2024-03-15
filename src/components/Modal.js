import React, { useRef, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import { addProduct } from "../apis/getProduct";
const Modal = ({ toggle }) => {
  const form = useRef();
  const handleSubmit = (e) => {
    e.preventDefault();
    const data = {
      title: form.current.title.value,
      description: form.current.description.value,
      price: form.current.price.value,
      discountPercentage: form.current.discountPercentage.value,
      rating: form.current.rating.value,
      stock: form.current.stock.value,
      brand: form.current.brand.value,
      category: form.current.category.value,
      thumbnail: form.current.thumbnail.value,
    };

    addProduct(data)
      .then((res) => {
        toast.success("Product Added");
     
        console.log(res.data);
        toggle(false);
      })
      .catch((err) => {
        toast.error("Somthing went wrong! Try again.");
        console.log(err);
        form.current.reset();
        form.current.title.focus();
      });
  };

  return (
    <div className="h-screen w-full overflow-y-scroll">
      <div class="bg-white border h-full w-full  rounded-lg shadow relative ">
        <div class="flex items-start justify-between p-5 border-b rounded-t w-full">
          <h3 class="text-xl font-semibold lg:text-start text-center w-1/2">Add product</h3>
          <button
            onClick={() => toggle(false)}
            type="button"
            class="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center"
            data-modal-toggle="product-modal"
          >
            <svg
              class="w-5 h-5"
              fill="currentColor"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fill-rule="evenodd"
                d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                clip-rule="evenodd"
              ></path>
            </svg>
          </button>
        </div>

        <div class="p-6 space-y-6 ">
          <form ref={form} onSubmit={handleSubmit}>
            <div class="grid grid-cols-6 gap-6">
              <div class="col-span-6 sm:col-span-3">
                <label
                  for="product-name"
                  class="text-sm  font-medium text-gray-900 block mb-2"
                >
                  Product Name
                </label>
                <input
                  type="text"
                  name="title"
                  id="product-name"
                  class="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-cyan-600 focus:border-cyan-600 block w-full p-2.5"
                  placeholder="Apple Imac 27”"
                  required
                />
              </div>
              <div class="col-span-6 sm:col-span-3">
                <label
                  for="category"
                  class="text-sm font-medium text-gray-900 block mb-2"
                >
                  Category
                </label>
                <input
                  type="text"
                  name="category"
                  id="category"
                  class="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-cyan-600 focus:border-cyan-600 block w-full p-2.5"
                  placeholder="Electronics"
                  required
                />
              </div>
              <div class="col-span-6 sm:col-span-3">
                <label
                  for="brand"
                  class="text-sm font-medium text-gray-900 block mb-2"
                >
                  Brand
                </label>
                <input
                  type="text"
                  name="brand"
                  id="brand"
                  class="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-cyan-600 focus:border-cyan-600 block w-full p-2.5"
                  placeholder="Apple"
                  required
                />
              </div>
              <div class="col-span-6 sm:col-span-3">
                <label
                  for="price"
                  class="text-sm font-medium text-gray-900 block mb-2"
                >
                  Price
                </label>
                <input
                  type="number"
                  name="price"
                  id="price"
                  class="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-cyan-600 focus:border-cyan-600 block w-full p-2.5"
                  placeholder="$2300"
                  required
                />
              </div>
              <div class="col-span-6 sm:col-span-3">
                <label
                  for="discountPercentage"
                  class="text-sm font-medium text-gray-900 block mb-2"
                >
                  Discount Percentage
                </label>
                <input
                  type="text"
                  name="discountPercentage"
                  id="discountPercentage"
                  class="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-cyan-600 focus:border-cyan-600 block w-full p-2.5"
                  placeholder="10%"
                  required
                />
              </div>
              <div class="col-span-6 sm:col-span-3">
                <label
                  for="stock"
                  class="text-sm font-medium text-gray-900 block mb-2"
                >
                  Stock
                </label>
                <input
                  type="number"
                  name="stock"
                  id="stock"
                  class="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-cyan-600 focus:border-cyan-600 block w-full p-2.5"
                  placeholder="40"
                  required
                />
              </div>
              <div class="col-span-6 sm:col-span-3">
                <label
                  for="rating"
                  class="text-sm font-medium text-gray-900 block mb-2"
                >
                  Rating
                </label>
                <input
                  max={5}
                  min={1}
                  type="number"
                  name="rating"
                  id="rating"
                  class="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-cyan-600 focus:border-cyan-600 block w-full p-2.5"
                  placeholder="4.5"
                  required
                />
              </div>
              <div class="col-span-6 sm:col-span-3">
                <label
                  for="thumbnail"
                  class="text-sm font-medium text-gray-900 block mb-2"
                >
                  Thumbnail
                </label>
                <input
                  accept="image/png, image/gif, image/jpeg"
                  type="file"
                  name="thumbnail"
                  id="thumbnail"
                  class="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-cyan-600 focus:border-cyan-600 block w-full p-2.5"
                  required
                />
              </div>
              <div class="col-span-full">
                <label
                  for="product-details"
                  class="text-sm font-medium text-gray-900 block mb-2"
                >
                  Product Details
                </label>
                <textarea
                  name="description"
                  id="product-details"
                  rows="3"
                  class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-cyan-600 focus:border-cyan-600 block w-full p-4"
                  placeholder="Details"
                ></textarea>
              </div>
            </div>
            <div class="py-6 border-t border-gray-200 rounded-b flex justify-start items-center gap-5">
              <button
                class="text-white bg-cyan-600 hover:bg-cyan-700 focus:ring-4 focus:ring-cyan-200 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
                type="submit"
              >
                Save
              </button>
              <button
                class=" text-white bg-red-500 hover:bg-red-700 focus:ring-4 focus:ring-red-200 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
                type="reset"
              >
                Reset
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Modal;
