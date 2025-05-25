import React, { useState } from 'react';
import AdmissionList from './components/AdmissionList';
import AdmissionForm from './components/AdmissionForm';
import AdmissionDetail from './components/AdmissionDetail';

const AdmissionPage: React.FC = () => {
  const [showForm, setShowForm] = useState(false);
  const [selectedId, setSelectedId] = useState<string | null>(null);

  return (
    <div style={{ padding: '32px 0', minHeight: 600 }}>
      <h1 style={{ fontWeight: 700, fontSize: 28, marginBottom: 0 }}>Hồ sơ xét tuyển</h1>
      {!showForm && !selectedId && (
        <>
          <button
            onClick={() => setShowForm(true)}
            style={{
              background: '#cc0d00',
              color: '#fff',
              border: 'none',
              borderRadius: 8,
              padding: '10px 24px',
              fontWeight: 700,
              fontSize: 16,
              cursor: 'pointer',
              boxShadow: '0 2px 8px #dbeafe',
              float: 'right',
              marginBottom: 24
            }}
          >
            + Tạo hồ sơ mới
          </button>
          <AdmissionList />
        </>
      )}
      {showForm && <AdmissionForm />}
      {selectedId && <AdmissionDetail id={selectedId} onClose={() => setSelectedId(null)} />}
    </div>
  );
};

export default AdmissionPage;
