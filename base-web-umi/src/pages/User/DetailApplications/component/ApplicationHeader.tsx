import React from 'react';
import { Button, Badge } from 'antd';
import { DownloadOutlined, ArrowLeftOutlined } from '@ant-design/icons';
import { jsPDF } from 'jspdf';

interface Props {
  status: string;
  statusMap: Record<string, { color: string; text: string }>;
  onBack: () => void;
}

const ApplicationHeader: React.FC<Props> = ({ status, statusMap, onBack }) => {

  const handleDownloadPDF = () => {
    const doc = new jsPDF();

    // Cấu hình PDF, ví dụ: Thêm nội dung vào PDF
    doc.text('Hồ sơ ứng tuyển', 10, 10);
    doc.text(`Trạng thái: ${statusMap[status]?.text}`, 10, 20);
    // Bạn có thể thêm thông tin khác vào đây như tên ứng viên, thông tin chi tiết, v.v.

    // Tải xuống PDF
    doc.save('ho-so-ung-tuyen.pdf');
  };

  return (
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
        <Button icon={<DownloadOutlined />} onClick={handleDownloadPDF}>
          Tải xuống hồ sơ
        </Button>
      </div>
    </div>
  );
};

export default ApplicationHeader;
