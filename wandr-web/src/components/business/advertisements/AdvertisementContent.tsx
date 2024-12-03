import React, { useState } from 'react';
import { Button, Input, Row, Col, Form, message, Select, Upload } from 'antd';
import { AdCard } from './AdCard';
import AdvertisementCarousel from '@/components/business/advertisements/AdCarousel';
import { InboxOutlined, PlusOutlined } from '@ant-design/icons';
import { getIdFromToken } from '@/services/tokenDecodeService'; // Import your token service
import { uploadToCloudinary } from '@/services/uploadImagesService'; // Import your image upload service
import { apiService, showNotification } from '@/services/apiService';

const { Option } = Select;

const dummyAds = [
  {
    title: 'Ad 1',
    description: 'Special Holiday Sale with up to 50% off!',
    status: 'Ongoing',
    postedDate: '2024-11-25',
    imageUrl: 'https://res.cloudinary.com/djmcupdjl/image/upload/v1733065196/jpla57elcxamqxv3fxfm.jpg',
    remainingDays: 10,
  },
  {
    title: 'Ad 2',
    description: 'Requesting approval for the upcoming Winter Special campaign.',
    status: 'Requested',
    postedDate: '2024-11-20',
    imageUrl: '/advertisement2.jpeg',
    remainingDays: 5,
  },
  {
    title: 'Ad 3',
    description: 'Our New Year Discount event successfully concluded.',
    status: 'Completed',
    postedDate: '2024-11-15',
    imageUrl: '/advertisement3.jpg',
    remainingDays: 0,
  },
];

export const AdvertisementContent: React.FC = () => {
  const [formDisabled, setFormDisabled] = useState(true);
  const [form] = Form.useForm();
  const [filteredAds, setFilteredAds] = useState(dummyAds);

  const handleToggleForm = () => {
    setFormDisabled((prev) => !prev);
    if (!formDisabled) form.resetFields();
  };

  const handleCancel = () => {
    setFormDisabled(true);
    form.resetFields();
  };

  const handleSubmit = async (values: any) => {
    try {
      const businessId = getIdFromToken(); // Get business ID from token
      if (!businessId) {
        showNotification('error', 'Operation Status', 'Failed to retrieve business ID. Please log in again.');
        return;
      }
  
      const file = values.image?.[0]?.originFileObj;
      if (!file) {
        showNotification('error', 'Operation Status', 'Please upload an image.');
        return;
      }
  
      // Use the existing function to upload the image
      const imageUrl = await uploadToCloudinary(file);
      if (!imageUrl) {
        showNotification('error', 'Operation Status', 'Failed to upload the image. Try again.');
        return;
      }
  
      // Prepare advertisement data
      const advertisementData = {
        businessId,
        title: values.title,
        description: values.description,
        image: imageUrl, // Use the secure URL from the uploaded image
      };
    
      const response = await apiService.post('/ads/create', advertisementData);
      console.log(response, "response");

      if (response.success) {
        showNotification('success', 'Operation Status', 'Advertisement added successfully!');
        handleCancel(); // Reset the form after success
      } else {
        showNotification('error', 'Operation Status', response.message || 'Failed to add the advertisement');
      }
    } catch (error) {
      console.error('Error creating advertisement:', error);
      showNotification('error', 'Operation Status', 'Error creating advertisement. Please try again.');
    }
  };

  const handleFilterChange = (value: string) => {
    setFilteredAds(value ? dummyAds.filter((ad) => ad.status === value) : dummyAds);
  };

  return (
    <div style={{ padding: '24px' }}>
      <Row gutter={16} className="justify-around">
        <Col span={8}>
          <AdvertisementCarousel advertisements={dummyAds.map(ad => ({ ...ad, image: ad.imageUrl }))} />
        </Col>
        <Col span={15}>
          <div className="border border-gray-200 rounded-xl p-5">
            <Row className="flex align-middle">
              <Col span={16}>
                <h1 className="text-xl font-bold mb-3 mt-3">Add a new advertisement</h1>
              </Col>
              <Col span={8} className="justify-end flex">
                <Button
                  type="primary"
                  onClick={handleToggleForm}
                  style={{ marginBottom: '16px' }}
                  className='bg-green-50'
                  icon={formDisabled ? <PlusOutlined /> : null}
                >
                  {formDisabled ? 'Add New Advertisement' : 'Disable Form'}
                </Button>
              </Col>
            </Row>
            <Form
              form={form}
              layout="vertical"
              disabled={formDisabled}
              onFinish={handleSubmit}
            >
              <Row className="justify-between">
                <Col span={24}>
                  <Form.Item
                    label="Title"
                    name="title"
                    rules={[{ required: true, message: 'Please input the title!' }]}
                  >
                    <Input />
                  </Form.Item>
                </Col>
              </Row>
              <Row>
                <Col span={24}>
                  <Form.Item
                    label="Description"
                    name="description"
                    rules={[{ required: true, message: 'Please input the description!' }]}
                  >
                    <Input.TextArea rows={3} />
                  </Form.Item>
                </Col>
              </Row>
              <Row>
                <Col span={24}>
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
                </Col>
              </Row>
              <Button type="primary" htmlType="submit" style={{ width: '100%' }} className='bg-green-50'>
                Submit
              </Button>
            </Form>
          </div>
        </Col>
      </Row>

      <div className="border border-gray-200 rounded-xl p-5 mt-5">
        <h1 className="text-xl font-bold mb-3 mt-3">Your Advertisements</h1>
        <Row className="flex align-middle">
          <Col className="mr-5">
            <p className="text-gray-30 text-sm">Filter by status</p>
          </Col>
          <Col>
            <Select
              placeholder="Filter by status"
              onChange={handleFilterChange}
              allowClear
              style={{ width: '200px', marginBottom: '16px' }}
            >
              <Option value="Ongoing">Ongoing</Option>
              <Option value="Requested">Requested</Option>
              <Option value="Completed">Completed</Option>
            </Select>
          </Col>
        </Row>
        <Row gutter={16}>
          {filteredAds.map((ad, index) => (
            <Col span={8} key={index}>
              <AdCard {...ad} />
            </Col>
          ))}
        </Row>
      </div>
    </div>
  );
};
