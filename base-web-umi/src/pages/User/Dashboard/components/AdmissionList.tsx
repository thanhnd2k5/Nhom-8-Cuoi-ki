import React from 'react';

const statusColor = {
  approved: { color: '#22c55e', label: 'Đã duyệt' },
  pending: { color: '#eab308', label: 'Đang xét duyệt' },
  rejected: { color: '#ef4444', label: 'Từ chối' },
};

const AdmissionList = ({ admissions }: { admissions: any[] }) => (
  <div style={{ background: '#fff', borderRadius: 12, padding: 24 }}>
    <h3 style={{ fontWeight: 700, fontSize: 20 }}>Hồ sơ xét tuyển của bạn</h3>
    <div>
      {admissions.map((item) => (
        <div key={item.id} style={{
          border: '1px solid #eee', borderRadius: 10, padding: 16, marginBottom: 12,
          display: 'flex', justifyContent: 'space-between', alignItems: 'center'
        }}>
          <div>
            <div style={{ fontWeight: 700 }}>{item.university}</div>
            <div>Ngành: {item.major}</div>
            <div>Tổ hợp: {item.group}</div>
          </div>
          <div style={{ textAlign: 'right' }}>
            <span style={{
              background: statusColor[item.status]?.color || '#ccc',
              color: '#fff', borderRadius: 8, padding: '4px 12px', marginRight: 8
            }}>
              {statusColor[item.status]?.label || item.status}
            </span>
            <button style={{
              background: '#2563eb', color: '#fff', border: 'none', borderRadius: 8,
              padding: '8px 18px', fontWeight: 600, cursor: 'pointer'
            }}>Xem chi tiết</button>
          </div>
        </div>
      ))}
    </div>
  </div>
);

export default AdmissionList;
