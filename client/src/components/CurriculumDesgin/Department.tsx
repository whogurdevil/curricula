import React, { useCallback, useEffect, useState } from "react";
import {
  MaterialReactTable,
  type MRT_ColumnDef,
} from "material-react-table";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import CreateNewEntityButton from "../../common/CreateNewRow";
import ExportToCsv from "../../common/ExportToCsv";
import { getAllDepartments, addDepartment } from "../../services/db";

type DepartmentData = {
  id: number;
  name: string;
  vision: string;
  mission: string;
  organization: string;
  head: string;
};

const Department = () => {
  const [selectedData, setSelectedData] = useState<DepartmentData[]>([]);
  const [tableData, setTableData] = useState<DepartmentData[]>([]);
  const [rerender, setRerender] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const departments = await getAllDepartments();
        console.log(departments)
        setSelectedData(departments.data);
        setTableData(departments.data);
      } catch (error:any) {
        console.error('Error fetching departments:', error.message);
      }
    };

    fetchData();
  }, [rerender]);

  const handleDeleteRow = useCallback(async (row: DepartmentData) => {
    try {
      if (window.confirm(`Are you sure you want to delete department ${row.name}?`)) {
        // await deleteDepartment(row.id);
        setTableData((prevData) =>
          prevData.filter((data) => data.id !== row.id)
        );
      }
    } catch (error:any) {
      console.error('Error deleting department:', error.message);
    }
  }, []);

  const handleAddDepartment = async (newData: Record<string, string>) => {
    try {
      const addedDepartment = await addDepartment(newData as unknown as DepartmentData);
      // setTableData((prevData) => [...prevData, addedDepartment]);
      setRerender((prev) => !prev);
    } catch (error:any) {
      console.error('Error adding department:', error.message);
    }
  };

  const columns: MRT_ColumnDef<DepartmentData>[] = [
    { accessorKey: "name", header: "Name", size: 50 },
    { accessorKey: "vision", header: "Vision", size: 200 },
    { accessorKey: "mission", header: "mission", size: 200 },
    { accessorKey: "organization", header: "Organization", size: 50 },
    { accessorKey: "head", header: "Head", size: 50 },
  ];

  return (
    <div className="container mx-auto px-5 max-w-fit">
      <fieldset>
        <legend className="text-3xl py-7">Departments</legend>

        <div className="flex flex-row justify-between mb-3">
          <CreateNewEntityButton
            attributes={{
              name: 'Department Name',
              vision: 'Department Vision',
              mission: 'Department mission',
              organization: 'Organization Name',
              head: 'Head',
            }}
            onSubmit={handleAddDepartment}
          />

          <ExportToCsv data={tableData} type="data" />
        </div>

        <MaterialReactTable
        
          columns={columns}
          data={tableData}
          enableEditing
          enableRowActions
          renderRowActions={({ row }) => (
            <div>
              <EditIcon onClick={() => console.log('Edit clicked')} color='success' />
              <DeleteIcon onClick={() => handleDeleteRow(row.original)} color='error' />
            </div>
          )}
        />
      </fieldset>
    </div>
  );
};

export default Department;
