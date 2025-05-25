import React, { useState } from 'react';

const StepUpload = ({ onNext, onPrev }: { onNext: (d: any) => void, onPrev: () => void }) => {
  const [files, setFiles] = useState<any>({});

  // Đơn giản hóa, thực tế nên dùng component upload file
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>, key: string) => {
    setFiles({ ...files, [key]: e.target.files?.[0] });
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
      <h2 style={{ fontWeight: 700, fontSize: 24, marginBottom: 24 }}>Bước 5: Tải lên minh chứng</h2>
      <div style={{ marginBottom: 18 }}>
        <label style={{ fontWeight: 600, color: '#222', marginBottom: 6, display: 'block' }}>Ảnh CCCD/CMND (mặt trước):</label>
        <input type="file" onChange={e => handleFileChange(e, 'cccdFront')} />
      </div>
      <div style={{ marginBottom: 18 }}>
        <label style={{ fontWeight: 600, color: '#222', marginBottom: 6, display: 'block' }}>Ảnh CCCD/CMND (mặt sau):</label>
        <input type="file" onChange={e => handleFileChange(e, 'cccdBack')} />
      </div>
      <div style={{ marginBottom: 18 }}>
        <label style={{ fontWeight: 600, color: '#222', marginBottom: 6, display: 'block' }}>Ảnh học bạ/giấy báo điểm/thành tích:</label>
        <input type="file" onChange={e => handleFileChange(e, 'other')} />
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
          onClick={() => onNext(files)}
        >
          Tiếp tục
        </button>
      </div>
    </div>
  );
};

export default StepUpload;
