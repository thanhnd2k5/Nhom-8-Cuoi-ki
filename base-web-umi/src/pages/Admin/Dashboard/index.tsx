import React, { useEffect, useState } from 'react';
import { Layout, Menu, Row, Col, Spin, Alert, Typography } from 'antd';
import {
  AppstoreOutlined,
  HomeOutlined,
  BookOutlined,
  ClusterOutlined,
  FileOutlined,
  PieChartOutlined,
  ClockCircleOutlined,
  UserOutlined,
} from '@ant-design/icons';
import { useHistory, useLocation } from 'umi';
import StatsCard from '../Dashboard/components/statscard';
import BarChart from '../Dashboard/components/barchart';
import PieChart from '../Dashboard/components/piechart';

const { Sider, Content } = Layout;
const API_URL = process.env.APP_URL_API;

function getToken() {
  return localStorage.getItem('token');
}

const menuItems = [
  { key: '/admin/dashboard', icon: <AppstoreOutlined />, label: 'Dashboard' },
  { key: '/admin/university', icon: <HomeOutlined />, label: 'Quản lý Trường' },
  { key: '/admin/major', icon: <BookOutlined />, label: 'Quản lý Ngành' },
  { key: '/admin/combination', icon: <ClusterOutlined />, label: 'Tổ hợp xét tuyển' },
  { key: '/admin/application', icon: <FileOutlined />, label: 'Hồ sơ dự tuyển' },
  { key: '/admin/statistic', icon: <PieChartOutlined />, label: 'Thống kê' },
];

const Dashboard: React.FC = () => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string>();
  const [stats, setStats] = useState<any>({});
  const history = useHistory();
  const location = useLocation();

  useEffect(() => {
    setLoading(true);
    setError(undefined);

    Promise.all([
      fetch(`${API_URL}/admin/applications/stats`, { headers: { Authorization: `Bearer ${getToken()}` } }).then(res => res.json()),
      fetch(`${API_URL}/admin/universities/stats`, { headers: { Authorization: `Bearer ${getToken()}` } }).then(res => res.json()),
      fetch(`${API_URL}/admin/majors/stats`, { headers: { Authorization: `Bearer ${getToken()}` } }).then(res => res.json()),
      fetch(`${API_URL}/admin/applications/pending`, { headers: { Authorization: `Bearer ${getToken()}` } }).then(res => res.json()),
    ])
      .then(([appStats, uniStats, majorStats, pendingStats]) => {
        setStats({
          totalApplications: appStats.data.totalApplications,
          totalPercentage: appStats.data.totalPercentage,
          totalUniversities: uniStats.data.totalUniversities,
          universityPercentage: uniStats.data.universityPercentage,
          totalMajors: majorStats.data.totalMajors,
          majorPercentage: majorStats.data.majorPercentage,
          pendingApplications: pendingStats.data.pendingApplications,
          pendingPercentage: pendingStats.data.pendingPercentage,
        });
      })
      .catch(() => setError('Không thể tải dữ liệu thống kê'))
      .finally(() => setLoading(false));
  }, []);

  return (
    <Layout style={{ minHeight: '100vh' }}>
      <Sider width={250} style={{ background: '#fff' }}>
        <div style={{ padding: 24, display: 'flex', alignItems: 'center' }}>
          <UserOutlined style={{ fontSize: 32, color: '#1890ff', marginRight: 12 }} />
          <div>
            <div style={{ fontWeight: 700, fontSize: 20 }}>Admin Panel</div>
            <div style={{ color: '#888' }}>Tuyển sinh trực tuyến</div>
          </div>
        </div>
        <Menu
          mode="inline"         
          selectedKeys={[location.pathname]}
          style={{ borderRight: 0, fontSize: 16, fontWeight: 500 }}
          onClick={({ key }) => history.push(key)}
          items={menuItems} 
        />
      </Sider>
      <Layout>
        <Content style={{ margin: '24px 16px 0' }}>
          <Typography.Title level={2}>Dashboard</Typography.Title>
          <Typography.Text type="secondary">
            Tổng quan hệ thống tuyển sinh trực tuyến
          </Typography.Text>
          {error && <Alert type="error" message={error} style={{ margin: '16px 0' }}/>}

          <Row gutter={[16, 16]} style={{ marginTop: 24 }}>
            <Col xs={24} sm={12} md={6}>
              <StatsCard
                title="Tổng hồ sơ"
                value={stats.totalApplications}
                percentage={stats.totalPercentage}
                icon={<FileOutlined />}
                color="#1890ff"
              />
            </Col>
            <Col xs={24} sm={12} md={6}>
              <StatsCard
                title="Trường tham gia"
                value={stats.totalUniversities}
                percentage={stats.universityPercentage}
                icon={<HomeOutlined />}
                color="#52c41a"
              />
            </Col>
            <Col xs={24} sm={12} md={6}>
              <StatsCard
                title="Ngành học"
                value={stats.totalMajors}
                percentage={stats.majorPercentage}
                icon={<BookOutlined />}
                color="#722ed1"
              />
            </Col>
            <Col xs={24} sm={12} md={6}>
              <StatsCard
                title="Chờ duyệt"
                value={stats.pendingApplications}
                percentage={stats.pendingPercentage}
                icon={<ClockCircleOutlined />}
                color="#faad14"
              />
            </Col>
          </Row>

          <Row gutter={[16, 16]} style={{ marginTop: 24 }}>
            <Col xs={24} md={12}>
              <BarChart />
            </Col>
            <Col xs={24} md={12}>
              <PieChart />
            </Col>
          </Row>
        </Content>
      </Layout>
    </Layout>
  );
};

export default Dashboard;
