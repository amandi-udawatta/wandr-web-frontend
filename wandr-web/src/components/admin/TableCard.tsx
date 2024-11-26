'use client';

import React from 'react'
import {Button, Table} from 'antd'

interface TableCardProps {
    columns: any[]
    data: any[]
    title: string
    pagination?: false | { pageSize: number };
    function: any
}

const TableCard: React.FC<TableCardProps> = ({ columns, data, title, pagination ,function:addproduct}) => {
    return (
        <div className="border border-gray-200 rounded-xl p-5">
            <div className="w-full flex flex-row justify-between">
                <h1 className="text-xl font-bold h-full mb-3 mt-3 my-text">{title}</h1>

            </div>
            <Table
                columns={columns}
                dataSource={data}
                pagination={
                    pagination === false ? false : {
                        pageSize: pagination?.pageSize || 5, // Use default if not provided
                    }
                }
                scroll={{ x: 100 }}
                className='my-text'
            />
        </div>
    )
}

export default TableCard

