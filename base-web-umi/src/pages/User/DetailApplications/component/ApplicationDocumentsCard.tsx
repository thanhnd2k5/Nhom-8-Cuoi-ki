import React from 'react';
import { Card, Button } from 'antd';
import { DownloadOutlined, FileTextOutlined } from '@ant-design/icons';

interface Props {
  documents: Array<{ name: string; type: string; size: string }>;
}

const ApplicationDocumentsCard: React.FC<Props> = ({ documents }) => (
  <Card title="Giấy tờ minh chứng" className="info-card">
    <div className="documents-list">
      {documents.map((doc, idx) => (
        <div className="document-item" key={idx}>
          <FileTextOutlined className="doc-icon" />
          <div className="doc-info">
            <div className="doc-name">{doc.name}</div>
            <div className="doc-meta">{doc.type} • {doc.size}</div>
          </div>
          <Button icon={<DownloadOutlined />} size="small" type="link">
            Tải xuống
          </Button>
        </div>
      ))}
    </div>
  </Card>
);

export default ApplicationDocumentsCard;