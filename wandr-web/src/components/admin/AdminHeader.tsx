import React from 'react'
import { Input, Avatar } from 'antd'
import { UserOutlined, BellOutlined, SearchOutlined } from '@ant-design/icons'

interface AdminHeaderProps{
  page:string;
}

const AdminHeader: React.FC<AdminHeaderProps> = ({page}) => {
  return (
    <div className="flex items-center justify-between p-4 border border-b border-gray-200">
      <h1 className="text-3xl font-bold mb-3 mt-3 my-text text-green-50 ml-5">{page}</h1>
      <div className="flex items-center space-x-4">
        <div className="text-xl font-semibold">Welcome Back!</div>
        <Input placeholder="Search here..." prefix={<SearchOutlined style={{color:'#609734'}}/>} className="w-64 search-bar" />
        <BellOutlined style={{ fontSize: '24px', color:'#EB5757'}} />
        <Avatar icon={<UserOutlined />} style={{backgroundColor:'#609734'}} />
      </div>
    </div>
  )
}

export default AdminHeader;
