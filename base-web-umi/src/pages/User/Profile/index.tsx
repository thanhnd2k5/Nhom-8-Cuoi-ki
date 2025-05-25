import React, { useEffect } from 'react';
import { Tabs, Button, Form, message } from 'antd';
import PersonalInfoForm from './components/PersonalInfoForm';
import AcademicInfoForm from './components/AcademicInfoForm';
import { fetchProfileData, saveProfileData, fetchHighSchoolProfile, saveHighSchoolProfile } from '@/models/User/profile';
import moment from 'moment';

const ProfilePage: React.FC = () => {
  const [personalForm] = Form.useForm();
  const [academicForm] = Form.useForm();

  useEffect(() => {
    fetchProfileData().then(res => {
      const data = res.data;
      personalForm.setFieldsValue({
        ...data,
        dob: data.dob ? moment(data.dob) : null,
      });
    });
    fetchHighSchoolProfile().then(data => {
      console.log('Dữ liệu học tập trả về:', data);
      academicForm.setFieldsValue(data.data);
    });
  }, []);

  const handleSavePersonal = async () => {
    try {
      const values = await personalForm.validateFields();
      await saveProfileData(values);
      message.success('Lưu thông tin cá nhân thành công!');
      fetchProfileData().then(data => personalForm.setFieldsValue(data));
    } catch {
      message.error('Vui lòng kiểm tra lại thông tin cá nhân!');
    }
  };

  const handleSaveAcademic = async () => {
    try {
      const values = await academicForm.validateFields();
      const data = {
        ...values,
        graduationYear: String(values.graduationYear),
      };
      await saveHighSchoolProfile(data);
      message.success('Lưu thông tin học tập thành công!');
      fetchHighSchoolProfile().then(data => academicForm.setFieldsValue(data));
    } catch (e) {
      message.error('Vui lòng kiểm tra lại thông tin học tập!');
    }
  };

  return (
    <div style={{ maxWidth: 900, margin: '0 auto', padding: 24 }}>
      <h2>Hồ sơ cá nhân</h2>
      <Tabs defaultActiveKey="1">
        <Tabs.TabPane tab="Thông tin cá nhân" key="1">
          <PersonalInfoForm form={personalForm} />
          <div style={{ textAlign: 'right', marginTop: 24 }}>
            <Button type="primary" onClick={handleSavePersonal}>
              Lưu thông tin cá nhân
            </Button>
          </div>
        </Tabs.TabPane>
        <Tabs.TabPane tab="Thông tin học tập" key="2">
          <AcademicInfoForm form={academicForm} />
          <div style={{ textAlign: 'right', marginTop: 24 }}>
            <Button type="primary" onClick={handleSaveAcademic}>
              Lưu thông tin học tập
            </Button>
          </div>
        </Tabs.TabPane>
      </Tabs>
    </div>
  );
};

export default ProfilePage;
