import React, { useState } from 'react';

const METHODS = [
  { value: 'hoc_ba', label: 'Xét tuyển học bạ kèm chứng chỉ tiếng Anh', desc: 'Xét tuyển dựa trên học bạ và chứng chỉ tiếng Anh quốc tế' },
  { value: 'thpt', label: 'Điểm thi THPT Quốc gia', desc: 'Xét tuyển dựa trên kết quả kỳ thi THPT Quốc gia' },
  { value: 'thang', label: 'Xét tuyển thẳng', desc: 'Dành cho học sinh đạt giải, thành tích đặc biệt' },
  { value: 'dgnl', label: 'Đánh giá năng lực', desc: 'Xét tuyển dựa trên bài thi ĐGNL, SAT, ACT...' },
];

const StepMethod = ({ onNext }: { onNext: (data: any) => void }) => {
  const [method, setMethod] = useState<string>('');
  const selected = METHODS.find(m => m.value === method);

  return (
    <div style={{
      background: '#fff',
      borderRadius: 8,
      border: '1px solid #eee',
      boxShadow: 'none',
      padding: 32,
      marginBottom: 32
    }}>
      <h2 style={{ fontWeight: 700, fontSize: 24, marginBottom: 24 }}>Bước 1: Chọn phương thức xét tuyển</h2>
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: 24 }}>
        {METHODS.map(m => (
          <label
            key={m.value}
            style={{
              border: method === m.value ? '2px solid #c00' : '1.5px solid #eee',
              borderRadius: 12,
              padding: 24,
              minWidth: 260,
              background: method === m.value ? '#fff0f0' : '#f8fafc',
              cursor: 'pointer',
              boxShadow: 'none',
              transition: 'all .2s',
              flex: 1,
            }}
            onClick={() => setMethod(m.value)}
          >
            <div style={{ fontWeight: 700, fontSize: 18, marginBottom: 8 }}>{m.label}</div>
            <div style={{ color: '#666', fontSize: 15 }}>{m.desc}</div>
            <input
              type="radio"
              name="method"
              value={m.value}
              checked={method === m.value}
              onChange={() => setMethod(m.value)}
              style={{ display: 'none' }}
            />
          </label>
        ))}
      </div>
      <div style={{ marginTop: 32, textAlign: 'right' }}>
        <button
          style={{
            padding: '12px 32px',
            background: '#c00',
            color: '#fff',
            border: 'none',
            borderRadius: 6,
            fontWeight: 700,
            fontSize: 18,
            cursor: method ? 'pointer' : 'not-allowed',
            opacity: method ? 1 : 0.5,
          }}
          disabled={!method}
          onClick={() => onNext({
            method: selected?.value,
            methodLabel: selected?.label
          })}
        >
          Tiếp tục
        </button>
      </div>
    </div>
  );
};

export default StepMethod;
