/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  allProductInitialise,
  allProductSuccess,
  allProductError,
} from "../redux/slices/products.slice";
import {
  getAllProducts,
  deleteProduct,
  searchProduct,
} from "../apis/getProduct";
import Modal from "./Modal";
import BulkStockScreen from "./BulkStockScreen";

const Table = () => {
  const [modalToggle, setModalToggle] = useState(false);
  const [bulkToggle, setBulkToggle] = useState(false);
  const dispatch = useDispatch();
  const data = useSelector((state) => state.allProduct.data);

  const getData = () => {
    dispatch(allProductInitialise());
    const result = getAllProducts();
    result
      .then((product) => {
        sessionStorage.setItem(
          "all-product",
          JSON.stringify(product.data.products)
        );
        dispatch(
          allProductSuccess(JSON.parse(sessionStorage.getItem("all-product")))
        );
      })
      .catch((error) => {
        dispatch(allProductError());
      });
  };

  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this product?")) {
      const result = deleteProduct(id);
      result
        .then((res) => {
          console.log(res);
          window.alert("Deleted Successfully");
          getData();
        })
        .catch(() => {
          window.alert("Failed to delete");
        });
    }
  };

  const handleSearch = (e) => {
    if (e.target.value) {
      dispatch(allProductInitialise());

      const result = searchProduct(e.target.value);
      result
        .then((product) => {
          sessionStorage.setItem(
            "all-product",
            JSON.stringify(product.data.products)
          );
          dispatch(
            allProductSuccess(JSON.parse(sessionStorage.getItem("all-product")))
          );
        })
        .catch((err) => {
          dispatch(allProductError());
        });
    } else {
      getData();
    }
  };

  useEffect(() => {
    getData();
  }, []);
  return (
    <>
      {modalToggle ? (
        <Modal toggle={setModalToggle} />
      ) : bulkToggle ? (
        <BulkStockScreen toggle={setBulkToggle} />
      ) : (
        <section className="mx-auto h-screen w-full px-4 py-4">
          <div className="h-[10%]  flex lg:flex-row flex-col space-y-4   ">
            <div className="lg:w-1/2 w-full pl-10 flex justify-center items-center flex-col">
              <h2 className="text-lg font-semibold lg:text-start text-center w-full ">
                Products
              </h2>
              <p className="lg:block  hidden mt-1 text-sm text-black">
                This is a list of all Products. You can add new Products, edit
                or delete existing ones.
              </p>
            </div>
            <div className="lg:w-1/2 full flex justify-center items-center gap-3">
              <input
                onChange={handleSearch}
                class="flex h-10  rounded-md border border-black/30 bg-transparent px-3 py-2 text-sm placeholder:text-gray-600 focus:outline-none focus:ring-1 focus:ring-black/30 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50"
                type="email"
                placeholder="Type here to search..."
              />

              <button
                onClick={() => setModalToggle(true)}
                type="button"
                className="rounded-md bg-sky-400 dark:bg-sky-800 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-sky-400/80 dark:hover:bg-sky-800/80 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black"
              >
                Add One
              </button>
              <button
                onClick={() => setBulkToggle(true)}
                type="button"
                className="rounded-md bg-sky-400 dark:bg-sky-800 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-sky-400/80 dark:hover:bg-sky-800/80 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black"
              >
                Add Bulk
              </button>
            </div>
          </div>
          <div className=" h-[90%] mt-6 flex flex-col overflow-hidden">
            <div className="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
              <div className="inline-block min-w-full py-2 align-middle md:px-6 lg:px-8">
                <div className=" overflow-hidden border border-gray-200 md:rounded-lg">
                  <table className="min-w-full divide-y divide-gray-200 overflow-hidden">
                    <thead className=" w-full bg-gray-50">
                      <tr>
                        <th
                          scope="col"
                          className="px-4 py-3.5 text-left text-sm font-normal text-black"
                        >
                          <span>Images</span>
                        </th>
                        <th
                          scope="col"
                          className="px-4 py-3.5 text-left text-sm font-normal text-black"
                        >
                          Title
                        </th>

                        <th
                          scope="col"
                          className="px-4 py-3.5 text-left text-sm font-normal text-black"
                        >
                          Price/Unit
                        </th>

                        <th
                          scope="col"
                          className="px-4 py-3.5 text-left text-sm font-normal text-black"
                        >
                          Stock
                        </th>
                        <th
                          scope="col"
                          className="px-4 py-3.5 text-left text-sm font-normal text-black"
                        >
                          Brand
                        </th>
                        {/* <th
                      scope="col"
                      className="px-4 py-3.5 text-left text-sm font-normal text-black "
                    >
                      Description
                    </th> */}
                        <th scope="col" className="relative px-4 py-3.5">
                          <span className="sr-only">Edit</span>
                        </th>
                      </tr>
                    </thead>
                    {data?.length > 0 ? (
                      <tbody className="divide-y divide-gray-200 bg-white overflow-y-scroll">
                        {data?.map((item) => (
                          <tr key={item?.index}>
                            <td className="whitespace-nowrap px-4 py-4">
                              <div className="flex items-center">
                                <div className="h-10 w-10 flex-shrink-0">
                                  <img
                                    className="h-10 w-10 rounded-sm overflow-hidden object-contain"
                                    src={item?.images[0]}
                                    alt=""
                                  />
                                </div>
                              </div>
                            </td>
                            <td className="whitespace-nowrap px-4 py-4">
                              <div className="text-sm text-gray-900 ">
                                {item?.title}
                              </div>
                            </td>
                            <td className="whitespace-nowrap px-4 py-4">
                              <div className="text-sm text-gray-900 ">
                                ₹ {item?.price}
                              </div>
                            </td>
                            <td className="whitespace-nowrap px-4 py-4">
                              <div className="text-sm text-gray-900 ">
                                {item?.stock}
                              </div>
                            </td>
                            <td className="whitespace-nowrap px-4 py-4">
                              <div className="text-sm text-gray-900 ">
                                {item?.brand}
                              </div>
                            </td>
                            {/* <td className="whitespace-nowrap px-4 py-4">
                        <div className="text-sm text-gray-900 text-ellipsis">
                          {item?.description}
                        </div>
                      </td> */}

                            <td className="whitespace-nowrap px-4 py-4 text-right text-sm font-medium flex gap-3">
                              <button
                                onClick={() => handleDelete(item.id)}
                                className="text-black"
                              >
                                Delete
                              </button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    ) : (
                      <tbody className="h-20 w-full flex flex-col justify-center text-center items-center">
                        <h1 className="w-full text-center">No Data Found?</h1>
                      </tbody>
                    )}
                  </table>
                </div>
              </div>
            </div>
          </div>
        </section>
      )}
    </>
  );
};

export default Table;
