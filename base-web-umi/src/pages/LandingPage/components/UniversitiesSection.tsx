import React from 'react';
import styles from '../LandingPage.less';

const universities = [
  {
    name: 'Đại học Bách Khoa Hà Nội',
    programs: 25,
    students: '5,000+',
  },
  {
    name: 'Đại học Quốc gia Hà Nội',
    programs: 30,
    students: '6,500+',
  },
  {
    name: 'Đại học Kinh tế Quốc dân',
    programs: 20,
    students: '4,500+',
  },
  {
    name: 'Đại học Ngoại thương',
    programs: 15,
    students: '3,000+',
  },
  {
    name: 'Đại học Khoa học Tự nhiên TPHCM',
    programs: 22,
    students: '4,000+',
  },
  {
    name: 'Đại học Y Dược TPHCM',
    programs: 10,
    students: '2,000+',
  },
];

const UniversitiesSection: React.FC = () => {
  return (
    <section className={styles.featuresSection}>
      <div style={{ maxWidth: 1200, margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: 48 }}>
          <h2 style={{ fontSize: 36, fontWeight: 700 }}>Các trường đại học liên kết</h2>
          <p style={{ marginTop: 16, color: '#666', fontSize: 18, maxWidth: 700, marginLeft: 'auto', marginRight: 'auto' }}>
            UniAdmit hợp tác với các trường đại học hàng đầu trên cả nước
          </p>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: 32 }}>
          {universities.map((university, idx) => (
            <div key={idx} style={{ background: '#fff', borderRadius: 16, boxShadow: '0 4px 24px rgba(0,0,0,0.06)', padding: 32, textAlign: 'center', transition: 'box-shadow .2s' }}>
              <h3 style={{ fontSize: 22, fontWeight: 700, margin: '16px 0 8px' }}>{university.name}</h3>
              <div style={{ marginTop: 8, display: 'flex', justifyContent: 'space-between', color: '#666', fontSize: 15 }}>
                <span>{university.programs} ngành học</span>
                <span>{university.students} sinh viên</span>
              </div>
              <div style={{ marginTop: 24 }}>
                <button style={{ border: '1.5px solid #2563eb', color: '#2563eb', background: '#fff', borderRadius: 8, padding: '10px 0', width: '100%', fontWeight: 600, fontSize: 16, cursor: 'pointer' }}>
                  Xem chi tiết
                </button>
              </div>
            </div>
          ))}
        </div>
        <div style={{ marginTop: 40, textAlign: 'center' }}>
          <button style={{ border: '1.5px solid #2563eb', color: '#2563eb', background: '#fff', borderRadius: 8, padding: '14px 40px', fontWeight: 600, fontSize: 18, cursor: 'pointer' }}>
            Xem tất cả trường đại học
          </button>
        </div>
      </div>
    </section>
  );
};

export default UniversitiesSection; 