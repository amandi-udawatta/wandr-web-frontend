import {Button, Col, Row} from "antd";

export const BlogCardSmall = (props:any)=>{
    const {discription,title,url} =props
    return(
        <Row gutter={10} className="py-2 px-0 border-b-2 border-black">
            <Col span={7}>
                <img src={url}  className="size-14"/>
            </Col>
            <Col span={17}>
                <p className="text-gray-30 text-xs font-bold">{title}</p>
                <p className="text-gray-800 text-xs">{discription}</p>
            </Col>

        </Row>
    )
}
export const YellowCard = ()=>{
    return(
        <div className="bg-orange-400 p-4 text-center rounded-md mt-16 mx-3">
            <p className="text-white text-xl font-bold mb-3">Get More Done Together With US</p>
            <p className="text-white text-lg mb-8">Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
            <Button type="default" className="text-sm" >Get Started</Button>
        </div>
    )
}