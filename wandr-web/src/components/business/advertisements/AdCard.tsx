import React from 'react';
import { Card, Tag, Typography, Space, Row, Col } from 'antd';

interface AdCardProps {
  title: string;
  description: string;
  status: string;
  adStartDate: string;
  image: string;
}

export const AdCard: React.FC<AdCardProps> = ({ title, description, status, adStartDate, image }) => {
  const statusColor = status === 'Ongoing' ? 'green' : status === 'Requested' ? 'orange' : 'gray';

  return (
    <Card
      bordered={false}
      style={{
        marginBottom: '16px',
        borderRadius: '8px',
        backgroundColor: '#f9f9f9',
        boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
      }}
    >
      <Row gutter={16}>
        {/* Image Section */}
        <Col span={8}>
          <img
            src={image}
            alt={title}
            style={{
              width: '100%',
              height: '150px',
              objectFit: 'cover',
              borderRadius: '8px',
            }}
          />
        </Col>

        {/* Content Section */}
        <Col span={16}>
          <Space direction="vertical" style={{ width: '100%' }}>
            {/* Title and Status */}
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <Typography.Title level={4} style={{ margin: 0 }}>
                {title}
              </Typography.Title>
              <Tag color={statusColor}>{status}</Tag>
            </div>

            {/* Description */}
            <Typography.Paragraph ellipsis={{ rows: 2 }} style={{ margin: 0, color: '#595959' }}>
              {description}
            </Typography.Paragraph>

            {/* Posted Date */}
            <div style={{ textAlign: 'left', marginTop: '8px' }}>
              <Typography.Text type="secondary">
                <strong>Posted Date:</strong> {adStartDate}
              </Typography.Text>
            </div>
          </Space>
        </Col>
      </Row>
    </Card>
  );
};
