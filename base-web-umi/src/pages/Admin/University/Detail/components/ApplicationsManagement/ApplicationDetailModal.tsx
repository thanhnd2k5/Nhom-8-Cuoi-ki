import React from 'react';
import { Modal, Descriptions, Tag, Space } from 'antd';
import { Application } from '@/models/Admin/Applications';
import styles from './index.less';

interface ApplicationDetailModalProps {
  visible: boolean;
  onCancel: () => void;
  application: Application | null;
}

const ApplicationDetailModal: React.FC<ApplicationDetailModalProps> = ({
  visible,
  onCancel,
  application,
}) => {
  if (!application) return null;

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

  return (
    <Modal
      title="Chi tiết hồ sơ xét tuyển"
      visible={visible}
      onCancel={onCancel}
      width={800}
      footer={null}
    >
      <Descriptions bordered column={2}>
        <Descriptions.Item label="Mã hồ sơ" span={2}>
          {application.code}
        </Descriptions.Item>
        <Descriptions.Item label="Họ và tên" span={2}>
          {application.full_name}
        </Descriptions.Item>
        <Descriptions.Item label="Ngày sinh">
          {application.date_of_birth}
        </Descriptions.Item>
        <Descriptions.Item label="Giới tính">
          {application.gender}
        </Descriptions.Item>
        <Descriptions.Item label="Email" span={2}>
          {application.email}
        </Descriptions.Item>
        <Descriptions.Item label="Số điện thoại" span={2}>
          {application.phone}
        </Descriptions.Item>
        <Descriptions.Item label="Địa chỉ" span={2}>
          {application.address}
        </Descriptions.Item>
        <Descriptions.Item label="Ngành đăng ký" span={2}>
          {application.major?.name}
        </Descriptions.Item>
        <Descriptions.Item label="Phương thức xét tuyển" span={2}>
          {application.admission_method}
        </Descriptions.Item>
        <Descriptions.Item label="Tổ hợp môn" span={2}>
          <Space>
            {application.subject_combination?.subjects.map((subject: string) => (
              <Tag key={subject} color="blue">
                {subject}
              </Tag>
            ))}
          </Space>
        </Descriptions.Item>
        <Descriptions.Item label="Điểm xét tuyển" span={2}>
          {application.score}
        </Descriptions.Item>
        <Descriptions.Item label="Trạng thái" span={2}>
          {getStatusTag(application.status)}
        </Descriptions.Item>
        {application.rejection_reason && (
          <Descriptions.Item label="Lý do từ chối" span={2}>
            {application.rejection_reason}
          </Descriptions.Item>
        )}
      </Descriptions>
    </Modal>
  );
};

export default ApplicationDetailModal; 