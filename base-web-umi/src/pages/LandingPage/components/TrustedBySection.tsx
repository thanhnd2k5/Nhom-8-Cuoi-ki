import React from 'react';
import styles from '../LandingPage.less';

const universities = [
  'HUST', 'VNU', 'NEU', 'FTU', 'HCMUS', 'UMP'
];

const TrustedBySection: React.FC = () => {
  return (
    <section style={{ background: '#f9fafb', padding: '40px 0' }}>
      <div style={{ maxWidth: 1200, margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: 32 }}>
          <h2 style={{ fontSize: 22, fontWeight: 600, color: '#666' }}>
            Được tin dùng bởi các trường đại học hàng đầu
          </h2>
        </div>
        <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: 32, opacity: 0.7 }}>
          {universities.map((uni, idx) => (
            <div key={idx} style={{ height: 48, width: 128, background: '#fff', borderRadius: 8, display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 700, fontSize: 22, color: '#888', boxShadow: '0 2px 8px rgba(0,0,0,0.03)' }}>
              {uni}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TrustedBySection; 