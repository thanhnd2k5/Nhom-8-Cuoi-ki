import React, { useEffect, useState } from 'react';
import { Card, Spin, Alert } from 'antd';
import { Bar } from '@ant-design/plots';

const API_URL = process.env.APP_URL_API;

function getToken() {
  return localStorage.getItem('token');
}

const BarChart: React.FC = () => {
  const [data, setData] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string>();

  useEffect(() => {
    setLoading(true);
    fetch(`${API_URL}/admin/applications/trends`, {
      headers: { Authorization: `Bearer ${getToken()}` },
    })
      .then(res => res.json())
      .then(res => setData(res.data || []))
      .catch(err => setError('Không thể tải dữ liệu biểu đồ'))
      .finally(() => setLoading(false));
  }, []);

  const config = {
    data,
    xField: 'month',
    yField: 'value',
    color: '#1890ff',
    xAxis: { label: { autoHide: true, autoRotate: false } },
    yAxis: { min: 0 },
    meta: {
      month: { alias: 'Tháng' },
      value: { alias: 'Số hồ sơ' },
    },
  };

  return (
    <Card title="Xu hướng nộp hồ sơ">
      <Spin spinning={loading}>
        {error ? <Alert type="error" message={error} /> : <Bar {...config} />}
      </Spin>
    </Card>
  );
};

export default BarChart;
