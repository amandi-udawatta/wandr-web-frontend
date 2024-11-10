import {Col, Row} from "antd";

export const BlogCardBig = (props:any)=>{
    const {discription,title,url,date,major} =props
    return(
        <Row gutter={10} className="py-2 px-0 ">
            <Col span={7}>
                <img src={url}  className="w-full bg-cover"/>
            </Col>
            <Col span={17}>
                <p className="text-gray-30 text-[12px] font-bold">{title+" - "+date}</p>
                <p className="text-black text-[20px] font-semibold">{major}</p>
                <p className="text-gray-800 text-[14px]">{discription}</p>
            </Col>

        </Row>
    )
}