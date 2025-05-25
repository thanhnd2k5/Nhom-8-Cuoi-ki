import React, { useEffect } from 'react';
import { Card, Button, Descriptions } from 'antd';
import { useModel, history } from 'umi';
import { getUniversityMajors } from '@/services/User/university_majors';
import { admissionMethodNames } from '@/utils/utils';
import NewApplicationLayout from '../NewApplicationLayout';


const Step6: React.FC = () => {
  const { profileData } = useModel('User.profile');
  const { formData } = useModel('User.applications');
  const { universities } = useModel('User.university');
  const { universityMajors, fetchUniversityMajors } = useModel('User.university_majors');
  const { handleSubmit, submitting } = useModel('User.applications');
    console.log(formData);

  useEffect(() => {
        fetchUniversityMajors(formData.university)
  }, []);

  // 1. Tìm ngành học
  const selectedMajor = universityMajors.find(m => m._id === formData?.universityMajorId);

  // 2. Tìm tổ hợp môn
  const selectedCombination = selectedMajor?.subject_combination_ids?.find(
    c => c._id === formData?.subjectCombinationId
  );

  const handleBack = () => {
    history.goBack();
  };

  // Hiển thị điểm theo phương thức
  let resultFields = null;
  const resultData = formData?.resultData || {};
  if (resultData.method === 'hoc_ba') {
    resultFields = (
      <>
        <Descriptions.Item label="Điểm trung bình lớp 10">{resultData.gpaGrade10}</Descriptions.Item>
        <Descriptions.Item label="Điểm trung bình lớp 11">{resultData.gpaGrade11}</Descriptions.Item>
        <Descriptions.Item label="Điểm trung bình lớp 12">{resultData.gpaGrade12}</Descriptions.Item>
      </>
    );
  } else if (resultData.method === 'tot_nghiep' && resultData.subjectScores) {
    resultFields = Object.entries(resultData.subjectScores).map(([subject, score]) => (
      <Descriptions.Item label={`Điểm ${subject}`} key={subject}>
        {score}
      </Descriptions.Item>
    ));
  } else if (
    resultData.method === 'dgnl' ||
    resultData.method === 'tu_duy'
  ) {
    resultFields = (
      <Descriptions.Item label="Tổng điểm">{resultData.totalScore}</Descriptions.Item>
    );
  }

  return (
    <NewApplicationLayout currentStep={5}>
        <div>
        <Card title="Xác nhận thông tin" className="mb-4">
            <Descriptions bordered column={2}>
            <Descriptions.Item label="Họ và tên" span={2}>
                {profileData?.name}
            </Descriptions.Item>
            <Descriptions.Item label="Email">
                {profileData?.email}
            </Descriptions.Item>
            <Descriptions.Item label="Số điện thoại">
                {profileData?.phone}
            </Descriptions.Item>
            <Descriptions.Item label="Tên trường">
                {universities.find(u => u._id === formData?.university)?.name}
            </Descriptions.Item>
            <Descriptions.Item label="Tên ngành học">
                {universityMajors.find(m => m._id === formData?.universityMajorId)?.name}
            </Descriptions.Item>
            {selectedCombination && (
                <Descriptions.Item label="Tên tổ hợp môn">
                {selectedCombination.code} ({selectedCombination.subjects.join(', ')})
                </Descriptions.Item>
            )}
            {resultFields}
            <Descriptions.Item label="Phương thức xét tuyển">
                {admissionMethodNames[formData?.admissionMethod] || formData?.admissionMethod}
            </Descriptions.Item>
            </Descriptions>
        </Card>

        <div className="flex justify-end gap-4">
            <Button onClick={handleBack}>Quay lại</Button>
            <Button type="primary" loading={submitting} onClick={async () => {
              const success = await handleSubmit();
              if (success) {
                // Chuyển sang trang thành công hoặc reset form, v.v.
                history.push('/user/applications');
              }
            }}>
              Gửi hồ sơ
            </Button>
        </div>
        </div>
    </NewApplicationLayout>
    );
};

export default Step6; 