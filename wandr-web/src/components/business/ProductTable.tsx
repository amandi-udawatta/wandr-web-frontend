
import React, { useState } from 'react';
import {Avatar, Button, Space, Table, Tooltip, Input, InputNumber, Modal, Col, Form, Image} from 'antd';
import {DeleteOutlined, EditOutlined, SaveOutlined, ExclamationCircleOutlined, InboxOutlined} from '@ant-design/icons';
import TableCard from '../admin/TableCard';
import Dragger from "antd/lib/upload/Dragger";

interface Product {
  id: number;
  name: string;
  price: number;
  advance: number;
  description: string;
  quantity: number;
  imageUrl: string;
}

interface mode{
  mode: string;
  p1: string
  p2: string
  p3: string
  p4: string
  p5: string
  upload?: boolean | false
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
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [product,setProduct] = useState<Product>({id: 0, name: '', price: 0, advance: 0, description: '', quantity: 0, imageUrl: ''});
  const [mode, setMode] = useState<mode>({mode: 'add',p1: "Upload Image", p2: "Quantity", p3: "Name of the Product", p4: "Description", p5: "Price",upload:false});
  const handleEdit = (row: Product) => {
    setMode({mode: 'edit', p1: "Change Image", p2: "Change Quantity", p3: "Edit Name of the Product", p4: "Change Description", p5: "Change Price"})
    setProduct(row);
    setIsModalOpen(true);
  };


  const handleAdd = () => {
    setMode({mode: 'add', p1: "Upload Image", p2: "Quantity", p3: "Name of the Product", p4: "Description", p5: "Price"})
    setProduct({id: 0, name: '', price: 0, advance: 0, description: '', quantity: 0, imageUrl: ''});
    setIsModalOpen(true);
  }

  const handleCancel = () => {
    setIsModalOpen(false);
  };
  const handleSave = () => {
    setIsModalOpen(false);
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
      render: (text: string, record:Product ) =>
          editingRow === record.id ? (
              <Button
                  icon={<SaveOutlined className='text-green-600' />}
                  type="text"
                  onClick={() => handleSave()}
              />
          ) : (
              <Space size="middle">
                <Button
                    icon={<EditOutlined className='text-blue-600' />}
                    type="text"
                    onClick={() => handleEdit(record)}
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
        <Modal width={750} title={mode.mode=="add"?"Add New Product":"Edit Product Details"} centered open={isModalOpen} onOk={handleSave} onCancel={handleCancel}>
          <Col  className="flex flex-row justify-around">
            <Col span={11}>
              <Form.Item

                  name="upload"
                  label={<span  className="text-green-50 font-semibold text-[16px]">{mode.p1}</span>}
                  valuePropName="fileList"
                  getValueFromEvent={(e) => (Array.isArray(e) ? e : e && e.fileList)}

              >
                <Dragger name="files" action="/upload.do" >
                  {mode.mode === 'edit' ? <Image src={product?.imageUrl} height={150} className="h-max-48"/> : <InboxOutlined className="text-green-50 text-6xl my-5" />}


                  <p className="text-green-50">Click or drag file to this area to upload</p>

                </Dragger>
              </Form.Item>
              <Form.Item
                  name = {mode.p2}
                  rules={[{ required: true, message: "Please input the "+mode.p2+"!" }]}
              >
                <span className="text-green-50 font-semibold text-[16px] ">{mode.p2}</span>
                <Input className="h-10 bg-gray-20/10 mt-2" value={product?.quantity}
                       onChange={(e) => setProduct(prev => ({ ...prev, quantity: parseInt(e.target.value, 10)|0 }))}
                />

              </Form.Item>


            </Col>


            <Col span={11}>
              <Form.Item
                  name = {mode.p3}
                  rules={[{ required: true, message: "Please input the "+mode.p3+"!" }]}
              >
                <span className="text-green-50 font-semibold text-[16px] ">{mode.p3}</span>
                <Input className="h-10 bg-gray-20/10 mt-2"
                       value={product?.name}
                       onChange={(e) => setProduct(prev => ({ ...prev, name: e.target.value }))}
                />
              </Form.Item>
              <Form.Item
                  name={mode.p4}
                  rules={[{ required: true, message: "Please input the Description!" }]}
              >
                <span className="text-green-50 font-semibold text-[16px] ">{mode.p4}</span>
                <Input.TextArea className="!min-h-[120px] bg-gray-20/10 mt-2"
                                value={product?.description}
                                onChange={(e) => setProduct(prev => ({ ...prev, description: e.target.value }))}
                />
              </Form.Item>
              <Form.Item
                  name = {mode.p5}
                  rules={[{ required: true, message: "Please input the "+mode.p5+"!" }]}
              >
                <span className="text-green-50 font-semibold text-[16px] ">{mode.p5}</span>
                <Input className="h-10 bg-gray-20/10 mt-2"
                       value={product?.price}
                       onChange={(e) => setProduct(prev => ({ ...prev, price: parseInt(e.target.value, 10)|0 }))}
                />
              </Form.Item>



            </Col>

          </Col>
        </Modal>

        <TableCard
            columns={columns}
            data={products}
            title='Your Products'
            function={handleAdd}
        />
      </div>
  );
};
export default ProductsTable;

