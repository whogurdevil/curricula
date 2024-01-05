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

// Define the CourseOutcome type for the Course Outcome table
type CourseOutcome = {
  CO_Code: string;
  Course_Outcome: string;
  Bloom_Level: string;
  Delivery_Methods: string;
};

// Sample data for the Course Outcome table
const data: CourseOutcome[] = [
  {
    CO_Code: "CO001",
    Course_Outcome: "Achieve a specific learning outcome.",
    Bloom_Level: "Analysis",
    Delivery_Methods: "Lecture, Lab, Discussion",
  },
  {
    CO_Code: "CO002",
    Course_Outcome: "Demonstrate problem-solving skills.",
    Bloom_Level: "Application",
    Delivery_Methods: "Project, Workshop, Quiz",
  },
  {
    CO_Code: "CO003",
    Course_Outcome: "Communicate effectively.",
    Bloom_Level: "Comprehension",
    Delivery_Methods: "Presentation, Essay, Group Work",
  },
  {
    CO_Code: "CO004",
    Course_Outcome: "Apply theoretical concepts.",
    Bloom_Level: "Application",
    Delivery_Methods: "Case Study, Simulation, Exam",
  },
  {
    CO_Code: "CO005",
    Course_Outcome: "Analyze data and draw conclusions.",
    Bloom_Level: "Analysis",
    Delivery_Methods: "Data Analysis, Report, Discussion",
  },
  {
    CO_Code: "CO005",
    Course_Outcome: "Analyze data and draw conclusions.",
    Bloom_Level: "Analysis",
    Delivery_Methods: "Data Analysis, Report, Discussion",
  },
];

const CourseOutcomes = () => {
  const curriculumOptions = ["2014-2015", "2015-2016", "2016-2017"]; // Add curriculum options
  const termOptions = ["Semester 1", "Semester 2"]; // Add term options
  const courseOptions = ["Physics", "Electrical Engineering", "Mathematics"]; // Add course options

  const columns: MRT_ColumnDef<CourseOutcome>[] = [
    {
      accessorKey: "CO_Code",
      header: "CO Code",
      size: 150,
    },
    {
      accessorKey: "Course_Outcome",
      header: "Course Outcome (CO)",
      size: 200,
    },
    {
      accessorKey: "Bloom_Level",
      header: "Bloom's Level",
      size: 150,
    },
    {
      accessorKey: "Delivery_Methods",
      header: "Delivery Methods",
      size: 200,
    },
  ];

  const [tableData, setTableData] = useState<CourseOutcome[]>(() => data);

  const [selectedCurriculum, setSelectedCurriculum] = useState<string | null>(
    null
  );
  const [selectedTerm, setSelectedTerm] = useState<string | null>(null);
  const [selectedCourse, setSelectedCourse] = useState<string | null>(null);

  const handleCurriculumChange = (
    event: React.ChangeEvent<HTMLSelectElement>
  ) => {
    setSelectedCurriculum(event.target.value);
  };

  const handleTermChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedTerm(event.target.value);
  };

  const handleCourseChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedCourse(event.target.value);
  };

  const handleDeleteRow = useCallback((row: CourseOutcome) => {
    if (window.confirm(`Are you sure you want to delete CO ${row.CO_Code}?`)) {
      // Filter out the deleted row
      setTableData((prevData) =>
        prevData.filter((data) => data.CO_Code !== row.CO_Code)
      );
    }
  }, []);
  return (
    <div className="container mx-auto px-5 max-w-[67rem]">
      <legend className="text-3xl py-7">Course Outcome List</legend>
      <div className="flex flex-row justify-between mb-3">
        <CreateNewEntityButton
          attributes={{
            CO_Code: "CO Code",
            Course_Outcome: "Course Outcome (CO)",
            Bloom_Level: "Bloom's Level",
            Delivery_Methods: "Delivery Methods",
          }}
          onSubmit={(newData) => {
            // Handle adding a new row with newData
            // You should implement this logic in the CourseOutcomes component
            // Example:
            setTableData((prevData) => [
              ...prevData,
              {
                CO_Code: newData.CO_Code, // Generate a unique CO Code
                Course_Outcome: newData.Course_Outcome,
                Bloom_Level: newData.Bloom_Level,
                Delivery_Methods: newData.Delivery_Methods,
              },
            ]);
          }}
        />
        <ExportToCsv data={data} type="data" /> {/* Export All Data */}
        {/* <ExportToCsv data={data} type="rows" /> Export All Rows */}
      </div>
      <div className="flex gap-3 my-6">
        <label className="mr-2">Select Curriculum:</label>
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
        <label className="mr-2">Select Term:</label>
        <select onChange={handleTermChange} value={selectedTerm || ""}>
          <option value="">Select Term</option>
          {termOptions.map((option) => (
            <option key={option} value={option}>
              {option}
            </option>
          ))}
        </select>
        <label className="mr-2">Select Course:</label>
        <select onChange={handleCourseChange} value={selectedCourse || ""}>
          <option value="">Select Course</option>
          {courseOptions.map((option) => (
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
              onClick={() => handleDeleteRow(row.original as CourseOutcome)}
              color="error"
            />
          </div>
        )}
      />
    </div>
  );
};

export default CourseOutcomes;
