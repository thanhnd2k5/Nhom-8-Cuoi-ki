import React from 'react';
import styles from '../LandingPage.less';

const testimonials = [
  {
    name: 'Nguyễn Văn A',
    avatar: 'A',
    position: 'Sinh viên năm 4 - Công nghệ thông tin',
    quote: 'Môi trường học tập tại trường rất năng động và chuyên nghiệp. Các giảng viên luôn nhiệt tình hỗ trợ sinh viên trong học tập và nghiên cứu.',
  },
  {
    name: 'Trần Thị B',
    avatar: 'B',
    position: 'Cựu sinh viên - Kinh tế',
    quote: 'Nhờ chương trình thực tập tại doanh nghiệp, tôi đã có cơ hội làm việc tại một công ty lớn ngay sau khi tốt nghiệp. Kiến thức và kỹ năng được trang bị rất thiết thực.',
  },
  {
    name: 'Lê Văn C',
    avatar: 'C',
    position: 'Sinh viên năm 3 - Kỹ thuật điện',
    quote: 'Cơ sở vật chất hiện đại, phòng thí nghiệm được trang bị đầy đủ thiết bị. Điều này giúp chúng tôi có thể thực hành và áp dụng kiến thức vào thực tế.',
  },
  {
    name: 'Phạm Thị D',
    avatar: 'D',
    position: 'Sinh viên năm 2 - Ngôn ngữ Anh',
    quote: 'Các hoạt động ngoại khóa và câu lạc bộ học thuật giúp tôi phát triển kỹ năng mềm và mở rộng mối quan hệ. Đây là môi trường lý tưởng để phát triển toàn diện.',
  },
  {
    name: 'Hoàng Văn E',
    avatar: 'E',
    position: 'Cựu sinh viên - Quản trị kinh doanh',
    quote: 'Chương trình đào tạo được thiết kế khoa học, cập nhật theo xu hướng thị trường. Điều này giúp tôi dễ dàng thích nghi với môi trường làm việc sau khi ra trường.',
  },
  {
    name: 'Vũ Thị F',
    avatar: 'F',
    position: 'Sinh viên năm 1 - Công nghệ sinh học',
    quote: 'Đội ngũ giảng viên có chuyên môn cao và nhiệt huyết. Họ không chỉ dạy kiến thức mà còn truyền cảm hứng cho sinh viên trong học tập và nghiên cứu.',
  },
];

const TestimonialsSection: React.FC = () => {
  return (
    <section style={{ background: 'linear-gradient(to bottom, #fff, #f0f6ff)', padding: '40px 0' }}>
      <div style={{ maxWidth: 1200, margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: 48 }}>
          <h2 style={{ fontSize: 36, fontWeight: 700 }}>Cảm nhận từ sinh viên</h2>
          <p style={{ marginTop: 16, color: '#666', fontSize: 18, maxWidth: 700, marginLeft: 'auto', marginRight: 'auto' }}>
            Những chia sẻ chân thực từ sinh viên đang theo học và cựu sinh viên của trường
          </p>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: 32 }}>
          {testimonials.map((t, idx) => (
            <div key={idx} style={{ background: '#fff', borderRadius: 16, boxShadow: '0 4px 24px rgba(0,0,0,0.06)', padding: 32, textAlign: 'left', display: 'flex', flexDirection: 'column', gap: 16 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
                <div style={{ width: 48, height: 48, borderRadius: '50%', background: '#f3f4f6', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 700, fontSize: 22, color: '#888' }}>
                  {t.avatar}
                </div>
                <div>
                  <div style={{ fontWeight: 700 }}>{t.name}</div>
                  <div style={{ color: '#666', fontSize: 15 }}>{t.position}</div>
                </div>
              </div>
              <div style={{ color: '#666', fontSize: 16, marginTop: 8 }}>
                "{t.quote}"
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection; 