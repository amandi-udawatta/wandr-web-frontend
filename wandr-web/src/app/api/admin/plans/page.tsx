'use client';

import React, {useEffect, useState} from 'react';
import AdminHeader from '@/components/admin/AdminHeader';
import AdminSidebar from '@/components/admin/AdminSideBar';
import BusinessPlanCard from '@/components/admin/BusinessPlanCard';
import { Button, Col, Form, Input, Modal, Row, Select } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import LoadingPopup from '@/components/general/LoadingPopup';
import { apiService, showNotification } from '@/services/apiService';

const { Option } = Select;

const AdminBusinessPlans: React.FC = () => {

  const [currentSet, setCurrentSet] = useState([]);
  const [businessPlans, setBusinessPlans] = useState([]);
  const [travelPlans, setTravelPlans] = useState([]);
  const [status, setStatus] = useState('businessPlans');
  const [isLoading, setIsLoading] = useState(false);
  const [modalType, setModalType] = useState<'create' | 'edit'>('create');
  const [editPlanId, setEditPlanId] = useState<number | null>(null);


  const fetchBusinessPlans = async () => {
    setIsLoading(true);
    try {
      const response = await apiService.get('/business-plans');
      console.log(response);

      if (response.success) {
        if (response.data) {

          const formattedData = response.data.map((item:any, index:any) => ({
            key: index + 1,
            number: index + 1,
            id: item.planId,
            name: item.name,
            description: item.description,
            features: item.features,
            price: item.price,
          }));

          setBusinessPlans(formattedData);
          if (status === 'businessPlans') {
            setCurrentSet(formattedData);
          }
          showNotification('success', 'Operation Status', response.message || 'Successfully Fetched Business Plan Details');
        } else {
          setBusinessPlans([]);
          if (status === 'businessPlans') {
            setCurrentSet([]);
          }
          showNotification('warning', 'Operation Status', 'No data available');
        }
      } else {
        throw new Error(response.message || 'Failed to fetch plans');
      }
    } catch (error) {
      showNotification('error', 'Operation Status', 'Error Fetching Business Plan Details');
    } finally {
      setIsLoading(false);
    }
  };

  const fetchTravelPlans = async () => {
    setIsLoading(true);
    try {
      const response = await apiService.get('/tourist-plans');
      console.log(response);

      if (response.success) {
        if (response.data) {

          const formattedData = response.data.map((item:any, index:any) => ({
            key: index + 1,
            number: index + 1,
            id: item.planId,
            name: item.name,
            description: item.description,
            features: item.features,
            price: item.price,
          }));

          setTravelPlans(formattedData);
          if (status === 'touristPlans') {
            setCurrentSet(formattedData);
          }
          showNotification('success', 'Operation Status', response.message || 'Successfully Fetched Tourist Plan Details');
        } else {
          setTravelPlans([]);
          if (status === 'touristPlans') {
            setCurrentSet([]);
          }
          showNotification('warning', 'Operation Status', 'No data available');
        }
      } else {
        throw new Error(response.message || 'Failed to fetch plans');
      }
    } catch (error) {
      showNotification('error', 'Operation Status', 'Error Fetching Tourist Plan Details');
    } finally {
      setIsLoading(false);
    }
  };

  
  const fetchPlans = () => {
    fetchBusinessPlans();
    fetchTravelPlans();
    
  };

  useEffect(() => {
    fetchPlans();
  }, []);

  useEffect(() => {
    switch (status) {
      case 'businessPlans': 
        setCurrentSet(businessPlans);
        break;
      case 'travelPlans':
        setCurrentSet(travelPlans);
        break;
      default:
        setCurrentSet(businessPlans);
        break;
    }
  }, [status, businessPlans, travelPlans]);

  const [modalVisible, setModalVisible] = useState(false);
  const [form] = Form.useForm();

  
  const handleAddPlan = () => {
    setModalType('create');
    setEditPlanId(null); // Clear edit plan ID for creating new plan
    setModalVisible(true);
  };

  const handleCancel = () => {
    setModalVisible(false);
    form.resetFields();
  };

  const handleEdit = (id: number, set: string) => {
    console.log(set);
    const data = set == 'business-plans' 
      ? businessPlans.find(plan => plan.id === id) 
      : travelPlans.find(plan => plan.id === id);
  
    if (data) {
      // Populate the form with the existing data
      form.setFieldsValue({
        name: data.name,
        description: data.description,
        price: data.price,
        features: data.features || [],
        type: set === 'business-plans' ? 'Business' : 'Tourist',
      });
  
      setModalType('edit');
      setEditPlanId(id);
      setModalVisible(true); // Open the modal
    } else {
      showNotification('error', 'Operation Failed', 'Plan data not found');
    }
  };

  const handleDelete = async (id: number, set: string) => {
    try {
      // Replace with the actual endpoint for deleting the plan
      const response = await apiService.delete(`/${set.toLowerCase()}/delete/${id}`);
      
      if (response.success) {
        showNotification('success', 'Operation Status', response.message || 'Plan deleted successfully');
        fetchPlans(); // Refresh the plans list after deleting
      } else {
        throw new Error(response.message || 'Failed to delete plan');
      }
    } catch (error) {
      showNotification('error', 'Operation Failed', 'Error Deleting the Plan');
    }
  };

  const handleCreateOrUpdate = async () => {
    try {
      const values = await form.validateFields();
      const { type, ...dataToSend } = values;
  
      const endpoint = modalType === 'create' 
        ? `/${values.type.toLowerCase()}-plans/create`
        : `/${values.type.toLowerCase()}-plans/update/${editPlanId}`;
      
        const response = await apiService.post(endpoint, {
          ...dataToSend, // Send the remaining data without 'type'
          features: dataToSend.features || [] // Ensure 'features' is always an array
        });
  
      if (response.success) {
        showNotification('success', 'Operation Status', response.message || 'Plan saved successfully');
        handleCancel(); // Close modal after successful form submission
        fetchPlans(); // Refresh the plans list
      } else {
        throw new Error(response.message || 'Failed to save plan');
      }
    } catch (error) {
      showNotification('error', 'Operation Failed', 'Error Saving the Plan');
    }
  }

  const sortedPlans = [...currentSet].sort((a, b) => a.id - b.id);

  return (
    <div className="flex h-screen">
      <AdminSidebar active={'Business Plans'}/>
      <div className="flex-1 flex flex-col">
        <AdminHeader page={'Business Plans'} />
        <div className="p-8 pt-0 overflow-y-auto">
          <Row className='mb-4 sticky top-0 z-10 h-16 pt-5 bg-white'>
            <Col span={3}>
                <Button
                  type={status === 'businessPlans' ? 'primary' : 'default'}
                  onClick={() => setStatus('businessPlans')}
                  style={{
                    marginLeft: 8,
                    backgroundColor: status === 'businessPlans' ? '#609734' : undefined,
                    borderColor: status === 'businessPlans' ? '#609734' : undefined,
                  }}
                >
                  Business Plans
                </Button>
              </Col>
              <Col span={3}>
                <Button
                  type={status === 'travelPlans' ? 'primary' : 'default'}
                  onClick={() => setStatus('travelPlans')}
                  style={{
                    backgroundColor: status === 'travelPlans' ? '#609734' : undefined,
                    borderColor: status === 'travelPlans' ? '#609734' : undefined,
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
                  Add New Plan
                </Button>
              </Col>
          </Row>
          <Row gutter={[16, 16]}>
            {sortedPlans.map((plan: any) => (
              <Col key={plan.id} span={8}>
                <BusinessPlanCard 
                  title={plan.name}
                  description={plan.description}
                  features={plan.features}
                  price={plan.price}
                  onEdit={() => handleEdit(plan.id, status === 'businessPlans' ? 'business-plans' : 'tourist-plans')}
                  onDelete={() => handleDelete(plan.id, status === 'businessPlans' ? 'business-plans' : 'tourist-plans')}
                />
              </Col>
            ))}
          </Row>

          <LoadingPopup
            visible={isLoading}
            title="Fetching All Business Details"
            description="Please wait while we gather all the details for you. This might take a moment."
          />

          <Modal
            open={modalVisible}
            title={modalType === 'create' ? "Add New Plan" : "Edit Plan"}
            onCancel={handleCancel}
            footer={[
              <Button key="cancel" onClick={handleCancel}>
                Cancel
              </Button>,
              <Button key="create" type="primary"  onClick={handleCreateOrUpdate}>
                {modalType === 'create' ? 'Create' : 'Update'}
              </Button>,
            ]}
          >
            <Form form={form} layout="vertical"  onFinish={handleCreateOrUpdate}>
              <Form.Item name="name" label="Name" rules={[{ required: true, message: 'Please enter the name' }]}>
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
