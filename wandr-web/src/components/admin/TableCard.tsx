'use client';

import React from 'react';
import { Table } from 'antd';

interface TableCardProps {
  columns: any[];
  data: any[];
  title: string;
  pagination?: false | { pageSize: number };
  onRow?: (record: any, index?: number) => React.HTMLAttributes<HTMLElement>; // Add onRow prop
}

const TableCard: React.FC<TableCardProps> = ({ columns, data, title, pagination, onRow }) => {
  return (
    <div className="border border-gray-200 rounded-xl p-5">
      <h1 className="text-xl font-bold mb-3 mt-3 my-text">{title}</h1>
      <Table
        columns={columns}
        dataSource={data}
        pagination={
          pagination === false
            ? false
            : {
                pageSize: pagination?.pageSize || 5, // Default to 5 if not provided
              }
        }
        scroll={{ x: 100 }}
        onRow={onRow} // Pass the onRow prop to the Table
        className="my-text cursor-pointer"
      />
    </div>
  );
};

export default TableCard;
