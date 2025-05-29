import React, { useEffect } from 'react';
import { Form, Input, Card, Row, Col, Button } from 'antd';
import { useModel, history } from 'umi';
import NewApplicationLayout from '../NewApplicationLayout';

const subjectList = ['Toán', 'Lý', 'Hóa']; // Có thể lấy động từ tổ hợp nếu muốn

const Step4: React.FC = () => {
  const [form] = Form.useForm();
  const { profileData } = useModel('User.profile');
  const { universityMajors, fetchUniversityMajors } = useModel('User.university_majors');
  const { formData, updateFormData } = useModel('User.applications');

  const admissionMethod = formData.admissionMethod;
  console.log(admissionMethod);

  useEffect(() => {
    fetchUniversityMajors(formData.university)
}, []);

  // 1. Tìm ngành học
  const selectedMajor = universityMajors.find(m => m._id === formData?.universityMajorId);

  // 2. Tìm tổ hợp môn
  const selectedCombination = selectedMajor?.subject_combination_ids?.find(
    (c: any) => c._id === formData?.subjectCombinationId
  );

  const handleBack = () => {
    history.goBack();
  };

  const handleSubmit = async () => {
    try {
      const values = await form.validateFields();
      
      // Thêm profileData vào formData
      updateFormData({
        profileData: {
          name: profileData.name,
          email: profileData.email,
          gender: profileData.gender,
          dob: profileData.dob,
          avatar: profileData.avatar,
          cccd: profileData.cccd,
          phone: profileData.phone,
          ethnic: profileData.ethnic,
          province: profileData.province,
          district: profileData.district,
          address: profileData.address,
          highSchoolName: profileData.highSchoolName,
          graduationYear: profileData.graduationYear,
          priorityArea: profileData.priorityArea,
          priorityGroup: profileData.priorityGroup,
        },
        resultData: admissionMethod === 'hoc_ba' ? {
          method: 'hoc_ba',
          gpaGrade10: values.gpaGrade10,
          gpaGrade11: values.gpaGrade11,
          gpaGrade12: values.gpaGrade12,
        } : admissionMethod === 'tot_nghiep' ? {
          method: 'tot_nghiep',
          subjectScores: Object.fromEntries(
            (selectedCombination?.subjects || []).map((subject: string) => [
              subject,
              values[subject]
            ])
          ),
        } : {
          method: admissionMethod,
          totalScore: values.totalScore,
        }
      });
      
      history.push('/user/applications/new/step5');
    } catch (error) {
      // validation fail
    }
  };

  // Render form fields theo phương thức
  let formFields = null;
  if (admissionMethod === 'hoc_ba') {
    formFields = (
      <Row gutter={16}>
        <Col span={8}>
          <Form.Item
            name="gpaGrade10"
            label="Điểm trung bình lớp 10"
            rules={[
              { required: true, message: 'Vui lòng nhập điểm' },
              { type: 'number', min: 0, max: 10, message: 'Điểm phải từ 0 đến 10' }
            ]}
            initialValue={profileData?.gpaGrade10}
          >
            <Input type="number" step="0.1" placeholder="Nhập điểm" />
          </Form.Item>
        </Col>
        <Col span={8}>
          <Form.Item
            name="gpaGrade11"
            label="Điểm trung bình lớp 11"
            rules={[
              { required: true, message: 'Vui lòng nhập điểm' },
              { type: 'number', min: 0, max: 10, message: 'Điểm phải từ 0 đến 10' }
            ]}
            initialValue={profileData?.gpaGrade11}
          >
            <Input type="number" step="0.1" placeholder="Nhập điểm" />
          </Form.Item>
        </Col>
        <Col span={8}>
          <Form.Item
            name="gpaGrade12"
            label="Điểm trung bình lớp 12"
            rules={[
              { required: true, message: 'Vui lòng nhập điểm' },
              { type: 'number', min: 0, max: 10, message: 'Điểm phải từ 0 đến 10' }
            ]}
            initialValue={profileData?.gpaGrade12}
          >
            <Input type="number" step="0.1" placeholder="Nhập điểm" />
          </Form.Item>
        </Col>
      </Row>
    );
  } else if (admissionMethod === 'tot_nghiep') {
    formFields = (
      <Row gutter={16}>
        {(selectedCombination?.subjects || []).map((subject: string) => (
          <Col span={8} key={subject}>
            <Form.Item
              name={subject}
              label={`Điểm ${subject}`}
              rules={[
                { required: true, message: `Vui lòng nhập điểm ${subject}` },
                { type: 'number', min: 0, max: 10, message: 'Điểm phải từ 0 đến 10' }
              ]}
            >
              <Input type="number" step="0.1" placeholder={`Nhập điểm ${subject}`} />
            </Form.Item>
          </Col>
        ))}
      </Row>
    );
  } else if (admissionMethod === 'dgnl' || admissionMethod === 'tu_duy') {
    formFields = (
      <Row gutter={16}>
        <Col span={8}>
          <Form.Item
            name="totalScore"
            label="Tổng điểm"
            rules={[
              { required: true, message: 'Vui lòng nhập tổng điểm' },
              { type: 'number', min: 0, max: 1200, message: 'Điểm phải hợp lệ' }
            ]}
          >
            <Input type="number" step="0.1" placeholder="Nhập tổng điểm" />
          </Form.Item>
        </Col>
      </Row>
    );
  }

  return (
    <NewApplicationLayout currentStep={3}>
      <Card title="Nhập điểm học tập" className="mb-4">
        <Form form={form} layout="vertical">
          {formFields}
        </Form>
      </Card>
      <div className="flex justify-end gap-4">
        <Button onClick={handleBack}>Quay lại</Button>
        <Button type="primary" onClick={handleSubmit}>
          Tiếp tục
        </Button>
      </div>
    </NewApplicationLayout>
  );
};

export default Step4; 