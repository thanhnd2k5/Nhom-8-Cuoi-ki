import React, { useState } from 'react';

const tabs = [
  { key: 'all', label: 'Tất cả', icon: '📋' },
  { key: 'pending', label: 'Chờ duyệt', icon: '⏰' },
  { key: 'approved', label: 'Đã duyệt', icon: '✅' },
  { key: 'rejected', label: 'Từ chối', icon: '❌' },
];

const statusMap = {
  pending: 'cho_duyet',
  approved: 'da_duyet',
  rejected: 'tu_choi',
};

const statusLabelMap = {
  cho_duyet: { 
    color: 'linear-gradient(135deg, #eab308, #f59e0b)', 
    label: 'Chờ duyệt',
    bgColor: '#fef3c7'
  },
  da_duyet: { 
    color: 'linear-gradient(135deg, #059669, #10b981)', 
    label: 'Đã duyệt',
    bgColor: '#d1fae5'
  },
  tu_choi: { 
    color: 'linear-gradient(135deg, #6b7280, #9ca3af)', 
    label: 'Từ chối',
    bgColor: '#f3f4f6'
  },
};

const AdmissionList = ({ admissions, universityMajors, subjectCombinations }) => {
  const [tab, setTab] = useState('all');

  // Map id sang tên ngành
  const getMajorName = (universityMajorId) => {
    if (!universityMajorId) return '---';
    if (typeof universityMajorId === 'object') {
      return universityMajorId.name || '---';
    }
    const major = universityMajors.find(m => m._id === universityMajorId);
    return major ? major.name : '---';
  };

  // Map id sang tên tổ hợp môn
  const getCombinationName = (subjectCombinationId) => {
    if (!subjectCombinationId) return '---';
    if (typeof subjectCombinationId === 'object') {
      return subjectCombinationId.code || '---';
    }
    const comb = subjectCombinations.find(c => c._id === subjectCombinationId);
    return comb ? comb.code : '---';
  };

  const filtered = tab === 'all'
    ? admissions
    : admissions.filter(item => item.status === statusMap[tab]);

  return (
    <div style={{ 
      background: '#f8fafc', 
      minHeight: 600, 
      padding: 32,
      borderRadius: 20
    }}>
      <div style={{ maxWidth: 1200, margin: '0 auto' }}>
        <div style={{ 
          display: 'flex', 
          alignItems: 'center', 
          marginBottom: 32 
        }}>
          <h2 style={{ 
            fontWeight: 700, 
            fontSize: 28, 
            margin: 0, 
            flex: 1,
            color: '#1f2937',
            background: 'linear-gradient(135deg, #dc2626, #ef4444)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent'
          }}>
            📚 Hồ sơ xét tuyển
          </h2>
        </div>

        {/* Tabs */}
        <div style={{ 
          display: 'flex', 
          gap: 8, 
          marginBottom: 32,
          background: 'white',
          padding: 8,
          borderRadius: 16,
          boxShadow: '0 4px 20px rgba(0, 0, 0, 0.08)'
        }}>
          {tabs.map(t => (
            <div
              key={t.key}
              onClick={() => setTab(t.key)}
              style={{
                fontWeight: 600,
                fontSize: 16,
                color: tab === t.key ? 'white' : '#6b7280',
                background: tab === t.key ? 'linear-gradient(135deg, #dc2626, #ef4444)' : 'transparent',
                borderRadius: 12,
                padding: '12px 20px',
                cursor: 'pointer',
                transition: 'all 0.3s ease',
                display: 'flex',
                alignItems: 'center',
                gap: 8,
                flex: 1,
                justifyContent: 'center'
              }}
            >
              <span>{t.icon}</span>
              {t.label}
            </div>
          ))}
        </div>

        {/* Content */}
        <div>
          {filtered.length === 0 && (
            <div style={{ 
              color: '#6b7280', 
              textAlign: 'center', 
              marginTop: 60,
              fontSize: 18,
              padding: 40,
              background: 'white',
              borderRadius: 16,
              boxShadow: '0 4px 20px rgba(0, 0, 0, 0.08)'
            }}>
              <div style={{ fontSize: 48, marginBottom: 16 }}>📭</div>
              Không có hồ sơ nào.
            </div>
          )}
          
          {filtered.map((item) => (
            <div key={item.id || item._id} style={{
              background: 'white',
              borderRadius: 16,
              padding: 24,
              marginBottom: 20,
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              border: '1px solid #e5e7eb',
              boxShadow: '0 4px 20px rgba(0, 0, 0, 0.08)',
              transition: 'all 0.3s ease'
            }}
            onMouseEnter={(e) => {
              e.target.style.transform = 'translateY(-2px)';
              e.target.style.boxShadow = '0 8px 30px rgba(0, 0, 0, 0.12)';
            }}
            onMouseLeave={(e) => {
              e.target.style.transform = 'translateY(0)';
              e.target.style.boxShadow = '0 4px 20px rgba(0, 0, 0, 0.08)';
            }}
            >
              <div style={{ flex: 1 }}>
                <div style={{ 
                  display: 'flex', 
                  alignItems: 'center', 
                  gap: 12, 
                  marginBottom: 12 
                }}>
                  <div style={{
                    width: 40,
                    height: 40,
                    background: 'linear-gradient(135deg, #dc2626, #ef4444)',
                    borderRadius: 10,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: 16
                  }}>
                    🏫
                  </div>
                  <div style={{ 
                    fontWeight: 700, 
                    fontSize: 20, 
                    color: '#1f2937'
                  }}>
                    {item.university}
                  </div>
                </div>
                
                <div style={{ marginLeft: 52, marginBottom: 16 }}>
                  <div style={{ 
                    color: '#374151', 
                    marginBottom: 6,
                    display: 'flex',
                    alignItems: 'center',
                    gap: 8
                  }}>
                    <span>🎯</span>
                    Ngành: <strong style={{ color: '#dc2626' }}>{getMajorName(item.universityMajorId)}</strong>
                  </div>
                  <div style={{ 
                    color: '#374151', 
                    marginBottom: 6,
                    display: 'flex',
                    alignItems: 'center',
                    gap: 8
                  }}>
                    <span>📊</span>
                    Tổ hợp: <strong style={{ color: '#dc2626' }}>{getCombinationName(item.subjectCombinationId)}</strong>
                  </div>
                </div>

                <div style={{ 
                  display: 'flex', 
                  gap: 24, 
                  fontSize: 14, 
                  color: '#6b7280',
                  marginLeft: 52
                }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                    <span>📅</span>
                    Ngày nộp: {item.created_at ? new Date(item.created_at).toLocaleDateString('vi-VN') : '---'}
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                    <span>🔄</span>
                    Cập nhật: {item.updated_at ? new Date(item.updated_at).toLocaleDateString('vi-VN') : '---'}
                  </div>
                </div>
              </div>

              <div style={{ 
                textAlign: 'right', 
                minWidth: 200,
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'flex-end',
                gap: 12
              }}>
                <span style={{
                  background: statusLabelMap[item.status]?.color || '#6b7280',
                  color: 'white',
                  borderRadius: 8,
                  padding: '8px 16px',
                  fontWeight: 600,
                  fontSize: 14,
                  boxShadow: '0 2px 8px rgba(0, 0, 0, 0.15)',
                  minWidth: 100,
                  textAlign: 'center'
                }}>
                  {statusLabelMap[item.status]?.label || item.status}
                </span>
                
                <button
                  style={{
                    background: 'linear-gradient(135deg, #dc2626, #ef4444)',
                    color: 'white',
                    border: 'none',
                    borderRadius: 8,
                    padding: '10px 20px',
                    fontWeight: 600,
                    cursor: 'pointer',
                    fontSize: 14,
                    boxShadow: '0 4px 12px rgba(220, 38, 38, 0.3)',
                    transition: 'all 0.3s ease',
                    minWidth: 120
                  }}
                  onMouseEnter={(e) => {
                    e.target.style.transform = 'translateY(-1px)';
                    e.target.style.boxShadow = '0 6px 16px rgba(220, 38, 38, 0.4)';
                  }}
                  onMouseLeave={(e) => {
                    e.target.style.transform = 'translateY(0)';
                    e.target.style.boxShadow = '0 4px 12px rgba(220, 38, 38, 0.3)';
                  }}
                  onClick={() => {
                    window.location.href = `/user/applications/${item._id || item.id}`;
                  }}
                >
                  👁️ Xem chi tiết
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AdmissionList;