import React from 'react';

const boxStyle = {
  background: '#fff',
  borderRadius: 12,
  padding: '18px 32px',
  minWidth: 160,
  textAlign: 'center',
  boxShadow: '0 2px 8px #eee',
  fontWeight: 600,
  fontSize: 16,
};
const numStyle = {
  fontSize: 28,
  fontWeight: 800,
  color: '#2563eb',
  marginTop: 8,
};

const StatsBox = ({ stats }: { stats: any }) => (
  <div style={{ display: 'flex', gap: 24, marginBottom: 32 }}>
    <div style={boxStyle}>
      <div>Hồ sơ đã tạo</div>
      <div style={numStyle}>{stats.created}</div>
    </div>
    <div style={boxStyle}>
      <div>Đang xét duyệt</div>
      <div style={numStyle}>{stats.pending}</div>
    </div>
    <div style={boxStyle}>
      <div>Đã duyệt</div>
      <div style={numStyle}>{stats.approved}</div>
    </div>
    <div style={boxStyle}>
      <div>Thông báo mới</div>
      <div style={numStyle}>{stats.notifications}</div>
    </div>
  </div>
);

export default StatsBox;
