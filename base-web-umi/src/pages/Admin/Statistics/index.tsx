import React, { useEffect } from 'react';
import { Card, Row, Col, Spin } from 'antd';
import { useModel } from 'umi';
import OverviewCards from './components/OverviewCards';
import UniversityChart from './components/UniversityChart';
import StatusChart from './components/StatusChart';
import TimelineChart from './components/TimelineChart';
import ComparisonTable from './components/ComparisonTable';
import styles from './index.less';

const StatisticsPage: React.FC = () => {
  const {
    loading,
    fetchUniversityStats,
    fetchStatusStats,
    fetchDateStats,
    fetchMonthStats,
    fetchYearStats,
    fetchBetweenUniversitiesStats,
  } = useModel('Admin.Statistics');

  useEffect(() => {
    const fetchAllData = async () => {
      await Promise.all([
        fetchUniversityStats(),
        fetchStatusStats(),
        fetchDateStats(),
        fetchMonthStats(),
        fetchYearStats(),
        fetchBetweenUniversitiesStats(),
      ]);
    };
    fetchAllData();
  }, []);

  if (loading) {
    return (
      <div className={styles.loadingContainer}>
        <Spin size="large" />
      </div>
    );
  }

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Thống kê hồ sơ đăng ký</h1>
      
      <OverviewCards />

      <Row gutter={[16, 16]}>
        <Col xs={24} lg={12}>
          <Card title="Thống kê theo trường đại học">
            <UniversityChart />
          </Card>
        </Col>
      </Row>

      <Row gutter={[16, 16]}>
        <Col xs={24} lg={12}>
          <Card title="Thống kê theo trạng thái">
            <StatusChart />
          </Card>
        </Col>
        <Col xs={24} lg={12}>
          <Card title="Thống kê theo thời gian">
            <TimelineChart />
          </Card>
        </Col>
      </Row>

      <Card title="So sánh giữa các trường đại học">
        <ComparisonTable />
      </Card>
    </div>
  );
};

export default StatisticsPage; 