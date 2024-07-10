'use client';

import React from 'react'
import { Table } from 'antd'

interface TableCardProps {
  columns: any[]
  data: any[]
  title: string
}

const TableCard: React.FC<TableCardProps> = ({ columns, data, title }) => {
  return (
    <div className="border border-gray-200 rounded-xl p-5">
      <h1 className="text-xl font-bold h-full mb-3 mt-3 my-text">{title}</h1>
      <Table 
        columns={columns} 
        dataSource={data} 
        pagination={{
          pageSize: 5,
        }}
        scroll={{ x: 100 }}
        className='my-text' 
      />
    </div>
  )
}

export default TableCard
