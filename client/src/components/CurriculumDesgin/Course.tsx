import React, { useMemo, useState, useCallback } from "react";
import {
  MaterialReactTable,
  type MaterialReactTableProps,
  type MRT_ColumnDef,
} from "material-react-table";
import ExportToCsv from "../../common/ExportToCsv";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import CreateNewEntityButton from "../../common/CreateNewRow";

// Define the Course type
type Course = {
  // Sl_No: number;
  Code: string;
  Course_Title: string;
  Core_Elective: string;
  Credits: number;
  Total_Marks: string;
  Course_Owner: string;
  // Course_Reviewer: string;
  Mode: string;
};

// Sample data for the Course table
const data: Course[] = [
  {
    // Sl_No: 1,
    Code: "CSE101",
    Course_Title: "Introduction to Computer Science",
    Core_Elective: "Core",
    Credits: 3,
    Total_Marks: "100",
    Course_Owner: "John Doe",
    // Course_Reviewer: "Jane Smith",
    Mode: "Online",
  },
  {
    // Sl_No: 2,
    Code: "CSE202",
    Course_Title: "Data Structures and Algorithms",
    Core_Elective: "Core",
    Credits: 4,
    Total_Marks: "150",
    Course_Owner: "Alice Johnson",
    // Course_Reviewer: "Bob Brown",
    Mode: "Offline",
  },
  {
    // Sl_No: 3,
    Code: "CSE303",
    Course_Title: "Database Management Systems",
    Core_Elective: "Core",
    Credits: 3,
    Total_Marks: "120",
    Course_Owner: "Eve Williams",
    // Course_Reviewer: "Charlie Wilson",
    Mode: "Online",
  },
  {
    // Sl_No: 4,
    Code: "CSE404",
    Course_Title: "Artificial Intelligence",
    Core_Elective: "Elective",
    Credits: 4,
    Total_Marks: "160",
    Course_Owner: "Grace Davis",
    // Course_Reviewer: "David Lee",
    Mode: "Offline",
  },
  {
    // Sl_No: 5,
    Code: "CSE505",
    Course_Title: "Machine Learning",
    Core_Elective: "Elective",
    Credits: 4,
    Total_Marks: "160",
    Course_Owner: "Frank Martin",
    // Course_Reviewer: "Olivia Miller",
    Mode: "Online",
  },
];

const CourseList = () => {
  const [selectedData, setSelectedData] = useState<Course[]>(data); // Initialize with the default data
  const curriculumOptions = ["2014-2015", "2015-2016", "2016-2017"]; // Add curriculum options
  const termOptions = ["Semester 1", "Semester 2"]; // Add term options

  const [tableData, setTableData] = useState<Course[]>(() => data);

  const columns: MRT_ColumnDef<Course>[] = [
    // {
    //   // accessorKey: "Sl_No",
    //   header: "S No.",
    //   size: 50,
    // },
    {
      accessorKey: "Code",
      header: "Code",
      size: 100,
    },
    {
      accessorKey: "Course_Title",
      header: "Course Title",
      size: 200,
    },
    {
      accessorKey: "Core_Elective",
      header: "Core / Elective",
      size: 100,
    },
    {
      accessorKey: "Credits",
      header: "Credits",
      size: 70,
    },
    {
      accessorKey: "Total_Marks",
      header: "Total Marks",
      size: 100,
    },
    {
      accessorKey: "Course_Owner",
      header: "Course Owner",
      size: 150,
    },
    // {
    //   // accessorKey: "Course_Reviewer",
    //   header: "Course Reviewer",
    //   size: 150,
    // },
    {
      accessorKey: "Mode",
      header: "Mode",
      size: 100,
    },
  ];
  const handleDeleteRow = useCallback((row: Course) => {
    if (window.confirm(`Are you sure you want to delete course ${row.Code}?`)) {
      // Filter out the deleted row
      setTableData((prevData) =>
        prevData.filter((data) => data.Code !== row.Code)
      );
    }
  }, []);

  const handleSaveRow: MaterialReactTableProps<Course>["onEditingRowSave"] =
    async ({ exitEditingMode, row, values }) => {
      // Update the data with the edited values
      selectedData[row.index] = values;
      // Send/receive API updates here if needed

      // Exit editing mode
      exitEditingMode();
    };
  const [selectedCurriculum, setSelectedCurriculum] = useState<string | null>(
    null
  );
  const [selectedTerm, setSelectedTerm] = useState<string | null>(null);
  const handleCurriculumChange = (
    event: React.ChangeEvent<HTMLSelectElement>
  ) => {
    setSelectedCurriculum(event.target.value);
  };

  const handleTermChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedTerm(event.target.value);
  };

  return (
    <div className="container mx-auto px-5 max-w-[67rem]">
      <legend className="text-3xl py-7">Course List</legend>
      <div className="flex flex-row justify-between mb-3">
        <CreateNewEntityButton
          attributes={{
            // Sl_No: "Sl No",
            Code: "Code",
            Course_Title: "Course Title",
            Core_Elective: "Core/Elective",
            Credits: "Credits",
            Total_Marks: "Total Marks",
            Course_Owner: "Course Owner",
            Course_Reviewer: "Course Reviewer",
            Mode: "Mode",
          }}
          onSubmit={(newData) => {
            // Handle adding a new row with newData
            // You should implement this logic in the CourseOutcomes component
            // Example:
            setTableData((prevData) => [
              ...prevData,
              {
                // Sl_No: prevData.length + 1,
                Code: newData.Code,
                Course_Title: newData.Course_Title,
                Core_Elective: newData.Core_Elective,
                Credits: parseInt(newData.Credits, 10), // Parse the string to a number
                Total_Marks: newData.Total_Marks,
                Course_Owner: newData.Course_Owner,
                // Course_Reviewer: newData.Course_Reviewer,
                Mode: newData.Mode,
              },
            ]);
          }}
        />
        <ExportToCsv data={data} type="data" /> {/* Export All Data */}
      </div>
      <div className="flex gap-3 my-6">
        <label className="mr-2 text-1xl">Select Curriculum:</label>
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
        <label className="mr-2 text-1xl">Select Term:</label>
        <select onChange={handleTermChange} value={selectedTerm || ""}>
          <option value="">Select Term</option>
          {termOptions.map((option) => (
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
              // className="mr-4 primary"
              onClick={() => {
                table.setEditingRow(row);
              }}
              color="success"
            />
            <DeleteIcon
              onClick={() => handleDeleteRow(row.original as Course)}
              color="error"
            />
          </div>
        )}
      />
    </div>
  );
};

export default CourseList;
