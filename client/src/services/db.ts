import axios from 'axios';

const API_BASE_URL = 'http://localhost:5000'; // Adjust the URL based on your backend API

type Organization = {
  name: string;
  vision: string;
  mission: string;
};

export const getOrganizationByName = async (organizationName: string) => {
  try {
    const response = await axios.get(`${API_BASE_URL}/organization/get-organization/${organizationName}`);
    return response.data;
  } catch (error:any) {
    throw new Error(`Error fetching organization data: ${error.message}`);
  }
};

export const addDepartment = async (departmentData: {
  name: string;
  vision: string;
  mission: string;
  organization: string;
  head: string;
}) => {
  try {
    // Check if the referenced organization exists before adding the department
    await getOrganizationByName(departmentData.organization);

    const response = await axios.post(`${API_BASE_URL}/department/new-department`, departmentData);
    return response.data;
  } catch (error:any) {
    throw new Error(`Error adding department: ${error.message}`);
  }
};

export const getAllDepartments = async () => {
  try {
    const response = await axios.get(`${API_BASE_URL}/department/all-departments`);
    // console.log(response.data)
    return response.data;
  } catch (error:any) {
    throw new Error(`Error fetching all departments: ${error.message}`);
  }
};

export const getDepartmentById = async (departmentId: number) => {
  try {
    const response = await axios.get(`${API_BASE_URL}/department/get-department/${departmentId}`);
    return response.data;
  } catch (error:any) {
    throw new Error(`Error fetching department by ID: ${error.message}`);
  }
};

export const getAllPrograms = async () => {
  try {
    const response = await axios.get(`${API_BASE_URL}/program/all-programs`);
    console.log(response.data)
    return response.data;
  } catch (error:any) {
    throw new Error(`Error fetching all programs: ${error.message}`);
  }
};

export const addProgram = async (programData: {
  name: string;
  owner: string;
  description: string;
  department: string;
}) => {
  try {
    // Check if the referenced organization exists before adding the department
    // await getOrganizationByName(departmentData.organization);

    const response = await axios.post(`${API_BASE_URL}/program/new-program`, programData);
    return response.data;
  } catch (error:any) {
    throw new Error(`Error adding department: ${error.message}`);
  }
};

export const getAllCurriculums = async () => {
  try {
    const response = await axios.get(`${API_BASE_URL}/curriculum/all-curriculums`);
    // console.log(response.data)
    return response.data;
  } catch (error:any) {
    throw new Error(`Error fetching all programs: ${error.message}`);
  }
};