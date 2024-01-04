import React from 'react'
import BarGraph from './BarGraph'
import PieChart from './PieChart'
import { Select, Option } from '@material-tailwind/react'


export default function CoAttainment() {
  const selectedDepartment = '';
const selectedProgram = '';
const selectedCurriculum = '';
const selectedTerm = '';
const selectedCourse = '';
const departmentOptions = ["Department1", "Department2", "Department3"];
const programOptions = ["Program1", "Program2", "Program3"];
const curriculumOptions = ["Curriculum1", "Curriculum2", "Curriculum3"];
const termOptions = ["Term1", "Term2", "Term3"];
const courseOptions = ["Course1", "Course2", "Course3"];

  return (
    <React.Fragment>
      <div
        className='flex flex-row gap-6'
      >
        <label className="mr-2">Select Department:</label>
        <Select
          value={selectedDepartment || ''}
        >
          <Option value="" className='px-2'>Select Department</Option>
          {departmentOptions.map((option) => (
            <Option key={option} value={option}>
              {option}
            </Option>
          ))}
        </Select>
        <label className="mr-2">Select Program:</label>
        <Select

          value={selectedProgram || ''}
        >
          <Option value="">Select Program</Option>
          {programOptions.map((option) => (
            <Option key={option} value={option}>
              {option}
            </Option>
          ))}
        </Select>
        <label className="mr-2">Select Curriculum:</label>
        <Select
          value={selectedCurriculum || ''}
        >
          <Option value="">Select Curriculum</Option>
          {curriculumOptions.map((option) => (
            <Option key={option} value={option}>
              {option}
            </Option>
          ))}
        </Select>
        </div>
        <div className='flex flex-row gap-7 my-2 w-max'>
        <label className="mr-2">Select Term:</label>
        <Select
          value={selectedTerm || ''}
        >
          <Option value="">Select Term</Option>
          {termOptions.map((option) => (
            <Option key={option} value={option}>
              {option}
            </Option>
          ))}
        </Select>
        <label className="mr-2">Select Course:</label>
        <Select
          value={selectedCourse || ''}
        >
          <Option value="">Select Course</Option>
          {courseOptions.map((option) => (
            <Option key={option} value={option}>
              {option}
            </Option>
          ))}
        </Select></div>
      
    <div className='flex flex-row w-max mt-12 justify-between'>
    <BarGraph/>
    <PieChart/>
    </div>
  </React.Fragment>
  )
}
