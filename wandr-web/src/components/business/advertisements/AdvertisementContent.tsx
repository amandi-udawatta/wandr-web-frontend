import React, { useState } from 'react';
import { Button, Modal, Input, Row, Col, Form, message, Select } from 'antd';
import { AdCard } from './AdCard';
import AdvertisementCarousel from '@/components/business/advertisements/AdCarousel';
import { ArrowDownOutlined, InboxOutlined } from '@ant-design/icons';
import { Upload } from 'antd';

const { Option } = Select;

const dummyAds = [
  {
    title: 'Ad 1',
    description: 'Special Holiday Sale with up to 50% off!',
    status: 'Ongoing',
    postedDate: '2024-11-25',
    imageUrl: '/advertisement1.jpg',
    image: '/advertisement1.jpg',
    remainingDays: 10,
  },
  {
    title: 'Ad 2',
    description: 'Requesting approval for the upcoming Winter Special campaign.',
    status: 'Requested',
    postedDate: '2024-11-20',
    imageUrl: '/advertisement2.jpeg',
    image: '/advertisement2.jpeg',
    remainingDays: 5,
  },
  {
    title: 'Ad 3',
    description: 'Our New Year Discount event successfully concluded.',
    status: 'Completed',
    postedDate: '2024-11-15',
    imageUrl: '/advertisement3.jpg',
    image: '/advertisement3.jpg',
    remainingDays: 0,
  },
];

export const AdvertisementContent: React.FC = () => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [formDisabled, setFormDisabled] = useState(true);
  const [form] = Form.useForm();
  const [filteredAds, setFilteredAds] = useState(dummyAds); // State for filtered ads

  const handleToggleForm = () => {
    setFormDisabled((prev) => !prev);
    if (!formDisabled) form.resetFields();
  };

  const handleCancel = () => {
    setIsModalVisible(false);
    setFormDisabled(true);
    form.resetFields();
  };

  const handleSubmit = () => {
    message.success('New advertisement added successfully');
    handleCancel();
  };

  const handleFilterChange = (value: string) => {
    if (value) {
      setFilteredAds(dummyAds.filter((ad) => ad.status === value));
    } else {
      setFilteredAds(dummyAds); // Show all ads if no filter is selected
    }
  };

  return (
    <div style={{ padding: '24px' }}>
      <Row gutter={16} className="justify-around">
        <Col span={24}>
          <Row gutter={16} className="justify-around">
            <Col span={8}>
              <AdvertisementCarousel advertisements={dummyAds} />
            </Col>
            <Col span={15}>
              <div className="border border-gray-200 rounded-xl p-5">
                <Row className='flex align-middle'>
                    <Col span={16}>
                        <h1 className="text-xl font-bold mb-3 mt-3 my-text">Add a new advertisement</h1>
                    </Col>
                    <Col span={8} className='justify-end flex'>
                        <Button
                            type="primary"
                            onClick={handleToggleForm}
                            style={{ marginBottom: '16px' }}
                            className="bg-green-50"
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
                    <Col span={11}>
                      <Form.Item
                        label="Title"
                        name="title"
                        rules={[{ required: true, message: 'Please input the title!' }]}
                      >
                        <Input />
                      </Form.Item>
                    </Col>
                    <Col span={11}>
                      <Form.Item
                        label="Caption"
                        name="caption"
                        rules={[{ required: true, message: 'Please input the caption!' }]}
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
                  <Button type="primary" htmlType="submit" style={{ width: '100%' }} className="bg-green-50">
                    Submit
                  </Button>
                </Form>
              </div>
            </Col>
          </Row>
        </Col>
      </Row>

      {/* Your Advertisements Section */}
      <div className='border border-gray-200 rounded-xl p-5 mt-5'>
      <h1 className="text-xl font-bold mb-3 mt-3 my-text">Your Advertisements</h1>
      <Row className='flex align-middle'>
        <Col className='mr-5'>
            <p className='text-gray-30 text-sm'>Filter your advertisements by the status (Ongoing, Requested or Removed)</p>
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
        {/* Advertisement Cards */}
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
