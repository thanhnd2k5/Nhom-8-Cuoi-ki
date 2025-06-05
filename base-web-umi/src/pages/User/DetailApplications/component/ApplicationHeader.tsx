import React from 'react';
import { Button, Badge } from 'antd';
import { DownloadOutlined, ArrowLeftOutlined } from '@ant-design/icons';
import PDFDownloadButton, { SimpleDownloadButton} from './PDFDownloadButton';

interface Props {
  application: any;
  status: string;
  statusMap: Record<string, { color: string; text: string }>;
  onBack: () => void;
}

const ApplicationHeader: React.FC<Props> = ({ application, status, statusMap, onBack }) => (
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
      <PDFDownloadButton application={application} />
      <SimpleDownloadButton application={application} />
    </div>
  </div>
);

export default ApplicationHeader;
