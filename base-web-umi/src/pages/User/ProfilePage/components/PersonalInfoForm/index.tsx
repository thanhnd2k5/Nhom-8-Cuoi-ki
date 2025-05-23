import React from 'react';
import {
  Card,
  Input,
  Radio,
  Select,
  DatePicker,
  Row,
  Col,
  Form,
  Typography,
} from 'antd';
import moment from 'moment';
import styles from './index.less';

const { Option } = Select;
const { Title, Text } = Typography;

interface PersonalInfo {
  fullName: string;
  dob: string;
  gender: string;
  idNumber: string;
  phone: string;
  email: string;
  address: string;
  province: string;
  district: string;
  ethnic: string;
}

interface PersonalInfoFormProps {
  data: PersonalInfo;
  onChange: (field: string, value: any) => void;
  onDateChange: (field: string, date: moment.Moment | null, dateString: string) => void;
}

const PersonalInfoForm: React.FC<PersonalInfoFormProps> = ({
  data,
  onChange,
  onDateChange,
}) => {
  const provinces = [
    { value: 'hanoi', label: 'Hà Nội' },
    { value: 'hcm', label: 'TP. Hồ Chí Minh' },
    { value: 'danang', label: 'Đà Nẵng' },
    { value: 'other', label: 'Khác' },
  ];

  const districts = {
    hanoi: [
      { value: 'caugiay', label: 'Cầu Giấy' },
      { value: 'hoankiem', label: 'Hoàn Kiếm' },
      { value: 'dongda', label: 'Đống Đa' },
    ],
    hcm: [
      { value: 'quan1', label: 'Quận 1' },
      { value: 'quan2', label: 'Quận 2' },
      { value: 'quan3', label: 'Quận 3' },
    ],
    danang: [
      { value: 'haiChau', label: 'Hải Châu' },
      { value: 'camLe', label: 'Cẩm Lệ' },
      { value: 'thanhKhe', label: 'Thanh Khê' },
    ],
  };

  return (
    <Card className={styles.personalInfoCard}>
      <Title level={4}>Thông tin cá nhân</Title>
      <Text type="secondary">Cập nhật thông tin cá nhân của bạn</Text>
      
      <Form layout="vertical" className={styles.personalInfoForm}>
        <Row gutter={16}>
          <Col xs={24} md={12}>
            <Form.Item label="Họ và tên">
              <Input
                value={data.fullName}
                onChange={(e) => onChange('fullName', e.target.value)}
                placeholder="Nhập họ và tên"
              />
            </Form.Item>
          </Col>
          <Col xs={24} md={12}>
            <Form.Item label="Ngày sinh">
              <DatePicker
                style={{ width: '100%' }}
                value={data.dob ? moment(data.dob, 'YYYY-MM-DD') : null}
                onChange={(date, dateString) => onDateChange('dob', date, dateString)}
                placeholder="Chọn ngày sinh"
              />
            </Form.Item>
          </Col>
        </Row>

        <Form.Item label="Giới tính">
          <Radio.Group
            value={data.gender}
            onChange={(e) => onChange('gender', e.target.value)}
          >
            <Radio value="male">Nam</Radio>
            <Radio value="female">Nữ</Radio>
            <Radio value="other">Khác</Radio>
          </Radio.Group>
        </Form.Item>

        <Row gutter={16}>
          <Col xs={24} md={12}>
            <Form.Item label="Số CCCD/CMND">
              <Input
                value={data.idNumber}
                onChange={(e) => onChange('idNumber', e.target.value)}
                placeholder="Nhập số CCCD/CMND"
              />
            </Form.Item>
          </Col>
          <Col xs={24} md={12}>
            <Form.Item label="Dân tộc">
              <Input
                value={data.ethnic}
                onChange={(e) => onChange('ethnic', e.target.value)}
                placeholder="Nhập dân tộc"
              />
            </Form.Item>
          </Col>
        </Row>

        <Row gutter={16}>
          <Col xs={24} md={12}>
            <Form.Item label="Số điện thoại">
              <Input
                value={data.phone}
                onChange={(e) => onChange('phone', e.target.value)}
                placeholder="Nhập số điện thoại"
              />
            </Form.Item>
          </Col>
          <Col xs={24} md={12}>
            <Form.Item label="Email">
              <Input
                type="email"
                value={data.email}
                onChange={(e) => onChange('email', e.target.value)}
                placeholder="Nhập địa chỉ email"
                disabled
              />
            </Form.Item>
          </Col>
        </Row>

        <Form.Item label="Địa chỉ">
          <Input.TextArea
            value={data.address}
            onChange={(e) => onChange('address', e.target.value)}
            rows={3}
            placeholder="Nhập địa chỉ chi tiết"
          />
        </Form.Item>

        <Row gutter={16}>
          <Col xs={24} md={12}>
            <Form.Item label="Tỉnh/Thành phố">
              <Select
                value={data.province}
                onChange={(value) => {
                  onChange('province', value);
                  onChange('district', ''); // Reset district when province changes
                }}
                placeholder="Chọn tỉnh/thành phố"
              >
                {provinces.map(p => (
                  <Option key={p.value} value={p.value}>{p.label}</Option>
                ))}
              </Select>
            </Form.Item>
          </Col>
          <Col xs={24} md={12}>
            <Form.Item label="Quận/Huyện">
              <Select
                value={data.district}
                onChange={(value) => onChange('district', value)}
                placeholder="Chọn quận/huyện"
                disabled={!data.province || !districts[data.province as keyof typeof districts]}
              >
                {(districts[data.province as keyof typeof districts] || []).map(d => (
                  <Option key={d.value} value={d.value}>{d.label}</Option>
                ))}
              </Select>
            </Form.Item>
          </Col>
        </Row>
      </Form>
    </Card>
  );
};

export default PersonalInfoForm; 