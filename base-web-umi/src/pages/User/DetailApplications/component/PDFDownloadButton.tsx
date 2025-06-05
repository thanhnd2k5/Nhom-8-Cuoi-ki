import React, { useState } from 'react';
import { Button, message, Dropdown } from 'antd';
import { DownloadOutlined, EyeOutlined, FilePdfOutlined } from '@ant-design/icons';
import { downloadApplicationPDF, previewApplicationPDF } from '@/models/pdfGenerator';

interface PDFDownloadButtonProps {
  application: any;
  size?: 'small' | 'middle' | 'large';
  type?: 'primary' | 'default' | 'dashed' | 'link' | 'text';
}

const PDFDownloadButton: React.FC<PDFDownloadButtonProps> = ({ 
  application, 
  size = 'middle',
  type = 'default'
}) => {
  const [loading, setLoading] = useState(false);
  const [previewLoading, setPreviewLoading] = useState(false);

  const handleDownload = async () => {
    setLoading(true);
    try {
      await downloadApplicationPDF(application);
      message.success('Tải xuống hồ sơ thành công!');
    } catch (error) {
      message.error('Có lỗi xảy ra khi tải xuống hồ sơ!');
      console.error('Download error:', error);
    } finally {
      setLoading(false);
    }
  };

  const handlePreview = async () => {
    setPreviewLoading(true);
    try {
      await previewApplicationPDF(application);
      message.success('Đã mở xem trước trong tab mới!');
    } catch (error) {
      message.error('Có lỗi xảy ra khi xem trước!');
      console.error('Preview error:', error);
    } finally {
      setPreviewLoading(false);
    }
  };

  // Menu items cho dropdown
  const menuItems = [
    {
      key: 'download',
      label: 'Tải xuống PDF',
      icon: <DownloadOutlined />,
      onClick: handleDownload,
      disabled: loading
    },
    {
      key: 'preview',
      label: 'Xem trước',
      icon: <EyeOutlined />,
      onClick: handlePreview,
      disabled: previewLoading
    }
  ];

  return (
    <Dropdown 
      menu={{ items: menuItems }}
      placement="bottomLeft"
      trigger={['click']}
    >
      <Button 
        icon={<FilePdfOutlined />}
        size={size}
        type={type}
        loading={loading || previewLoading}
      >
        Tải xuống hồ sơ
      </Button>
    </Dropdown>
  );
};

// Component đơn giản chỉ có nút download
export const SimpleDownloadButton: React.FC<PDFDownloadButtonProps> = ({ 
  application, 
  size = 'middle',
  type = 'default'
}) => {
  const [loading, setLoading] = useState(false);

  const handleDownload = async () => {
    setLoading(true);
    try {
      await downloadApplicationPDF(application);
      message.success('Tải xuống hồ sơ thành công!');
    } catch (error) {
      message.error('Có lỗi xảy ra khi tải xuống hồ sơ!');
      console.error('Download error:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Button 
      icon={<DownloadOutlined />}
      onClick={handleDownload}
      loading={loading}
      size={size}
      type={type}
    >
      Tải xuống hồ sơ
    </Button>
  );
};

export default PDFDownloadButton;