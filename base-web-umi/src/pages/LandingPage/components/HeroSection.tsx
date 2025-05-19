import React from 'react';
import styles from '../LandingPage.less';

const HeroSection: React.FC = () => {
  return (
    <section className={styles.heroSection}>
      <div style={{ maxWidth: 1200, margin: '0 auto', display: 'flex', flexWrap: 'wrap', alignItems: 'center', gap: 32 }}>
        <div style={{ flex: 1, minWidth: 300 }} className={styles.heroText}>
          <div style={{ display: 'inline-block', background: '#e0edff', color: '#2563eb', borderRadius: 999, padding: '6px 18px', fontSize: 16, fontWeight: 500, marginBottom: 16 }}>
            Trường Đại học ABC
          </div>
          <h1 className={styles.title} style={{ margin: '16px 0' }}>
            Đào tạo <span style={{ background: 'linear-gradient(90deg,#2563eb,#6366f1)', WebkitBackgroundClip: 'text', color: 'transparent' }}>chuyên nghiệp</span> - Phát triển tương lai
          </h1>
          <p style={{ color: '#666', fontSize: 18, maxWidth: 600, margin: '16px 0' }}>
            Với hơn 20 năm kinh nghiệm trong đào tạo, chúng tôi cam kết mang đến cho sinh viên môi trường học tập chất lượng cao và cơ hội phát triển toàn diện.
          </p>
          <div style={{ display: 'flex', gap: 16, flexWrap: 'wrap', margin: '24px 0' }}>
            <button style={{ background: '#2563eb', color: '#fff', border: 'none', borderRadius: 8, padding: '12px 32px', fontSize: 18, fontWeight: 600, cursor: 'pointer' }}>
              Đăng ký xét tuyển
            </button>
            <button style={{ background: '#fff', color: '#2563eb', border: '2px solid #2563eb', borderRadius: 8, padding: '12px 32px', fontSize: 18, fontWeight: 600, cursor: 'pointer' }}>
              Tham quan trường
            </button>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 16, fontSize: 15 }}>
            <div style={{ display: 'flex', gap: 0 }}>
              {[1,2,3,4].map(i => (
                <div key={i} style={{ width: 32, height: 32, borderRadius: '50%', overflow: 'hidden', border: '2px solid #fff', background: '#f3f4f6', marginLeft: i!==1 ? -8 : 0 }}>
                  <img src={`https://placehold.co/32x32?text=${i}`} alt={`Student ${i}`} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                </div>
              ))}
            </div>
            <div style={{ color: '#666' }}>
              <span style={{ fontWeight: 700, color: '#222' }}>15,000+</span> sinh viên đang theo học
            </div>
          </div>
        </div>
        <div style={{ flex: 1, minWidth: 300, display: 'flex', justifyContent: 'center', position: 'relative', marginTop: 32 }}>
          <div style={{ width: '100%', maxWidth: 400, aspectRatio: '4/3', borderRadius: 16, overflow: 'hidden', background: 'linear-gradient(135deg,#e0edff,#e0e7ff)', boxShadow: '0 8px 32px rgba(0,0,0,0.08)' }}>
            <img src="https://placehold.co/800x600?text=Campus+Life" alt="Campus life" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
          </div>
          <div style={{ position: 'absolute', left: -24, bottom: -24, background: '#fff', borderRadius: 12, boxShadow: '0 4px 24px rgba(0,0,0,0.10)', padding: 16, minWidth: 220, display: 'flex', alignItems: 'center', gap: 16 }}>
            <div style={{ width: 48, height: 48, borderRadius: '50%', background: '#bbf7d0', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              {/* Icon sẽ thêm sau */}
            </div>
            <div>
              <div style={{ color: '#888', fontSize: 14 }}>Tỷ lệ có việc làm</div>
              <div style={{ fontWeight: 700, fontSize: 24 }}>98.5%</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection; 