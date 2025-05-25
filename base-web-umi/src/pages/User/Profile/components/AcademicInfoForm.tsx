import React from 'react';
import { Form, Input, Select, Radio, Row, Col } from 'antd';

const AcademicInfoForm = ({ form }: { form: any }) => (
  <Form form={form} layout="vertical">
    <Form.Item name="highSchoolName" label="Trường THPT">
      <Input />
    </Form.Item>
    <Row gutter={16}>
      <Col span={8}>
        <Form.Item name="gpaGrade10" label="Điểm TB lớp 10">
          <Input placeholder="Ví dụ: 8.5" />
        </Form.Item>
      </Col>
      <Col span={8}>
        <Form.Item name="gpaGrade11" label="Điểm TB lớp 11">
          <Input placeholder="Ví dụ: 8.7" />
        </Form.Item>
      </Col>
      <Col span={8}>
        <Form.Item name="gpaGrade12" label="Điểm TB lớp 12">
          <Input placeholder="Ví dụ: 9.0" />
        </Form.Item>
      </Col>
    </Row>
    <Form.Item name="graduationYear" label="Năm tốt nghiệp">
      <Select placeholder="Chọn năm tốt nghiệp">
        {Array.from({ length: 10 }, (_, i) => {
          const year = 2018 + i;
          return <Select.Option key={year} value={year}>{year}</Select.Option>;
        })}
      </Select>
    </Form.Item>
    <Form.Item name="priorityArea" label="Khu vực ưu tiên">
      <Radio.Group>
        <Radio value="KV1">KV1</Radio>
        <Radio value="KV2">KV2</Radio>
        <Radio value="KV2-NT">KV2-NT</Radio>
        <Radio value="KV3">KV3</Radio>
      </Radio.Group>
    </Form.Item>
    <Form.Item name="priorityGroup" label="Đối tượng ưu tiên">
      <Radio.Group>
        <Radio value="01">01</Radio>
        <Radio value="02">02</Radio>
        <Radio value="03">03</Radio>
        <Radio value="04">04</Radio>
        <Radio value="05">05</Radio>
        <Radio value="06">06</Radio>
        <Radio value="07">07</Radio>
        <Radio value="Không">Không</Radio>
      </Radio.Group>
    </Form.Item>
  </Form>
);

export default AcademicInfoForm;
