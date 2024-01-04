import React, { useCallback, useMemo, useState } from "react";
import {
  MaterialReactTable,
  type MaterialReactTableProps,
  type MRT_ColumnDef,
} from "material-react-table";
import ExportToCsv from "../../common/ExportToCsv";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import CreateNewEntityButton from "../../common/CreateNewRow";
// Define the Person type for the PO_reference table
type Person = {
  PO_reference: string;
  Program_Outcomes: string;
  PO_type: string;
};

// Sample data for the PO_reference table
const data: Person[] = [
  {
    PO_reference: "John",
    Program_Outcomes: "Doe",
    PO_type: "261 Erdman Ford",
  },
  {
    PO_reference: "Jane",
    Program_Outcomes: "Doe",
    PO_type: "769 Dominic Grove",
  },
  {
    PO_reference: "Joe",
    Program_Outcomes: "Doe",
    PO_type: "566 Brakus Inlet",
  },
  {
    PO_reference: "Kevin",
    Program_Outcomes: "Vandy",
    PO_type: "722 Emie Stream",
  },
  {
    PO_reference: "Joshua",
    Program_Outcomes: "Rolluffs",
    PO_type: "32188 Larkin Turnpike",
  },
];

const Program_Outcomes = () => {
  const [selectedData, setSelectedData] = useState<Person[]>(data); // Initialize with the default data
  const curriculumOptions = ["2014-2015", "2015-2016", "2016-2017"]; // Add curriculum options
  const [selectedCurriculum, setSelectedCurriculum] = useState<string | null>(
    null
  );
  const [tableData, setTableData] = useState<Person[]>(() => data);

  const handleCurriculumChange = (
    event: React.ChangeEvent<HTMLSelectElement>
  ) => {
    setSelectedCurriculum(event.target.value);
  };

  const handleDeleteRow = useCallback((row: Person) => {
    if (
      window.confirm(`Are you sure you want to delete CO ${row.PO_reference}?`)
    ) {
      // Filter out the deleted row
      setTableData((prevData) =>
        prevData.filter((data) => data.PO_reference !== row.PO_reference)
      );
    }
  }, []);

  const columns: MRT_ColumnDef<Person>[] = [
    {
      accessorKey: "PO_reference",
      header: "PO_reference",
      size: 150,
    },
    {
      accessorKey: "Program_Outcomes",
      header: "Program_Outcomes",
      size: 150,
    },
    {
      accessorKey: "PO_type",
      header: "PO_type",
      size: 200,
    },
  ];

  return (
    <div className="container mx-auto my-6">
      <legend className="text-3xl mb-5 font-bold  ">
        Program Outcome List
      </legend>
      <div className="flex flex-row justify-between mb-3">
        <CreateNewEntityButton
          attributes={{
            PO_reference: "PO Reference",
            Program_Outcomes: "Program Outcomes",
            PO_type: "PO Type",
          }}
          onSubmit={(newData) => {
            // Handle adding a new row with newData
            // You should implement this logic in your component
            // Example:
            setTableData((prevData) => [
              ...prevData,
              {
                PO_reference: newData.PO_reference,
                Program_Outcomes: newData.Program_Outcomes,
                PO_type: newData.PO_type,
              },
            ]);
          }}
        />
        <ExportToCsv data={data} type="data" /> {/* Export All Data */}
        {/* <ExportToCsv data={data} type="rows" /> Export All Rows */}
      </div>
      <div className="flex gap-3 my-6">
        <label className="mr-2 ">Select Curriculum:</label>
        <select
          onChange={handleCurriculumChange}
          value={selectedCurriculum || ""}
        >
          <option value="">Select Curriculum</option>
          {curriculumOptions.map((option) => (
            <option key={option} value={option}>
              {option}
            </option>
          ))}
        </select>
      </div>
      <MaterialReactTable
        columns={columns}
        data={tableData}
        editingMode="modal" // Default
        enableEditing
        enableRowActions
        renderRowActions={({ row, table }) => (
          <div>
            <EditIcon
              className="mr-4 primary"
              onClick={() => {
                table.setEditingRow(row);
              }}
              color="success"
            />
            <DeleteIcon
              onClick={() => handleDeleteRow(row.original as Person)}
              color="error"
            />
          </div>
        )}
      />
    </div>
  );
};

export default Program_Outcomes;
