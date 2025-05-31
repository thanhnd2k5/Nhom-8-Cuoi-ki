import React from 'react';
import { Modal, Descriptions, Tag } from 'antd';
import { Application } from '@/services/Admin/Applications';
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
    <Modal
      title="Chi tiết đơn xét tuyển"
      visible={visible}
      onCancel={onCancel}
      footer={null}
      width={800}
    >
      {application && (
        <Descriptions bordered column={2}>
          <Descriptions.Item label="Họ và tên" span={2}>
            {application.userId.name}
          </Descriptions.Item>
          <Descriptions.Item label="Email" span={2}>
            {application.userId.email}
          </Descriptions.Item>
          <Descriptions.Item label="Ngành đăng ký" span={2}>
            {application.universityMajorId.name}
          </Descriptions.Item>
          <Descriptions.Item label="Mã ngành">
            {application.universityMajorId.code}
          </Descriptions.Item>
          <Descriptions.Item label="Phương thức xét tuyển">
            {getAdmissionMethod(application.admissionMethod)}
          </Descriptions.Item>
          <Descriptions.Item label="Tổ hợp môn">
            {application.subjectCombinationId.code}
          </Descriptions.Item>
          <Descriptions.Item label="Các môn học" span={2}>
            {application.subjectCombinationId.subjects.join(', ')}
          </Descriptions.Item>
          <Descriptions.Item label="Trạng thái" span={2}>
            {getStatusTag(application.status)}
          </Descriptions.Item>
          <Descriptions.Item label="Ngày tạo" span={2}>
            {new Date(application.created_at).toLocaleString('vi-VN')}
          </Descriptions.Item>
          <Descriptions.Item label="Ngày cập nhật" span={2}>
            {new Date(application.updated_at).toLocaleString('vi-VN')}
          </Descriptions.Item>
        </Descriptions>
      )}
    </Modal>
  );
};

export default ApplicationDetailModal; 