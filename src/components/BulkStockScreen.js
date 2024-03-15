import React, { useState, useEffect } from "react";
import { AgGridReact } from "ag-grid-react";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-alpine.css";
import { getProductCategorys } from "../apis/getProduct";

const BulkStockScreen = () => {
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
    setRowData([])
  };

  return (
    <div className="h-screen w-full p-5 flex flex-col gap-5">
      <div className="h-[5%] w-full flex justify-between items-center ">
        <h1 className="w-1/2 text-lg font-semibold  text-start pl-10">Bulk Stock</h1>
        <div className="w-1/2 flex gap-5 justify-end">
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
            className="rounded-md bg-sky-400 dark:bg-sky-800 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-sky-400/80 dark:hover:bg-sky-800/80 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black"
          >
            Save All Records
          </button>
        </div>
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
