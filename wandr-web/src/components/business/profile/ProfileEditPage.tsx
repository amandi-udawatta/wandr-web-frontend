import React, { useState, useEffect } from 'react';
import { Form, Input, Button, Select, message, Row, Col, Upload } from 'antd';
import { PlusOutlined, InboxOutlined } from '@ant-design/icons';
import { apiService, showNotification } from '@/services/apiService';
import { getIdFromToken } from '@/services/tokenDecodeService';
import { uploadToCloudinary } from '@/services/uploadImagesService'; // Import the image upload service

const { Option } = Select;
const { Dragger } = Upload;

const ProfileEditComponent: React.FC = () => {
  const [form] = Form.useForm();
  const [services, setServices] = useState<string[]>([]);
  const [newService, setNewService] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [profileImageUrl, setProfileImageUrl] = useState<string>('');
  const [shopImageUrl, setShopImageUrl] = useState<string>('');

  useEffect(() => {
    const fetchBusinessData = async () => {
      setIsLoading(true);
      try {
        const businessId = getIdFromToken();
        const response = await apiService.get(`/business/${businessId}`);
        if (response.success) {
          const data = response.data;
          form.setFieldsValue({
            name: data.name,
            description: data.description,
            address: data.address,
            business_contact: data.businessContact,
            owner_name: data.ownerName,
            owner_contact: data.ownerContact,
            website_url: data.websiteUrl,
            services: data.services,
          });
          setServices(data.services || []);
          setProfileImageUrl(data.profile_image || '');
          setShopImageUrl(data.shop_image || '');
        } else {
          throw new Error(response.message || 'Failed to fetch business details');
        }
      } catch (error) {
        showNotification('error', 'Operation Status', 'Error Fetching Business Details');
      } finally {
        setIsLoading(false);
      }
    };

    fetchBusinessData();
  }, [form]);

  // Handle Profile Image Upload
  const handleProfileImageUpload = async (options: any) => {
    const { file, onSuccess, onError } = options;
    try {
      const uploadedUrl = await uploadToCloudinary(file); // Use the custom service
      setProfileImageUrl(uploadedUrl);
      onSuccess("Profile image uploaded successfully.");
    } catch (error) {
      onError("Failed to upload profile image.");
    }
  };

  // Handle Shop Image Upload
  const handleShopImageUpload = async (options: any) => {
    const { file, onSuccess, onError } = options;
    try {
      const uploadedUrl = await uploadToCloudinary(file); // Use the custom service
      setShopImageUrl(uploadedUrl);
      onSuccess("Shop image uploaded successfully.");
    } catch (error) {
      onError("Failed to upload shop image.");
    }
  };

  const onAddService = () => {
    const trimmedService = newService.trim();
    if (trimmedService && !services.includes(trimmedService)) {
      setServices([...services, trimmedService]);
      setNewService('');
    }
  };

  const onFinish = async (values: any) => {
    try {
      const businessId = getIdFromToken();
      if (businessId) {
        const payload = {
          ...values,
          services,
          profile_image: profileImageUrl,
          shop_image: shopImageUrl,
        };
        console.log('Payload:', payload);
        // const response = await apiService.put(`/business/${businessId}`, payload);
        // response.success ? message.success('Profile updated successfully!') : message.error('Failed to update profile.');
      }
    } catch (error) {
      message.error('Error updating profile.');
    }
  };

  return (
    <div className="p-6 rounded-lg mx-5">
      <Form form={form} onFinish={onFinish} layout="vertical">

        <Row gutter={16}>
          <Col span={12}>
            <Form.Item name="name" label="Business Name" rules={[{ required: true, message: 'Please enter the business name!' }]}>
              <Input placeholder="Business Name" size="large" />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item name="owner_name" label="Owner Name" rules={[{ required: true, message: 'Please enter the business name!' }]}>
              <Input placeholder="Owner Name" size="large" />
            </Form.Item>
          </Col>
        </Row>

        <Row gutter={16}>
          <Col span={12}>
            <Form.Item name="business_contact" label="Business Contact" rules={[{ required: true, message: 'Please enter the business contact!' }]}>
              <Input placeholder="Business Contact" size="large" />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item name="owner_contact" label="Owner Contact" rules={[{ required: true, message: 'Please enter the owner contact!' }]}>
              <Input placeholder="Owner Contact" size="large" />
            </Form.Item>
          </Col>
        </Row>

        <Row gutter={16}>
          <Col span={12}>
            <Form.Item name="address" label="Address" rules={[{ required: true, message: 'Please enter the address!' }]}>
              <Input placeholder="123 Street, City" size="large" />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item name="website_url" label="Website">
              <Input placeholder="Website URL" size="large" />
            </Form.Item>
          </Col>
        </Row>

        <Form.Item name="description" label="Description" rules={[{ required: true, message: 'Please enter the business description!' }]}>
          <Input.TextArea placeholder="Business Description" size="large" />
        </Form.Item>

        <Form.Item label="Services" rules={[{ required: true, message: 'Please enter the business services!' }]}>
          <Select mode="multiple" value={services} onChange={setServices} size="large" placeholder="Select services">
            {services.map((service) => (
              <Option key={service} value={service}>
                {service}
              </Option>
            ))}
          </Select>
          <Input
            placeholder="Add new service"
            value={newService}
            onChange={(e) => setNewService(e.target.value)}
            size="large"
            className="mt-2"
          />
          <Button icon={<PlusOutlined />} onClick={onAddService} className="mt-2" size="large">
            Add Service
          </Button>
        </Form.Item>
        <Row gutter={16}>
          <Col span={12}>
            <Form.Item label="Profile Image">
              <Dragger
                customRequest={handleProfileImageUpload}
                accept=".jpg,.png,.jpeg"
                multiple={false}
              >
                <p className="ant-upload-drag-icon">
                  <InboxOutlined />
                </p>
                <p className="ant-upload-text">Click or drag file to upload profile image</p>
              </Dragger>
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item label="Shop Image">
              <Dragger
                customRequest={handleShopImageUpload}
                accept=".jpg,.png,.jpeg"
                multiple={false}
              >
                <p className="ant-upload-drag-icon">
                  <InboxOutlined />
                </p>
                <p className="ant-upload-text">Click or drag file to upload shop image</p>
              </Dragger>
            </Form.Item>
          </Col>
        </Row>

        <Form.Item>
          <Button type="primary" htmlType="submit" size="large" loading={isLoading}>
            Save Changes
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default ProfileEditComponent;
