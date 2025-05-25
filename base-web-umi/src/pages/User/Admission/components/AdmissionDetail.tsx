import React, { useEffect, useState } from 'react';
import { fetchApplicationDetail } from '@/models/User/admission';

const AdmissionDetail = ({ id, onClose }: { id: string, onClose: () => void }) => {
  const [detail, setDetail] = useState<any>(null);

  useEffect(() => {
    fetchApplicationDetail(id).then(setDetail);
  }, [id]);

  if (!detail) return <div>Đang tải...</div>;

  return (
    <div style={{
      background: '#fff',
      borderRadius: 8,
      padding: 32,
      border: '1px solid #eee',
      boxShadow: 'none',
      marginBottom: 32
    }}>
      <h2 style={{ fontWeight: 700, fontSize: 22, marginBottom: 20, color: '#222' }}>Chi tiết hồ sơ</h2>
      <div style={{ marginBottom: 10 }}>Trường: <b>{detail.universityName || detail.university}</b></div>
      <div style={{ marginBottom: 10 }}>Ngành: <b>{detail.majorName || detail.major}</b></div>
      <div style={{ marginBottom: 10 }}>Tổ hợp: <b>{detail.subjectCombinationName || detail.group}</b></div>
      <div style={{ marginBottom: 10 }}>Phương thức: <b>{detail.admissionMethod}</b></div>
      {/* ...hiển thị các trường khác... */}
      <div style={{ textAlign: 'right', marginTop: 24 }}>
        <button
          onClick={onClose}
          style={{
            background: '#c00',
            color: '#fff',
            border: 'none',
            borderRadius: 6,
            padding: '8px 28px',
            fontWeight: 600,
            fontSize: 16,
            cursor: 'pointer'
          }}
        >Đóng</button>
      </div>
    </div>
  );
};

export default AdmissionDetail;
