// components/LoadingPopup.tsx

import React from 'react';
import { Modal, Spin } from 'antd';

interface LoadingPopupProps {
  visible: boolean;
  title?: string;
  description?: string;
}

const LoadingPopup: React.FC<LoadingPopupProps> = ({ visible, title, description }) => {
  return (
    <Modal
      open={visible}
      title={title}
      footer={null}
      closable={false}
      centered
    >
      <div style={{ textAlign: 'center' }}>
        <Spin size="large" className='custom-spin' />
        {description && <p style={{ marginTop: 16 }}>{description}</p>}
      </div>
    </Modal>
  );
};

export default LoadingPopup;
