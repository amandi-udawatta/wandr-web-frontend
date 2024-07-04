// components/PieChart.js
import { Pie } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
} from 'chart.js';
import ChartDataLabels from 'chartjs-plugin-datalabels';

ChartJS.register(ArcElement, Tooltip, Legend, ChartDataLabels);

type PieChartData = {
  labels: string[];
  values: number[];
  title: string;
};

const PieChart = ({ data }: { data: PieChartData }) => {
  const chartData = {
    labels: data.labels,
    datasets: [
      {
        label: '# of Users',
        data: data.values,
        backgroundColor: [
          'rgba(255, 99, 132, 0.2)',
          'rgba(54, 162, 235, 0.2)',
          'rgba(255, 206, 86, 0.2)',
          'rgba(75, 192, 192, 0.2)',
          'rgba(153, 102, 255, 0.2)',
          'rgba(255, 159, 64, 0.2)',
        ],
        borderColor: [
          'rgba(255, 99, 132, 1)',
          'rgba(54, 162, 235, 1)',
          'rgba(255, 206, 86, 1)',
          'rgba(75, 192, 192, 1)',
          'rgba(153, 102, 255, 1)',
          'rgba(255, 159, 64, 1)',
        ],
        borderWidth: 1,
      },
    ],
  };

  const options = {
    plugins: {
      legend: {
        display: false, // Disable the legend
      },
      tooltip: {
        callbacks: {
          label: function(tooltipItem : any) {
            return `${tooltipItem.label}: ${tooltipItem.raw}`;
          },
        },
      },
      datalabels: {
        color: 'black',
        formatter: (value: any, context: any) => context.chart.data.labels[context.dataIndex],
        font: {
          weight: 'bold',
          size: 10,
        },
        anchor: 'end', // Options: 'start', 'center', 'end'
        align: 'start', // Options: 'start', 'center', 'end'
        offset: 20,
      },
    },
  };

  return (
    <div className="border border-gray-200 rounded-xl p-5">
        <h1 className="text-xl font-bold h-full mb-3 mt-3 my-text">{data.title}</h1>  
        <div className='flex justify-center align-middle p-5'>
            <Pie data={chartData} options={options} width={400} height={400}/>
        </div>   
        
    </div>
  );
};

export default PieChart;
