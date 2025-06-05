import React, { useState } from 'react';

const StatsBox = ({ stats }) => {
  const statsData = [
    {
      icon: '📄',
      title: 'Tổng hồ sơ',
      value: stats.created || 0,
      gradient: 'linear-gradient(135deg, #dc2626, #ef4444)',
      trend: '+12%',
      trendColor: '#059669'
    },
    {
      icon: '⏰',
      title: 'Chờ duyệt',
      value: stats.pending || 0,
      gradient: 'linear-gradient(135deg, #eab308, #f59e0b)',
      trend: '-3%',
      trendColor: '#dc2626'
    },
    {
      icon: '✅',
      title: 'Đã duyệt',
      value: stats.approved || 0,
      gradient: 'linear-gradient(135deg, #059669, #10b981)',
      trend: '+8%',
      trendColor: '#059669'
    },
    {
      icon: '❌',
      title: 'Từ chối',
      value: stats.rejected || 0,
      gradient: 'linear-gradient(135deg, #6b7280, #9ca3af)',
      trend: '0%',
      trendColor: '#6b7280'
    }
  ];

  const StatsCard = ({ icon, title, value, gradient, trend, trendColor }) => {
    const [isHovered, setIsHovered] = useState(false);

    return (
      <div 
        style={{
          background: 'white',
          borderRadius: 16,
          padding: 24,
          boxShadow: isHovered ? '0 12px 40px rgba(0, 0, 0, 0.15)' : '0 4px 20px rgba(0, 0, 0, 0.08)',
          border: '1px solid rgba(0, 0, 0, 0.05)',
          transition: 'all 0.3s ease',
          cursor: 'pointer',
          transform: isHovered ? 'translateY(-4px)' : 'translateY(0)',
          position: 'relative',
          overflow: 'hidden'
        }}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <div style={{
          position: 'absolute',
          top: 0,
          right: 0,
          width: 60,
          height: 60,
          background: gradient,
          borderRadius: '0 16px 0 50px',
          opacity: 0.1
        }}></div>
        
        <div style={{ 
          display: 'flex', 
          justifyContent: 'space-between', 
          alignItems: 'flex-start', 
          marginBottom: 16 
        }}>
          <div style={{
            width: 48,
            height: 48,
            background: gradient,
            borderRadius: 12,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: 20,
            boxShadow: '0 4px 12px rgba(0, 0, 0, 0.15)'
          }}>
            {icon}
          </div>
          <div style={{ textAlign: 'right' }}>
            <div style={{ fontSize: 12, color: '#6b7280', marginBottom: 2 }}>Tuần này</div>
            <div style={{ 
              fontSize: 14, 
              fontWeight: 600,
              color: trendColor
            }}>
              {trend}
            </div>
          </div>
        </div>
        
        <div>
          <div style={{ 
            fontSize: 36, 
            fontWeight: 700, 
            color: '#1f2937',
            marginBottom: 4
          }}>
            {value}
          </div>
          <div style={{ 
            fontSize: 14, 
            color: '#6b7280',
            fontWeight: 500
          }}>
            {title}
          </div>
        </div>
      </div>
    );
  };

  return (
    <div style={{
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
      gap: 24,
      marginBottom: 32
    }}>
      {statsData.map((stat, index) => (
        <StatsCard key={index} {...stat} />
      ))}
    </div>
  );
};

export default StatsBox;