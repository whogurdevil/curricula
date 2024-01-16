import React, { useCallback, useEffect, useState } from 'react';
import {
  MaterialReactTable,
  MRT_ColumnDef,
} from 'material-react-table';

import { get, post, put, del } from '../../common/APIrequest';

import ExportToCsv from "../../common/ExportToCsv";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import CreateNewEntityButton from "../../common/buttontest";
import { getAllCurriculums, getAllDepartments, getAllPrograms } from '../../services/db'
import { DepartmentData, CurriculumData } from '../../types/types'



const Curriculum = () => {
  const [tableData, setTableData] = useState<CurriculumData[]>([]);
  const [editingRow, setEditingRow] = useState<CurriculumData | null>(null);
  const [rerender, setRerender] = useState(false);
  const [departmentData, setDepartmentData] = useState<DepartmentData[]>([]);



  useEffect(() => {
    const fetchData = async () => {
      try {
        const departments = await getAllDepartments();
        // console.log(departments.data);
        setDepartmentData(departments.data);
      } catch (error: any) {
        console.error('Error fetching departments:', error.message);
      }
    };

    fetchData();
  }, [rerender]);
  // Define the columns with a custom renderCell function for the "More Details" link
  const columns: MRT_ColumnDef<CurriculumData>[] = [
    {
      accessorKey: "curriculum",
      header: "Curriculum",
      size: 150,
      enableEditing: true, // Enable editing for this column
    },
    {
      accessorKey: "program",
      header: "Program",
      size: 150,
      enableEditing: true, // Enable editing for this column
    },
    {
      accessorKey: "Department",
      header: "Department",
      size: 200,
      enableEditing: true, // Enable editing for this column
    },
    {
      accessorKey: "From",
      header: "From",
      size: 150,
      enableEditing: true, // Enable editing for this column
    },
    {
      accessorKey: "To",
      header: "To",
      size: 150,
      enableEditing: true, // Enable editing for this column
    },
    {
      accessorKey: 'viewdetails',
      header: 'View Details',
      size: 150,
      enableEditing: true, // Enable editing for this column
    },
  ];

  // const handleDeleteRow = useCallback(
  //   (row: CurriculumData) => {
  //     if (
  //       window.confirm(`Are you sure you want to delete course ${row.curriculum}?`)
  //     ) {
  //       del(`/api/data/${row.Sl_No}`)
  //         .then(() => {
  //           console.log('Deleted:', row);
  //           // fetchData(); // Refresh the data after deletion
  //         })
  //         .catch((error) => {
  //           console.error('Error deleting data:', error);
  //         });
  //     }
  //   },
  //   [fetchData]
  // );

  // console.log(departmentData)

  return (
    <div className="container mx-auto px-5 max-w-[67rem]">
      <legend className="text-3xl py-7">Design Curriculum</legend>
      <div className='flex flex-row justify-between mb-3'>
        {/* <CreateNewEntityButton
          attributes={{
            Sl_No: 'Sl No',
            curriculum: 'Curriculum',
            program: 'Program',
            Department: 'Department',
            From: 'From',
            To: 'To',
            viewdetails: 'View Details',
          }}
          onSubmit={(newData) => {
            post('/api/data', newData)
              .then(() => {
                console.log('Created:', newData);
                fetchData(); // Refresh the data after creation
              })
              .catch((error) => {
                console.error('Error creating data:', error);
              });
          }}
        /> */}
        <CreateNewEntityButton
          attributes={{
            curriculum: { label: 'Curriculum Name', type: 'text' },
            program: { label: 'Program', type: 'text' },
            Department: {
              label: 'Department',
              type: 'select',
              options: departmentData.map((department) => department.name),
            },
            From: { label: 'From', type: 'text' },
            To: { label: 'To', type: 'text' },
            viewdetails: { label: 'View Details', type: 'text' },
          }}
          onSubmit={(newData) => {
            // Your onSubmit logic here
            console.log('Submitted Data:', newData);
          }}
        />

        <ExportToCsv data={tableData} type="data" />

      </div>
      <MaterialReactTable
        columns={columns}
        data={tableData}
        editingMode="modal"
        enableRowActions
        enableEditing
        onEditingRowSave={async ({ exitEditingMode, row, values }) => {
          try {
            // Send a PUT request to update the data on the server
            await put(`/api/data/${row.original.Sl_No}`, values);

            // Exit editing mode
            exitEditingMode();

            // Refresh the data after saving
            // fetchData();
          } catch (error) {
            console.error('Error updating data:', error);
          }
        }}
        renderRowActions={({ row, table }) => (
          <div>
            <EditIcon
              className='mr-4 primary'
              onClick={() => {
                // Set the editing row when the edit button is clicked
                setEditingRow(row.original);
                table.setEditingRow(row);
              }}
              color='success'
            />
            <DeleteIcon
              // onClick={() => handleDeleteRow(row.original as CurriculumData)}
              color='error'
            />
          </div>
        )}

      />
    </div>

  );
};

export default Curriculum;