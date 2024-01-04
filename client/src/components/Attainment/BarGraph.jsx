import React from 'react';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend,
} from 'chart.js';
import { Bar } from 'react-chartjs-2';
import { faker } from '@faker-js/faker';
import { Typography } from '@material-tailwind/react';

ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend
);

export const options = {
    animation: {
        y: {
            duration: 2000,
            from: 500,
        },
    },
    responsive: true,
    plugins: {
        legend: {
            position: 'top',
        },
        title: {
            display: true,
            text: 'CIA Attainment (in %)',
        },
    },
};

const labels = ['CO1', 'CO2', 'CO3', 'CO4', 'CO6'];

export const data = {
    labels,
    datasets: [
        {
            label: 'CIA Threshold',
            data: labels.map(() => faker.datatype.number({ min: 0, max: 100 })),
            backgroundColor: 'rgba(75, 192, 192, 0.8)',
        },
        {
            label: 'Threshold Based Attainment',
            data: labels.map(() => faker.datatype.number({ min: 0, max: 100 })),
            backgroundColor: 'rgba(255, 99, 132, 0.8)',
        },
    ],
};

export default function App() {
    return (
        <Bar className='w-16' options={options} data={data} />
    );
}
