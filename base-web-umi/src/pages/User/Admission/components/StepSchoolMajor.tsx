import React, { useState } from 'react';

// Giả lập dữ liệu, sau này lấy từ API hoặc file JSON
const universities = [
  { id: '1', name: 'Đại học Bách Khoa Hà Nội', majors: [
    { id: 'm1', name: 'Khoa học máy tính', groups: ['A00', 'A01'] },
    { id: 'm2', name: 'Kỹ thuật điện', groups: ['A00', 'A02'] },
  ]},
  { id: '2', name: 'Đại học Quốc gia Hà Nội', majors: [
    { id: 'm3', name: 'Công nghệ thông tin', groups: ['A01', 'D01'] },
  ]},
  // ... các trường khác
];

const StepSchoolMajor = ({ onNext, onPrev }: { onNext: (data: any) => void, onPrev: () => void }) => {
  const [universityId, setUniversityId] = useState('');
  const [majorId, setMajorId] = useState('');
  const [group, setGroup] = useState('');

  const selectedUniversity = universities.find(u => u.id === universityId);
  const selectedMajor = selectedUniversity?.majors.find(m => m.id === majorId);

  return (
    <div style={{
      background: '#fff',
      borderRadius: 8,
      border: '1px solid #eee',
      boxShadow: 'none',
      padding: 32,
      marginBottom: 32
    }}>
      <h2 style={{ fontWeight: 700, fontSize: 24, marginBottom: 24 }}>Bước 2: Chọn trường và ngành</h2>
      <div style={{ marginBottom: 18 }}>
        <label style={{ fontWeight: 600, color: '#222', marginBottom: 6, display: 'block' }}>Trường đại học</label>
        <select
          style={{
            width: '100%', padding: 12, border: '1px solid #eee', borderRadius: 8, fontSize: 16, background: '#f8fafc'
          }}
          value={universityId}
          onChange={e => { setUniversityId(e.target.value); setMajorId(''); setGroup(''); }}
        >
          <option value="">Chọn trường đại học</option>
          {universities.map(u => <option key={u.id} value={u.id}>{u.name}</option>)}
        </select>
      </div>
      <div style={{ marginBottom: 18 }}>
        <label style={{ fontWeight: 600, color: '#222', marginBottom: 6, display: 'block' }}>Ngành học</label>
        <select
          style={{
            width: '100%', padding: 12, border: '1px solid #eee', borderRadius: 8, fontSize: 16, background: '#f8fafc'
          }}
          value={majorId}
          onChange={e => { setMajorId(e.target.value); setGroup(''); }}
          disabled={!universityId}
        >
          <option value="">Vui lòng chọn trường đại học trước</option>
          {selectedUniversity?.majors.map(m => <option key={m.id} value={m.id}>{m.name}</option>)}
        </select>
      </div>
      <div style={{ marginBottom: 18 }}>
        <label style={{ fontWeight: 600, color: '#222', marginBottom: 6, display: 'block' }}>Tổ hợp xét tuyển</label>
        <select
          style={{
            width: '100%', padding: 12, border: '1px solid #eee', borderRadius: 8, fontSize: 16, background: '#f8fafc'
          }}
          value={group}
          onChange={e => setGroup(e.target.value)}
          disabled={!majorId}
        >
          <option value="">Vui lòng chọn ngành học trước</option>
          {selectedMajor?.groups.map(g => <option key={g} value={g}>{g}</option>)}
        </select>
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
            cursor: universityId && majorId && group ? 'pointer' : 'not-allowed',
            opacity: universityId && majorId && group ? 1 : 0.5,
          }}
          disabled={!universityId || !majorId || !group}
          onClick={() => onNext({
            universityId,
            universityName: selectedUniversity?.name,
            majorId,
            majorName: selectedMajor?.name,
            group,
            subjectCombinationName: group
          })}
        >
          Tiếp tục
        </button>
      </div>
    </div>
  );
};

export default StepSchoolMajor;
