//TODO: Make add button communicate with backend and fetch data to render in table

import React, { useCallback, useState } from "react";
import {
  MaterialReactTable,
  type MaterialReactTableProps,
  type MRT_ColumnDef,
} from "material-react-table";
import ExportToCsv from "../../common/ExportToCsv";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import CreateNewEntityButton from "../../common/CreateNewRow";

// Curriculum data type
type DepartmentData = {
  organization_vision: string;
  organization_mission: string;
  year: number;
  department_vision: string;
  department_mission: string;
};

// Sample data
const data: DepartmentData[] = [
  {
    organization_vision: "Doe",
    organization_mission: "261 Erdman Ford",
    year: 2012,
    department_vision: "Kentucky",
    department_mission: "https://example.com/john-details",
  },
  {
    organization_vision: "Doe",
    organization_mission: "769 Dominic Grove",
    year: 2012,
    department_vision: "Ohio",
    department_mission: "https://example.com/jane-details",
  },
  {
    organization_vision: "Doe",
    organization_mission: "566 Brakus Inlet",
    year: 2012,
    department_vision: "West Virginia",
    department_mission: "https://example.com/joe-details",
  },
  {
    organization_vision: "Vandy",
    organization_mission: "722 Emie Stream",
    year: 2012,
    department_vision: "Nebraska",
    department_mission: "https://example.com/kevin-details",
  },
  {
    organization_vision: "Rolluffs",
    organization_mission: "32188 Larkin Turnpike",
    year: 2012,
    department_vision: "Nebraska",
    department_mission: "https://example.com/joshua-details",
  },
];

const Department = () => {
  const [selectedData, setSelectedData] = useState<DepartmentData[]>(data);
  const [tableData, setTableData] = useState<DepartmentData[]>(() => data);

  // Define the columns with updated headers
  const columns: MRT_ColumnDef<DepartmentData>[] = [
    {
      accessorKey: "organization_vision",
      header: "Organization Vision",
      size: 200,
    },
    {
      accessorKey: "organization_mission",
      header: "Organization Mission",
      size: 200,
    },
    {
      accessorKey: "year",
      header: "Year",
      size: 150, // Adjusted size
    },
    {
      accessorKey: "department_vision",
      header: "Department Vision",
      size: 200,
    },
    {
      accessorKey: "department_mission",
      header: "Department Mission",
      size: 200,
    },
  ];
  const handleDeleteRow = useCallback((row: DepartmentData) => {
    if (
      window.confirm(
        `Are you sure you want to delete CO ${row.department_vision}?`
      )
    ) {
      // Filter out the deleted row
      setTableData((prevData) =>
        prevData.filter(
          (data) => data.department_vision !== row.department_vision
        )
      );
    }
  }, []);

return (
  <div>
    <fieldset>
      <legend className="text-3xl">Department Vission/Mission</legend>

      <MaterialReactTable
        columns={columns}
        data={tableData}
        editingMode="modal" // Default
        enableEditing


        enableRowActions
        renderRowActions={({ row, table }) => (
          <div>
            <EditIcon
              className='mr-4 primary'

              onClick={() => {
                table.setEditingRow(row);
              }}
              color='success'
            />
            <DeleteIcon
              onClick={() => handleDeleteRow(row.original as DepartmentData)}
              color='error'
            />
          </div>
        )}
      />
    </fieldset>
    <CreateNewEntityButton
      attributes={{
        organization_vision: 'Organization Vision',
        organization_mission: 'Organization Mission',
        year: 'Year',
        department_vision: 'Department Vision',
        department_mission: 'Department Mission',
      }}
      onSubmit={(newData) => {
        // Handle adding a new row with newData
        // You should implement this logic in your component
        // Example:
        setSelectedData([{
          organization_vision: newData.organization_vision,
          organization_mission: newData.organization_mission,
          year: parseInt(newData.year), // Convert to number if needed
          department_vision: newData.department_vision,
          department_mission: newData.department_mission,
        }]);
        setTableData((prevData) => [
          ...prevData,
          {
            organization_vision: newData.organization_vision,
            organization_mission: newData.organization_mission,
            year: parseInt(newData.year), // Convert to number if needed
            department_vision: newData.department_vision,
            department_mission: newData.department_mission,
          },
        ]);
      }}
    />

    <ExportToCsv data={data} type="data" /> {/* Export All Data */}
    {/* <ExportToCsv data={data} type="rows" /> Export All Rows */}
  </div>
);
};


export default Department;
