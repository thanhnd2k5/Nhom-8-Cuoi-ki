import React, { useState } from 'react';

const inputStyle = {
  width: '100%',
  padding: 12,
  border: '1px solid #eee',
  borderRadius: 8,
  fontSize: 16,
  marginBottom: 18,
  background: '#f8fafc',
};

const StepScore = ({ method, onNext, onPrev }: { method: string, onNext: (d: any) => void, onPrev: () => void }) => {
  // Tùy phương thức, render form nhập khác nhau
  const [form, setForm] = useState<any>({});

  // Ví dụ cho từng phương thức
  let content = null;
  if (method === 'hoc_ba') {
    content = (
      <>
        <h4 style={{ fontWeight: 600, marginBottom: 12 }}>Điểm trung bình các môn theo tổ hợp (5 học kỳ)</h4>
        <input style={inputStyle} placeholder="Điểm TB Toán (cách nhau bởi dấu phẩy)" onChange={e => setForm({ ...form, toan: e.target.value })} />
        <input style={inputStyle} placeholder="Điểm TB Văn" onChange={e => setForm({ ...form, van: e.target.value })} />
        <input style={inputStyle} placeholder="Điểm TB Anh" onChange={e => setForm({ ...form, anh: e.target.value })} />
        <input style={inputStyle} placeholder="Chứng chỉ tiếng Anh (nếu có)" onChange={e => setForm({ ...form, englishCert: e.target.value })} />
        <input style={inputStyle} placeholder="Điểm tiếng Anh" onChange={e => setForm({ ...form, englishScore: e.target.value })} />
      </>
    );
  } else if (method === 'thpt') {
    content = (
      <>
        <h4 style={{ fontWeight: 600, marginBottom: 12 }}>Nhập điểm thi THPT Quốc gia</h4>
        <input style={inputStyle} placeholder="Toán" onChange={e => setForm({ ...form, toan: e.target.value })} />
        <input style={inputStyle} placeholder="Văn" onChange={e => setForm({ ...form, van: e.target.value })} />
        <input style={inputStyle} placeholder="Anh" onChange={e => setForm({ ...form, anh: e.target.value })} />
        <input style={inputStyle} placeholder="Điểm ưu tiên (nếu có)" onChange={e => setForm({ ...form, priorityScore: e.target.value })} />
      </>
    );
  } else if (method === 'thang') {
    content = (
      <>
        <h4 style={{ fontWeight: 600, marginBottom: 12 }}>Nhập thông tin thành tích</h4>
        <input style={inputStyle} placeholder="Tên giải thưởng/thành tích" onChange={e => setForm({ ...form, title: e.target.value })} />
        <input style={inputStyle} placeholder="Cấp giải" onChange={e => setForm({ ...form, level: e.target.value })} />
        <input style={inputStyle} placeholder="Năm đạt giải" onChange={e => setForm({ ...form, year: e.target.value })} />
        <input style={inputStyle} placeholder="Số hiệu chứng nhận" onChange={e => setForm({ ...form, certificateNumber: e.target.value })} />
        <input style={inputStyle} placeholder="Mô tả thêm" onChange={e => setForm({ ...form, description: e.target.value })} />
      </>
    );
  } else if (method === 'dgnl') {
    content = (
      <>
        <h4 style={{ fontWeight: 600, marginBottom: 12 }}>Nhập điểm đánh giá năng lực</h4>
        <input style={inputStyle} placeholder="Loại bài thi (ĐGNL, SAT, ...)" onChange={e => setForm({ ...form, examType: e.target.value })} />
        <input style={inputStyle} placeholder="Điểm bài thi" onChange={e => setForm({ ...form, examScore: e.target.value })} />
        <input style={inputStyle} placeholder="Điểm ưu tiên (nếu có)" onChange={e => setForm({ ...form, priorityScore: e.target.value })} />
      </>
    );
  }

  return (
    <div style={{
      background: '#fff',
      borderRadius: 8,
      border: '1px solid #eee',
      boxShadow: 'none',
      padding: 32,
      marginBottom: 32
    }}>
      <h2 style={{ fontWeight: 700, fontSize: 24, marginBottom: 24 }}>Bước 4: Nhập điểm/thành tích</h2>
      {content}
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
          onClick={() => onNext(form)}
        >
          Tiếp tục
        </button>
      </div>
    </div>
  );
};

export default StepScore;
