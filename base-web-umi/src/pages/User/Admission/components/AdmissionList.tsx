import React, { useEffect, useState } from 'react';
import { fetchApplications } from '@/models/User/admission';

// Map status cho đồng bộ với Dashboard
const statusMap = {
  cho_duyet: 'pending',
  da_duyet: 'approved',
  tu_choi: 'rejected',
};

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

const AdmissionList: React.FC = () => {
  const [applications, setApplications] = useState<any[]>([]);
  const [tab, setTab] = useState('all');

  useEffect(() => {
    fetchApplications().then(data => {
      setApplications(Array.isArray(data) ? data : []);
    });
  }, []);

  // Map lại status cho đúng key
  const mappedApps = applications.map(app => ({
    ...app,
    status: statusMap[app.status] || app.status,
  }));

  const filtered = tab === 'all' ? mappedApps : mappedApps.filter(app => app.status === tab);

  return (
    <div style={{ background: '#f3f4f6', minHeight: 600, padding: '32px 0' }}>
      <div>
        <div style={{ display: 'flex', alignItems: 'center', marginBottom: 24 }}>
          
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
          {filtered.map((app) => (
            <div key={app._id} style={{
              background: '#fff',
              borderRadius: 8,
              padding: 20,
              marginBottom: 18,
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              border: '1px solid #eee',
              boxShadow: 'none'
            }}>
              <div>
                <div style={{ fontWeight: 700, fontSize: 18, marginBottom: 4 }}>{app.universityName || app.university}</div>
                <div style={{ color: '#555', marginBottom: 2 }}>Ngành: <b>{app.majorName || app.major}</b></div>
                <div style={{ color: '#555', marginBottom: 2 }}>Tổ hợp xét tuyển: <b>{app.subjectCombinationName || app.group}</b></div>
                <div style={{ color: '#888', fontSize: 14 }}>Ngày nộp: {app.createdAt?.slice(0,10)}</div>
              </div>
              <div style={{ textAlign: 'right', minWidth: 180 }}>
                <div style={{ color: '#888', fontSize: 15 }}>Tổng điểm</div>
                <div style={{ fontWeight: 700, fontSize: 18, marginBottom: 8 }}>{app.totalScore || '--'}</div>
                <div style={{ color: '#888', fontSize: 14, marginBottom: 8 }}>Ngày cập nhật: {app.updatedAt?.slice(0,10) || '--'}</div>
                <span style={{
                  background: statusColor[app.status]?.color || '#ccc',
                  color: '#fff',
                  borderRadius: 6,
                  padding: '4px 14px',
                  marginRight: 8,
                  fontWeight: 600,
                  fontSize: 15
                }}>
                  {statusColor[app.status]?.label || app.status}
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
