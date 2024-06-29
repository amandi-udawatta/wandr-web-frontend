import React from 'react'
import { Input, Avatar } from 'antd'
import { UserOutlined, BellOutlined, SearchOutlined } from '@ant-design/icons'

const AdminHeader: React.FC = () => {
  return (
    <div className="flex items-center justify-between p-4 border border-b border-gray-200">
      <div className="text-2xl font-bold">Welcome Admin!</div>
      <div className="flex items-center space-x-4">
        <Input placeholder="Search here..." prefix={<SearchOutlined style={{color:'#609734'}}/>} className="w-64 search-bar" />
        <BellOutlined style={{ fontSize: '24px', color:'#EB5757'}} />
        <Avatar icon={<UserOutlined />} style={{backgroundColor:'#609734'}} />
      </div>
    </div>
  )
}

export default AdminHeader;
