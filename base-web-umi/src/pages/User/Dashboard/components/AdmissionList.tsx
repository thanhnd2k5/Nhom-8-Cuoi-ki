import React, { useState, useEffect } from 'react';
import { fetchMajors, fetchSubjectCombinations } from '@/models/User/admission';
import moment from 'moment';

const statusColor = {
  approved: { color: '#c00', label: 'Đã duyệt' },
  pending: { color: '#eab308', label: 'Chờ duyệt' },
  rejected: { color: '#888', label: 'Từ chối' },
};

const tabs = [
  { key: 'all', label: 'Tất cả' },
  { key: 'pending', label: 'Chờ duyệt' },
  { key: 'approved', label: 'Đã duyệt' },
  { key: 'rejected', label: 'Từ chối' },
];

const statusMap = {
  pending: 'cho_duyet',
  approved: 'da_duyet',
  rejected: 'tu_choi',
};

const AdmissionList = ({ admissions }) => {
  const [tab, setTab] = useState('all');
  const [majors, setMajors] = useState([]);
  const [combinations, setCombinations] = useState([]);

  useEffect(() => {
    fetchMajors().then(data => {
      setMajors(data);
      console.log('Majors loaded:', data);
    });
    fetchSubjectCombinations().then(data => {
      setCombinations(data);
    });
  }, []);

  const getMajorName = (id) => {
    const major = majors.find(m => m.id === id || m._id === id);
    return major ? major.name : '---';
  };

  const getCombinationName = (id) => {
    const comb = combinations.find(c => c.id === id || c._id === id);
    return comb ? comb.name : '---';
  };

  const getTotalScore = (score) => {
    return score ? score : '---';
  };

  const filtered = tab === 'all'
    ? admissions
    : admissions.filter(item => item.status === statusMap[tab]);

  


  return (
    <div style={{ background: '#f3f4f6', minHeight: 600, padding: 32 }}>
      <div style={{ maxWidth: 900, margin: '0 auto' }}>
        <div style={{ display: 'flex', alignItems: 'center', marginBottom: 24 }}>
          <h2 style={{ fontWeight: 700, fontSize: 24, margin: 0, flex: 1 }}>Hồ sơ xét tuyển</h2>
          <button style={{
            background: '#c00',
            color: '#fff',
            border: 'none',
            borderRadius: 6,
            padding: '8px 24px',
            fontWeight: 600,
            fontSize: 16,
            cursor: 'pointer'
          }}>
            + Tạo hồ sơ mới
          </button>
        </div>
        <div style={{ display: 'flex', gap: 24, marginBottom: 24 }}>
          {tabs.map(t => (
            <div
              key={t.key}
              onClick={() => setTab(t.key)}
              style={{
                fontWeight: 600,
                fontSize: 16,
                color: tab === t.key ? '#c00' : '#222',
                borderBottom: tab === t.key ? '3px solid #c00' : '3px solid transparent',
                paddingBottom: 6,
                cursor: 'pointer'
              }}
            >
              {t.label}
            </div>
          ))}
        </div>
        <div>
          {filtered.length === 0 && <div style={{ color: '#888', textAlign: 'center', marginTop: 60 }}>Không có hồ sơ nào.</div>}
          {filtered.map((item) => (
            <div key={item.id} style={{
              background: '#fff',
              borderRadius: 8,
              padding: 20,
              marginBottom: 18,
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              border: '1px solid #eee'
            }}>
              <div>
                <div style={{ fontWeight: 700, fontSize: 18, marginBottom: 4 }}>{item.university}</div>
                <div style={{ color: '#555', marginBottom: 2 }}>Ngành: <b>{getMajorName(item.universityMajorId)}</b></div>
                <div style={{ color: '#555', marginBottom: 2 }}>Tổ hợp xét tuyển: <b>{getCombinationName(item.subjectCombinationId)}</b></div>
                <div style={{ color: '#888', fontSize: 14 }}>Ngày nộp: {item.created_at ? moment(item.created_at).format('DD/MM/YYYY') : '---'}</div>
              </div>
              <div style={{ textAlign: 'right', minWidth: 180 }}>
                <div style={{ color: '#888', fontSize: 15 }}>Tổng điểm: <b>{getTotalScore(item.totalScore)}</b></div>
                <div style={{ color: '#888', fontSize: 14, marginBottom: 8 }}>Ngày cập nhật: {item.updated_at ? moment(item.updated_at).format('DD/MM/YYYY') : '---'}</div>
                <span style={{
                  background: statusColor[item.status]?.color || '#ccc',
                  color: '#fff',
                  borderRadius: 6,
                  padding: '4px 14px',
                  marginRight: 8,
                  fontWeight: 600,
                  fontSize: 15
                }}>
                  {statusColor[item.status]?.label || item.status}
                </span>
                <button style={{
                  background: '#fff',
                  color: '#c00',
                  border: '1.5px solid #c00',
                  borderRadius: 6,
                  padding: '6px 16px',
                  fontWeight: 600,
                  cursor: 'pointer',
                  marginLeft: 8,
                  fontSize: 15
                }}>Xem chi tiết</button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AdmissionList;
