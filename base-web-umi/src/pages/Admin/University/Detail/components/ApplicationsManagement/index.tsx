import React, { useState } from 'react';
import { Card, Tabs, Badge, Space } from 'antd';
import { useModel } from 'umi';
import ApplicationList from './ApplicationList';
import styles from './index.less';

const { TabPane } = Tabs;

const ApplicationsManagement: React.FC = () => {
  const { universityId } = useParams<{ universityId: string }>();
  const {
    applications,
    loading,
    fetchApplications,
    approveApplication,
    rejectApplication,
  } = useModel('Admin.Applications');

  const [activeTab, setActiveTab] = useState('pending');

  // Đếm số lượng đơn theo trạng thái
  const getApplicationCount = (status: string) => {
    return applications.filter(app => app.status === status).length;
  };

  const handleTabChange = (key: string) => {
    setActiveTab(key);
  };

  return (
    <div className={styles.container}>
      <Card>
        <Tabs activeKey={activeTab} onChange={handleTabChange}>
          <TabPane
            tab={
              <Space>
                Chờ duyệt
                <Badge count={getApplicationCount('pending')} style={{ backgroundColor: '#faad14' }} />
              </Space>
            }
            key="pending"
          >
            <ApplicationList
              status="pending"
              applications={applications.filter(app => app.status === 'pending')}
              loading={loading}
              onApprove={approveApplication}
              onReject={rejectApplication}
            />
          </TabPane>

          <TabPane
            tab={
              <Space>
                Đã duyệt
                <Badge count={getApplicationCount('approved')} style={{ backgroundColor: '#52c41a' }} />
              </Space>
            }
            key="approved"
          >
            <ApplicationList
              status="approved"
              applications={applications.filter(app => app.status === 'approved')}
              loading={loading}
            />
          </TabPane>

          <TabPane
            tab={
              <Space>
                Đã từ chối
                <Badge count={getApplicationCount('rejected')} style={{ backgroundColor: '#ff4d4f' }} />
              </Space>
            }
            key="rejected"
          >
            <ApplicationList
              status="rejected"
              applications={applications.filter(app => app.status === 'rejected')}
              loading={loading}
            />
          </TabPane>

          <TabPane
            tab={
              <Space>
                Đã nhập học
                <Badge count={getApplicationCount('enrolled')} style={{ backgroundColor: '#1890ff' }} />
              </Space>
            }
            key="enrolled"
          >
            <ApplicationList
              status="enrolled"
              applications={applications.filter(app => app.status === 'enrolled')}
              loading={loading}
            />
          </TabPane>
        </Tabs>
      </Card>
    </div>
  );
};

export default ApplicationsManagement; 