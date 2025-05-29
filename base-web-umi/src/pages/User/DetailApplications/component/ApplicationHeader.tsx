import React from 'react';
import { Button, Badge } from 'antd';
import { DownloadOutlined, ArrowLeftOutlined } from '@ant-design/icons';

interface Props {
  status: string;
  statusMap: Record<string, { color: string; text: string }>;
  onBack: () => void;
}

const ApplicationHeader: React.FC<Props> = ({ status, statusMap, onBack }) => (
  <div className="header">
    <Button
      type="link"
      icon={<ArrowLeftOutlined />}
      onClick={onBack}
    >
      Quay lại danh sách hồ sơ
    </Button>
    <div className="header-actions">
      <Badge
        status={statusMap[status]?.color as any}
        text={statusMap[status]?.text}
      />
      <Button icon={<DownloadOutlined />}>Tải xuống hồ sơ</Button>
    </div>
  </div>
);

export default ApplicationHeader;
