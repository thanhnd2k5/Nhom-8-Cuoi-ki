import React from 'react';
import { Card, Tabs, Breadcrumb } from 'antd';
import { useParams, history } from 'umi';
import { useModel } from 'umi';
import MajorsManagement from './components/MajorsManagement';
import styles from './index.less';

const { TabPane } = Tabs;

const UniversityDetailPage: React.FC = () => {
  const { universityId } = useParams<{ universityId: string }>();
  const { universityDetail, fetchUniversityDetail } = useModel('Admin.University');

  React.useEffect(() => {
    if (universityId) {
      fetchUniversityDetail(universityId);
    }
  }, [universityId]);

  const handleTabChange = (key: string) => {
    // Handle tab changes if needed
  };

  return (
    <div className={styles.container}>
      <Breadcrumb className={styles.breadcrumb}>
        <Breadcrumb.Item>
          <a onClick={() => history.push('/admin/university')}>Danh sách trường đại học</a>
        </Breadcrumb.Item>
        <Breadcrumb.Item>{universityDetail?.name || 'Chi tiết trường'}</Breadcrumb.Item>
      </Breadcrumb>

      <Card>
        <Tabs defaultActiveKey="majors" onChange={handleTabChange}>
          <TabPane tab="Quản lý ngành học" key="majors">
            <MajorsManagement />
          </TabPane>
          <TabPane tab="Quản lý đơn xét tuyển" key="applications">
            {/* Component quản lý đơn xét tuyển sẽ được thêm vào đây */}
          </TabPane>
          <TabPane tab="Thống kê" key="statistics">
            {/* Component thống kê sẽ được thêm vào đây */}
          </TabPane>
          <TabPane tab="Cài đặt" key="settings">
            {/* Component cài đặt sẽ được thêm vào đây */}
          </TabPane>
        </Tabs>
      </Card>
    </div>
  );
};

export default UniversityDetailPage; 