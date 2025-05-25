import React from 'react';

const boxStyle = {
  background: '#fff',
  borderRadius: 8,
  padding: '16px 24px',
  minWidth: 140,
  textAlign: 'center',
  border: '1px solid #eee',
  fontWeight: 600,
  fontSize: 15,
  boxShadow: 'none',
};
const numStyle = {
  fontSize: 24,
  fontWeight: 800,
  color: '#c00',
  marginTop: 8,
};

const StatsBox = ({ stats }: { stats: any }) => (
  <div style={{ display: 'flex', gap: 20, marginBottom: 28 }}>
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
