import { useState } from "react";
import {Form, Input, Button, Image, Row, Col, Skeleton, Avatar} from "antd";
import {InboxOutlined, UploadOutlined} from "@ant-design/icons";
import Dragger from "antd/lib/upload/Dragger";
import {Heading2} from "lucide-react";
export  const UserAdvertisementContent = () => {
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
                                    <div className="text-left">
                                        <Button type="primary" className="bg-green-50 w-32 rounded-lg hover:!bg-green-600" htmlType="submit">
                                            Post
                                        </Button>
                                    </div>

                                </Col>


                                <Col span={12}>
                                    <Form.Item
                                        name="setupdate"
                                        label={<span className="text-green-50 font-semibold">Setup Date</span>}
                                        rules={[{ required: true, message: "Please input the Setup Date!", type:"date" }]}
                                    >
                                        <Input />
                                    </Form.Item>
                                    <Form.Item
                                        name="setuptime"
                                        label={<span className="text-green-50 font-semibold">Setup Time</span>}
                                        rules={[{ required: true, message: "Please input the Setup Time!" }]}
                                    >
                                        <Input />
                                    </Form.Item>
                                    <Form.Item
                                        name="caption"
                                        label={<span className="text-green-50 font-semibold">Caption</span>}
                                        rules={[{ required: true, message: "Please input the caption!" }]}
                                    >
                                        <Input.TextArea className="!min-h-[120px]" />
                                    </Form.Item>


                                </Col>

                            </Col>


                            <Col span={8} className="flex flex-col gap-5">


                                <Image
                                    className="rounded-xl"
                                    src="https://t4.ftcdn.net/jpg/03/45/23/59/360_F_345235935_rA3zyhtuvR2losdIfG2vFfNsXGWdlFbT.jpg"
                                    alt="Advertisement Image"
                                    width={370}
                                    height={250}
                                    placeholder={<div className="bg-white w-[370px] h-[250px]">  <Skeleton.Image style={{width:200,height:200}} active /></div>}
                                />
                                <h2 className="font-bold text-3xl">Yala Luxury Safari Jeep Service, Weerawila;</h2>
                                <div className="flex flex-row gap-3 items-center">
                                    <Avatar size={40} src="https://static.vecteezy.com/system/resources/thumbnails/005/346/410/small_2x/close-up-portrait-of-smiling-handsome-young-caucasian-man-face-looking-at-camera-on-isolated-light-gray-studio-background-photo.jpg" />
                                    <p className="text-sm">by Yala Tours</p>
                                    <p>May 22, 2024</p>

                                </div>
                            </Col>
                        </Row>
                    </Form>
                </div>
            </Col>
        </Row>
    );
}