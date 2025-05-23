import React, { useEffect, useState } from 'react';
import { Form, Input, Radio, DatePicker, Row, Col, Select } from 'antd';
import moment from 'moment';
import provincesData from '@/assets/vietnam-provinces.json';

const { Option } = Select;

const PersonalInfoForm = ({ form, initialData }: { form: any; initialData: any }) => {
  const [provinces, setProvinces] = useState<{ name: string; districts: { name: string }[] }[]>([]);
  const [districts, setDistricts] = useState<{ name: string }[]>([]);

  // Lấy danh sách tỉnh/thành phố khi load form
  useEffect(() => {
    setProvinces(provincesData);
  }, []);

  // Set các trường cơ bản ngay khi initialData thay đổi (KHÔNG chờ provinces)
  useEffect(() => {
    if (initialData) {
      form.setFieldsValue({
        ...initialData,
        dob: initialData.dob ? moment(initialData.dob) : null,
      });
    }
  }, [initialData]);

  // Mapping và set lại province/district khi cả initialData và provinces đã có
  useEffect(() => {
    if (!initialData || provinces.length === 0) return;
    let provinceName = initialData.province;
    const province = provinces.find(p => p.name === provinceName);
    if (province) {
      setDistricts(province.districts || []);
      let districtName = initialData.district;
      const district = province.districts.find(d => d.name === districtName);
      form.setFieldsValue({
        province: province.name,
        district: district ? district.name : undefined,
      });
    } else {
      setDistricts([]);
      form.setFieldsValue({
        province: undefined,
        district: undefined,
      });
    }
  }, [initialData, provinces]);

  // Khi chọn tỉnh, lấy danh sách quận/huyện
  const handleProvinceChange = (provinceName: string) => {
    const province = provinces.find(p => p.name === provinceName);
    setDistricts(province ? province.districts : []);
    form.setFieldsValue({ district: undefined });
  };

  return (
    <Form form={form} layout="vertical">
      <Row gutter={16}>
        <Col span={12}>
          <Form.Item name="name" label="Họ và tên" rules={[{ required: true, message: 'Bắt buộc' }]}> 
            <Input />
          </Form.Item>
        </Col>
        <Col span={12}>
          <Form.Item name="dob" label="Ngày sinh">
            <DatePicker format="DD/MM/YYYY" style={{ width: '100%' }} />
          </Form.Item>
        </Col>
      </Row>
      <Form.Item name="gender" label="Giới tính">
        <Radio.Group>
          <Radio value="male">Nam</Radio>
          <Radio value="female">Nữ</Radio>
          <Radio value="other">Khác</Radio>
        </Radio.Group>
      </Form.Item>
      <Row gutter={16}>
        <Col span={12}>
          <Form.Item name="cccd" label="Số CCCD/CMND">
            <Input />
          </Form.Item>
        </Col>
        <Col span={12}>
          <Form.Item name="phone" label="Số điện thoại">
            <Input />
          </Form.Item>
        </Col>
      </Row>
      <Form.Item name="email" label="Email">
        <Input />
      </Form.Item>
      <Form.Item name="address" label="Địa chỉ">
        <Input.TextArea />
      </Form.Item>
      <Row gutter={16}>
        <Col span={12}>
          <Form.Item name="province" label="Tỉnh/Thành phố" rules={[{ required: true, message: 'Bắt buộc' }]}> 
            <Select
              showSearch
              placeholder="Chọn tỉnh/thành phố"
              onChange={handleProvinceChange}
              optionFilterProp="children"
              filterOption={(input, option) =>
                (option?.children as string)?.toLowerCase().indexOf(input.toLowerCase()) >= 0
              }
            >
              {provinces.map((item) => (
                <Option key={item.name} value={item.name}>{item.name}</Option>
              ))}
            </Select>
          </Form.Item>
        </Col>
        <Col span={12}>
          <Form.Item name="district" label="Quận/Huyện" rules={[{ required: true, message: 'Bắt buộc' }]}> 
            <Select
              showSearch
              placeholder="Chọn quận/huyện"
              optionFilterProp="children"
              filterOption={(input, option) =>
                (option?.children as string)?.toLowerCase().indexOf(input.toLowerCase()) >= 0
              }
            >
              {districts.map((item) => (
                <Option key={item.name} value={item.name}>{item.name}</Option>
              ))}
            </Select>
          </Form.Item>
        </Col>
      </Row>
    </Form>
  );
};

export default PersonalInfoForm;
