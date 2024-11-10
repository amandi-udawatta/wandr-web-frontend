import {Avatar, Col} from "antd";


export const ChatCard = (props:any) => {
    const {name, message, time,imageurl,tag} = props;
    return (

            <div className="flex flex-row w-auto border-b-2 border-gray-200 mx-3 items-center py-3 gap-3">
                <Col span="4" >
                    <Avatar style={{backgroundColor:'#609734'}} src={imageurl} size={50} />
                </Col>
                <Col span="12">
                    <p className="text-[16px] font-bold text-gray-800">{name}</p>
                    <p className="text-sm text-gray-500 h-6 overflow-clip ">{message}</p>
                </Col>
                <Col span="7" className="flex items-end flex-col pr-2 gap-[1px]  ">
                    <p className="text-xs text-gray-500  text-right">{time}</p>
                    <p className="text-green-600"> {tag}</p>
                </Col>
            </div>


)
}