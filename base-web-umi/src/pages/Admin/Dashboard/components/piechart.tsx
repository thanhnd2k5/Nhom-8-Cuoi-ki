import React, { useEffect, useState } from 'react';
import { Card, Spin, Alert } from 'antd';
import { Pie } from '@ant-design/plots';

const API_URL = process.env.APP_URL_API;

function getToken() {
  return localStorage.getItem('token');
}

const PieChart: React.FC = () => {
  const [data, setData] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string>();

  useEffect(() => {
    setLoading(true);
    fetch(`${API_URL}/admin/applications/status`, {
      headers: { Authorization: `Bearer ${getToken()}` },
    })
      .then(res => res.json())
      .then(res => setData(res.data || []))
      .catch(err => setError('Không thể tải dữ liệu biểu đồ'))
      .finally(() => setLoading(false));
  }, []);

  const config = {
    appendPadding: 10,
    data,
    angleField: 'value',
    colorField: 'type',
    color: ({ type }: any) => {
      if (type === 'Đã duyệt') return '#52c41a';
      if (type === 'Từ chối') return '#ff4d4f';
      if (type === 'Chờ duyệt') return '#faad14';
      return '#1890ff';
    },
    radius: 1,
    label: {
      type: 'spider',
      content: '{name} {percentage}',
    },
    legend: { position: 'bottom' },
    statistic: null,
  };

  return (
    <Card title="Phân bố trạng thái hồ sơ">
      <Spin spinning={loading}>
        {error ? <Alert type="error" message={error} /> : <Pie {...config} />}
      </Spin>
    </Card>
  );
};

export default PieChart;
