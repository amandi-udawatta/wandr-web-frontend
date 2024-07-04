import React from 'react'
// import {Line} from '@ant-design/charts'

const data = [
    { month: 'Jan', value: 30 },
    { month: 'Feb', value: 20 },
    { month: 'Mar', value: 50 },
    // Add more data points as needed
];

interface ChartCardProps {
  title: string
}

const ChartCard: React.FC<ChartCardProps> = ({ title }) => {
  const config = {
    data,
    xField: 'date',
    yField: 'value',
    seriesField: 'category',
    yAxis: {
      label: {
        formatter: (v: any) => `${(v / 1000).toFixed(0)}k`,
      },
    },
  }

  return (
    <div className="border border-gray-200 rounded-xl p-5">
      <h1 className="text-xl font-bold h-full mb-3 mt-3 my-text">{title}</h1>
      <div className='h-52'>

      </div>  
      {/* <Line {...config} /> */}
    </div>
  )
}

export default ChartCard;
