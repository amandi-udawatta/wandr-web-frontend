import React, {useState} from 'react'
import {Input, Avatar, Badge, Dropdown, Space, MenuProps} from 'antd'
import {UserOutlined, BellOutlined, SearchOutlined, DownOutlined, SmileOutlined} from '@ant-design/icons'

interface UserHeaderProps{
  page:string;
}


const UserHeader: React.FC<UserHeaderProps> = ({page}) => {

    const [show, setShow] = useState(true);

  return (
    <div className="flex items-center justify-between p-4 border border-b border-gray-200">
      <h1 className="text-3xl font-bold mb-3 mt-3 my-text text-green-50 ml-5">{page}</h1>
      <div className="flex items-center space-x-4">
          <div className="text-xl font-semibold">Welcome Back!</div>
          <Input placeholder="Search here..." prefix={<SearchOutlined style={{color:'#609734'}}/>} className="w-96 search-bar  border-none bg-gray-100" />
          <BellOutlined style={{ fontSize: '24px', color:'#EB5757'}} />
          <Avatar style={{backgroundColor:'#609734'}} src={'/person-1.png'} className="h-5/6" size="large"/>
          {/* <Dropdown menu={{ items }}>
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
          </Dropdown> */}
      </div>
    </div>
  )
}

export default UserHeader;
