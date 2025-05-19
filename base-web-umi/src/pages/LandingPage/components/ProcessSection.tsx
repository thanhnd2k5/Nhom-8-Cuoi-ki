import React from 'react';
import styles from '../LandingPage.less';

const steps = [
  {
    step: '01',
    title: 'Tìm hiểu thông tin',
    description: 'Khám phá các ngành học, chương trình đào tạo và cơ hội phát triển tại trường',
  },
  {
    step: '02',
    title: 'Đăng ký tư vấn',
    description: 'Đăng ký nhận tư vấn trực tiếp từ đội ngũ tư vấn tuyển sinh của trường',
  },
  {
    step: '03',
    title: 'Chuẩn bị hồ sơ',
    description: 'Chuẩn bị đầy đủ các giấy tờ cần thiết theo yêu cầu của trường',
  },
  {
    step: '04',
    title: 'Nộp hồ sơ xét tuyển',
    description: 'Nộp hồ sơ trực tiếp tại trường hoặc qua hệ thống tuyển sinh trực tuyến',
  },
  {
    step: '05',
    title: 'Nhận kết quả và nhập học',
    description: 'Nhận thông báo kết quả và hoàn tất thủ tục nhập học',
  },
];

const ProcessSection: React.FC = () => {
  return (
    <section className={styles.stepsSection}>
      <div style={{ maxWidth: 1200, margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: 48 }}>
          <h2 style={{ fontSize: 36, fontWeight: 700 }}>Quy trình tuyển sinh</h2>
          <p style={{ marginTop: 16, color: '#666', fontSize: 18, maxWidth: 700, marginLeft: 'auto', marginRight: 'auto' }}>
            Hướng dẫn chi tiết các bước trong quy trình tuyển sinh của trường
          </p>
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 48 }}>
          {steps.map((step, idx) => (
            <div key={idx} style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', gap: 32, flexDirection: idx % 2 === 1 ? 'row-reverse' : 'row' }}>
              <div style={{ flex: 1, minWidth: 280 }}>
                <div style={{ display: 'inline-block', background: '#e0edff', color: '#2563eb', borderRadius: 999, padding: '6px 18px', fontSize: 16, fontWeight: 500, marginBottom: 16 }}>
                  Bước {step.step}
                </div>
                <h3 style={{ fontSize: 26, fontWeight: 700 }}>{step.title}</h3>
                <p style={{ color: '#666', fontSize: 17, marginTop: 12 }}>{step.description}</p>
                {idx === 0 && (
                  <div style={{ marginTop: 24 }}>
                    <button style={{ background: '#2563eb', color: '#fff', border: 'none', borderRadius: 8, padding: '12px 32px', fontSize: 18, fontWeight: 600, cursor: 'pointer' }}>
                      Đăng ký tư vấn
                    </button>
                  </div>
                )}
              </div>
              <div style={{ flex: 1, minWidth: 280, display: 'flex', justifyContent: 'center' }}>
                <div style={{ width: 320, aspectRatio: '4/3', background: '#f3f4f6', borderRadius: 16, overflow: 'hidden', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  {/* Hình minh họa sẽ thêm sau */}
                  <span style={{ color: '#bbb', fontSize: 24 }}>Hình minh họa</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProcessSection; 