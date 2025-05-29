import React from 'react';
import { Card, Descriptions, Badge } from 'antd';

interface Props {
  application: any;
  statusMap: Record<string, { color: string; text: string }>;
}

const ApplicationInfoCard: React.FC<Props> = ({ application, statusMap }) => (
  <Card className="main-card" title="Chi tiết hồ sơ xét tuyển">
    <Descriptions column={2} bordered>
      <Descriptions.Item label="Trường">{application.university}</Descriptions.Item>
      <Descriptions.Item label="Ngành">{application.major}</Descriptions.Item>
      <Descriptions.Item label="Tổ hợp xét tuyển">{application.combination}</Descriptions.Item>
      <Descriptions.Item label="Trạng thái">
        <Badge
          status={statusMap[application.status]?.color as any}
          text={statusMap[application.status]?.text}
        />
      </Descriptions.Item>
      <Descriptions.Item label="Ngày nộp">{application.dates.submitted}</Descriptions.Item>
      <Descriptions.Item label="Ngày cập nhật">{application.dates.updated}</Descriptions.Item>
    </Descriptions>
  </Card>
);

export default ApplicationInfoCard;
