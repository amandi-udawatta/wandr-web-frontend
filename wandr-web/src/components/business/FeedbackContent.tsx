import { useState } from "react";
import {Form, Avatar, Button, Upload, Row, Col, Card, Space} from "antd";
import {router} from "next/client";
import {link} from "fs";
import { useRouter } from 'next/navigation'
import Link from "next/link";
import {getWidth} from "@antv/g-lite/dist/utils";

export  const FeedbackContent = () => {
    const [form] = Form.useForm();

    const router = useRouter()

    const titlebar = (
        <div className=" flex-row flex items-center gap-2 ">
            <Avatar style={{backgroundColor:'#609734'}} src={'/person-1.png'}  size={"default"}/>
            <div className="flex flex-col justify-around">
                <div className="font-bold text-sm text-green-50 p-0 mb-[-1px]">Darin Nguyen</div>
                <div className="text-gray-500 p-0 m-0 mt-[-1px] text-xs ">@Sid</div>

            </div>
        </div>
    )

    const cardwidth = 320;

    return (
        <div className="w-full flex justify-center ">
            <div className="grid grid-cols-3 bg-gray-100 rounded-2xl w-10/12 my-10 p-6 justify-around gap-5">
                <Card title={titlebar}  style={{ width: cardwidth }}>
                    <p className="font-semibold"> Faucibus eu condimentum maecenas
                        sollicitudin vitae</p>
                    <div className="flex flex-row justify-between mt-3">
                        <Link className="underline text-xs text-gray-400" href={'/business/feedbacks/1'}>Show original</Link>
                        <p className="text-xs text-gray-400">2 days ago</p>
                    </div>
                </Card>
                <Card title={titlebar}  style={{ width: cardwidth }}>
                    <p className="font-semibold"> Faucibus eu condimentum maecenas
                        sollicitudin vitae</p>
                    <div className="flex flex-row justify-between mt-3">
                        <Link className="underline text-xs text-gray-400" href={'/business/feedbacks/1'}>Show original</Link>
                        <p className="text-xs text-gray-400">2 days ago</p>
                    </div>
                </Card>
                <Card title={titlebar}  style={{ width: cardwidth }}>
                    <p className="font-semibold"> Faucibus eu condimentum maecenas
                        sollicitudin vitae</p>
                    <div className="flex flex-row justify-between mt-3">
                        <Link className="underline text-xs text-gray-400" href={'/business/feedbacks/1'}>Show original</Link>
                        <p className="text-xs text-gray-400">2 days ago</p>
                    </div>
                </Card>
                <Card title={titlebar}  style={{ width: cardwidth }}>
                    <p className="font-semibold"> Faucibus eu condimentum maecenas
                        sollicitudin vitae</p>
                    <div className="flex flex-row justify-between mt-3">
                        <Link className="underline text-xs text-gray-400" href={'/business/feedbacks/1'}>Show original</Link>
                        <p className="text-xs text-gray-400">2 days ago</p>
                    </div>
                </Card>
                <Card title={titlebar}  style={{ width: cardwidth }}>
                    <p className="font-semibold"> Faucibus eu condimentum maecenas
                        sollicitudin vitae</p>
                    <div className="flex flex-row justify-between mt-3">
                        <Link className="underline text-xs text-gray-400" href={'/business/feedbacks/1'}>Show original</Link>
                        <p className="text-xs text-gray-400">2 days ago</p>
                    </div>
                </Card>
                <Card title={titlebar}  style={{ width: cardwidth }}>
                <p className="font-semibold"> Faucibus eu condimentum maecenas
                    sollicitudin vitae</p>
                <div className="flex flex-row justify-between mt-3">
                    <Link className="underline text-xs text-gray-400" href={'/business/feedbacks/1'}>Show original</Link>
                    <p className="text-xs text-gray-400">2 days ago</p>
                </div>
            </Card>
                <Card title={titlebar}  style={{ width: cardwidth }}>
                    <p className="font-semibold"> Faucibus eu condimentum maecenas
                        sollicitudin vitae</p>
                    <div className="flex flex-row justify-between mt-3">
                        <Link className="underline text-xs text-gray-400" href={'/business/feedbacks/1'}>Show original</Link>
                        <p className="text-xs text-gray-400">2 days ago</p>
                    </div>
                </Card>
                <Card title={titlebar}  style={{ width: cardwidth }}>
                    <p className="font-semibold"> Faucibus eu condimentum maecenas
                        sollicitudin vitae</p>
                    <div className="flex flex-row justify-between mt-3">
                        <Link className="underline text-xs text-gray-400" href={'/business/feedbacks/1'}>Show original</Link>
                        <p className="text-xs text-gray-400">2 days ago</p>
                    </div>
                </Card>
                <Card title={titlebar}  style={{ width: cardwidth }}>
                    <p className="font-semibold"> Faucibus eu condimentum maecenas
                        sollicitudin vitae</p>
                    <div className="flex flex-row justify-between mt-3">
                        <Link className="underline text-xs text-gray-400" href={'/business/feedbacks/1'}>Show original</Link>
                        <p className="text-xs text-gray-400">2 days ago</p>
                    </div>
                </Card>


            </div>
        </div>
    );
}