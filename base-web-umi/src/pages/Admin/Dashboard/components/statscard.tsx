import React from 'react';
import { Card, Row, Col, Typography } from 'antd';

interface StatsCardProps {
  title: string;
  value: number;
  percentage: number;
  icon: React.ReactNode;
  color?: string;
}

const StatsCard: React.FC<StatsCardProps> = ({ title, value, percentage, icon, color }) => {
  const isPositive = percentage >= 0;
  return (
    <Card>
      <Row align="middle">
        <Col flex="32px">
          <span style={{ fontSize: 32, color }}>{icon}</span>
        </Col>
        <Col flex="auto" style={{ marginLeft: 12 }}>
          <Typography.Text type="secondary">{title}</Typography.Text>
          <Typography.Title level={3} style={{ margin: 0 }}>{value}</Typography.Title>
          <Typography.Text style={{ color: isPositive ? '#52c41a' : '#ff4d4f' }}>
            {isPositive ? '+' : ''}{percentage}%
          </Typography.Text>
        </Col>
      </Row>
    </Card>
  );
};

export default StatsCard;
