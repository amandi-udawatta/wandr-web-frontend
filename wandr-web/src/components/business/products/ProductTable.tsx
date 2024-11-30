import React, { useState, useEffect } from 'react';
import { Avatar, Button, Space, Table, Tooltip} from 'antd';
import {ExclamationCircleOutlined } from '@ant-design/icons';
import TableCard from '../../admin/TableCard';
import { useRouter } from 'next/navigation';
import { apiService, showNotification } from '@/services/apiService';
import LoadingPopup from '../../general/LoadingPopup';
import Cookies from 'js-cookie';


interface Product {
  id: number;
  name: string;
  price: number;
  reservationPayment: number;
  description: string;
  quantity: number;
  imageUrl: string;
}

// const initialProducts: Product[] = [
//   {
//     id: 1,
//     name: 'Handcrafted Silver Necklace',
//     price: 120,
//     reservationPayment: 30,
//     description: 'A beautifully handcrafted silver necklace with intricate designs, perfect for special occasions.',
//     quantity: 2,
//     imageUrl: '/product1.png'
//   },
//   {
//     id: 2,
//     name: 'Designer Summer Dress',
//     price: 75,
//     reservationPayment: 20,
//     description: 'A stylish and comfortable summer dress made from high-quality materials, available in various sizes.',
//     quantity: 100,
//     imageUrl: '/product2.png'
//   },
//   {
//     id: 3,
//     name: 'Organic Hand Cream',
//     price: 25,
//     reservationPayment: 5,
//     description: 'Nourishing hand cream made with organic ingredients to keep your hands soft and hydrated.',
//     quantity: 80,
//     imageUrl: '/product3.png'
//   },
//   {
//     id: 4,
//     name: 'Local Artisan Pottery',
//     price: 45,
//     reservationPayment: 10,
//     description: 'Beautifully crafted pottery pieces made by local artisans, adding a unique touch to your home.',
//     quantity: 30,
//     imageUrl: '/product4.png'
//   },
//   {
//     id: 5,
//     name: 'Handmade Wooden Toys',
//     price: 35,
//     reservationPayment: 10,
//     description: 'Charming and durable wooden toys handcrafted by local craftsmen, perfect for children of all ages.',
//     quantity: 0,
//     imageUrl: '/product5.png'
//   },
// ];

import {jwtDecode} from 'jwt-decode';

const getBusinessIdFromToken = (token: string) => {
  try {
    const decodedToken: any = jwtDecode(token);
    console.log("decoded token: ", decodedToken);
    return decodedToken.id; // Assuming the businessId is in the token's payload
  } catch (error) {
    console.error('Error decoding token:', error);
    return null;
  }
};

const ProductsTable: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        // Get the token from local storage or your authentication provider
        const token = Cookies.get('accessToken');
        console.log("accessToken", token) // Adjust this based on how you store your token
        
        // Get the businessId from the decoded token
        const businessId = token ? getBusinessIdFromToken(token) : null;
        console.log("decoded id: ", businessId);
    
        if (!businessId) {
          showNotification('error', 'Operation Status', 'No business ID found in token');
          setIsLoading(false);
          return;
        }
    
        // Make the API call with the businessId
        const response = await apiService.get(`/products/business/${businessId}`);
    
        if (response.success) {
          const transformedData = response.data.map((product: any, index: number) => ({
            key: product.product_id.toString(),
            id: (index + 1).toString(),
            name: product.name,
            price: product.price,
            reservationPayment: product.reservation_payment, // Adjust this as needed
            description: product.description,
            quantity: product.quantity,
            imageUrl: `/product${product.product_id}.png`, // Placeholder image
          }));
    
          setProducts(transformedData);
          showNotification('success', 'Operation Status', response.message || 'Successfully Fetched Product Details');
        } else {
          throw new Error(response.message || 'Failed to fetch products');
        }
      } catch (error) {
        showNotification('error', 'Operation Status', 'Error Fetching Product Details');
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

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
      render: (text: string, record: Product) => (
        <div className="flex items-center space-x-2">
          <Avatar src={record.imageUrl} size="large" />
          <span>{text}</span>
        </div>
      ),
    },
    {
      title: 'Price',
      dataIndex: 'price',
      key: 'price',
      render: (text: number) => <span>{text}</span>,
    },
    {
      title: 'Reservation Payment',
      dataIndex: 'price',
      key: 'reservationPayment',
      render: (text: number) => <span>{Math.ceil(text*30)/100}</span>,
    },
    {
      title: 'Description',
      dataIndex: 'description',
      key: 'description',
      render: (text: string) => (
        <Tooltip title={text}>
          <span>{text.length > 50 ? `${text.slice(0, 50)}...` : text}</span>
        </Tooltip>
      ),
    },
    {
      title: 'Quantity',
      dataIndex: 'quantity',
      key: 'quantity',
      render: (text: number) => (
        <span style={{ color: text < 5 ? 'red' : 'inherit', fontWeight: text < 5 ? 'bold' : 'normal' }}>
          {text}
        </span>
      ),
    },
  ];

  return (
    <div className="p-4">
      <TableCard 
        columns={columns}
        data={products}
        title='Your Products'
        onRow={(record) => ({
          onClick: () => {
            router.push(`/api/business/products/${record.key}`); // Navigate to the product detail page
          },
        })}
      />
      <LoadingPopup
        visible={isLoading}
        title="Fetching All Products"
        description="Please wait while we gather all the details for you. This might take a moment."
      />
    </div>
  );
};

export default ProductsTable;
