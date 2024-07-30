import { useState } from "react";
import {Form, Input, Button, Upload, Row, Col} from "antd";
import {InboxOutlined, UploadOutlined} from "@ant-design/icons";
import Dragger from "antd/lib/upload/Dragger";
export  const UserBusinessProfileContent = () => {
    const [form] = Form.useForm();

    const handleFinish = (values: any) => {
        console.log("Form values:", values);
    };

    return (
        <Row justify="center" className="p-4">
            <Col span={24}>
                <div className='gap-3 border border-gray-200 rounded-xl p-5'>
                    <Form
                        form={form}
                        layout="vertical"
                        onFinish={handleFinish}
                        initialValues={{
                            ownerName: "",
                            contactNumber: "",
                            email: "",
                            nicNumber: "",
                            location: "",
                            address: "",
                            description: "",
                            category: "",
                            websiteUrl: "",
                            serviceInfo: "",
                        }}
                    >
                        <Row gutter={20}  >
                            <Col span={16} className="flex flex-row">
                                <Col span={12}>
                                    <Form.Item
                                        name="ownerName"
                                        label={<span className="text-green-50 font-semibold">Name of the owner</span>}

                                        rules={[{ required: true, message: "Please input the owner's name!" }]}
                                    >
                                        <Input />
                                    </Form.Item>
                                    <Form.Item
                                        name="email"
                                        label={<span className="text-green-50 font-semibold">Business Email Address</span>}
                                        rules={[{ required: true, message: "Please input the email address!", type: "email" }]}
                                    >
                                        <Input />
                                    </Form.Item>
                                    <Form.Item
                                        name="location"
                                        label={<span className="text-green-50 font-semibold">Business Location</span>}
                                        rules={[{ required: true, message: "Please input the business location!" }]}
                                    >
                                        <Input />
                                    </Form.Item>
                                    <Form.Item
                                        name="category"
                                        label={<span className="text-green-50 font-semibold">Business Category</span>}
                                        rules={[{ required: true, message: "Please input the business category!" }]}
                                    >
                                        <Input />
                                    </Form.Item>
                                </Col>


                                <Col span={12}>
                                    <Form.Item
                                        name="contactNumber"
                                        label={<span className="text-green-50 font-semibold">Contact Number of the owner</span>}
                                        rules={[{ required: true, message: "Please input the contact number!" }]}
                                    >
                                        <Input />
                                    </Form.Item>


                                    <Form.Item
                                        name="nicNumber"
                                        label={<span className="text-green-50 font-semibold">Owner's NIC Number</span>}
                                        rules={[{ required: true, message: "Please input the NIC number!" }]}
                                    >
                                        <Input />
                                    </Form.Item>


                                    <Form.Item
                                        name="address"
                                        label={<span className="text-green-50 font-semibold">Business Address</span>}
                                        rules={[{ required: true, message: "Please input the business address!" }]}
                                    >
                                        <Input />
                                    </Form.Item>
                                    <Form.Item
                                        name="websiteUrl"
                                        label={<span className="text-green-50 font-semibold">Business Website URL</span>}
                                        rules={[{ required: true, message: "Please input the website URL!" }, { type: "url", message: "Please enter a valid URL!" }]}
                                    >
                                        <Input />
                                    </Form.Item>
                                </Col>
                            </Col>


                            <Col span={8}>

                                <Form.Item
                                    name="upload"
                                    label={<span style={{ color: 'green' }}>Upload Image</span>}
                                    valuePropName="fileList"
                                    getValueFromEvent={(e) => (Array.isArray(e) ? e : e && e.fileList)}

                                >
                                    <Dragger name="files" action="/upload.do">
                                        <p className="">
                                            <InboxOutlined className="text-green-50 text-4xl" />
                                        </p>
                                        <p className="text-green-50">Click or drag file to this area to upload</p>

                                    </Dragger>
                                </Form.Item>
                                <Form.Item
                                    name="description"
                                    label={<span className="text-green-50 font-semibold">Description</span>}
                                    rules={[{ required: true, message: "Please input the description!" }]}
                                >
                                    <Input.TextArea className="!min-h-[145px]" />
                                </Form.Item>

                            </Col>
                        </Row>








                            <Form.Item
                                name="serviceInfo"
                                label={<span className="text-green-50 font-semibold">Service Information</span>}
                                rules={[{ required: true, message: "Please input the service information!" }]}
                            >
                                <Input.TextArea className={"!min-h-[140px]"} />
                            </Form.Item>

                        <div className="text-center">
                            <Button type="primary" className="bg-green-50 w-48 rounded-lg hover:!bg-green-600" htmlType="submit">
                                Edit Details
                            </Button>
                        </div>
                    </Form>
                </div>
            </Col>
        </Row>
    );
}