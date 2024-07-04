import React from 'react';
import { Tag, Avatar } from 'antd';
import { UserOutlined } from '@ant-design/icons';

interface CustomChipProps {
  imageUrl?: string;
  text: string;
  size?: 'small' | 'default' | 'large';
  color?: string;
}

const Chip: React.FC<CustomChipProps> = ({ imageUrl, text, size = 'default', color }) => {
  const sizeStyles = {
    small: {
      padding: '4px 8px',
      fontSize: '12px',
      avatarSize: 20,
    },
    default: {
      padding: '6px 12px',
      fontSize: '14px',
      avatarSize: 24,
    },
    large: {
      padding: '8px 16px',
      fontSize: '16px',
      avatarSize: 32,
    },
  };

  return (
    <Tag style={{ padding: sizeStyles[size].padding, display: 'flex', alignItems: 'center' }} color={color}
        className={`border max-w-max border-gray-200 ${size === 'large'? 'rounded-2xl' : size === 'small'? 'rounded-lg' : 'rounded-xl'}`}>
      {imageUrl && <Avatar
        src={imageUrl}
        size={sizeStyles[size].avatarSize}
        icon={<UserOutlined />}
        style={{ marginRight: '8px' }}
      />}
      <span style={{ fontSize: sizeStyles[size].fontSize }}>{text}</span>
    </Tag>
  );
};

export default Chip;
