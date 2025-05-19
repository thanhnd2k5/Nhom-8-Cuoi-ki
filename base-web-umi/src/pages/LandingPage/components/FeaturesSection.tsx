import React from 'react';
import styles from '../LandingPage.less';

const features = [
  {
    title: 'Chương trình đào tạo chất lượng',
    description: 'Chương trình học được thiết kế theo chuẩn quốc tế, cập nhật liên tục theo xu hướng thị trường'
  },
  {
    title: 'Đội ngũ giảng viên chuyên môn cao',
    description: '100% giảng viên có trình độ thạc sĩ trở lên, nhiều năm kinh nghiệm trong giảng dạy và nghiên cứu'
  },
  {
    title: 'Cơ sở vật chất hiện đại',
    description: 'Phòng học, phòng thí nghiệm, thư viện được trang bị đầy đủ thiết bị hiện đại phục vụ học tập'
  },
  {
    title: 'Chương trình thực tập doanh nghiệp',
    description: 'Liên kết với hơn 100 doanh nghiệp uy tín, tạo cơ hội thực tập và việc làm cho sinh viên'
  },
  {
    title: 'Hoạt động ngoại khóa phong phú',
    description: 'Câu lạc bộ học thuật, thể thao, văn nghệ giúp sinh viên phát triển toàn diện'
  },
  {
    title: 'Hỗ trợ sinh viên toàn diện',
    description: 'Học bổng, chương trình tư vấn học tập, hướng nghiệp và hỗ trợ việc làm sau tốt nghiệp'
  },
];

const FeaturesSection: React.FC = () => {
  return (
    <section className={styles.featuresSection}>
      <div style={{ maxWidth: 1200, margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: 48 }}>
          <h2 style={{ fontSize: 36, fontWeight: 700 }}>Điểm mạnh của trường</h2>
          <p style={{ marginTop: 16, color: '#666', fontSize: 18, maxWidth: 700, marginLeft: 'auto', marginRight: 'auto' }}>
            Cam kết mang đến môi trường học tập chất lượng cao và cơ hội phát triển toàn diện cho sinh viên
          </p>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: 32 }}>
          {features.map((feature, idx) => (
            <div key={idx} style={{ background: '#fff', borderRadius: 16, boxShadow: '0 4px 24px rgba(0,0,0,0.06)', padding: 32, textAlign: 'center', transition: 'box-shadow .2s' }}>
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