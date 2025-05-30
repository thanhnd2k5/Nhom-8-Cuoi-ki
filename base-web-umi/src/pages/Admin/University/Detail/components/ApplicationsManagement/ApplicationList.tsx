import React from 'react';
import { Table, Button, Space, Tag, Modal, message } from 'antd';
import { CheckOutlined, CloseOutlined, EyeOutlined } from '@ant-design/icons';
import { Application } from '@/models/Admin/Applications';
import ApplicationDetailModal from './ApplicationDetailModal';
import styles from './index.less';

interface ApplicationListProps {
  status: string;
  applications: Application[];
  loading: boolean;
  onApprove?: (id: string) => Promise<void>;
  onReject?: (id: string) => Promise<void>;
}

const ApplicationList: React.FC<ApplicationListProps> = ({
  status,
  applications,
  loading,
  onApprove,
  onReject,
}) => {
  const [selectedApplication, setSelectedApplication] = React.useState<Application | null>(null);
  const [showDetail, setShowDetail] = React.useState(false);

  const handleViewDetail = (application: Application) => {
    setSelectedApplication(application);
    setShowDetail(true);
  };

  const handleApprove = (id: string) => {
    Modal.confirm({
      title: 'Xác nhận duyệt đơn',
      content: 'Bạn có chắc chắn muốn duyệt đơn xét tuyển này?',
      okText: 'Duyệt',
      okType: 'primary',
      cancelText: 'Hủy',
      onOk: async () => {
        if (onApprove) {
          await onApprove(id);
        }
      },
    });
  };

  const handleReject = (id: string) => {
    Modal.confirm({
      title: 'Xác nhận từ chối đơn',
      content: 'Bạn có chắc chắn muốn từ chối đơn xét tuyển này?',
      okText: 'Từ chối',
      okType: 'danger',
      cancelText: 'Hủy',
      onOk: async () => {
        if (onReject) {
          await onReject(id);
        }
      },
    });
  };

  const getStatusTag = (status: string) => {
    const statusConfig = {
      pending: { color: 'warning', text: 'Chờ duyệt' },
      approved: { color: 'success', text: 'Đã duyệt' },
      rejected: { color: 'error', text: 'Đã từ chối' },
      enrolled: { color: 'processing', text: 'Đã nhập học' },
    };
    const config = statusConfig[status as keyof typeof statusConfig];
    return <Tag color={config.color}>{config.text}</Tag>;
  };

  const columns = [
    {
      title: 'Mã hồ sơ',
      dataIndex: 'code',
      key: 'code',
    },
    {
      title: 'Họ và tên',
      dataIndex: 'full_name',
      key: 'full_name',
    },
    {
      title: 'Ngành đăng ký',
      dataIndex: 'major',
      key: 'major',
      render: (major: any) => major?.name,
    },
    {
      title: 'Phương thức xét tuyển',
      dataIndex: 'admission_method',
      key: 'admission_method',
    },
    {
      title: 'Điểm xét tuyển',
      dataIndex: 'score',
      key: 'score',
    },
    {
      title: 'Trạng thái',
      dataIndex: 'status',
      key: 'status',
      render: (status: string) => getStatusTag(status),
    },
    {
      title: 'Thao tác',
      key: 'action',
      render: (_: any, record: Application) => (
        <Space size="middle">
          <Button
            type="primary"
            icon={<EyeOutlined />}
            onClick={() => handleViewDetail(record)}
          >
            Chi tiết
          </Button>
          {status === 'pending' && (
            <>
              <Button
                type="primary"
                icon={<CheckOutlined />}
                onClick={() => handleApprove(record._id)}
              >
                Duyệt
              </Button>
              <Button
                danger
                icon={<CloseOutlined />}
                onClick={() => handleReject(record._id)}
              >
                Từ chối
              </Button>
            </>
          )}
        </Space>
      ),
    },
  ];

  return (
    <div className={styles.container}>
      <Table
        columns={columns}
        dataSource={applications}
        loading={loading}
        rowKey="_id"
      />

      <ApplicationDetailModal
        visible={showDetail}
        onCancel={() => setShowDetail(false)}
        application={selectedApplication}
      />
    </div>
  );
};

export default ApplicationList; 