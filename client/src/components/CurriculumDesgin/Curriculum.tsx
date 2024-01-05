import React, { useCallback, useEffect, useState } from 'react';
import {
  MaterialReactTable,
  MRT_ColumnDef,
} from 'material-react-table';

import { get, post, put, del } from '../../common/APIrequest';

import ExportToCsv from "../../common/ExportToCsv";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import CreateNewEntityButton from "../../common/CreateNewRow";

type Person = {
  Sl_No: any;
  curriculum: string;
  program: string;
  Department: string;
  From: string;
  To: string;
  viewdetails: string;
};

const Curriculum = () => {
  const [tableData, setTableData] = useState<Person[]>([]);
  const [editingRow, setEditingRow] = useState<Person | null>(null);

  useEffect(() => {
    fetchData(); // Fetch data when the component mounts
  }, []);

  const fetchData = () => {
    get('/api/data')
      .then((response) => {
        console.log('Data fetched successfully:', response);
        setTableData(response);
      })
      .catch((error) => {
        console.error('Error fetching data:', error);
      });
  };
  // Define the columns with a custom renderCell function for the "More Details" link
  const columns: MRT_ColumnDef<Person>[] = [
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

  const handleDeleteRow = useCallback(
    (row: Person) => {
      if (
        window.confirm(`Are you sure you want to delete course ${row.curriculum}?`)
      ) {
        del(`/api/data/${row.Sl_No}`)
          .then(() => {
            console.log('Deleted:', row);
            fetchData(); // Refresh the data after deletion
          })
          .catch((error) => {
            console.error('Error deleting data:', error);
          });
      }
    },
    [fetchData]
  );

  return (
    <div className="container mx-auto px-5 max-w-[67rem]">
      <legend className="text-3xl py-7">Design Curriculum</legend>
      <div className='flex flex-row justify-between mb-3'>
        <CreateNewEntityButton
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
              fetchData();
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
                onClick={() => handleDeleteRow(row.original as Person)}
                color='error'
              />
            </div>
          )}
          
        />
      </div>
 
      );
};

      export default Curriculum;
