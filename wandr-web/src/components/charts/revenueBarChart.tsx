// components/charts/BarChart.js

import React from 'react';
import { Bar } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { AnyAaaaRecord } from 'dns';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

type BarChartData = {
    labels: string[];
    values: number[];
    title: string;
  };

const BarChart = ({ data }: { data: BarChartData }) => {
  const totalRevenue = data.values.reduce((acc, value) => acc + value, 0);

  const chartData = {
    labels: data.labels,
    datasets: [
      {
        label: 'Revenue',
        data: data.values,
        backgroundColor: [
          'rgba(255, 99, 132, 0.2)',
          'rgba(54, 162, 235, 0.2)',
          'rgba(255, 206, 86, 0.2)',
          'rgba(75, 192, 192, 0.2)',
        ],
        borderColor: [
          'rgba(255, 99, 132, 1)',
          'rgba(54, 162, 235, 1)',
          'rgba(255, 206, 86, 1)',
          'rgba(75, 192, 192, 1)',
        ],
        borderWidth: 1,
      },
    ],
  };

  const options = {
    maintainAspectRatio: false,
    scales: {
      y: {
        beginAtZero: true,
      },
    },
    plugins: {
      legend: {
        display: false,
      },
      tooltip: {
        callbacks: {
          label: function (tooltipItem : any) {
            return `$${tooltipItem.raw}`;
          },
        },
      },
      title: {
        display: true,
        text: `Total Revenue: Rs.${totalRevenue}`,
      },
    },
  };

  return (
    <div className="border border-gray-200 rounded-xl p-5">
        <h1 className="text-xl font-bold h-full mb-3 mt-3 my-text">{data.title}</h1>  
        <div className='flex justify-center align-middle p-5 h-[282px]'>
            <Bar data={chartData} options={options} />
        </div>    
    </div>
  );
};

export default BarChart;
