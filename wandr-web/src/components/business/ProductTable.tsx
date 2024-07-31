import React from 'react';
import { Table } from 'antd';

interface Product {
  id: number;
  name: string;
  price: number;
  advance: number;
  description: string;
  quantity: number;
}

const products: Product[] = [
    // Existing products
    {
      id: 1,
      name: 'Handcrafted Silver Necklace',
      price: 120,
      advance: 30,
      description: 'A beautifully handcrafted silver necklace with intricate designs, perfect for special occasions.',
      quantity: 50,
    },
    {
      id: 2,
      name: 'Designer Summer Dress',
      price: 75,
      advance: 20,
      description: 'A stylish and comfortable summer dress made from high-quality materials, available in various sizes.',
      quantity: 100,
    },
    
    // New products
    {
      id: 3,
      name: 'Organic Hand Cream',
      price: 25,
      advance: 5,
      description: 'Nourishing hand cream made with organic ingredients to keep your hands soft and hydrated.',
      quantity: 80,
    },
    {
      id: 4,
      name: 'Local Artisan Pottery',
      price: 45,
      advance: 10,
      description: 'Beautifully crafted pottery pieces made by local artisans, adding a unique touch to your home.',
      quantity: 30,
    },
    {
      id: 5,
      name: 'Handmade Wooden Toys',
      price: 35,
      advance: 10,
      description: 'Charming and durable wooden toys handcrafted by local craftsmen, perfect for children of all ages.',
      quantity: 60,
    },
  ];
  

const ProductsTable: React.FC = () => {
  const columns = [
    {
      title: 'Product ID',
      dataIndex: 'id',
      key: 'id',
    },
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: 'Price',
      dataIndex: 'price',
      key: 'price',
    },
    {
      title: 'Advance',
      dataIndex: 'advance',
      key: 'advance',
    },
    {
      title: 'Description',
      dataIndex: 'description',
      key: 'description',
    },
    {
      title: 'Quantity',
      dataIndex: 'quantity',
      key: 'quantity',
    },
  ];

  return (
    <div className="p-4">
      <Table dataSource={products} columns={columns} rowKey="id" />
    </div>
  );
};

export default ProductsTable;
