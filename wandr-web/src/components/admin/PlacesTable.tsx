// pages/blog/index.tsx

'use client';

import React from 'react';
import TableCard from '@/components/admin/TableCard';
import Chip from '@/components/Chip';
import {Row, Col} from 'antd'; // Assuming this is where your BlogPost component is located
import {Progress, Tag, Avatar} from 'antd';

  const tableColumns = [
    { title: '#', dataIndex: 'number', key: 'number' },
    {
        title: 'Name',
        dataIndex: 'name',
        key: 'name',
        render: (text: string, record: any) => (
            <div className="flex items-center space-x-2">
            <Avatar src={record.imageUrl} />
            <span>{text}</span>
            </div>
        ),
    },
    { title: 'Location', dataIndex: 'location', key: 'location' },
    { title: 'Address', dataIndex: 'address', key: 'address' },
    {
      title: 'Catrgory',
      dataIndex: 'category',
      key: 'category',
      render: (text: string, record: any) => (
        <Chip
            imageUrl={record.chipImage} // Replace with the appropriate image URL from your data
            text={record.category} // Adjust this to pass the appropriate text from your data
            size="default"
        />
      ),
    },
  ]
  
  const tableData = [
    { key: '1', number: '1', name: 'Sigiriya', imageUrl: '/loginPage.png', category: 'Rocks', chipImage: '/categoryRock.png', location: '7.956944,  80.759720', address: 'Matale,Sri Lanka'},
    { key: '2', number: '2', name: 'Sigiriya', imageUrl: '/loginPage.png', category: 'Rocks', chipImage: '/categoryRock.png', location: '7.956944,  80.759720', address: 'Matale,Sri Lanka'},
    { key: '3', number: '3', name: 'Sigiriya', imageUrl: '/loginPage.png', category: 'Rocks', chipImage: '/categoryRock.png', location: '7.956944,  80.759720', address: 'Matale,Sri Lanka'},
  ]

const PlacesTable = () => {
  return (
    <div className="p-4 gap-4 m-3">
        <TableCard columns={tableColumns} data={tableData} title="Places" />
    </div>
  );
};

export default PlacesTable;