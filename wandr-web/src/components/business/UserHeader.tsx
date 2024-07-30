import React, {useState} from 'react'
import {Input, Avatar, Badge, Dropdown, Space, MenuProps} from 'antd'
import {UserOutlined, BellOutlined, SearchOutlined, DownOutlined, SmileOutlined} from '@ant-design/icons'
import {root} from "postcss";
import {items} from "@/constants";

interface UserHeaderProps{
  page:string;
}


const UserHeader: React.FC<UserHeaderProps> = () => {

    const [show, setShow] = useState(true);

  return (
    <div className="flex items-center justify-between p-4 border border-b border-gray-200">
      <div className="flex items-center space-x-4 w-full justify-between px-7">
        <div className="text-xl font-semibold">Welcome Back!</div>
        <Input placeholder="Search here..." prefix={<SearchOutlined style={{color:'#609734'}}/>} className="w-96 search-bar  border-none bg-gray-100" />

          <div className="flex flex-row gap-2 items-center">
              <Badge dot={show}  >
                  <BellOutlined style={{ fontSize: '24px'}} className="text-orange-300 bg-yellow-100 p-1 rounded-lg" />
              </Badge>
              <div className="w-3"></div>
              <Avatar style={{backgroundColor:'#609734'}} src={'/person-1.png'} className="h-5/6" size="large"/>
              <Dropdown menu={{ items }}>
                  <a   onClick={(e) => e.preventDefault()}>
                      <Space>
                          <div className="flex flex-col gap-0.5 w-full" >
                              <div className="flex flex-row gap-3 w-full justify-between">
                                    <div className="text-sm font-semibold">Musfiq</div>
                                  <DownOutlined className="text-xs" />
                              </div>
                              <p className="text-xs text-gray-500" >Service Provider</p>
                          </div>
                      </Space>
                  </a>
              </Dropdown>
          </div>
      </div>
    </div>
  )
}

export default UserHeader;
