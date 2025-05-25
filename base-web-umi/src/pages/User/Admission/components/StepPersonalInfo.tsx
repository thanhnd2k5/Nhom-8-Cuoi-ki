import React from 'react';

const genderLabel = (gender: string) => {
  if (gender === 'male') return 'Nam';
  if (gender === 'female') return 'Nữ';
  if (gender === 'other') return 'Khác';
  return '';
};

const StepPersonalInfo = ({
  data,
  profile,
  onNext,
  onPrev,
}: {
  data: any;
  profile: any;
  onNext: (d: any) => void;
  onPrev: () => void;
}) => {
  if (!profile) return <div>Đang tải thông tin cá nhân...</div>;

  // Ưu tiên data (nếu có), fallback sang profile
  const info = { ...profile, ...data };

  return (
    <div
      style={{
        background: '#fff',
        borderRadius: 8,
        border: '1px solid #eee',
        boxShadow: 'none',
        padding: 32,
        marginBottom: 32,
      }}
    >
      <h2 style={{ fontWeight: 700, fontSize: 24, marginBottom: 24 }}>
        Bước 3: Thông tin cá nhân
      </h2>
      {/* Box thông tin đã chọn */}
      <div
        style={{
          background: '#f8fafc',
          borderRadius: 12,
          padding: 18,
          marginBottom: 24,
          color: '#222',
          fontWeight: 500,
          fontSize: 16,
        }}
      >
        <div>
          <b>Phương thức:</b> {data.methodLabel || '---'}
        </div>
        <div>
          <b>Trường:</b> {data.universityName || data.university || '---'}
        </div>
        <div>
          <b>Ngành:</b> {data.majorName || data.major || '---'}
        </div>
        <div>
          <b>Tổ hợp:</b> {data.subjectCombinationName || data.group || '---'}
        </div>
      </div>
      {/* Thông tin cá nhân */}
      <div style={{ display: 'flex', gap: 24, marginBottom: 24 }}>
        <div style={{ flex: 1 }}>
          <div style={{ marginBottom: 16 }}>
            <label style={{ fontWeight: 600 }}>Họ và tên</label>
            <input
              value={info.name || ''}
              readOnly
              style={{
                width: '100%',
                padding: 10,
                borderRadius: 6,
                border: '1px solid #eee',
                background: '#f8fafc',
              }}
            />
          </div>
          <div style={{ marginBottom: 16 }}>
            <label style={{ fontWeight: 600 }}>Giới tính</label>
            <input
              value={genderLabel(info.gender)}
              readOnly
              style={{
                width: '100%',
                padding: 10,
                borderRadius: 6,
                border: '1px solid #eee',
                background: '#f8fafc',
              }}
            />
          </div>
          <div style={{ marginBottom: 16 }}>
            <label style={{ fontWeight: 600 }}>Số CCCD/CMND</label>
            <input
              value={info.cccd || ''}
              readOnly
              style={{
                width: '100%',
                padding: 10,
                borderRadius: 6,
                border: '1px solid #eee',
                background: '#f8fafc',
              }}
            />
          </div>
          <div style={{ marginBottom: 16 }}>
            <label style={{ fontWeight: 600 }}>Email</label>
            <input
              value={info.email || ''}
              readOnly
              style={{
                width: '100%',
                padding: 10,
                borderRadius: 6,
                border: '1px solid #eee',
                background: '#f8fafc',
              }}
            />
          </div>
          <div style={{ marginBottom: 16 }}>
            <label style={{ fontWeight: 600 }}>Địa chỉ</label>
            <input
              value={info.address || ''}
              readOnly
              style={{
                width: '100%',
                padding: 10,
                borderRadius: 6,
                border: '1px solid #eee',
                background: '#f8fafc',
              }}
            />
          </div>
        </div>
        <div style={{ flex: 1 }}>
          <div style={{ marginBottom: 16 }}>
            <label style={{ fontWeight: 600 }}>Ngày sinh</label>
            <input
              value={info.dob || ''}
              readOnly
              style={{
                width: '100%',
                padding: 10,
                borderRadius: 6,
                border: '1px solid #eee',
                background: '#f8fafc',
              }}
            />
          </div>
          <div style={{ marginBottom: 16 }}>
            <label style={{ fontWeight: 600 }}>Số điện thoại</label>
            <input
              value={info.phone || ''}
              readOnly
              style={{
                width: '100%',
                padding: 10,
                borderRadius: 6,
                border: '1px solid #eee',
                background: '#f8fafc',
              }}
            />
          </div>
          <div style={{ marginBottom: 16 }}>
            <label style={{ fontWeight: 600 }}>Tỉnh/Thành phố</label>
            <input
              value={info.province || ''}
              readOnly
              style={{
                width: '100%',
                padding: 10,
                borderRadius: 6,
                border: '1px solid #eee',
                background: '#f8fafc',
              }}
            />
          </div>
          <div style={{ marginBottom: 16 }}>
            <label style={{ fontWeight: 600 }}>Quận/Huyện</label>
            <input
              value={info.district || ''}
              readOnly
              style={{
                width: '100%',
                padding: 10,
                borderRadius: 6,
                border: '1px solid #eee',
                background: '#f8fafc',
              }}
            />
          </div>
        </div>
      </div>
      {/* Thông tin học tập */}
      <div style={{ marginBottom: 24 }}>
        <h3 style={{ fontWeight: 700, fontSize: 18, margin: '16px 0 12px' }}>
          Thông tin học tập
        </h3>
        <div style={{ display: 'flex', gap: 24 }}>
          <div style={{ flex: 1 }}>
            <div style={{ marginBottom: 16 }}>
              <label style={{ fontWeight: 600 }}>Trường THPT</label>
              <input
                value={info.academic?.school || ''}
                readOnly
                style={{
                  width: '100%',
                  padding: 10,
                  borderRadius: 6,
                  border: '1px solid #eee',
                  background: '#f8fafc',
                }}
              />
            </div>
            <div style={{ marginBottom: 16 }}>
              <label style={{ fontWeight: 600 }}>Năm tốt nghiệp</label>
              <input
                value={info.academic?.gradYear || ''}
                readOnly
                style={{
                  width: '100%',
                  padding: 10,
                  borderRadius: 6,
                  border: '1px solid #eee',
                  background: '#f8fafc',
                }}
              />
            </div>
          </div>
          <div style={{ flex: 1 }}>
            <div style={{ marginBottom: 16 }}>
              <label style={{ fontWeight: 600 }}>Khu vực ưu tiên</label>
              <input
                value={info.academic?.area || ''}
                readOnly
                style={{
                  width: '100%',
                  padding: 10,
                  borderRadius: 6,
                  border: '1px solid #eee',
                  background: '#f8fafc',
                }}
              />
            </div>
            <div style={{ marginBottom: 16 }}>
              <label style={{ fontWeight: 600 }}>Đối tượng ưu tiên</label>
              <input
                value={info.academic?.priority || ''}
                readOnly
                style={{
                  width: '100%',
                  padding: 10,
                  borderRadius: 6,
                  border: '1px solid #eee',
                  background: '#f8fafc',
                }}
              />
            </div>
          </div>
        </div>
      </div>
      <div style={{ marginTop: 32, textAlign: 'right' }}>
        <button
          style={{
            padding: '12px 32px',
            background: '#fff',
            color: '#c00',
            border: '1.5px solid #c00',
            borderRadius: 6,
            fontWeight: 700,
            fontSize: 18,
            marginRight: 12,
            cursor: 'pointer',
          }}
          onClick={onPrev}
        >
          Quay lại
        </button>
        <button
          style={{
            padding: '12px 32px',
            background: '#c00',
            color: '#fff',
            border: 'none',
            borderRadius: 6,
            fontWeight: 700,
            fontSize: 18,
            cursor: 'pointer',
          }}
          onClick={() => onNext({})}
        >
          Tiếp tục
        </button>
      </div>
    </div>
  );
};

export default StepPersonalInfo;
