import React, { useState } from 'react';
import { Card, Button, Modal, Image } from 'antd';
import { DownloadOutlined, FileTextOutlined, EyeOutlined } from '@ant-design/icons';

interface Props {
  documents: Array<{ 
    name: string; 
    type: string;
    url: string;
  }>;
}

const ApplicationDocumentsCard: React.FC<Props> = ({ documents }) => {
  const [previewVisible, setPreviewVisible] = useState(false);
  const [previewUrl, setPreviewUrl] = useState('');

  const handlePreview = (url: string) => {
    setPreviewUrl(url);
    setPreviewVisible(true);
  };

  const handleDownload = (url: string, fileName: string) => {
    // Tạo một thẻ a ẩn để download
    const link = document.createElement('a');
    link.href = url;
    link.download = fileName;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const isImageFile = (type: string) => {
    return type.startsWith('image/');
  };

  return (
    <Card title="Giấy tờ minh chứng" className="info-card">
      <div className="documents-list">
        {documents.map((doc, idx) => (
          <div className="document-item" key={idx}>
            <FileTextOutlined className="doc-icon" />
            <div className="doc-info">
              <div className="doc-name">{doc.name}</div>
              <div className="doc-meta">{doc.type}</div>
            </div>
            <div className="document-actions">
              {isImageFile(doc.type) && (
                <Button 
                  icon={<EyeOutlined />} 
                  size="small" 
                  type="link"
                  onClick={() => handlePreview(doc.url)}
                >
                  Xem trước
                </Button>
              )}
              <Button 
                icon={<DownloadOutlined />} 
                size="small" 
                type="link"
                onClick={() => handleDownload(doc.url, doc.name)}
              >
                Tải xuống
              </Button>
            </div>
          </div>
        ))}
      </div>

      {/* Modal xem trước ảnh */}
      <Modal
        visible={previewVisible}
        footer={null}
        onCancel={() => setPreviewVisible(false)}
        width="80%"
        centered
      >
        <Image
          alt="Preview"
          style={{ width: '100%' }}
          src={previewUrl}
        />
      </Modal>
    </Card>
  );
};

export default ApplicationDocumentsCard;