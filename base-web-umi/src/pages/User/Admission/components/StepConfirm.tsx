import React from 'react';
import { submitApplication } from '@/models/User/admission';

const StepConfirm = ({ data, onPrev }: { data: any, onPrev: () => void }) => {
  const handleSubmit = async () => {
    // Gộp dữ liệu các bước, gửi lên API
    await submitApplication(data);
    alert('Gửi hồ sơ thành công!');
    // Có thể chuyển hướng hoặc reset form tại đây
  };

  return (
    <div style={{
      background: '#fff',
      borderRadius: 8,
      border: '1px solid #eee',
      boxShadow: 'none',
      padding: 32,
      marginBottom: 32
    }}>
      <h2 style={{ fontWeight: 700, fontSize: 24, marginBottom: 24 }}>Bước 6: Xác nhận & gửi</h2>
      <div style={{
        background: '#f8fafc',
        borderRadius: 12,
        padding: 18,
        marginBottom: 24,
        color: '#222',
        fontWeight: 500,
        fontSize: 16,
        whiteSpace: 'pre-wrap'
      }}>
        <pre style={{ background: 'none', padding: 0, margin: 0 }}>
          {JSON.stringify(data, null, 2)}
        </pre>
      </div>
      <div style={{ marginTop: 32, textAlign: 'right' }}>
        <button
          style={{
            padding: '12px 32px',
            background: '#fff',
            color: '#c00',
            border: '1.5px solid #c00',
            borderRadius: 6,
            fontWeight: 700,
            fontSize: 18,
            marginRight: 12,
            cursor: 'pointer'
          }}
          onClick={onPrev}
        >
          Quay lại
        </button>
        <button
          style={{
            padding: '12px 32px',
            background: '#c00',
            color: '#fff',
            border: 'none',
            borderRadius: 6,
            fontWeight: 700,
            fontSize: 18,
            cursor: 'pointer'
          }}
          onClick={handleSubmit}
        >
          Gửi hồ sơ
        </button>
      </div>
    </div>
  );
};

export default StepConfirm;
