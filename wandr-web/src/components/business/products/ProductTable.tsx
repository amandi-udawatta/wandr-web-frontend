import React, { useState, useEffect } from 'react';
import { Avatar, Button, Space, Table, Tooltip, Modal, Form, Input, Upload, message } from 'antd';
import { ExclamationCircleOutlined, InboxOutlined, PlusOutlined } from '@ant-design/icons';
import TableCard from '../../admin/TableCard';
import { useRouter } from 'next/navigation';
import { apiService, showNotification } from '@/services/apiService';
import LoadingPopup from '../../general/LoadingPopup';
import { getIdFromToken } from '@/services/tokenDecodeService';
import { uploadToCloudinary } from '@/services/uploadImagesService';

const { Dragger } = Upload;

interface Product {
  key: string;
  id: number;
  name: string;
  price: number;
  reservationPayment: number;
  description: string;
  quantity: number;
  imageUrl: string;
}

const ProductsTable: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const [form] = Form.useForm();

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        const businessId = getIdFromToken();
        const response = await apiService.get(`/products/business/${businessId}`);
        if (response.success) {
          const transformedData = response.data.map((product: any, index: number) => ({
            key: product.product_id.toString(),
            id: (index + 1).toString(),
            name: product.name,
            price: product.price,
            reservationPayment: product.reservation_payment,
            description: product.description,
            quantity: product.quantity,
            imageUrl: product.image || '/default_product.png',
          }));
          setProducts(transformedData);
          showNotification('success', 'Operation Status', 'Successfully Fetched Product Details');
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
 
  const handleAddProduct = async (values: any) => {
    try {
      const businessId = getIdFromToken();
      const imageUrl = await uploadToCloudinary(values.image[0].originFileObj);
      const newProduct = {
        name: values.name,
        description: values.description,
        quantity: values.quantity,
        price: values.price,
        business_id: businessId,
        image: imageUrl,
      };
  
      const response = await apiService.post('/products/create', newProduct);
  
      if (response.success) {
        showNotification('success', 'Product Added', 'Product added successfully');
        setIsModalVisible(false);
        form.resetFields();
      } else {
        throw new Error(response.message || 'Failed to add product');
      }
    } catch (error) {
      showNotification('error', 'Error', (error as any).message || 'Error adding product');
    }
  };

  const columns = [
    {
      title: 'Product ID',
      dataIndex: 'id',
      key: 'id',
      render: (text: number, record: Product) => (
        <div className="flex items-center space-x-2">
          <span>{text}</span>
          {record.quantity < 5 && (
            <Tooltip title="This product is low on quantity">
              <ExclamationCircleOutlined style={{ color: 'red' }} />
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
      <Space className='flex justify-between'>
        <p className='my-5 text-gray-30 text-sm'>Please Click on a Product to view more details</p>
        <Button type="primary" onClick={() => setIsModalVisible(true)} className='bg-green-50' icon={<PlusOutlined />}
        >
          Add New Product
        </Button>
      </Space>
      <TableCard 
        columns={columns} 
        data={products} 
        title="Your Products"
        onRow={(record) => ({
          onClick: () => {
            router.push(`/api/business/products/${record.key}`); // Navigate to the product detail page
          },
        })}
      />
      <LoadingPopup visible={isLoading} title="Fetching Products" description="Please wait..." />
      <Modal
        title="Add New Product"
        open={isModalVisible}
        onCancel={() => setIsModalVisible(false)}
        footer={null}
      >
        <Form form={form} layout="vertical" onFinish={handleAddProduct}>
          <Form.Item name="name" label="Product Name" rules={[{ required: true, message: 'Please enter the name' }]}>
            <Input />
          </Form.Item>
          <Form.Item
            name="price"
            label="Price"
            rules={[
              { required: true, message: 'Please enter the price' },
              {
                pattern: /^\d+$/,
                message: 'Price must be a number containing digits only (0-9)',
              },
            ]}
          >
            <Input type="text" />
          </Form.Item>

          <Form.Item name="description" label="Description" rules={[{ required: true, message: 'Please enter a description' }]}>
            <Input.TextArea rows={3} />
          </Form.Item>
          <Form.Item name="quantity" label="Quantity" rules={[{ required: true, message: 'Please enter the quantity' }]}>
            <Input type="number" />
          </Form.Item>
          <Form.Item
              label="Upload Image"
              name="image"
              valuePropName="fileList"
              getValueFromEvent={(e) => (Array.isArray(e) ? e : e?.fileList)}
              rules={[{ required: true, message: 'Please upload an image!' }]}
            >
              <Upload.Dragger
                name="image"
                beforeUpload={() => false}
                accept=".jpg,.png,.jpeg"
                showUploadList
                maxCount={1}
              >
                <p className="ant-upload-drag-icon">
                  <InboxOutlined />
                </p>
                <p className="ant-upload-text">Click or drag file to this area to upload</p>
              </Upload.Dragger>
            </Form.Item>
          <Button type="primary" htmlType="submit" style={{ width: '100%' }}>
            Submit
          </Button>
        </Form>
      </Modal>
    </div>
  );
};

export default ProductsTable;
