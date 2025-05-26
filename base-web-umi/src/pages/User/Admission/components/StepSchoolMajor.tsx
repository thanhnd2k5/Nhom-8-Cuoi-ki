import React, { useState, useEffect } from 'react';
import { fetchUniversities, fetchMajors, fetchSubjectCombinations } from '@/models/User/admission';

interface University {
  id: string;
  name: string;
}
interface Major {
  id: string;
  name: string;
  universityId: string;
}
interface Combination {
  id: string;
  name: string;
  majorId: string;
}

const StepSchoolMajor = ({ onNext, onPrev }: { onNext: (data: any) => void, onPrev: () => void }) => {
  const [universityId, setUniversityId] = useState('');
  const [majorId, setMajorId] = useState('');
  const [group, setGroup] = useState('');
  const [universities, setUniversities] = useState<University[]>([]);
  const [majors, setMajors] = useState<Major[]>([]);
  const [combinations, setCombinations] = useState<Combination[]>([]);

  useEffect(() => {
    fetchUniversities().then(setUniversities);
    fetchMajors().then(setMajors);
    fetchSubjectCombinations().then(setCombinations);
  }, []);

  // Lọc ngành theo trường đã chọn
  const filteredMajors = majors.filter(m => m.universityId === universityId);
  // Lọc tổ hợp theo ngành đã chọn
  const filteredCombinations = combinations.filter(c => c.majorId === majorId);

  const selectedUniversity = universities.find(u => u.id === universityId);
  const selectedMajor = majors.find(m => m.id === majorId);

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
          {filteredMajors.map(m => <option key={m.id} value={m.id}>{m.name}</option>)}
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
          {filteredCombinations.map(g => <option key={g.id} value={g.name}>{g.name}</option>)}
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
