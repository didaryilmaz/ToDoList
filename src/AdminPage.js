import React, { useEffect, useState, useCallback } from "react";
import { AgGridReact } from "ag-grid-react";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-alpine.css";
import { ClientSideRowModelModule } from '@ag-grid-community/client-side-row-model';
import { ModuleRegistry } from '@ag-grid-community/core';

ModuleRegistry.registerModules([ClientSideRowModelModule]);

const AdminPage = () => {
  const [rowData, setRowData] = useState([]);

  const fetchTodos = useCallback(() => {
    fetch(`http://localhost:5103/api/ToDoList/all`)
      .then(res => res.json())
      .then(data => setRowData(data.todos))
      .catch(err => console.error("Veri çekme hatası:", err));
  }, []);

  useEffect(() => {
    fetchTodos();
  }, [fetchTodos]);

  const columnDefs = [
    { headerName: "ID", field: "id" },
    { headerName: "User ID", field: "userId" },
    { headerName: "Başlık", field: "name" },
    { headerName: "Tamamlandı", field: "isCompleted" },
  ];

  return (
    <div className="ag-theme-alpine" style={{ height: 600, width: "100%" }}>
      <AgGridReact
        rowData={rowData}
        columnDefs={columnDefs}
        pagination={true}
        paginationPageSize={20}
      />
    </div>
  );
};

export default AdminPage;
