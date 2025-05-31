import React, { useState } from 'react';
import { Card, Tabs, Badge, Button, Descriptions, Space, Tag } from 'antd';
import { ArrowLeftOutlined, DownloadOutlined, FileTextOutlined } from '@ant-design/icons';
import { Application } from '@/services/Admin/Applications';
import styles from './index.less';

const { TabPane } = Tabs;

interface ApplicationDetailProps {
  application: Application;
  onBack: () => void;
}

const ApplicationDetail: React.FC<ApplicationDetailProps> = ({ application, onBack }) => {
  const [activeTab, setActiveTab] = useState('details');

  const getStatusTag = (status: string) => {
    const statusConfig = {
      cho_duyet: { color: 'warning', text: 'Chờ duyệt' },
      da_duyet: { color: 'success', text: 'Đã duyệt' },
      tu_choi: { color: 'error', text: 'Đã từ chối' },
      da_nhap_hoc: { color: 'processing', text: 'Đã nhập học' },
    };
    const config = statusConfig[status as keyof typeof statusConfig];
    return <Tag color={config.color}>{config.text}</Tag>;
  };

  const getAdmissionMethod = (method: string) => {
    const methodMap: { [key: string]: string } = {
      hoc_ba: 'Học bạ',
      diem_thi: 'Điểm thi',
    };
    return methodMap[method] || method;
  };

  return (
    <div className={styles.detailContainer}>
      <div className={styles.header}>
        <Button 
          type="link" 
          icon={<ArrowLeftOutlined />} 
          onClick={onBack}
          className={styles.backButton}
        >
          Quay lại danh sách
        </Button>
        <div className={styles.headerContent}>
          <div>
            <h1 className={styles.title}>Chi tiết đơn xét tuyển</h1>
            <p className={styles.subtitle}>Mã hồ sơ: #{application._id}</p>
          </div>
          <Space>
            {getStatusTag(application.status)}
            <Button type="primary" icon={<DownloadOutlined />}>
              Tải xuống hồ sơ
            </Button>
          </Space>
        </div>
      </div>

      <Card className={styles.infoCard}>
        <Descriptions title="Thông tin trường và ngành" bordered>
          <Descriptions.Item label="Trường" span={2}>
            {application.universityMajorId.university_id}
          </Descriptions.Item>
          <Descriptions.Item label="Ngành" span={2}>
            {application.universityMajorId.name}
          </Descriptions.Item>
          <Descriptions.Item label="Mã ngành">
            {application.universityMajorId.code}
          </Descriptions.Item>
          <Descriptions.Item label="Phương thức xét tuyển">
            {getAdmissionMethod(application.admissionMethod)}
          </Descriptions.Item>
          <Descriptions.Item label="Tổ hợp môn" span={2}>
            {application.subjectCombinationId.code} ({application.subjectCombinationId.subjects.join(', ')})
          </Descriptions.Item>
        </Descriptions>
      </Card>

      <Tabs activeKey={activeTab} onChange={setActiveTab} className={styles.tabs}>
        <TabPane tab="Thông tin thí sinh" key="details">
          <Card>
            <Descriptions title="Thông tin cá nhân" bordered>
              <Descriptions.Item label="Họ và tên" span={2}>
                {application.userId.name}
              </Descriptions.Item>
              <Descriptions.Item label="Email" span={2}>
                {application.userId.email}
              </Descriptions.Item>
              <Descriptions.Item label="Ngày tạo" span={2}>
                {new Date(application.created_at).toLocaleString('vi-VN')}
              </Descriptions.Item>
              <Descriptions.Item label="Ngày cập nhật" span={2}>
                {new Date(application.updated_at).toLocaleString('vi-VN')}
              </Descriptions.Item>
            </Descriptions>
          </Card>
        </TabPane>

        <TabPane tab="Giấy tờ minh chứng" key="documents">
          <Card>
            <div className={styles.documentsList}>
              <div className={styles.documentItem}>
                <FileTextOutlined className={styles.documentIcon} />
                <div className={styles.documentInfo}>
                  <h4>Học bạ THPT</h4>
                  <p>PDF • 2.5 MB</p>
                </div>
                <Button type="link" icon={<DownloadOutlined />}>
                  Tải xuống
                </Button>
              </div>
              {/* Add more document items as needed */}
            </div>
          </Card>
        </TabPane>

        <TabPane tab="Lịch sử xét duyệt" key="history">
          <Card>
            <div className={styles.historyList}>
              <div className={styles.historyItem}>
                <Badge status="processing" text="Nộp hồ sơ" />
                <p className={styles.historyDate}>
                  {new Date(application.created_at).toLocaleString('vi-VN')}
                </p>
                <p className={styles.historyContent}>
                  Hồ sơ đã được nộp thành công và đang chờ xét duyệt.
                </p>
              </div>
              {/* Add more history items as needed */}
            </div>
          </Card>
        </TabPane>
      </Tabs>
    </div>
  );
};

export default ApplicationDetail; 