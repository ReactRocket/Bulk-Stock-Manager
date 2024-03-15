import React, { useState, useEffect } from "react";
import { AgGridReact } from "ag-grid-react";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-alpine.css";
import { getProductCategorys } from "../apis/getProduct";

const BulkStockScreen = ({ toggle }) => {
  // State for grid data
  const [categoryList, setCategoryList] = useState([]);
  const [rowData, setRowData] = useState([]);

  useEffect(() => {
    getProductCategorys().then((res) => setCategoryList(res.data));
  }, [rowData]);

  // Ag-Grid column definitions
  const columnDefs = [
    { headerName: "Product No", field: "productNo", editable: false },
    { headerName: "Product Code", field: "productCode", editable: true },
    { headerName: "Product Name", field: "productName", editable: true },
    { headerName: "Quantity", field: "quantity", editable: true },
    { headerName: "Location", field: "location", editable: true },
    {
      headerName: "Product Category",
      field: "productCategory",
      editable: true,
      cellEditor: "agSelectCellEditor",
      cellEditorParams: { values: categoryList },
    },
  ];

  // Ag-Grid default column definition
  const defaultColDef = {
    flex: 1,
    minWidth: 150,
    resizable: true,
    editable: true,
  };

  // Function to add a new record to the grid
  const addNewRecord = () => {
    const newItem = { productNo: rowData.length + 1 };
    setRowData([...rowData, newItem]);
  };

  // Function to handle saving all records
  const saveAllRecords = () => {
    console.log(JSON.stringify(rowData));
    setRowData([]);
  };

  return (
    <div className="h-screen w-full p-5 flex flex-col gap-5">
      <div className="min-h-[5%] w-full flex  justify-center lg:justify-between lg:flex-row flex-col items-center gap-2 ">
        <h1 className="lg:w-1/2 w-full text-lg font-semibold text-center lg:text-start pl-10">
          Bulk Stock{" "}
        </h1>
        <div className="lg:w-1/2 w-full flex gap-5 justify-center lg:justify-end pr-14">
          <button
            onClick={addNewRecord}
            type="button"
            className="rounded-md bg-sky-400 dark:bg-sky-800 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-sky-400/80 dark:hover:bg-sky-800/80 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black"
          >
            Add New Record
          </button>
          <button
            onClick={saveAllRecords}
            type="button"
            className="rounded-md bg-sky-400 dark:bg-sky-800 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-sky-400/80 dark:hover:bg-sky-800/80 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black text-nowrap"
          >
            Save All Records
          </button>
        </div>
        <button
          onClick={() => toggle(false)}
          type="button"
          class="fixed top-5 right-5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 px-5 ml-auto inline-flex items-center"
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
      <div className="ag-theme-alpine" style={{ height: "95%", width: "100%" }}>
        <AgGridReact
          rowData={rowData}
          columnDefs={columnDefs}
          defaultColDef={defaultColDef}
          rowSelection="multiple"
          suppressRowClickSelection={true}
        />
      </div>
    </div>
  );
};

export default BulkStockScreen;
