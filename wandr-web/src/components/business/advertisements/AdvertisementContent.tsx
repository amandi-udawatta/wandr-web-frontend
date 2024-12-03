import React, { useEffect, useState } from 'react';
import { Button, Input, Row, Col, Form, message, Select, Upload } from 'antd';
import { AdCard } from './AdCard';
import AdvertisementCarousel from '@/components/business/advertisements/AdCarousel';
import { InboxOutlined, PlusOutlined } from '@ant-design/icons';
import { getIdFromToken } from '@/services/tokenDecodeService'; // Import your token service
import { uploadToCloudinary } from '@/services/uploadImagesService'; // Import your image upload service
import { apiService, showCentralAlert, showNotification } from '@/services/apiService';

const { Option } = Select;

interface Advertisement {
  adId: string;
  title: string;
  description: string;
  image: string;
  status: string;
  adStartDate: string; // Add postedDate property
  remainingDays: number; // Add remainingDays property
}

export const AdvertisementContent: React.FC = () => {
  const [formDisabled, setFormDisabled] = useState(true);
  const [form] = Form.useForm();
  const [ads, setAds] = useState<Advertisement[]>([]);
  const [filteredAds, setFilteredAds] = useState<Advertisement[]>([]);

  useEffect(() => {
    const fetchAdvertisements = async () => {
      try {
        const businessId = getIdFromToken();
        if (!businessId) {
          message.error('Failed to retrieve business ID. Please log in again.');
          return;
        }
        const response = await apiService.get(`/ads/business/${businessId}`);
        if (response.success) {
          setAds(response.data);
          setFilteredAds(response.data);
        } else {
          message.error('Failed to retrieve advertisements.');
        }
      } catch (error) {
        console.error('Error fetching advertisements:', error);
        message.error('Error fetching advertisements.');
      }
    };

    fetchAdvertisements();
  }, []);

  const formatDate = (timestamp: number) => {
    const date = new Date(timestamp);
    return date.toLocaleDateString(); // Adjust locale as needed
  };

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
        message.error('Failed to retrieve business ID. Please log in again.');
        return;
      }
  
      const file = values.image?.[0]?.originFileObj;
      if (!file) {
        message.error('Please upload an image.');
        return;
      }
  
      // Use the existing function to upload the image
      const imageUrl = await uploadToCloudinary(file);
      if (!imageUrl) {
        message.error('Failed to upload image.');
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
        if(response.data === "LIMIT_EXCEEDED"){
          showCentralAlert(
            'Failed to add an advertisement',
            response.message,
            'error'
          );
          handleCancel(); // Reset the form after failed attempt
        }else{
          showNotification('error', 'Operation Status', response.message || 'Failed to add the advertisement');
          handleCancel();
        }
      }
    } catch (error) {
      console.error('Error creating advertisement:', error);
      showNotification('error', 'Operation Status', 'Error creating advertisement. Please try again.');
      handleCancel();
    }
  };

  const handleFilterChange = (value: string) => {
    setFilteredAds(value ? ads.filter((ad) => ad.status === value) : ads);
  };
  return (
    <div style={{ padding: '24px' }}>
      <Row gutter={16} className="justify-around">
        <Col span={8}>
          <AdvertisementCarousel advertisements={ads.map(ad => ({ ...ad, remainingDays: ad.remainingDays, image: ad.image, postedDate: formatDate(Number(ad.adStartDate))}))} />
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
              <Option value="approved">Approved</Option>
              <Option value="pending">Pending</Option>
            </Select>
          </Col>
        </Row>
        <Row gutter={16}>
          {filteredAds.length === 0 && (
            <div className="text-center py-5">No advertisements found.</div>
          )}
          {filteredAds.map((ad, index) => (
            <Col span={8} key={index}>
              <AdCard
                key={ad.adId}
                title={ad.title}
                description={ad.description}
                status={ad.status}
                adStartDate={ad.adStartDate ? formatDate(Number(ad.adStartDate)) : 'N/A'}
                image={ad.image}
              />
            </Col>
          ))}
        </Row>
      </div>
    </div>
  );
};
