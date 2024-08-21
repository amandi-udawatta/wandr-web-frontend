import React, { useState } from 'react';
import { Avatar, Button, Space, Table, Tooltip, Input, InputNumber } from 'antd';
import { DeleteOutlined, EditOutlined, SaveOutlined, ExclamationCircleOutlined } from '@ant-design/icons';
import TableCard from '../admin/TableCard';

interface Product {
  id: number;
  name: string;
  price: number;
  advance: number;
  description: string;
  quantity: number;
  imageUrl: string;
}

const initialProducts: Product[] = [
  {
    id: 1,
    name: 'Handcrafted Silver Necklace',
    price: 120,
    advance: 30,
    description: 'A beautifully handcrafted silver necklace with intricate designs, perfect for special occasions.',
    quantity: 2,
    imageUrl: '/product1.png'
  },
  {
    id: 2,
    name: 'Designer Summer Dress',
    price: 75,
    advance: 20,
    description: 'A stylish and comfortable summer dress made from high-quality materials, available in various sizes.',
    quantity: 100,
    imageUrl: '/product2.png'
  },
  {
    id: 3,
    name: 'Organic Hand Cream',
    price: 25,
    advance: 5,
    description: 'Nourishing hand cream made with organic ingredients to keep your hands soft and hydrated.',
    quantity: 80,
    imageUrl: '/product3.png'
  },
  {
    id: 4,
    name: 'Local Artisan Pottery',
    price: 45,
    advance: 10,
    description: 'Beautifully crafted pottery pieces made by local artisans, adding a unique touch to your home.',
    quantity: 30,
    imageUrl: '/product4.png'
  },
  {
    id: 5,
    name: 'Handmade Wooden Toys',
    price: 35,
    advance: 10,
    description: 'Charming and durable wooden toys handcrafted by local craftsmen, perfect for children of all ages.',
    quantity: 0,
    imageUrl: '/product5.png'
  },
];

const ProductsTable: React.FC = () => {
  const [products, setProducts] = useState<Product[]>(initialProducts);
  const [editingRow, setEditingRow] = useState<number | null>(null); // Track which row is being edited

  const handleEdit = (id: number) => {
    setEditingRow(id);
  };

  const handleSave = (id: number) => {
    setEditingRow(null);
    // Save data here if needed (e.g., send to server)
  };

  const handleChange = (id: number, field: string, value: any) => {
    setProducts((prevProducts) =>
      prevProducts.map((product) =>
        product.id === id ? { ...product, [field]: value } : product
      )
    );
  };

  const columns = [
    {
      title: 'Product ID',
      dataIndex: 'id',
      key: 'id',
      render: (text: number, record: Product) => (
        <div className="flex items-center space-x-2 flex-row">
          <span>{text}</span>
          {record.quantity < 5 && (
            <Tooltip title="This product is low on quantity">
              <ExclamationCircleOutlined style={{ color: 'red', marginLeft: '8px' }} />
            </Tooltip>
          )}
        </div>
      ),
    },
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
      render: (text: string, record: Product) =>
        editingRow === record.id ? (
          <Input
            value={text}
            onChange={(e) => handleChange(record.id, 'name', e.target.value)}
          />
        ) : (
          <div className="flex items-center space-x-2 flex-row">
            <Avatar src={record.imageUrl} size={'large'} />
            <span>{text}</span>
          </div>
        ),
      width: '400px'
    },
    {
      title: 'Price',
      dataIndex: 'price',
      key: 'price',
      render: (text: number, record: Product) =>
        editingRow === record.id ? (
          <InputNumber
            value={text}
            onChange={(value) => handleChange(record.id, 'price', value)}
            min={0}
          />
        ) : (
          <span>{text}</span>
        ),
    },
    {
      title: 'Advance',
      dataIndex: 'advance',
      key: 'advance',
      render: (text: number, record: Product) =>
        editingRow === record.id ? (
          <InputNumber
            value={text}
            onChange={(value) => handleChange(record.id, 'advance', value)}
            min={0}
          />
        ) : (
          <span>{text}</span>
        ),
    },
    {
      title: 'Description',
      dataIndex: 'description',
      key: 'description',
      render: (text: string, record: Product) =>
        editingRow === record.id ? (
          <Input
            value={text}
            onChange={(e) => handleChange(record.id, 'description', e.target.value)}
          />
        ) : (
          <Tooltip title={text}>
            <span>{text.length > 50 ? `${text.slice(0, 50)}... ` : text}</span>
          </Tooltip>
        ),
    },
    {
      title: 'Quantity',
      dataIndex: 'quantity',
      key: 'quantity',
      render: (text: number, record: Product) =>
        editingRow === record.id ? (
          <InputNumber
            value={text}
            onChange={(value) => handleChange(record.id, 'quantity', value)}
            min={0}
            max={999}
            controls={{
              upIcon: <span>+</span>,
              downIcon: <span>-</span>,
            }}
          />
        ) : (
          <span style={{ color: text < 5 ? 'red' : 'inherit', fontWeight: text < 5 ? 'bold' : 'normal' }}>
            {text}
          </span>
        ),
    },
    {
      title: 'Action',
      key: 'action',
      render: (text: string, record: Product) =>
        editingRow === record.id ? (
          <Button
            icon={<SaveOutlined className='text-green-600' />}
            type="text"
            onClick={() => handleSave(record.id)}
          />
        ) : (
          <Space size="middle">
            <Button
              icon={<EditOutlined className='text-blue-600' />}
              type="text"
              onClick={() => handleEdit(record.id)}
            />
            <Button
              icon={<DeleteOutlined className='text-red-600' />}
              type="text"
            />
          </Space>
        ),
    },
  ];

  return (
    <div className="p-4">
      <TableCard 
        columns={columns}
        data={products}
        title='Your Products'
      />
    </div>
  );
};

export default ProductsTable;
