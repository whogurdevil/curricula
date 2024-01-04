import axios from 'axios';

const API_BASE_URL = 'http://localhost:5000'; // Adjust the URL based on your backend API

type organization = {
    name: string,
    vision: string,
    mission: string
}


export const getOrganizationByName = async (organizationName: string) => {
  try {
    console.log(`${API_BASE_URL}/organization/get-organization/${organizationName}`)
    const response = await axios.get(`${API_BASE_URL}/organization/get-organization/${organizationName}`);
    return response.data;
  } catch (error: any) {
    throw new Error(`Error fetching organization data: ${error.message}`);
  }
};
