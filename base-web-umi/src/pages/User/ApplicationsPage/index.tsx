import React, { useEffect, useState } from 'react';
import {
  Card,
  Tabs,
  Badge,
  Button,
  Row,
  Col,
  Typography,
  Spin,
  Empty,
} from 'antd';
import { PlusOutlined, EyeOutlined } from '@ant-design/icons';
import { history, useModel } from 'umi';
import moment from 'moment';
import styles from './index.less';
import type { Application } from '@/models/User/applications';

const { Title, Text } = Typography;
const { TabPane } = Tabs;

// Define status and method types
type StatusType = 'cho_duyet' | 'da_duyet' | 'tu_choi';
type AdmissionMethodType = 'dgnl' | 'thpt' | 'hoc_ba';

const ApplicationsPage: React.FC = () => {
  const [activeTab, setActiveTab] = useState('all');
  
  // Use applications model
  const {
    applications,
    loading,
    fetchApplications,
    getApplicationsByStatus,
    getStatusCounts,
  } = useModel('User.applications');

  // Fetch applications on component mount
  useEffect(() => {
    fetchApplications();
  }, [fetchApplications]);

  const getStatusBadge = (status: string) => {
    const statusMap: Record<StatusType, { color: 'warning' | 'success' | 'error'; text: string }> = {
      'cho_duyet': { color: 'warning', text: 'Chờ duyệt' },
      'da_duyet': { color: 'success', text: 'Đã duyệt' },
      'tu_choi': { color: 'error', text: 'Từ chối' },
    };
    
    const statusInfo = statusMap[status as StatusType] || { color: 'warning' as const, text: status };
    return <Badge status={statusInfo.color} text={statusInfo.text} />;
  };

  const getAdmissionMethodText = (method: string) => {
    const methodMap: Record<AdmissionMethodType, string> = {
      'dgnl': 'Đánh giá năng lực',
      'thpt': 'Thi THPT Quốc gia',
      'hoc_ba': 'Xét học bạ',
    };
    return methodMap[method as AdmissionMethodType] || method;
  };

  const handleViewDetail = (applicationId: string) => {
    history.push(`/user/applications/${applicationId}`);
  };

  const handleCreateNew = () => {
    history.push('/user/applications/new');
  };

  const renderApplicationCard = (application: Application) => (
    <Card key={application._id} className={styles.applicationCard}>
      <div className={styles.cardHeader}>
        <div className={styles.cardTitle}>
          <Title level={4}>{application.universityMajorId.name}</Title>
          <Text type="secondary">Mã ngành: {application.universityMajorId.code}</Text>
        </div>
        <div className={styles.cardStatus}>
          {getStatusBadge(application.status)}
        </div>
      </div>
      
      <div className={styles.cardContent}>
        <Row gutter={[16, 8]}>
          <Col xs={24} md={12}>
            <div className={styles.infoItem}>
              <Text type="secondary">Tổ hợp xét tuyển</Text>
              <Text strong>
                {application.subjectCombinationId.code} ({application.subjectCombinationId.subjects.join(', ')})
              </Text>
            </div>
          </Col>
          <Col xs={24} md={12}>
            <div className={styles.infoItem}>
              <Text type="secondary">Phương thức xét tuyển</Text>
              <Text strong>{getAdmissionMethodText(application.admissionMethod)}</Text>
            </div>
          </Col>
          <Col xs={24} md={12}>
            <div className={styles.infoItem}>
              <Text type="secondary">Ngày nộp</Text>
              <Text>{moment(application.created_at).format('DD/MM/YYYY')}</Text>
            </div>
          </Col>
          <Col xs={24} md={12}>
            <div className={styles.infoItem}>
              <Text type="secondary">Ngày cập nhật</Text>
              <Text>{moment(application.updated_at).format('DD/MM/YYYY')}</Text>
            </div>
          </Col>
        </Row>
        
        <div className={styles.cardActions}>
          <Button 
            type="primary" 
            ghost 
            icon={<EyeOutlined />}
            onClick={() => handleViewDetail(application._id)}
          >
            Xem chi tiết
          </Button>
        </div>
      </div>
    </Card>
  );

  const renderTabContent = (status: string) => {
    const filteredApplications = getApplicationsByStatus(status);
    
    if (loading) {
      return (
        <div className={styles.loadingContainer}>
          <Spin size="large" />
        </div>
      );
    }

    if (filteredApplications.length === 0) {
      return (
        <Empty
          description="Chưa có hồ sơ nào"
          image={Empty.PRESENTED_IMAGE_SIMPLE}
        />
      );
    }

    return (
      <div className={styles.applicationsGrid}>
        {filteredApplications.map(renderApplicationCard)}
      </div>
    );
  };

  // Get status counts for tab labels
  const statusCounts = getStatusCounts();

  return (
    <div className={styles.applicationsPage}>
      <div className={styles.pageHeader}>
        <Title level={2}>Hồ sơ xét tuyển</Title>
        <Button 
          type="primary" 
          icon={<PlusOutlined />}
          onClick={handleCreateNew}
          size="large"
        >
          Tạo hồ sơ mới
        </Button>
      </div>

      <Card className={styles.mainCard}>
        <Tabs 
          activeKey={activeTab} 
          onChange={setActiveTab}
          className={styles.applicationTabs}
        >
          <TabPane tab={`Tất cả (${statusCounts.all})`} key="all">
            {renderTabContent('all')}
          </TabPane>
          <TabPane tab={`Chờ duyệt (${statusCounts.cho_duyet})`} key="cho_duyet">
            {renderTabContent('cho_duyet')}
          </TabPane>
          <TabPane tab={`Đã duyệt (${statusCounts.da_duyet})`} key="da_duyet">
            {renderTabContent('da_duyet')}
          </TabPane>
          <TabPane tab={`Từ chối (${statusCounts.tu_choi})`} key="tu_choi">
            {renderTabContent('tu_choi')}
          </TabPane>
        </Tabs>
      </Card>
    </div>
  );
};

export default ApplicationsPage;