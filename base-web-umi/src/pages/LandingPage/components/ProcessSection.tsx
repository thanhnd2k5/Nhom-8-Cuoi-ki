import React from 'react';
import styles from '../LandingPage.less';

const steps = [
  {
    step: '01',
    title: 'Đăng ký tài khoản',
    description: 'Tạo tài khoản cá nhân trên hệ thống UniAdmit để bắt đầu quá trình xét tuyển',
  },
  {
    step: '02',
    title: 'Cập nhật thông tin cá nhân',
    description: 'Nhập đầy đủ thông tin cá nhân, học tập và tải lên các giấy tờ cần thiết',
  },
  {
    step: '03',
    title: 'Chọn trường và ngành',
    description: 'Lựa chọn trường đại học, ngành học và phương thức xét tuyển phù hợp',
  },
  {
    step: '04',
    title: 'Nộp hồ sơ xét tuyển',
    description: 'Hoàn thiện và nộp hồ sơ xét tuyển trực tuyến, thanh toán lệ phí xét tuyển',
  },
  {
    step: '05',
    title: 'Theo dõi kết quả',
    description: 'Theo dõi trạng thái hồ sơ và nhận thông báo kết quả xét tuyển',
  },
];

const ProcessSection: React.FC = () => {
  return (
    <section className={styles.stepsSection}>
      <div style={{ maxWidth: 1200, margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: 48 }}>
          <h2 style={{ fontSize: 36, fontWeight: 700 }}>Quy trình xét tuyển</h2>
          <p style={{ marginTop: 16, color: '#666', fontSize: 18, maxWidth: 700, marginLeft: 'auto', marginRight: 'auto' }}>
            Chỉ với vài bước đơn giản, bạn có thể hoàn thành hồ sơ xét tuyển đại học
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
                      Đăng ký ngay
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