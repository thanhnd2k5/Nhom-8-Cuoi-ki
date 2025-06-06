import React from 'react';
import styles from '../LandingPage.less';

const features = [
  {
    title: 'Đa dạng phương thức xét tuyển',
    description: 'Hỗ trợ tất cả các phương thức xét tuyển: học bạ, điểm thi THPT, đánh giá năng lực,...'
  },
  {
    title: 'Theo dõi trạng thái hồ sơ',
    description: 'Cập nhật trạng thái hồ sơ xét tuyển theo thời gian thực, giúp thí sinh nắm bắt tiến độ xét tuyển'
  },
  {
    title: 'Quản lý hồ sơ thông minh',
    description: 'Lưu trữ và quản lý tất cả giấy tờ, thông tin cá nhân và học tập một cách an toàn và hiệu quả'
  },
  {
    title: 'Xác thực thông tin',
    description: 'Hệ thống xác thực thông tin tự động, đảm bảo tính chính xác và tin cậy của hồ sơ xét tuyển'
  },
  {
    title: 'Nộp hồ sơ trực tuyến',
    description: 'Nộp hồ sơ nhanh chóng, dễ dàng và hiệu quả'
  },
  {
    title: 'Thông báo kết quả',
    description: 'Nhận thông báo kết quả xét tuyển qua email và trên hệ thống ngay khi có kết quả'
  },
];

const FeaturesSection: React.FC = () => {
  return (
    <section className={styles.featuresSection} style={{ background: 'rgb(248 213 220)' }}>
      <div style={{ maxWidth: 1200, margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: 48 }}>
          <h2 style={{ fontSize: 36, fontWeight: 700 }}>Tính năng nổi bật</h2>
          <p style={{ marginTop: 16, color: '#666', fontSize: 18, maxWidth: 700, marginLeft: 'auto', marginRight: 'auto' }}>
            University cung cấp đầy đủ các tính năng cần thiết cho quá trình xét tuyển đại học
          </p>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: 32 }}>
          {features.map((feature, idx) => (
            <div
              key={idx}
              style={{
                background: '#fff',
                borderRadius: 16,
                boxShadow: '0 4px 24px rgba(0,0,0,0.06)',
                padding: 32,
                textAlign: 'center',
                transition: 'all 0.3s',
                color: '#252021',
                cursor: 'pointer',
                border: '2px solid #94221e',
              }}
              onMouseEnter={(e) => {
                const target = e.currentTarget;
                target.style.transform = 'translateY(-8px) scale(1.06)';
                target.style.boxShadow = '0 12px 36px 0 rgba(148,34,30,0.18)';
                target.style.border = '3px solid #94221e';
                target.style.background = 'rgba(248,213,220,0.25)';
              }}
              onMouseLeave={(e) => {
                const target = e.currentTarget;
                target.style.transform = 'translateY(0) scale(1)';
                target.style.boxShadow = '0 4px 24px rgba(0,0,0,0.06)';
                target.style.border = '2px solid #94221e';
                target.style.background = '#fff';
              }}
            >
              {/* Icon sẽ thêm sau */}
              <h3 style={{ fontSize: 22, fontWeight: 700, margin: '16px 0 8px' }}>{feature.title}</h3>
              <p style={{ color: '#666', fontSize: 16 }}>{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection; 