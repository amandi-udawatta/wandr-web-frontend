'use client';

import React, {useState} from 'react';
import AdminHeader from '@/components/admin/AdminHeader';
import AdminSidebar from '@/components/admin/AdminSideBar';
import BusinessPlanCard from '@/components/admin/BusinessPlanCard';
import { Button, Col, Form, Input, Modal, Row, Select } from 'antd';
import { PlusOutlined } from '@ant-design/icons';

const { Option } = Select;

const AdminBusinessPlans: React.FC = () => {

  const handleEdit = (id: number, set: string) => {
    console.log(`Edit button clicked for plan id: ${id} in plan set ${set}`);
  };

  const handleDelete = (id: number, set: string) => {
    console.log(`Delete button clicked for plan id: ${id} in plan set ${set}`);
  };

  const BusinessPlans = [
    {
      id: 1,
      title: 'Basic Plan',
      description: 'This is the basic plan.',
      features: ['Feature 1', 'Feature 2', 'Feature 3'],
      price: 4999,
    },
    {
      id: 2,
      title: 'Standard Plan',
      description: 'This is the standard plan.',
      features: ['Feature 4', 'Feature 5', 'Feature 6'],
      price: 9999,
    },
    {
      id: 3,
      title: 'Premium Plan',
      description: 'This is the premium plan.',
      features: ['Feature 7', 'Feature 8', 'Feature 9'],
      price: 14999,
    },
    // Add more plans as needed
  ];

  const TouristPlans = [
    {
      id: 1,
      title: 'Free Plan',
      description: 'This is the free plan.',
      features: ['Feature 1', 'Feature 2', 'Feature 3'],
      price: 4999,
    },
    {
      id: 2,
      title: 'Premium Plan',
      description: 'This is the premium plan.',
      features: ['Feature 7', 'Feature 8', 'Feature 9'],
      price: 14999,
    },
    // Add more plans as needed
  ];

  const [currentSet, setCurrentSet] = useState("BusinessPlans");

  const getCurrentPlans = () => {
    return currentSet === 'BusinessPlans' ? BusinessPlans : TouristPlans;
  };

  const [modalVisible, setModalVisible] = useState(false);
  const [form] = Form.useForm();

  const handleAddPlan = () => {
    setModalVisible(true);
  };

  const handleCancel = () => {
    setModalVisible(false);
    form.resetFields();
  };

  const handleCreate = () => {
    form.validateFields()
      .then((values) => {
        console.log('Received values:', values);
        // Make API call to send `values` to backend
        // Replace the console log with your API call logic
        handleCancel(); // Close modal after successful form submission
      })
      .catch((errorInfo) => {
        console.error('Validation failed:', errorInfo);
      });
  };

  const addFeatureField = () => {
    const currentFeatures = form.getFieldValue('features') || [];
    form.setFieldsValue({ features: [...currentFeatures, ''] });
  };

  const removeFeatureField = (index: number) => {
    const currentFeatures = form.getFieldValue('features') || [];
    form.setFieldsValue({ features: currentFeatures.filter((_:any, i:any) => i !== index) });
  };

  return (
    <div className="flex h-screen">
      <AdminSidebar active={'Business Plans'}/>
      <div className="flex-1 flex flex-col">
        <AdminHeader page={'Business Plans'} />
        <div className="p-8">
          <Row className='mb-4'>
          <Col span={3}>
              <Button
                type={currentSet === 'BusinessPlans' ? 'primary' : 'default'}
                onClick={() => setCurrentSet('BusinessPlans')}
                style={{
                  marginLeft: 8,
                  backgroundColor: currentSet === 'BusinessPlans' ? '#609734' : undefined,
                  borderColor: currentSet === 'BusinessPlans' ? '#609734' : undefined,
                }}
              >
                Business Plans
              </Button>
            </Col>
            <Col span={3}>
              <Button
                type={currentSet === 'TouristPlans' ? 'primary' : 'default'}
                onClick={() => setCurrentSet('TouristPlans')}
                style={{
                  backgroundColor: currentSet === 'TouristPlans' ? '#609734' : undefined,
                  borderColor: currentSet === 'TouristPlans' ? '#609734' : undefined,
                }}
              >
                Tourist Plans
              </Button>
            </Col>
            <Col span={12} offset={6}>
              <Button
                type="primary"
                icon={<PlusOutlined />}
                onClick={handleAddPlan}
                style={{ float: 'right', backgroundColor: '#609734', borderColor: '#609734' }}
              >
                Add New Place
              </Button>
            </Col>
          </Row>
          <Row gutter={[16, 16]}>
            {getCurrentPlans().map((plan: any) => (
              <Col key={plan.id} span={8}>
                <BusinessPlanCard 
                  title={plan.title}
                  description={plan.description}
                  features={plan.features}
                  price={plan.price}
                  onEdit={() => handleEdit(plan.id, currentSet === 'BusinessPlans' ? 'Business Plans' : 'Tourist Plans')}
                  onDelete={() => handleDelete(plan.id, currentSet === 'BusinessPlans' ? 'Business Plans' : 'Tourist Plans')}
                />
              </Col>
            ))}
          </Row>

          <Modal
            open={modalVisible}
            title="Add New Plan"
            onCancel={handleCancel}
            footer={[
              <Button key="cancel" onClick={handleCancel}>
                Cancel
              </Button>,
              <Button key="create" type="primary" onClick={handleCreate}>
                Create
              </Button>,
            ]}
          >
            <Form form={form} layout="vertical" onFinish={handleCreate}>
              <Form.Item name="title" label="Title" rules={[{ required: true, message: 'Please enter the title' }]}>
                <Input />
              </Form.Item>
              <Form.Item
                name="type"
                label="Type"
                rules={[{ required: true, message: 'Please select the type' }]}
              >
                <Select>
                  <Option value="Business">Business Plan</Option>
                  <Option value="Tourist">Tourist Plan</Option>
                </Select>
              </Form.Item>
              <Form.Item
                name="description"
                label="Description"
                rules={[{ required: true, message: 'Please enter the description' }]}
              >
                <Input.TextArea />
              </Form.Item>
              <Form.Item
                name="price"
                label="Price"
                rules={[{ required: true, message: 'Please enter the price' }]}
              >
                <Input type="number" addonAfter="Rs" />
              </Form.Item>
              <Form.List name="features">
                {(fields, { add, remove }) => (
                  <>
                    {fields.map((field, index) => (
                      <Form.Item
                        {...field}
                        key={field.key}
                        label={`Feature ${index + 1}`}
                        rules={[{ required: true, message: 'Please enter a feature' }]}
                      >
                        <Input
                          placeholder="Enter a feature"
                          addonAfter={
                            fields.length > 1 && (
                              <Button onClick={() => remove(field.name)} danger>
                                Remove
                              </Button>
                            )
                          }
                        />
                      </Form.Item>
                    ))}
                    <Form.Item>
                      <Button type="dashed" onClick={() => add()} block>
                        Add Feature
                      </Button>
                    </Form.Item>
                  </>
                )}
              </Form.List>
            </Form>
          </Modal>

        </div>
      </div>
    </div>
  )
}

export default AdminBusinessPlans;
